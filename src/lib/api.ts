const API_BASE_URL = "https://api.sportsrc.org";

export interface Match {
  id: string;
  title: string;
  category: string;
  date: number;
  popular: boolean;
  poster: string;
  teams: {
    home: { name: string; badge: string };
    away: { name: string; badge: string };
  };
}

export interface MatchDetail extends Match {
  sources: Array<{
    id: string;
    streamNo: number;
    language: string;
    hd: boolean;
    embedUrl: string;
    source: string;
    viewers: number;
  }>;
}

export async function getFootballMatches(): Promise<Match[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/?data=matches&category=football`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export async function getMatchDetail(id: string): Promise<MatchDetail | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/?data=detail&category=football&id=${id}`, {
      next: { revalidate: 30 },
    });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatMatchTime(timestamp: number): string {
  const now = Date.now();
  const diff = timestamp - now;

  if (diff <= 0) return "Live / Started";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `in ${days}d ${hours}h`;
  if (hours > 0) return `in ${hours}h ${minutes}m`;
  return `in ${minutes}m`;
}

export function getTeamFlag(teamName: string): string {
  const flags: Record<string, string> = {
    "Brazil": "🇧🇷", "Japan": "🇯🇵", "Germany": "🇩🇪", "Paraguay": "🇵🇾",
    "Netherlands": "🇳🇱", "Morocco": "🇲🇦", "Ivory Coast": "🇨🇮", "Cote d'Ivoire": "🇨🇮",
    "Norway": "🇳🇴", "France": "🇫🇷", "Sweden": "🇸🇪", "Mexico": "🇲🇽",
    "Ecuador": "🇪🇨", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Congo DR": "🇨🇩", "Belgium": "🇧🇪",
    "Senegal": "🇸🇳", "United States": "🇺🇸", "Bosnia-Herzegovina": "🇧🇦",
    "Argentina": "🇦🇷", "Spain": "🇪🇸", "Portugal": "🇵🇹", "Italy": "🇮🇹",
    "Croatia": "🇭🇷", "Uruguay": "🇺🇾", "Colombia": "🇨🇴", "Switzerland": "🇨🇭",
    "South Korea": "🇰🇷", "Australia": "🇦🇺", "Iran": "🇮🇷", "Saudi Arabia": "🇸🇦",
    "Tunisia": "🇹🇳", "Cameroon": "🇨🇲", "Ghana": "🇬🇭", "Nigeria": "🇳🇬",
    "South Africa": "🇿🇦", "Algeria": "🇩🇿", "Egypt": "🇪🇬", "Qatar": "🇶🇦",
    "Iraq": "🇮🇶", "Jordan": "🇯🇴", "New Zealand": "🇳🇿", "Panama": "🇵🇦",
    "Czech Republic": "🇨🇿", "Czechia": "🇨🇿", "Poland": "🇵🇱", "Austria": "🇦🇹",
    "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿", "Ireland": "🇮🇪", "Iceland": "🇮🇸",
    "Finland": "🇫🇮", "Denmark": "🇩🇰", "Serbia": "🇷🇸", "Ukraine": "🇺🇦",
    "Turkey": "🇹🇷", "Turkiye": "🇹🇷", "Greece": "🇬🇷", "Romania": "🇷🇴",
    "Hungary": "🇭🇺", "Slovakia": "🇸🇰", "Slovenia": "🇸🇮", "Albania": "🇦🇱",
    "North Macedonia": "🇲🇰", "Bulgaria": "🇧🇬", "Moldova": "🇲🇩", "Belarus": "🇧🇾",
    "Kazakhstan": "🇰🇿", "Uzbekistan": "🇺🇿", "China": "🇨🇳", "India": "🇮🇳",
    "Thailand": "🇹🇭", "Vietnam": "🇻🇳", "Indonesia": "🇮🇩", "Malaysia": "🇲🇾",
    "Philippines": "🇵🇭", "Singapore": "🇸🇬", "Lebanon": "🇱🇧", "Palestine": "🇵🇸",
    "Syria": "🇸🇾", "Bahrain": "🇧🇭", "Kuwait": "🇰🇼", "Oman": "🇴🇲",
    "United Arab Emirates": "🇦🇪", "Yemen": "🇾🇪", "Afghanistan": "🇦🇫", "Pakistan": "🇵🇰",
    "Bangladesh": "🇧🇩", "Sri Lanka": "🇱🇰", "Nepal": "🇳🇵", "Bhutan": "🇧🇹",
    "Maldives": "🇲🇻", "Hong Kong": "🇭🇰", "Chinese Taipei": "🇨🇳", "Mongolia": "🇲🇳",
    "North Korea": "🇰🇵", "Guam": "🇬🇺", "American Samoa": "🇦🇸", "Cook Islands": "🇨🇰",
    "Tahiti": "🇵🇫", "Fiji": "🇫🇯", "Papua New Guinea": "🇵🇬", "Solomon Islands": "🇸🇧",
    "Vanuatu": "🇻🇺", "Samoa": "🇼🇸", "Tonga": "🇹🇴", "Curacao": "🇨🇼",
    "Haiti": "🇭🇹", "Jamaica": "🇯🇲", "Trinidad and Tobago": "🇹🇹", "Suriname": "🇸🇷",
    "Guyana": "🇬🇾", "Bermuda": "🇧🇲", "Cuba": "🇨🇺", "Dominican Republic": "🇩🇴",
    "El Salvador": "🇸🇻", "Guatemala": "🇬🇹", "Honduras": "🇭🇳", "Nicaragua": "🇳🇮",
    "Costa Rica": "🇨🇷", "Canada": "🇨🇦", "Bolivia": "🇧🇴", "Peru": "🇵🇪",
    "Chile": "🇨🇱", "Venezuela": "🇻🇪", "Cabo Verde": "🇨🇻",
    "Togo": "🇹🇬", "Benin": "🇧🇯", "Burkina Faso": "🇧🇫", "Mali": "🇲🇱",
    "Niger": "🇳🇪", "Chad": "🇹🇩", "Central African Republic": "🇨🇫", "Congo": "🇨🇬",
    "Gabon": "🇬🇦", "Equatorial Guinea": "🇬🇶", "Sao Tome and Principe": "🇸🇹",
    "Libya": "🇱🇾", "Sudan": "🇸🇩", "South Sudan": "🇸🇸", "Ethiopia": "🇪🇹",
    "Somalia": "🇸🇴", "Djibouti": "🇩🇯", "Eritrea": "🇪🇷", "Uganda": "🇺🇬",
    "Kenya": "🇰🇪", "Tanzania": "🇹🇿", "Rwanda": "🇷🇼", "Burundi": "🇧🇮",
    "DR Congo": "🇨🇩", "Zambia": "🇿🇲", "Zimbabwe": "🇿🇼", "Mozambique": "🇲🇿",
    "Malawi": "🇲🇼", "Madagascar": "🇲🇬", "Mauritius": "🇲🇺", "Comoros": "🇰🇲",
    "Seychelles": "🇸🇨", "Eswatini": "🇸🇿", "Lesotho": "🇱🇸", "Namibia": "🇳🇦",
    "Botswana": "🇧🇼", "Angola": "🇦🇴", "Liberia": "🇱🇷", "Sierra Leone": "🇸🇱",
    "Guinea": "🇬🇳", "Guinea-Bissau": "🇬🇼", "Gambia": "🇬🇲",
  };
  return flags[teamName] || "⚽";
}
