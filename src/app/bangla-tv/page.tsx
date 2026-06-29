"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X, Tv, Radio, Search, ChevronDown, Maximize, Minimize } from "lucide-react";

interface Channel {
  name: string;
  logo: string;
  group: string;
  url: string;
}

export default function BanglaTVPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch("/api/channels")
      .then((r) => r.json())
      .then((data) => {
        setChannels(data.channels || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const groups = ["All", ...Array.from(new Set(channels.map((c) => c.group)))];

  const filteredChannels = channels.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === "All" || c.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    if (selectedChannel && videoRef.current) {
      videoRef.current.src = selectedChannel.url;
      videoRef.current.play().catch(() => {});
    }
  }, [selectedChannel]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
            <Tv className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bangla TV Channels</h1>
            <p className="text-sm text-muted">Live Bangladeshi TV channels - IPTV streams</p>
          </div>
        </div>

        {selectedChannel && (
          <div ref={playerRef} className="mb-6 relative rounded-xl overflow-hidden glow-border bg-black aspect-video max-w-4xl mx-auto">
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              autoPlay
              playsInline
            />
            <button
              onClick={() => {
                setSelectedChannel(null);
                if (videoRef.current) videoRef.current.pause();
              }}
              className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors z-20"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="absolute top-3 right-14 w-9 h-9 rounded-lg bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors z-20"
            >
              {isFullscreen ? <Minimize className="w-4 h-4 text-white" /> : <Maximize className="w-4 h-4 text-white" />}
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-green-500/80 rounded-lg px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-xs text-white font-bold">LIVE</span>
                </div>
                <span className="text-sm text-white font-medium">{selectedChannel.name}</span>
                <span className="text-xs text-white/50">{selectedChannel.group}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-foreground focus:outline-none focus:border-primary transition-colors cursor-pointer"
            >
              {groups.map((g) => (
                <option key={g} value={g} className="bg-surface">{g}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm text-muted">Loading channels...</p>
          </div>
        ) : filteredChannels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Radio className="w-12 h-12 text-muted mb-4" />
            <p className="text-sm text-muted">No channels found</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted mb-4">{filteredChannels.length} channels available</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredChannels.map((channel, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedChannel(channel)}
                  className={`text-left rounded-xl overflow-hidden transition-all hover:scale-[1.02] ${
                    selectedChannel?.url === channel.url
                      ? "ring-2 ring-primary glow-border"
                      : "bg-white/5 border border-white/10 hover:border-primary/50"
                  }`}
                >
                  <div className="aspect-video bg-gradient-to-br from-surface to-background flex items-center justify-center relative">
                    {channel.logo ? (
                      <img
                        src={channel.logo}
                        alt={channel.name}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center ${channel.logo ? "opacity-0 hover:opacity-100" : ""} bg-black/40 transition-opacity`}>
                      <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-0.5" />
                      </div>
                    </div>
                    {selectedChannel?.url === channel.url && (
                      <div className="absolute top-2 right-2">
                        <div className="flex items-center gap-1 bg-green-500/80 rounded px-1.5 py-0.5">
                          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                          <span className="text-[9px] text-white font-bold">LIVE</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-medium text-foreground truncate">{channel.name}</p>
                    <p className="text-[10px] text-muted truncate">{channel.group}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
