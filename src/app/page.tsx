import Link from "next/link";
import { Zap, Tv, Trophy, Users, Calendar, ChevronRight, Star, TrendingUp } from "lucide-react";
import { getFootballMatches, formatDate, getTeamFlag } from "@/lib/api";
import MatchCard from "@/components/MatchCard";
import LiveScoreTicker from "@/components/LiveScoreTicker";

export default async function Home() {
  const matches = await getFootballMatches();

  const now = Date.now();
  const liveMatches = matches.filter((m) => {
    const diff = m.date - now;
    return diff > -3600000 && diff < 7200000;
  });

  const upcomingMatches = matches
    .filter((m) => m.date > now)
    .slice(0, 6);

  const recentMatches = matches
    .filter((m) => m.date < now)
    .slice(0, 4);

  const featuredMatches = [...liveMatches.slice(0, 2), ...upcomingMatches.slice(0, 4)];

  return (
    <div className="min-h-screen">
      <LiveScoreTicker />

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium tracking-wider uppercase">
              FIFA World Cup 2026 - Live Now
            </span>
            <Star className="w-5 h-5 text-primary animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              LIVE STREAMING
            </span>
            <br />
            <span className="text-foreground">HUB</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
            Watch every match of the FIFA World Cup 2026 live. 48 teams, 104 matches,
            across USA, Canada & Mexico. June 11 - July 19, 2026.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/live"
              className="btn-neon flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-danger to-danger/80 text-white shadow-lg shadow-danger/30 hover:shadow-xl hover:shadow-danger/40 transition-all"
            >
              <Tv className="w-5 h-5" />
              {liveMatches.length > 0 ? `${liveMatches.length} Live Now` : "Watch Live"}
            </Link>
            <Link
              href="/schedule"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold glass glow-border text-primary hover:bg-primary/10 transition-all"
            >
              <Calendar className="w-5 h-5" />
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4 text-center glow-border">
              <Tv className={`w-6 h-6 ${liveMatches.length > 0 ? "text-danger" : "text-muted"} mx-auto mb-2`} />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{liveMatches.length}</p>
              <p className="text-xs text-muted mt-1">Live Matches</p>
            </div>
            <div className="glass rounded-xl p-4 text-center glow-border">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{matches.length}</p>
              <p className="text-xs text-muted mt-1">Total Matches</p>
            </div>
            <div className="glass rounded-xl p-4 text-center glow-border">
              <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">48</p>
              <p className="text-xs text-muted mt-1">Teams</p>
            </div>
            <div className="glass rounded-xl p-4 text-center glow-border">
              <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted mt-1">Groups</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/live" className="glass rounded-xl p-5 hover:scale-105 transition-all duration-300 group bg-gradient-to-br from-danger/20 to-danger/5">
              <Tv className="w-8 h-8 text-foreground mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">Live Now</h3>
              <p className="text-xs text-muted mt-1">Watch live matches</p>
            </Link>
            <Link href="/schedule" className="glass rounded-xl p-5 hover:scale-105 transition-all duration-300 group bg-gradient-to-br from-primary/20 to-primary/5">
              <Calendar className="w-8 h-8 text-foreground mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">Schedule</h3>
              <p className="text-xs text-muted mt-1">View all fixtures</p>
            </Link>
            <Link href="/teams" className="glass rounded-xl p-5 hover:scale-105 transition-all duration-300 group bg-gradient-to-br from-secondary/20 to-secondary/5">
              <Users className="w-8 h-8 text-foreground mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">Teams</h3>
              <p className="text-xs text-muted mt-1">48 nations</p>
            </Link>
            <Link href="/standings" className="glass rounded-xl p-5 hover:scale-105 transition-all duration-300 group bg-gradient-to-br from-accent/20 to-accent/5">
              <Trophy className="w-8 h-8 text-foreground mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">Standings</h3>
              <p className="text-xs text-muted mt-1">Group tables</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
              <h2 className="text-2xl font-bold text-foreground">
                {liveMatches.length > 0 ? "Live Matches" : "Upcoming Matches"}
              </h2>
            </div>
            <Link
              href="/schedule"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary-glow transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {featuredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredMatches.map((match) => (
                <MatchCard key={match.id} match={{
                  id: match.id,
                  homeTeam: match.teams.home.name,
                  homeCode: match.teams.home.name.substring(0, 3).toUpperCase(),
                  homeFlag: getTeamFlag(match.teams.home.name),
                  awayTeam: match.teams.away.name,
                  awayCode: match.teams.away.name.substring(0, 3).toUpperCase(),
                  awayFlag: getTeamFlag(match.teams.away.name),
                  status: (match.date - now > -3600000 && match.date < now + 7200000) ? "live" : "scheduled",
                  time: formatDate(match.date),
                  venue: "FIFA World Cup 2026",
                  stage: "Group Stage",
                }} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass rounded-xl">
              <Tv className="w-12 h-12 text-muted mx-auto mb-4" />
              <p className="text-lg text-muted">No matches scheduled at the moment</p>
              <p className="text-sm text-muted mt-1">Check back later for updates</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-8 glow-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Don&apos;t Miss a Single Goal
                </h2>
                <p className="text-muted mb-6">
                  Create an account to get personalized match reminders, favorite team tracking,
                  and exclusive content from the FIFA World Cup 2026.
                </p>
                <Link
                  href="/auth/register"
                  className="btn-neon inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                >
                  <Zap className="w-5 h-5" />
                  Get Started Free
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl mb-2">⚽</div>
                  <p className="text-sm text-muted">104 Matches</p>
                </div>
                <div className="w-px h-16 bg-border" />
                <div className="text-center">
                  <div className="text-5xl mb-2">🏟️</div>
                  <p className="text-sm text-muted">16 Venues</p>
                </div>
                <div className="w-px h-16 bg-border" />
                <div className="text-center">
                  <div className="text-5xl mb-2">🏆</div>
                  <p className="text-sm text-muted">1 Champion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
