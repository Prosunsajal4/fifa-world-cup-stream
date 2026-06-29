import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Channel {
  name: string;
  url: string;
  logo: string;
  group: string;
}

const BD_CHANNELS: Channel[] = [
  { name: "NTV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/2/29/NTV_Bangladesh_logo.png", group: "Bangla" },
  { name: "Channel I", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/f/fb/Channel_i_%28Bangladesh%29_logo.png", group: "Bangla" },
  { name: "Gazi TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/GTV_logo_2016.png", group: "Bangla" },
  { name: "Jamuna TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/c/c3/Jamuna_Television_logo.png", group: "Bangla" },
  { name: "Maasranga TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1700/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/0/0f/Maasranga_TV_logo.png", group: "Bangla" },
  { name: "ATN Bangla", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ATN_Bangla.svg/2560px-ATN_Bangla.svg.png", group: "Bangla" },
  { name: "ATN News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Bangla Vision", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Ekushey TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Deepto TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/3/31/Deepto_TV_logo.png", group: "Bangla" },
  { name: "BTV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "BTV World", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Asian TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Somoy TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Boishakhi TV", url: "https://bozztv.com/rongo/rongo-BoishakhiTV/index.m3u8", logo: "", group: "Bangla" },
  { name: "Desh TV", url: "https://bozztv.com/rongo/rongo-DeshTV/index.m3u8", logo: "", group: "Bangla" },
  { name: "RTV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Independent TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1719/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Channel 24", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Ekattor TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1721/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Nagorik TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "DBC News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1724/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Mohona TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1707/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Dhaka TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1712/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Time TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1713/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "SA TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1714/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Channel 16", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1717/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "T Sports", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Duronto TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1718/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Bijoy TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1726/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Gaan Bangla", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1727/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "A Bangla", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1730/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Nexus TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1731/output/index.m3u8", logo: "", group: "Bangla" },
  { name: "Music Bangla", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1732/output/index.m3u8", logo: "", group: "Bangla" },
];

const INDIAN_BANGLA_CHANNELS: Channel[] = [
  { name: "DD Bangla", url: "https://cdn-4.pishow.tv/live/969/master.m3u8", logo: "", group: "Indian Bangla" },
  { name: "Sangeet Bangla", url: "https://cdn-4.pishow.tv/live/1143/master.m3u8", logo: "", group: "Indian Bangla" },
];

const SPORTS_CHANNELS: Channel[] = [
  { name: "DD Sports", url: "https://cdn-6.pishow.tv/live/13/master.m3u8", logo: "", group: "Sports" },
  { name: "DD Sports 2", url: "https://cdn-6.pishow.tv/live/14/master.m3u8", logo: "", group: "Sports" },
  { name: "DD Sports 3", url: "https://cdn-6.pishow.tv/live/16/master.m3u8", logo: "", group: "Sports" },
  { name: "T Sports", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8", logo: "", group: "Sports" },
];

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type") || "bd";

  if (type === "bd") {
    return NextResponse.json({ channels: BD_CHANNELS });
  }
  if (type === "indian-bangla") {
    return NextResponse.json({ channels: INDIAN_BANGLA_CHANNELS });
  }
  if (type === "sports") {
    return NextResponse.json({ channels: SPORTS_CHANNELS });
  }

  return NextResponse.json({ channels: [] });
}
