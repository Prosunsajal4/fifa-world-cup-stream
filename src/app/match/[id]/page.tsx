"use client";

import { use } from "react";
import { Clock, MapPin, Users, BarChart3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import StreamPlayer from "@/components/StreamPlayer";

const matchData: Record<string, {
  homeTeam: string;
  homeCode: string;
  homeFlag: string;
  awayTeam: string;
  awayCode: string;
  awayFlag: string;
  homeScore: number;
  awayScore: number;
  status: string;
  time: string;
  venue: string;
  stage: string;
  group?: string;
  events: Array<{ type: string; team: string; player: string; minute: string }>;
  stats: {
    possession: [number, number];
    shots: [number, number];
    shotsOnTarget: [number, number];
    corners: [number, number];
    fouls: [number, number];
    yellowCards: [number, number];
  };
}> = {
  "1": {
    homeTeam: "Brazil",
    homeCode: "BRA",
    homeFlag: "🇧🇷",
    awayTeam: "Germany",
    awayCode: "GER",
    awayFlag: "🇩🇪",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    time: "67'",
    venue: "MetLife Stadium",
    stage: "Quarter Final",
    events: [
      { type: "goal", team: "home", player: "Vinicius Jr.", minute: "23'" },
      { type: "goal", team: "away", player: "K. Havertz", minute: "45'" },
      { type: "yellow", team: "home", player: "Casemiro", minute: "56'" },
      { type: "goal", team: "home", player: "Raphinha", minute: "62'" },
    ],
    stats: {
      possession: [54, 46],
      shots: [12, 8],
      shotsOnTarget: [5, 3],
      corners: [6, 4],
      fouls: [10, 12],
      yellowCards: [1, 2],
    },
  },
};

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const match = matchData[id] || matchData["1"];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/live"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Live
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StreamPlayer
              matchId={id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
            />

            <div className="glass rounded-xl p-6 glow-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {match.stage}
                </span>
                {match.status === "live" && (
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger"></span>
                    </span>
                    <span className="text-xs font-bold text-danger">{match.time}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <div className="text-5xl mb-3">{match.homeFlag}</div>
                  <h3 className="text-xl font-bold text-foreground">{match.homeTeam}</h3>
                  <p className="text-sm text-muted">{match.homeCode}</p>
                </div>

                <div className="flex flex-col items-center px-8">
                  <div className="text-5xl font-bold text-primary">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  {match.status === "live" && (
                    <div className="mt-2 text-xs text-danger bg-danger/10 px-3 py-1 rounded-full">
                      LIVE
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center">
                  <div className="text-5xl mb-3">{match.awayFlag}</div>
                  <h3 className="text-xl font-bold text-foreground">{match.awayTeam}</h3>
                  <p className="text-sm text-muted">{match.awayCode}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-2 text-sm text-muted">
                <MapPin className="w-4 h-4" />
                <span>{match.venue}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-xl p-4 glow-border">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Match Events
              </h2>
              <div className="space-y-3">
                {match.events.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg bg-surface"
                  >
                    <span className="text-xs font-bold text-primary w-10">
                      {event.minute}
                    </span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        event.type === "goal"
                          ? "bg-accent"
                          : event.type === "yellow"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {event.player}
                      </p>
                      <p className="text-xs text-muted capitalize">{event.type}</p>
                    </div>
                    <span className="text-lg">
                      {event.team === "home" ? match.homeFlag : match.awayFlag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-4 glow-border">
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Match Stats
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Possession", values: match.stats.possession, unit: "%" },
                  { label: "Shots", values: match.stats.shots, unit: "" },
                  { label: "Shots on Target", values: match.stats.shotsOnTarget, unit: "" },
                  { label: "Corners", values: match.stats.corners, unit: "" },
                  { label: "Fouls", values: match.stats.fouls, unit: "" },
                  { label: "Yellow Cards", values: match.stats.yellowCards, unit: "" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">
                        {stat.values[0]}{stat.unit}
                      </span>
                      <span className="text-xs text-muted">{stat.label}</span>
                      <span className="text-sm font-medium text-foreground">
                        {stat.values[1]}{stat.unit}
                      </span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-surface">
                      <div
                        className="bg-primary"
                        style={{
                          width: `${(stat.values[0] / (stat.values[0] + stat.values[1])) * 100}%`,
                        }}
                      />
                      <div
                        className="bg-secondary"
                        style={{
                          width: `${(stat.values[1] / (stat.values[0] + stat.values[1])) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
