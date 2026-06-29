import Link from "next/link";
import { Tv, ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Live Matches", href: "/live" },
    { label: "Schedule", href: "/schedule" },
    { label: "Teams", href: "/teams" },
    { label: "Standings", href: "/standings" },
  ],
  Resources: [
    { label: "News", href: "/news" },
    { label: "Login", href: "/auth/login" },
    { label: "Sign Up", href: "/auth/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative glass border-t border-border">
      <div className="neon-line w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Tv className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  FIFA LIVE
                </span>
                <span className="text-[10px] text-muted -mt-1 tracking-widest">
                  WORLD CUP 2026
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Your ultimate streaming destination for the FIFA World Cup 2026.
              Watch live matches, track scores, and stay updated with the world&apos;s
              biggest football tournament.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Developer
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Prosun Mukherjee
                </p>
                <p className="text-xs text-muted">MERN Stack Developer</p>
              </div>

              <div className="space-y-2">
                <a
                  href="mailto:prosunsajal123@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  prosunsajal123@gmail.com
                </a>
                <a
                  href="tel:+8801911572117"
                  className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +880 1911-572117
                </a>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <MapPin className="w-4 h-4" />
                  Khulna, Bangladesh
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://github.com/prosunsajal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/prosunsajal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:prosunsajal123@gmail.com"
                  className="w-9 h-9 rounded-lg bg-surface-light flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="neon-line w-full mt-8" />

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} FIFA LIVE. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with Next.js | Data from FIFA World Cup 2026 APIs
          </p>
        </div>
      </div>
    </footer>
  );
}
