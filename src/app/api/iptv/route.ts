import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Channel {
  name: string;
  url: string;
  logo: string;
  group: string;
}

const BD_CHANNELS: Channel[] = [
  { name: "Jamuna TV", url: "https://bozztv.com/rongo/rongo-JamunaTelevision/index.m3u8", logo: "", group: "bd" },
  { name: "Independent TV", url: "https://bozztv.com/rongo/rongo-IndependentTV/index.m3u8", logo: "", group: "bd" },
  { name: "Desh TV", url: "https://bozztv.com/rongo/rongo-DeshTV/index.m3u8", logo: "", group: "bd" },
  { name: "ATN News", url: "https://bozztv.com/rongo/rongo-ATNNews/index.m3u8", logo: "", group: "bd" },
  { name: "BTV Chattogram", url: "https://bozztv.com/rongo/rongo-BTVChattagram/index.m3u8", logo: "", group: "bd" },
  { name: "Madani Channel", url: "https://streaming.madanichannel.tv/static/streaming-playlists/hls/d3e49b76-ac06-4689-a641-9200445b647f/master.m3u8", logo: "", group: "bd" },
  { name: "Peace TV Bangla", url: "https://dzkyvlfyge.erbvr.com/PeaceTvBangla/index.m3u8", logo: "", group: "bd" },
  { name: "Azan TV", url: "https://dbcanada.sonarbanglatv.com/azantv/atv/index.m3u8", logo: "", group: "bd" },
  { name: "Aamar Bangla", url: "https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/amarbanglatv.stream/playlist.m3u8", logo: "", group: "bd" },
  { name: "Channel S", url: "https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI/chsukoff.stream/playlist.m3u8", logo: "", group: "bd" },
];

const INDIAN_BANGLA_CHANNELS: Channel[] = [
  { name: "Star Jalsha HD", url: "https://tvsen4.aynaott.com/n64PH4YL/index.m3u8", logo: "", group: "indian-bangla" },
  { name: "Zee Bangla Sonar", url: "https://d1g8wgjurz8via.cloudfront.net/bpk-tv/ColorsHD/default/ColorsHD.m3u8", logo: "", group: "indian-bangla" },
  { name: "Enterr 10 Bangla", url: "https://live-bangla.akamaized.net/liveabr/playlist.m3u8", logo: "", group: "indian-bangla" },
];

const SPORTS_CHANNELS: Channel[] = [
  { name: "DD Sports", url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8", logo: "", group: "sports" },
  { name: "Star Jalsha HD", url: "https://tvsen4.aynaott.com/n64PH4YL/index.m3u8", logo: "", group: "sports" },
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
