"use client";

import { useState, useEffect } from "react";
import { Match, getTeamFlag } from "@/lib/api";

export default function LiveScoreTicker() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("https://api.sportsrc.org/?data=matches&category=football");
        const data = await res.json();
        if (data.success) {
          setMatches(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      }
    }
    fetchMatches();
    const interval = setInterval(fetchMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  const now = Date.now();
  const displayMatches = [...matches, ...matches, ...matches];

  return (
    <div className="w-full overflow-hidden bg-surface/80 border-y border-border py-2">
      <div className="flex animate-ticker whitespace-nowrap">
        {displayMatches.map((match, index) => {
          const isLive = match.date - now > -3600000 && match.date < now + 7200000;
          const timeStr = new Date(match.date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={`${match.id}-${index}`}
              className="flex items-center gap-3 mx-6 cursor-pointer hover:text-primary transition-colors"
            >
              {isLive ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-danger"></span>
                </span>
              ) : (
                <span className="text-[10px] font-bold text-muted bg-muted/10 px-1.5 py-0.5 rounded">
                  {timeStr}
                </span>
              )}
              <span className="text-lg">{getTeamFlag(match.teams.home.name)}</span>
              <span className="text-sm font-medium">{match.teams.home.name}</span>
              <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                vs
              </span>
              <span className="text-sm font-medium">{match.teams.away.name}</span>
              <span className="text-lg">{getTeamFlag(match.teams.away.name)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
