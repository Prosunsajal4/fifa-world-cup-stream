"use client";

import { useState } from "react";
import { Search, Users } from "lucide-react";

const teams = [
  { name: "Mexico", code: "MEX", flag: "🇲🇽", group: "A" },
  { name: "South Africa", code: "RSA", flag: "🇿🇦", group: "A" },
  { name: "Korea Republic", code: "KOR", flag: "🇰🇷", group: "A" },
  { name: "Czechia", code: "CZE", flag: "🇨🇿", group: "A" },
  { name: "Canada", code: "CAN", flag: "🇨🇦", group: "B" },
  { name: "Qatar", code: "QAT", flag: "🇶🇦", group: "B" },
  { name: "Bosnia & Herzegovina", code: "BIH", flag: "🇧🇦", group: "B" },
  { name: "Switzerland", code: "SUI", flag: "🇨🇭", group: "B" },
  { name: "Brazil", code: "BRA", flag: "🇧🇷", group: "C" },
  { name: "Haiti", code: "HAI", flag: "🇭🇹", group: "C" },
  { name: "Morocco", code: "MAR", flag: "🇲🇦", group: "C" },
  { name: "Scotland", code: "SCO", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },
  { name: "United States", code: "USA", flag: "🇺🇸", group: "D" },
  { name: "Paraguay", code: "PAR", flag: "🇵🇾", group: "D" },
  { name: "Australia", code: "AUS", flag: "🇦🇺", group: "D" },
  { name: "Turkiye", code: "TUR", flag: "🇹🇷", group: "D" },
  { name: "Germany", code: "GER", flag: "🇩🇪", group: "E" },
  { name: "Curacao", code: "CUW", flag: "🇨🇼", group: "E" },
  { name: "Cote d'Ivoire", code: "CIV", flag: "🇨🇮", group: "E" },
  { name: "Ecuador", code: "ECU", flag: "🇪🇨", group: "E" },
  { name: "Netherlands", code: "NED", flag: "🇳🇱", group: "F" },
  { name: "Japan", code: "JPN", flag: "🇯🇵", group: "F" },
  { name: "Sweden", code: "SWE", flag: "🇸🇪", group: "F" },
  { name: "Tunisia", code: "TUN", flag: "🇹🇳", group: "F" },
  { name: "Belgium", code: "BEL", flag: "🇧🇪", group: "G" },
  { name: "IR Iran", code: "IRN", flag: "🇮🇷", group: "G" },
  { name: "Egypt", code: "EGY", flag: "🇪🇬", group: "G" },
  { name: "New Zealand", code: "NZL", flag: "🇳🇿", group: "G" },
  { name: "Spain", code: "ESP", flag: "🇪🇸", group: "H" },
  { name: "Cabo Verde", code: "CPV", flag: "🇨🇻", group: "H" },
  { name: "Saudi Arabia", code: "KSA", flag: "🇸🇦", group: "H" },
  { name: "Uruguay", code: "URU", flag: "🇺🇾", group: "H" },
  { name: "France", code: "FRA", flag: "🇫🇷", group: "I" },
  { name: "Senegal", code: "SEN", flag: "🇸🇳", group: "I" },
  { name: "Iraq", code: "IRQ", flag: "🇮🇶", group: "I" },
  { name: "Norway", code: "NOR", flag: "🇳🇴", group: "I" },
  { name: "Argentina", code: "ARG", flag: "🇦🇷", group: "J" },
  { name: "Algeria", code: "ALG", flag: "🇩🇿", group: "J" },
  { name: "Austria", code: "AUT", flag: "🇦🇹", group: "J" },
  { name: "Jordan", code: "JOR", flag: "🇯🇴", group: "J" },
  { name: "Portugal", code: "POR", flag: "🇵🇹", group: "K" },
  { name: "Congo DR", code: "COD", flag: "🇨🇩", group: "K" },
  { name: "Uzbekistan", code: "UZB", flag: "🇺🇿", group: "K" },
  { name: "Colombia", code: "COL", flag: "🇨🇴", group: "K" },
  { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  { name: "Croatia", code: "CRO", flag: "🇭🇷", group: "L" },
  { name: "Ghana", code: "GHA", flag: "🇬🇭", group: "L" },
  { name: "Panama", code: "PAN", flag: "🇵🇦", group: "L" },
];

const groups = ["All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      searchQuery === "" ||
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = selectedGroup === "All" || team.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 bg-gradient-to-b from-secondary to-secondary/50 rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Teams</h1>
            <p className="text-sm text-muted">48 nations competing for glory</p>
          </div>
        </div>

        <div className="glass rounded-xl p-4 mb-6 glow-border-purple">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface border border-border text-foreground text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGroup === group
                      ? "bg-secondary text-white"
                      : "bg-surface text-muted hover:text-foreground"
                  }`}
                >
                  {group === "All" ? "All Groups" : `Group ${group}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredTeams.map((team, index) => (
            <div
              key={`${team.code}-${index}`}
              className="glass rounded-xl p-4 text-center match-card-hover transition-all duration-300 cursor-pointer glow-border-purple group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {team.flag}
              </div>
              <h3 className="font-bold text-foreground text-sm">{team.name}</h3>
              <p className="text-xs text-muted mt-1">{team.code}</p>
              <div className="mt-2">
                <span className="text-[10px] text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                  Group {team.group}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-lg text-muted">No teams found</p>
            <p className="text-sm text-muted mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
