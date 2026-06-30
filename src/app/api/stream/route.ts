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

    const contentType = res.headers.get("content-type") || "";
    const isM3u8 = contentType.includes("mpegurl") || contentType.includes("m3u8") || url.includes(".m3u8");

    if (isM3u8) {
      let body = await res.text();
      const baseUrl = url.replace(/\/[^/]*$/, "/");

      const rewriteUrl = (u: string): string => {
        let full: string;
        if (u.startsWith("http")) {
          full = u;
        } else {
          try { full = new URL(u, baseUrl).href; } catch { full = u; }
        }
        return `/api/stream?url=${encodeURIComponent(full)}`;
      };

      const lines = body.split("\n");
      const rewritten: string[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith("#EXT-X-MEDIA:")) {
          const rewritten_line = line.replace(/URI="([^"]+)"/gi, (_match, uri) => {
            return `URI="${rewriteUrl(uri)}"`;
          });
          rewritten.push(rewritten_line);
        } else if (line.startsWith("#EXT-X-STREAM-INF:")) {
          rewritten.push(line);
        } else if (!line.startsWith("#") && line.trim()) {
          rewritten.push(rewriteUrl(line.trim()));
        } else {
          rewritten.push(line);
        }
      }

      body = rewritten.join("\n");

      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.apple.mpegurl",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=2",
        },
      });
    }

    const buf = await res.arrayBuffer();
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType || "application/octet-stream",
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
