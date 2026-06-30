import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Channel {
  name: string;
  url: string;
  logo: string;
  group: string;
}

const BD_CHANNELS: Channel[] = [
  { name: "Maasranga TV", url: "https://cdn.hoichoi24.com/MAASRANGA-TV/tracks-v1a1/mono.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/0/0f/Maasranga_TV_logo.png", group: "Bangla" },
  { name: "Gazi TV", url: "https://cdn.hoichoi24.com/GTV/tracks-v1a1/mono.m3u8", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/GTV_logo_2016.png", group: "Bangla" },
  { name: "T Sports HD", url: "https://cdn.hoichoi24.com/TSportsHD/tracks-v1a1/mono.ts.m3u8", logo: "https://raw.githubusercontent.com/Shakil1294/pcv/main/logo/T_Sports.png", group: "Bangla" },
  { name: "Star Jalsha", url: "https://tv.cloudcdn.me/live.ts?channelId=116592&uid=9592&deviceMac=00:1A:79:82:85:F0", logo: "", group: "Bangla" },
  { name: "Zee Bangla", url: "https://tv.cloudcdn.me/live.ts?channelId=120&uid=9592&deviceMac=00:1A:79:82:85:F0", logo: "", group: "Bangla" },
  { name: "Ekattor TV", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/ekattor.stream/playlist.m3u8", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Ekattor%20TV.png", group: "Bangla" },
  { name: "Mohona TV", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mohonatv.stream/playlist.m3u8", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Mohona%20TV.png", group: "Bangla" },
  { name: "Global TV", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/Global-tv.stream/playlist.m3u8", logo: "https://raw.githubusercontent.com/Shakil1294/pcv/main/logo/Global_TV.png", group: "Bangla" },
  { name: "My TV", url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mytv-up-off.stream/playlist.m3u8", logo: "", group: "Bangla" },
  { name: "NTV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8", logo: "https://www.ntvbd.com/sites/default/files/aggregator/2020/02/17/ntv-channel_0.jpg", group: "Bangla" },
  { name: "ATN Bangla", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8", logo: "https://raw.githubusercontent.com/Shakil1294/pcv/main/logo/ATN_Bangla.png", group: "Bangla" },
  { name: "Channel I", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8", logo: "https://cdn.tvpassport.com/image/station/240x135/channel-i-bangla.png", group: "Bangla" },
  { name: "Somoy TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Somoy%20TV.jpeg", group: "Bangla" },
  { name: "Jamuna TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8", logo: "https://dl.dropbox.com/s/k7z1dsec1jfjbkn/jamuna_tv_bd.png", group: "Bangla" },
  { name: "Bangla Vision", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Banglavision.png", group: "Bangla" },
  { name: "Channel 24", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8", logo: "https://dl.dropbox.com/s/puf12xv5flgbnz5/channel24_bd.png", group: "Bangla" },
  { name: "Independent TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8", logo: "https://dl.dropbox.com/s/7xwwb8hetz3w8rp/independent_tv.png", group: "Bangla" },
  { name: "Ekushey TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8", logo: "https://i.postimg.cc/C15wr1RW/Ekushey-Television-Logo-svg.png", group: "Bangla" },
  { name: "BTV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8", logo: "https://ssl.com.bd/sites/default/files/BTV%20Logo%20Gallery.png", group: "Bangla" },
  { name: "Deepto TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8", logo: "https://upload.wikimedia.org/wikipedia/en/3/31/Deepto_TV_logo.png", group: "Bangla" },
  { name: "Channel 9", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8", logo: "https://raw.githubusercontent.com/Shakil1294/pcv/main/logo/channel_9.png", group: "Bangla" },
  { name: "RTV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8", logo: "https://raw.githubusercontent.com/Shakil1294/pcv/main/logo/Rtv.png", group: "Bangla" },
  { name: "Desh TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1719/output/index.m3u8", logo: "https://www.deshitv.com/images//bangla_logo.png", group: "Bangla" },
  { name: "SA TV", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/index.m3u8", logo: "https://raw.githubusercontent.com/Shakil1294/pcv/main/logo/SA_TV.png", group: "Bangla" },
  { name: "Star News", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Star%20News.jpg", group: "Bangla" },
  { name: "News 24", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/News%2024.png", group: "Bangla" },
];

const INDIAN_BANGLA_CHANNELS: Channel[] = [
  { name: "DD Bangla", url: "https://cdn-4.pishow.tv/live/969/master.m3u8", logo: "https://d75dqofg5kmfk.cloudfront.net/bpk-tv/Ddnational/default/index.m3u8", group: "Indian Bangla" },
  { name: "ABP Ananda", url: "https://amg01448-samsungin-abpananda-samsungin-ad-pw.amagi.tv/playlist/amg01448-samsungin-abpananda-samsungin/playlist.m3u8", logo: "https://i.postimg.cc/t7Gn9VtZ/abpananda.png", group: "Indian Bangla" },
  { name: "Enter 10 Bangla", url: "https://live-bangla.akamaized.net/liveabr/pub-iobanglakp3sff/live_720p/chunks.m3u8", logo: "https://i.ibb.co/zNTwtbc/IMG-20240126-092809.png", group: "Indian Bangla" },
  { name: "Sangeet Bangla", url: "https://cdn-4.pishow.tv/live/1143/master.m3u8", logo: "", group: "Indian Bangla" },
];

const SPORTS_CHANNELS: Channel[] = [
  { name: "BeIN Sports 1", url: "https://1nyaler.streamhostingcdn.top/stream/23/index.m3u8", logo: "", group: "Sports" },
  { name: "BeIN Sports 4", url: "https://1nyaler.streamhostingcdn.top/stream/26/index.m3u8", logo: "", group: "Sports" },
  { name: "Fox Sports", url: "https://1nyaler.streamhostingcdn.top/stream/33/index.m3u8", logo: "", group: "Sports" },
  { name: "Fox Sports 2", url: "https://1nyaler.streamhostingcdn.top/stream/34/index.m3u8", logo: "", group: "Sports" },
  { name: "TVP Sports", url: "https://1nyaler.streamhostingcdn.top/stream/89/index.m3u8", logo: "", group: "Sports" },
  { name: "DAZN 1", url: "https://1nyaler.streamhostingcdn.top/stream/94/index.m3u8", logo: "", group: "Sports" },
  { name: "WIN Sports", url: "https://1nyaler.streamhostingcdn.top/stream/32/index.m3u8", logo: "", group: "Sports" },
  { name: "D Sports", url: "https://1nyaler.streamhostingcdn.top/stream/106/index.m3u8", logo: "", group: "Sports" },
  { name: "Telemundo", url: "https://nbculocallive.akamaized.net/hls/live/2037499/puertorico/stream1/master.m3u8", logo: "", group: "Sports" },
  { name: "DD Sports", url: "https://cdn-6.pishow.tv/live/13/master.m3u8", logo: "", group: "Sports" },
  { name: "DD Sports 2", url: "https://cdn-6.pishow.tv/live/14/master.m3u8", logo: "", group: "Sports" },
  { name: "DD Sports 3", url: "https://cdn-6.pishow.tv/live/16/master.m3u8", logo: "", group: "Sports" },
  { name: "T Sports", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8", logo: "", group: "Sports" },
  { name: "TVRI Sport", url: "http://103.148.44.38:8000/play/a05u/index.m3u8", logo: "", group: "Sports" },
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
