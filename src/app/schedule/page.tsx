"use client";

import { useState, useEffect } from "react";
import { Calendar, Filter, Search, Loader2 } from "lucide-react";
import MatchCard from "@/components/MatchCard";
import { Match, getTeamFlag, formatDate } from "@/lib/api";

export default function SchedulePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

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
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  const now = Date.now();

  const filteredMatches = matches.filter((match) => {
    const isLive = match.date - now > -3600000 && match.date < now + 7200000;
    const isUpcoming = match.date > now;
    const isFinished = match.date < now - 3600000;

    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Live" && isLive) ||
      (selectedStatus === "Upcoming" && isUpcoming) ||
      (selectedStatus === "Finished" && isFinished);

    const matchesSearch =
      searchQuery === "" ||
      match.teams.home.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.teams.away.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted">Loading matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-secondary rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Match Schedule</h1>
            <p className="text-sm text-muted">FIFA World Cup 2026 - All matches</p>
          </div>
        </div>

        <div className="glass rounded-xl p-4 mb-6 glow-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex gap-2">
              {["All", "Live", "Upcoming", "Finished"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? "bg-primary text-white"
                      : "bg-surface text-muted hover:text-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMatches.map((match) => {
            const isLive = match.date - now > -3600000 && match.date < now + 7200000;
            const isUpcoming = match.date > now;

            return (
              <MatchCard
                key={match.id}
                match={{
                  id: match.id,
                  homeTeam: match.teams.home.name,
                  homeCode: match.teams.home.name.substring(0, 3).toUpperCase(),
                  homeFlag: getTeamFlag(match.teams.home.name),
                  awayTeam: match.teams.away.name,
                  awayCode: match.teams.away.name.substring(0, 3).toUpperCase(),
                  awayFlag: getTeamFlag(match.teams.away.name),
                  status: isLive ? "live" : isUpcoming ? "scheduled" : "finished",
                  time: formatDate(match.date),
                  venue: "FIFA World Cup 2026",
                  stage: "Group Stage",
                }}
              />
            );
          })}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-lg text-muted">No matches found</p>
            <p className="text-sm text-muted mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
