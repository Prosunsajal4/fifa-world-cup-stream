import { NextResponse } from "next/server";

interface Channel {
  name: string;
  url: string;
  logo?: string;
  group?: string;
}

export const dynamic = "force-dynamic";

const M3U_URLS = [
  "https://raw.githubusercontent.com/Shadmanislam/bdiptv/master/BD%20IPTV.m3u",
];

const WORKING_HOSTS = [
  "owrcovcrpy.gpcdn.net",
  "nomawnoijl.gpcdn.net",
  "bozztv.com",
  "cdn-4.pishow.tv",
  "cdn-2.pishow.tv",
  "cdn-3.pishow.tv",
  "cdn-6.pishow.tv",
  "cdn20.liveonlineservices.com",
  "cdn30.liveonlineservices.com",
  "mytvbangla.com",
  "tstatic.akash-go.com",
  "cdn.ottlive.co.in",
  "thelegitpro.in",
  "server.thelegitpro.in",
  "dwamdstream102.akamaized.net",
  "live.france24.com",
  "ndtv24x7elemarchana.akamaized.net",
  "rt-glb.rttv.com",
  "tv-trtworld.medya.trt.com.tr",
  "nmxlive.akamaized.net",
  "feeds.intoday.in",
  "d7x8z4yuq42qn.cloudfront.net",
  "d3qs3d2rkhfqrt.cloudfront.net",
  "d4ddgdmj1cvnm.cloudfront.net",
  "live-hls-apps-aje-fa.getaj.net",
  "247wlive.foxweather.com",
  "playztv.pages.dev",
  "linear-493.frequency.stream",
  "linear-599.frequency.stream",
  "bldcmprod-cdn.toffeelive.com",
  "byphdgllyk.gpcdn.net",
  "live20.bozztv.com",
  "bozztv.com/rongo",
  "stream.spicefmbd.com",
  "deshitv.deshitv24.net",
  "boishakhi.sonarbanglatv.com",
  "mcncdndigital.com",
  "cdn.mycloudstream.io",
  "2-fss-2.streamhoster.com",
  "amg00627",
  "amg01076",
  "amg01438",
  "amg01412",
  "amg00877",
  "amg00864",
  "amg01218",
  "amg17292",
];

async function fetchAllChannels(): Promise<Channel[]> {
  const allChannels: Channel[] = [];

  for (const url of M3U_URLS) {
    try {
      const res = await fetch(url, { next: { revalidate: 300 } });
      const text = await res.text();
      const lines = text.split("\n").filter((l) => l.trim());

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line.startsWith("#EXTINF")) continue;

        const urlLine = lines[i + 1]?.trim();
        if (!urlLine || urlLine.startsWith("#")) continue;
        if (!urlLine.includes(".m3u8") && !urlLine.includes(".mp4")) continue;

        let streamUrl = urlLine;
        const hostname = (() => { try { return new URL(streamUrl).hostname; } catch { return ""; } })();

        const isWorking = WORKING_HOSTS.some((h) => hostname.includes(h) || streamUrl.includes(h));
        if (!isWorking) continue;

        const nameMatch = line.match(/,(.+)$/);
        let name = nameMatch?.[1]?.trim() || "";
        name = name.replace(/^\d+\./, "").trim();
        if (!name) continue;

        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        const groupMatch = line.match(/group-title="([^"]+)"/);

        allChannels.push({
          name,
          url: streamUrl,
          logo: logoMatch?.[1] || "",
          group: groupMatch?.[1]?.trim() || "",
        });
      }
    } catch {
      continue;
    }
  }

  return allChannels;
}

function matchBD(ch: Channel): boolean {
  const lower = ch.name.toLowerCase();
  const group = ch.group || "";
  if (/bangla|entertainment|news|infotainment|bangladeshi/i.test(group) && !/indian|kolkata/i.test(group)) return true;
  if (/maasranga|channel i|channel 9|ntv|bangla vision|deepto|gazi|desh tv|boishakhi|asian|sa tv|duronto|bangla tv|btv|ananda|my tv|global|bijoy|nexus|mohona|somoy|jamuna|dbc|ekattor|channel 24|atn|news 24|star news|independent|al quran|srk|cineedge|uniques|superrix|screem|nagorik|rtv|thikana|deshe bideshe|maasranga|music bangla/i.test(lower)) return true;
  return false;
}

function matchIndianBangla(ch: Channel): boolean {
  const lower = ch.name.toLowerCase();
  const group = ch.group || "";
  if (/indian bangla|kolkata bangla|indian-bangla|kolkata|indian/i.test(group)) return true;
  if (/dd bangla|enter 10|kolkata|r plus|aakash|republic bangla|zee 24 ghanta|news time bangla|dhoom|sangeet bangla|republic bangla|nk|rplus/i.test(lower)) return true;
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
