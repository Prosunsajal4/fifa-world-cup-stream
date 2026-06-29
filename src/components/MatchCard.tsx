"use client";

import Link from "next/link";
import { Clock, MapPin, Play } from "lucide-react";

interface Match {
  id: string;
  homeTeam: string;
  homeCode: string;
  homeFlag: string;
  awayTeam: string;
  awayCode: string;
  awayFlag: string;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "live" | "finished";
  time?: string;
  venue?: string;
  stage?: string;
  group?: string;
}

export default function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";

  return (
    <Link href={`/match/${match.id}`}>
      <div className="glass rounded-xl p-4 match-card-hover transition-all duration-300 cursor-pointer group relative overflow-hidden">
        {isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger"></span>
            </span>
            <span className="text-[10px] font-bold text-danger uppercase tracking-wider">
              Live
            </span>
          </div>
        )}

        {match.stage && (
          <div className="text-[10px] text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>{match.stage}</span>
            {match.group && <span className="text-primary">Group {match.group}</span>}
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <div className="text-3xl mb-2">{match.homeFlag}</div>
            <p className="text-sm font-medium text-foreground truncate">
              {match.homeTeam}
            </p>
            <p className="text-xs text-muted">{match.homeCode}</p>
          </div>

          <div className="flex flex-col items-center gap-1 min-w-[80px]">
            {isFinished || isLive ? (
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span className={match.homeScore! > match.awayScore! ? "text-primary" : ""}>
                  {match.homeScore}
                </span>
                <span className="text-muted">-</span>
                <span className={match.awayScore! > match.homeScore! ? "text-primary" : ""}>
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm text-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>{match.time || "TBD"}</span>
              </div>
            )}

            {isLive && (
              <span className="text-[10px] font-medium text-danger bg-danger/10 px-2 py-0.5 rounded-full">
                {match.time || "LIVE"}
              </span>
            )}
          </div>

          <div className="flex-1 text-center">
            <div className="text-3xl mb-2">{match.awayFlag}</div>
            <p className="text-sm font-medium text-foreground truncate">
              {match.awayTeam}
            </p>
            <p className="text-xs text-muted">{match.awayCode}</p>
          </div>
        </div>

        {match.venue && (
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-center gap-1.5 text-xs text-muted">
            <MapPin className="w-3 h-3" />
            <span>{match.venue}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {!isFinished && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-primary fill-primary" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
