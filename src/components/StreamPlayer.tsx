"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Maximize, Minimize, Tv, Globe, Monitor } from "lucide-react";

interface StreamSource {
  id: string;
  streamNo: number;
  language: string;
  hd: boolean;
  embedUrl: string;
  source: string;
  viewers: number;
}

interface StreamPlayerProps {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  sources?: StreamSource[];
}

export default function StreamPlayer({ matchId, homeTeam, awayTeam, sources = [] }: StreamPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
  const [showAllSources, setShowAllSources] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attemptCount, setAttemptCount] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const englishSources = sources.filter((s) => !s.language.includes("Arabic") && !s.language.includes("beIN") && !s.language.includes("Portuguese")).reverse();
  const otherSources = sources.filter((s) => s.language.includes("Arabic") || s.language.includes("beIN") || s.language.includes("Portuguese")).reverse();
  const sortedSources = [...englishSources, ...otherSources];

  const currentSource = sortedSources[currentSourceIndex] || null;

  const tryNextSource = useCallback(() => {
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
    }

    const nextIndex = currentSourceIndex + 1;
    if (nextIndex < sortedSources.length) {
      setCurrentSourceIndex(nextIndex);
      setAttemptCount((c) => c + 1);
      setLoading(true);

      loadTimerRef.current = setTimeout(() => {
        tryNextSource();
      }, 3000);
    } else {
      setLoading(false);
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
      }
    }
  }, [currentSourceIndex, sortedSources.length]);

  useEffect(() => {
    if (!currentSource) return;

    setLoading(true);

    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
    }

    loadTimerRef.current = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
      }
    };
  }, [currentSourceIndex, currentSource]);

  useEffect(() => {
    return () => {
      if (loadTimerRef.current) {
        clearTimeout(loadTimerRef.current);
      }
    };
  }, []);

  const handleIframeLoad = () => {
    setLoading(false);
    if (loadTimerRef.current) {
      clearTimeout(loadTimerRef.current);
    }
  };

  const handleIframeError = () => {
    tryNextSource();
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const getEmbedUrl = () => {
    if (!currentSource) return "";
    let url = currentSource.embedUrl;
    url += url.includes("?") ? "&autoplay=1" : "?autoplay=1";
    return url;
  };

  return (
    <div ref={playerRef} className="relative rounded-xl overflow-hidden glow-border bg-black aspect-video">
      {getEmbedUrl() ? (
        <iframe
          ref={iframeRef}
          key={`${currentSourceIndex}-${attemptCount}`}
          src={getEmbedUrl()}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; encrypted-media-key-system-config; encrypted-media-key-system-config"
          allowFullScreen
          title={`${homeTeam} vs ${awayTeam}`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-surface to-background">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow mb-4">
            <Tv className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mt-2">{homeTeam} vs {awayTeam}</h3>
          <p className="text-sm text-muted mt-1">No sources available</p>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10 pointer-events-none">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-white/70">
            Trying source {currentSourceIndex + 1} of {sortedSources.length}...
          </p>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-danger/80 rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-xs text-white font-bold">LIVE</span>
            </div>
            <span className="text-[10px] text-white/50 hidden sm:block">
              Source {currentSourceIndex + 1}: {currentSource?.language}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllSources(!showAllSources)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/20 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{sortedSources.length} Sources</span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isFullscreen ? <Minimize className="w-4 h-4 text-white" /> : <Maximize className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {showAllSources && (
        <div className="absolute inset-x-0 top-0 bottom-16 bg-black/95 overflow-y-auto z-30">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                All Sources ({sortedSources.length})
              </h3>
              <button onClick={() => setShowAllSources(false)} className="text-xs text-white/60 hover:text-white px-3 py-1 rounded bg-white/10">
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sortedSources.map((source, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSourceIndex(index);
                    setAttemptCount(0);
                    setLoading(true);
                    setShowAllSources(false);
                  }}
                  className={`text-left p-3 rounded-lg transition-all ${
                    currentSourceIndex === index
                      ? "bg-primary text-white ring-2 ring-primary"
                      : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📺</span>
                      <div>
                        <p className="text-xs font-medium">{source.language}</p>
                        <p className="text-[10px] text-white/40">{source.source}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {source.hd && <span className="text-[9px] font-bold bg-primary/30 text-primary px-1.5 py-0.5 rounded">HD</span>}
                      {index === currentSourceIndex && <span className="text-[9px] bg-accent/30 text-accent px-1.5 py-0.5 rounded">PLAYING</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!showAllSources && (
        <div className="absolute top-3 left-3 right-3 z-20">
          <div className="flex items-center gap-1.5 flex-wrap">
            {sortedSources.slice(0, 6).map((source, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSourceIndex(index);
                  setAttemptCount(0);
                  setLoading(true);
                }}
                className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                  currentSourceIndex === index
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-black/60 text-white/70 hover:bg-black/80 hover:text-white"
                }`}
              >
                {source.language.length > 15 ? source.language.substring(0, 15) + "..." : source.language}
                {source.hd && <span className="text-primary ml-0.5">★</span>}
              </button>
            ))}
            {sortedSources.length > 6 && (
              <button
                onClick={() => setShowAllSources(true)}
                className="px-2 py-1 rounded text-[10px] bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              >
                +{sortedSources.length - 6} more
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
