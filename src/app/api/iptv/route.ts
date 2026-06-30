import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Channel {
  name: string;
  url: string;
  logo: string;
  group: string;
}

const M3U_URL = "https://go.skym3u.top/nszn.m3u";

async function fetchChannels(): Promise<Channel[]> {
  const channels: Channel[] = [];
  try {
    const res = await fetch(M3U_URL, { next: { revalidate: 300 } });
    const text = await res.text();
    const lines = text.split("\n").map((l) => l.trim());

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.startsWith("#EXTINF")) continue;
      const url = lines[i + 1]?.trim();
      if (!url || !url.startsWith("http")) continue;

      const nameMatch = line.match(/,(.+)$/);
      const name = nameMatch?.[1]?.trim() || "";
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const logo = logoMatch?.[1] || "";
      if (!name) continue;

      channels.push({ name, url, logo, group: "bd" });
    }
  } catch {}
  return channels;
}

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "bd";

  if (type === "bd") {
    const channels = await fetchChannels();
    return NextResponse.json({ channels });
  }

  if (type === "indian-bangla") {
    const channels = await fetchChannels();
    const indian = channels.filter((ch) =>
      /zee|star jalsha|jalsha|enter 10|sony aath|colors bangla|color bangla|sun bangla/i.test(ch.name)
    );
    return NextResponse.json({ channels: indian });
  }

  if (type === "sports") {
    const channels = await fetchChannels();
    const sports = channels.filter((ch) =>
      /sports|bein|ten |sony ten|star sports|t sports|espn|cricket|football/i.test(ch.name)
    );
    return NextResponse.json({ channels: sports });
  }

  return NextResponse.json({ channels: [] });
}
