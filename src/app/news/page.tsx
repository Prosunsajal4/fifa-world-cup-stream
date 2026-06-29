"use client";

import { useState } from "react";
import { Clock, Newspaper, ChevronRight } from "lucide-react";

const newsArticles = [
  {
    id: "1",
    title: "World Cup 2026 Kicks Off with Mexico vs South Africa",
    excerpt: "Mexico defeated South Africa 2-0 in the opening match at Estadio Azteca in Mexico City, with goals from Hirving Lozano and Edson Alvarez.",
    category: "Match Report",
    time: "Today",
    image: "🇲🇽",
    featured: true,
  },
  {
    id: "2",
    title: "Germany Dominates Curacao 4-0 in Group E Opener",
    excerpt: "Jamal Musiala scored twice as Germany cruised past Curacao in their opening match at Lincoln Financial Field in Philadelphia.",
    category: "Match Report",
    time: "Today",
    image: "🇩🇪",
    featured: true,
  },
  {
    id: "3",
    title: "48 Teams Ready to Compete for Glory",
    excerpt: "The expanded format of the FIFA World Cup 2026 features 48 teams across 12 groups, with matches in 16 cities across USA, Canada and Mexico.",
    category: "News",
    time: "Yesterday",
    image: "⚽",
    featured: false,
  },
  {
    id: "4",
    title: "Record-Breaking Opening Ceremony",
    excerpt: "The opening ceremony at Estadio Azteca set new viewership records with over 1 billion viewers tuning in worldwide.",
    category: "News",
    time: "Yesterday",
    image: "🏟️",
    featured: false,
  },
  {
    id: "5",
    title: "Match Day 2 Preview: Brazil, Argentina, Spain in Action",
    excerpt: "Brazil face Morocco, Argentina take on Algeria, and Spain play Uruguay in today's fixtures.",
    category: "Preview",
    time: "Today",
    image: "🏆",
    featured: false,
  },
  {
    id: "6",
    title: "Venues Across Three Nations",
    excerpt: "16 stadiums across the United States, Canada and Mexico are hosting World Cup matches for the first time in history.",
    category: "Feature",
    time: "2 days ago",
    image: "🇺🇸",
    featured: false,
  },
  {
    id: "7",
    title: "New Format Explained: 48 Teams, 12 Groups",
    excerpt: "The 2026 World Cup features the largest ever format with 48 teams divided into 12 groups of 4 teams each.",
    category: "Guide",
    time: "3 days ago",
    image: "📊",
    featured: false,
  },
  {
    id: "8",
    title: "Star Players to Watch in World Cup 2026",
    excerpt: "From Lionel Messi's final World Cup to Mbappe's quest for a second title, here are the players to follow.",
    category: "Feature",
    time: "3 days ago",
    image: "⭐",
    featured: false,
  },
];

const categories = ["All", "Match Report", "Preview", "News", "Feature", "Guide"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredNews =
    selectedCategory === "All"
      ? newsArticles
      : newsArticles.filter((article) => article.category === selectedCategory);

  const featuredNews = filteredNews.filter((article) => article.featured);
  const regularNews = filteredNews.filter((article) => !article.featured);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-10 bg-gradient-to-b from-primary to-secondary rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">News</h1>
            <p className="text-sm text-muted">Latest from FIFA World Cup 2026</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "glass text-muted hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {featuredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredNews.map((article) => (
              <div
                key={article.id}
                className="glass rounded-xl overflow-hidden match-card-hover transition-all duration-300 cursor-pointer glow-border group"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">
                    {article.image}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[10px] text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.time}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted line-clamp-2">{article.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularNews.map((article) => (
            <div
              key={article.id}
              className="glass rounded-xl overflow-hidden match-card-hover transition-all duration-300 cursor-pointer group"
            >
              <div className="h-32 bg-gradient-to-br from-surface to-surface-light flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  {article.image}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-[10px] text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.time}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted line-clamp-2">{article.excerpt}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-lg text-muted">No articles found</p>
            <p className="text-sm text-muted mt-1">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}
