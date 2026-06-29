import { NextResponse } from "next/server";

interface Channel {
  name: string;
  url: string;
  logo?: string;
  group?: string;
}

export const dynamic = "force-dynamic";

const M3U_URL = "https://raw.githubusercontent.com/Shadmanislam/bdiptv/master/BD%20IPTV.m3u";

async function fetchAllChannels(): Promise<Channel[]> {
  try {
    const res = await fetch(M3U_URL, { next: { revalidate: 300 } });
    const text = await res.text();
    const lines = text.split("\n").filter((l) => l.trim());
    const channels: Channel[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line.startsWith("#EXTINF")) continue;

      const urlLine = lines[i + 1]?.trim();
      if (!urlLine || urlLine.startsWith("#")) continue;

      let url = urlLine;
      if (url.includes(" ")) url = url.trim();

      const nameMatch = line.match(/,(.+)$/);
      let name = nameMatch?.[1]?.trim() || "";
      name = name.replace(/^\d+\./, "").trim();
      if (!name || !url || !url.includes("m3u8")) continue;

      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const groupMatch = line.match(/group-title="([^"]+)"/);

      channels.push({
        name,
        url,
        logo: logoMatch?.[1] || "",
        group: groupMatch?.[1]?.trim() || "",
      });
    }
    return channels;
  } catch {
    return [];
  }
}

function matchBD(ch: Channel): boolean {
  const lower = ch.name.toLowerCase();
  const group = ch.group || "";
  if (/bangla|entertainment|news|infotainment|bangladeshi/i.test(group)) return true;
  if (/maasranga|channel i|channel 9|ntv|bangla vision|deepto|gazi|desh tv|boishakhi|asian|sa tv|duronto|bangla tv|btv|ananda|my tv|global|bijoy|nexus|mohona|somoy|jamuna|dbc|ekattor|channel 24|atn|news 24|star news|independent|al quran|srk|cineedge|uniques|superrix|screem|nagorik|rtv/i.test(lower)) return true;
  return false;
}

function matchIndianBangla(ch: Channel): boolean {
  const lower = ch.name.toLowerCase();
  const group = ch.group || "";
  if (/indian bangla|kolkata bangla|indian-bangla|kolkata/i.test(group)) return true;
  if (/dd bangla|enter 10|kolkata|r plus|aakash|republic bangla|zee 24 ghanta|news time bangla|dhoom|sangeet bangla|republic bangla/i.test(lower)) return true;
  return false;
}

function matchSports(ch: Channel): boolean {
  const lower = ch.name.toLowerCase();
  const group = ch.group || "";
  if (/sports|football|cricket|fifa/i.test(group)) return true;
  if (/ptv sports|a sports|cricket gold|golf|fox sport|bein|bt sport|espn|tsn|star sports|dd sports|bleav|willow|nfl|tnt sport|sports legends|flash guys|sports range|thunder|fighter|buddy|sky sports|ten sport|sony ten|motor vision|saudia|tpv|cowboy/i.test(lower)) return true;
  return false;
}

function deduplicate(channels: Channel[]): Channel[] {
  const seen = new Map<string, Channel>();
  for (const ch of channels) {
    const key = ch.name.toLowerCase().replace(/\s+/g, " ");
    if (!seen.has(key)) {
      seen.set(key, ch);
    }
  }
  return Array.from(seen.values());
}

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "bd";

  try {
    const allChannels = await fetchAllChannels();

    if (type === "bd") {
      return NextResponse.json({ channels: deduplicate(allChannels.filter(matchBD)) });
    }
    if (type === "indian-bangla") {
      return NextResponse.json({ channels: deduplicate(allChannels.filter(matchIndianBangla)) });
    }
    if (type === "sports") {
      return NextResponse.json({ channels: deduplicate(allChannels.filter(matchSports)) });
    }

    return NextResponse.json({ channels: [] });
  } catch {
    return NextResponse.json({ channels: [] }, { status: 500 });
  }
}
