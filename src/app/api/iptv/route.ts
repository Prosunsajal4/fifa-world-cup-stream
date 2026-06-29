import { NextResponse } from "next/server";

interface Channel {
  name: string;
  url: string;
}

export const dynamic = "force-dynamic";

const INDIAN_BANGLA_KEYWORDS = [
  "zee bangla", "zee bangla hd", "colors bangla", "star jalsha", "jalsha movies",
  "sony aath", "ruposhi bangla", "tara bangla", "sangeetbangla", "sangeet bangla",
  "dd bangla", "kolkata tv", "akash aath", "zee bangla cinema",
  "bangla channel", "itv bangla", "madani tv bangla", "peace tv bangla",
  "bangla time", "alpona tv", "nokshi tv", "probashi bangla",
];

const SPORTS_KEYWORDS = [
  "star sports", "sony ten", "sony six", "dd sports", "d sports", "ptv sports",
  "sky sports", "bein sport", "fox sport", "ten sports", "euro sport",
  "eurosport", "dubai sport", "geo super", "fight sport",
];

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "bangla";

  try {
    const res = await fetch("https://raw.githubusercontent.com/Shadmanislam/bdiptv/master/BD%20IPTV.m3u", {
      next: { revalidate: 300 },
    });
    const text = await res.text();
    const lines = text.split("\n").filter((l) => l.trim());
    const allChannels: Channel[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("#EXTINF:") || (line.startsWith("#EXTINF") && lines[i].includes(","))) {
        const url = lines[i + 1]?.trim();
        if (!url || url.startsWith("#")) continue;

        const nameMatch = line.match(/,(.+)$/);
        let name = nameMatch?.[1]?.trim() || "";
        name = name.replace(/^\d+\./, "").trim();
        if (!name || !url.includes(".m3u8")) continue;

        allChannels.push({ name, url });
      }
    }

    const keywords = type === "sports" ? SPORTS_KEYWORDS : INDIAN_BANGLA_KEYWORDS;
    const matched = allChannels.filter((ch) => {
      const lower = ch.name.toLowerCase();
      return keywords.some((kw) => lower.includes(kw));
    });

    const seen = new Set<string>();
    const unique: Channel[] = [];
    for (const ch of matched) {
      const key = ch.name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(ch);
      }
    }

    return NextResponse.json({ channels: unique });
  } catch {
    return NextResponse.json({ channels: [], error: "Failed to load" }, { status: 500 });
  }
}
