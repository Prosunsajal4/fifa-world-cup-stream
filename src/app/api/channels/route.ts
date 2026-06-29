import { NextResponse } from "next/server";

interface Channel {
  name: string;
  logo: string;
  group: string;
  url: string;
}

export const dynamic = "force-dynamic";

const WORKING_HOSTS = ["owrcovcrpy.gpcdn.net", "bozztv.com"];

export async function GET() {
  try {
    const res = await fetch("https://lupael.github.io/IPTV/running.m3u", { next: { revalidate: 300 } });
    const text = await res.text();
    const lines = text.split("\n").filter((l) => l.trim());
    const channels: Channel[] = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXTINF:")) {
        const info = lines[i];
        const url = lines[i + 1];
        if (!url || url.startsWith("#")) continue;

        const trimmedUrl = url.trim();
        const isWorkingHost = WORKING_HOSTS.some((h) => trimmedUrl.includes(h));
        if (!isWorkingHost) continue;

        const nameMatch = info.match(/,(.+)$/);
        const logoMatch = info.match(/tvg-logo="([^"]+)"/);
        const groupMatch = info.match(/group-title="([^"]+)"/);
        const name = nameMatch?.[1]?.trim() || "Unknown";

        if (name.includes("(Source 2)") || name.includes("(Source 3)")) continue;

        channels.push({
          name,
          logo: logoMatch?.[1] || "",
          group: groupMatch?.[1] || "General",
          url: trimmedUrl,
        });
      }
    }

    return NextResponse.json({ channels });
  } catch {
    return NextResponse.json({ channels: [], error: "Failed to load channels" }, { status: 500 });
  }
}
