"use client";

import { useState } from "react";
import { Trophy, ArrowUpDown } from "lucide-react";

const groupData: Record<string, Array<{ pos: number; team: string; flag: string; played: number; won: number; drawn: number; lost: number; gf: number; ga: number; gd: number; pts: number }>> = {
  A: [
    { pos: 1, team: "Mexico", flag: "🇲🇽", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 0, gd: 2, pts: 3 },
    { pos: 2, team: "Czechia", flag: "🇨🇿", played: 1, won: 1, drawn: 0, lost: 0, gf: 1, ga: 0, gd: 1, pts: 3 },
    { pos: 3, team: "South Africa", flag: "🇿🇦", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 2, gd: -2, pts: 0 },
    { pos: 4, team: "Korea Republic", flag: "🇰🇷", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 1, gd: -1, pts: 0 },
  ],
  B: [
    { pos: 1, team: "Switzerland", flag: "🇨🇭", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 0, gd: 2, pts: 3 },
    { pos: 2, team: "Canada", flag: "🇨🇦", played: 1, won: 1, drawn: 0, lost: 0, gf: 1, ga: 0, gd: 1, pts: 3 },
    { pos: 3, team: "Qatar", flag: "🇶🇦", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 1, gd: -1, pts: 0 },
    { pos: 4, team: "Bosnia & Herzegovina", flag: "🇧🇦", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 2, gd: -2, pts: 0 },
  ],
  C: [
    { pos: 1, team: "Brazil", flag: "🇧🇷", played: 1, won: 1, drawn: 0, lost: 0, gf: 3, ga: 0, gd: 3, pts: 3 },
    { pos: 2, team: "Morocco", flag: "🇲🇦", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, gd: 1, pts: 3 },
    { pos: 3, team: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, gd: -1, pts: 0 },
    { pos: 4, team: "Haiti", flag: "🇭🇹", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 3, gd: -3, pts: 0 },
  ],
  D: [
    { pos: 1, team: "United States", flag: "🇺🇸", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, pts: 1 },
    { pos: 2, team: "Turkiye", flag: "🇹🇷", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, pts: 1 },
    { pos: 3, team: "Australia", flag: "🇦🇺", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: "Paraguay", flag: "🇵🇾", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  E: [
    { pos: 1, team: "Germany", flag: "🇩🇪", played: 1, won: 1, drawn: 0, lost: 0, gf: 4, ga: 0, gd: 4, pts: 3 },
    { pos: 2, team: "Ecuador", flag: "🇪🇨", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 1, gd: 1, pts: 3 },
    { pos: 3, team: "Cote d'Ivoire", flag: "🇨🇮", played: 1, won: 0, drawn: 0, lost: 1, gf: 1, ga: 2, gd: -1, pts: 0 },
    { pos: 4, team: "Curacao", flag: "🇨🇼", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 4, gd: -4, pts: 0 },
  ],
  F: [
    { pos: 1, team: "Netherlands", flag: "🇳🇱", played: 1, won: 1, drawn: 0, lost: 0, gf: 2, ga: 0, gd: 2, pts: 3 },
    { pos: 2, team: "Japan", flag: "🇯🇵", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, pts: 1 },
    { pos: 3, team: "Sweden", flag: "🇸🇪", played: 1, won: 0, drawn: 1, lost: 0, gf: 1, ga: 1, gd: 0, pts: 1 },
    { pos: 4, team: "Tunisia", flag: "🇹🇳", played: 1, won: 0, drawn: 0, lost: 1, gf: 0, ga: 2, gd: -2, pts: 0 },
  ],
  G: [
    { pos: 1, team: "Belgium", flag: "🇧🇪", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 2, team: "IR Iran", flag: "🇮🇷", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 3, team: "New Zealand", flag: "🇳🇿", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: "Egypt", flag: "🇪🇬", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  H: [
    { pos: 1, team: "Spain", flag: "🇪🇸", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 2, team: "Uruguay", flag: "🇺🇾", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 3, team: "Saudi Arabia", flag: "🇸🇦", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: "Cabo Verde", flag: "🇨🇻", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  I: [
    { pos: 1, team: "France", flag: "🇫🇷", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 2, team: "Senegal", flag: "🇸🇳", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 3, team: "Iraq", flag: "🇮🇶", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: "Norway", flag: "🇳🇴", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  J: [
    { pos: 1, team: "Argentina", flag: "🇦🇷", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 2, team: "Algeria", flag: "🇩🇿", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 3, team: "Austria", flag: "🇦🇹", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: "Jordan", flag: "🇯🇴", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  K: [
    { pos: 1, team: "Portugal", flag: "🇵🇹", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 2, team: "Colombia", flag: "🇨🇴", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 3, team: "Uzbekistan", flag: "🇺🇿", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: "Congo DR", flag: "🇨🇩", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
  L: [
    { pos: 1, team: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 2, team: "Croatia", flag: "🇭🇷", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 3, team: "Ghana", flag: "🇬🇭", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { pos: 4, team: "Panama", flag: "🇵🇦", played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
  ],
};

const allGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export default function StandingsPage() {
  const [selectedGroup, setSelectedGroup] = useState("A");

  const standings = groupData[selectedGroup] || groupData.A;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Standings</h1>
            <p className="text-sm text-muted">FIFA World Cup 2026 - 12 Groups</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {allGroups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedGroup === group
                  ? "bg-accent text-white"
                  : "glass text-muted hover:text-foreground"
              }`}
            >
              Group {group}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl overflow-hidden glow-border">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Group {selectedGroup}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">Team</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">P</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">W</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">D</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">L</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">GF</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">GA</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">GD</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase tracking-wider">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {standings.map((row) => (
                  <tr key={row.pos} className="hover:bg-surface-light transition-colors">
                    <td className="px-4 py-4">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${row.pos <= 2 ? "bg-accent text-white" : "bg-surface text-muted"}`}>
                        {row.pos}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{row.flag}</span>
                        <span className="font-medium text-foreground">{row.team}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-sm text-muted">{row.played}</td>
                    <td className="px-4 py-4 text-center text-sm text-foreground font-medium">{row.won}</td>
                    <td className="px-4 py-4 text-center text-sm text-muted">{row.drawn}</td>
                    <td className="px-4 py-4 text-center text-sm text-muted">{row.lost}</td>
                    <td className="px-4 py-4 text-center text-sm text-foreground">{row.gf}</td>
                    <td className="px-4 py-4 text-center text-sm text-foreground">{row.ga}</td>
                    <td className="px-4 py-4 text-center text-sm">
                      <span className={row.gd > 0 ? "text-accent" : row.gd < 0 ? "text-danger" : "text-muted"}>
                        {row.gd > 0 ? `+${row.gd}` : row.gd}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-lg font-bold text-primary">{row.pts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 glass rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-muted" />
            Tiebreakers
          </h3>
          <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
            <li>Goal difference in all group matches</li>
            <li>Goals scored in all group matches</li>
            <li>Points in head-to-head matches</li>
            <li>Goal difference in head-to-head matches</li>
            <li>Fair play points</li>
            <li>Drawing of lots</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
