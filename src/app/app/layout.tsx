"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Radar,
  Search,
  BarChart3,
  TrendingUp,
  Bell,
  Home,
  Star,
  Settings,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import ErrorBoundary from "@/components/ErrorBoundary";
import OnboardingTour from "@/components/OnboardingTour";
import { getFavoritesCount } from "@/components/FavoriteButton";

const navItems = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/analyze", label: "Analyzer", icon: Search },
  { href: "/app/compare", label: "Compare", icon: BarChart3 },
  { href: "/app/pricing", label: "Pricing", icon: TrendingUp },
  { href: "/app/alerts", label: "Alerts", icon: Bell },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    setFavCount(getFavoritesCount());
    const handler = () => setFavCount(getFavoritesCount());
    window.addEventListener("favorites-changed", handler);
    return () => window.removeEventListener("favorites-changed", handler);
  }, []);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-primary)" }}>
      <OnboardingTour />
      {/* Sidebar */}
      <aside className="w-64 flex flex-col fixed h-full z-20" style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border-color)" }}>
        <Link href="/" className="flex items-center gap-3 px-6 py-6" style={{ borderBottom: "1px solid var(--border-color)" }}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <Radar className="w-4.5 h-4.5" style={{ color: "var(--bg-primary)" }} />
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            PriceRadar<span className="text-cyan-400">.ai</span>
          </span>
        </Link>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "hover:bg-cyan-500/5"
                }`}
                style={!active ? { color: "var(--text-secondary)" } : undefined}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}

          {/* Favorites count */}
          {favCount > 0 && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              <Star className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
              <span>Favorites</span>
              <span className="ml-auto px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                {favCount}
              </span>
            </div>
          )}
        </nav>

        <div className="px-4 py-4 space-y-3" style={{ borderTop: "1px solid var(--border-color)" }}>
          <ThemeToggle />
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/10">
            <p className="text-xs text-cyan-400 font-medium mb-1">AI Powered</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Real-time competitor intelligence</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main role="main" className="flex-1 ml-64 min-h-screen">
        <div className="p-8">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
