"use client";

import { useState, useEffect } from "react";
import { Tv, Radio, Clock, Loader2 } from "lucide-react";
import StreamPlayer from "@/components/StreamPlayer";
import { Match, MatchDetail, getMatchDetail, getTeamFlag, formatDate } from "@/lib/api";

export default function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [matchDetail, setMatchDetail] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("https://api.sportsrc.org/?data=matches&category=football");
        const data = await res.json();
        if (data.success) {
          setMatches(data.data);
          if (data.data.length > 0) {
            setSelectedMatch(data.data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  useEffect(() => {
    if (selectedMatch) {
      getMatchDetail(selectedMatch.id).then(setMatchDetail);
    }
  }, [selectedMatch]);

  const now = Date.now();
  const liveMatches = matches.filter((m) => {
    const diff = m.date - now;
    return diff > -3600000 && diff < 7200000;
  });

  const upcomingMatches = matches
    .filter((m) => m.date > now)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted">Loading live matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 bg-gradient-to-b from-danger to-danger/50 rounded-full" />
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">Live Now</h1>
            {liveMatches.length > 0 && (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {selectedMatch && (
              <>
                <StreamPlayer
                  matchId={selectedMatch.id}
                  homeTeam={selectedMatch.teams.home.name}
                  awayTeam={selectedMatch.teams.away.name}
                  sources={matchDetail?.sources || []}
                />

                <div className="glass rounded-xl p-4 mt-4 glow-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{getTeamFlag(selectedMatch.teams.home.name)}</div>
                      <div>
                        <p className="font-bold text-foreground">{selectedMatch.teams.home.name}</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-sm font-bold text-primary">
                        {formatDate(selectedMatch.date)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-foreground">{selectedMatch.teams.away.name}</p>
                      </div>
                      <div className="text-3xl">{getTeamFlag(selectedMatch.teams.away.name)}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="glass rounded-xl p-4 glow-border">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Tv className="w-5 h-5 text-danger" />
                {liveMatches.length > 0 ? "Live Matches" : "All Matches"}
              </h2>
              <div className="space-y-3">
                {matches.slice(0, 10).map((match) => {
                  const isLive = match.date - now > -3600000 && match.date < now + 7200000;
                  return (
                    <button
                      key={match.id}
                      onClick={() => setSelectedMatch(match)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedMatch?.id === match.id
                          ? "bg-primary/10 border border-primary/30"
                          : "bg-surface hover:bg-surface-light"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getTeamFlag(match.teams.home.name)}</span>
                          <span className="text-sm font-medium">{match.teams.home.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {isLive && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-danger"></span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{match.teams.away.name}</span>
                          <span className="text-lg">{getTeamFlag(match.teams.away.name)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-muted" />
                        <span className="text-[10px] text-muted">{formatDate(match.date)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
