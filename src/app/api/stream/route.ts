import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("Missing url param", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "*/*",
      },
    });

    if (!res.ok) {
      return new Response(`Upstream error: ${res.status}`, { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);

    if (text.trim().startsWith("#EXTM3U")) {
      const baseUrl = url.substring(0, url.lastIndexOf("/") + 1);
      const lines = text.split("\n");
      const rewritten = lines.map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("#") || trimmed === "") return line;
        let fullUrl = trimmed;
        if (!trimmed.startsWith("http")) {
          fullUrl = baseUrl + trimmed;
        }
        return `/api/stream?url=${encodeURIComponent(fullUrl)}`;
      }).join("\n");

      return new Response(rewritten, {
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    }

    return new Response(buffer, {
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store",
      },
    });
  } catch (e) {
    return new Response(`Proxy error: ${e instanceof Error ? e.message : "unknown"}`, { status: 502 });
  }
}
