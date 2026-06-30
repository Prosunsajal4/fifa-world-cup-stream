import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Channel {
  name: string;
  url: string;
  logo: string;
  group: string;
}

const BD_CHANNELS: Channel[] = [
  { name: "Maasranga TV", url: "https://cdn.hoichoi24.com/lb/maasrangatv/maasranga_720p/playlist.m3u8", logo: "https://cdn.hoichoi24.com/lb/maasrangatv/logo.png", group: "bd" },
  { name: "Gazi TV", url: "https://cdn.hoichoi24.com/lb/gazitv/gazitv_720p/playlist.m3u8", logo: "https://cdn.hoichoi24.com/lb/gazitv/logo.png", group: "bd" },
  { name: "T Sports HD", url: "https://cdn.hoichoi24.com/lb/tsports/tsports_720p/playlist.m3u8", logo: "https://cdn.hoichoi24.com/lb/tsports/logo.png", group: "bd" },
  { name: "BTV", url: "https://cdn.hoichoi24.com/lb/btv/btv_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "BTV World", url: "https://cdn.hoichoi24.com/lb/btv/btv_720p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Ekattor TV", url: "https://cdn.hoichoi24.com/lb/ekattortv/ekattortv_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Jamuna TV", url: "https://cdn.hoichoi24.com/lb/jamunatv/jamunatv_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Somoy TV", url: "https://cdn.hoichoi24.com/lb/somoytv/somoytv_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "NTV", url: "https://cdn.hoichoi24.com/lb/ntv/ntv_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Channel i", url: "https://cdn.hoichoi24.com/lb/channeli/channeli_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Channel 24", url: "https://cdn.hoichoi24.com/lb/channel24/channel24_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "DBC News", url: "https://cdn.hoichoi24.com/lb/dbcnews/dbcnews_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Nagorik TV", url: "https://cdn.hoichoi24.com/lb/nagoriktv/nagoriktv_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Independent TV", url: "https://cdn.hoichoi24.com/lb/independent/independent_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "Deepto TV", url: "https://cdn.hoichoi24.com/lb/deeptotv/deeptotv_360p/playlist.m3u8", logo: "", group: "bd" },
  { name: "RTV", url: "https://cdn.hoichoi24.com/lb/rtv/rtv_360p/playlist.m3u8", logo: "", group: "bd" },
];

const INDIAN_BANGLA_CHANNELS: Channel[] = [
  { name: "Star Jalsha HD", url: "https://tvsen4.aynaott.com/n64PH4YL/index.m3u8", logo: "", group: "indian-bangla" },
  { name: "Zee Bangla Sonar", url: "https://d1g8wgjurz8via.cloudfront.net/bpk-tv/ColorsHD/default/ColorsHD.m3u8", logo: "", group: "indian-bangla" },
  { name: "Enterr 10 Bangla", url: "https://live-bangla.akamaized.net/liveabr/playlist.m3u8", logo: "", group: "indian-bangla" },
];

const SPORTS_CHANNELS: Channel[] = [
  { name: "T Sports HD", url: "https://cdn.hoichoi24.com/lb/tsports/tsports_720p/playlist.m3u8", logo: "https://cdn.hoichoi24.com/lb/tsports/logo.png", group: "sports" },
  { name: "Maasranga TV", url: "https://cdn.hoichoi24.com/lb/maasrangatv/maasranga_720p/playlist.m3u8", logo: "https://cdn.hoichoi24.com/lb/maasrangatv/logo.png", group: "sports" },
  { name: "Gazi TV", url: "https://cdn.hoichoi24.com/lb/gazitv/gazitv_720p/playlist.m3u8", logo: "https://cdn.hoichoi24.com/lb/gazitv/logo.png", group: "sports" },
  { name: "DD Sports", url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8", logo: "", group: "sports" },
];

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "bd";

  if (type === "indian-bangla") {
    return NextResponse.json({ channels: INDIAN_BANGLA_CHANNELS });
  }

  if (type === "sports") {
    return NextResponse.json({ channels: SPORTS_CHANNELS });
  }

  return NextResponse.json({ channels: BD_CHANNELS });
}
