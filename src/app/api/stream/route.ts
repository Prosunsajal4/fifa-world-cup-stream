import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("Missing url param", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      return new Response("Stream not available", { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "";
    const body = await res.text();

    if (contentType.includes("mpegurl") || url.includes(".m3u8") || body.trim().startsWith("#EXTM3U")) {
      const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);
      const rewritten = body.replace(/(^(?!#).+\.m3u8.*$|^(?!#).+\.ts.*$)/gm, (match) => {
        let segmentUrl = match.trim();
        if (!segmentUrl.startsWith("http")) {
          segmentUrl = baseUrl + segmentUrl;
        }
        return `/api/stream?url=${encodeURIComponent(segmentUrl)}`;
      });
      return new NextResponse(rewritten, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache",
        },
      });
    }

    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return new Response("Failed to fetch stream", { status: 500 });
  }
}
