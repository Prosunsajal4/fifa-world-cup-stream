import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });

    if (!res.ok) {
      return new Response(`Upstream error: ${res.status}`, { status: res.status });
    }

    const contentType = res.headers.get("content-type") || "application/vnd.apple.mpegurl";
    let body: string;

    if (contentType.includes("mpegurl") || url.includes(".m3u8")) {
      body = await res.text();
      const baseUrl = url.replace(/\/[^/]*$/, "/");
      body = body.replace(/(^(?!#).+\.m3u8.*$|^(?!#).+\.ts.*$)/gm, (match) => {
        if (match.startsWith("http")) {
          return `/api/stream?url=${encodeURIComponent(match)}`;
        }
        return `/api/stream?url=${encodeURIComponent(new URL(match, baseUrl).href)}`;
      });
    } else {
      const buf = await res.arrayBuffer();
      return new Response(buf, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=2",
        },
      });
    }

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=2",
      },
    });
  } catch {
    return new Response("Proxy error", { status: 502 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}
