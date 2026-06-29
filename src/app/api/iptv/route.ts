import { NextResponse } from "next/server";

interface Channel {
  name: string;
  url: string;
  logo?: string;
}

export const dynamic = "force-dynamic";

const INDIAN_BANGLA_KEYWORDS = [
  "zee bangla", "colors bangla", "star jalsha", "jalsha movies", "sony aath",
  "ruposhi bangla", "tara bangla", "sangeetbangla", "sangeet bangla", "dd bangla",
  "kolkata tv", "akash aath", "zee bangla cinema", "zee 24 ghanta",
  "colors bangla hd", "star jalsha hd", "news 18 bangla",
];

const SPORTS_KEYWORDS = [
  "star sports", "sony ten", "sony six", "dd sports", "d sports", "ptv sports",
  "sky sports", "bein sport", "fox sport", "ten sports", "euro sport",
  "eurosport", "dubai sport", "geo super", "fight sport",
];

async function fetchBDChannels(): Promise<Channel[]> {
  try {
    const res = await fetch("https://lupael.github.io/IPTV/running.m3u", { next: { revalidate: 300 } });
    const text = await res.text();
    const lines = text.split("\n").filter((l) => l.trim());
    const channels: Channel[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXTINF:")) {
        const info = lines[i];
        const url = lines[i + 1]?.trim();
        if (!url || url.startsWith("#") || !url.includes(".m3u8")) continue;

        const nameMatch = info.match(/,(.+)$/);
        const logoMatch = info.match(/tvg-logo="([^"]+)"/);
        const name = nameMatch?.[1]?.trim() || "Unknown";
        if (name.includes("(Source 2)") || name.includes("(Source 3)")) continue;

        channels.push({
          name,
          url,
          logo: logoMatch?.[1] || "",
        });
      }
    }
    return channels;
  } catch {
    return [];
  }
}

async function fetchIPTVChannels(): Promise<Channel[]> {
  try {
    const res = await fetch("https://raw.githubusercontent.com/Shadmanislam/bdiptv/master/BD%20IPTV.m3u", {
      next: { revalidate: 300 },
    });
    const text = await res.text();
    const lines = text.split("\n").filter((l) => l.trim());
    const channels: Channel[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line.startsWith("#EXTINF:") && !line.startsWith("#EXTINF")) continue;
      if (!line.includes(",")) continue;

      const url = lines[i + 1]?.trim();
      if (!url || url.startsWith("#") || !url.includes(".m3u8")) continue;

      const nameMatch = line.match(/,(.+)$/);
      let name = nameMatch?.[1]?.trim() || "";
      name = name.replace(/^\d+\./, "").trim();
      if (!name) continue;

      channels.push({ name, url });
    }
    return channels;
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "bd";

  try {
    if (type === "bd") {
      const channels = await fetchBDChannels();
      return NextResponse.json({ channels });
    }

    const allChannels = await fetchIPTVChannels();
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
