"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Radar,
  Search,
  BarChart3,
  TrendingUp,
  Bell,
  Home,
} from "lucide-react";

const navItems = [
  { href: "/app", label: "Dashboard", icon: Home },
  { href: "/app/analyze", label: "Analyzer", icon: Search },
  { href: "/app/compare", label: "Compare", icon: BarChart3 },
  { href: "/app/pricing", label: "Pricing", icon: TrendingUp },
  { href: "/app/alerts", label: "Alerts", icon: Bell },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r border-white/5 flex flex-col fixed h-full z-20">
        <Link href="/" className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <Radar className="w-4.5 h-4.5 text-bg-primary" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
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
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-white/5">
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/10">
            <p className="text-xs text-cyan-400 font-medium mb-1">AI Powered</p>
            <p className="text-xs text-gray-500">Real-time competitor intelligence</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
