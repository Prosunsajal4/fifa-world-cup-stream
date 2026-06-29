import { NextRequest } from "next/server";

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
        "Referer": new URL(url).origin,
      },
    });

    if (!res.ok) {
      return new Response("Stream not available", { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "application/vnd.apple.mpegurl";

    return new Response(res.body, {
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
