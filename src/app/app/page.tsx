"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  BarChart3,
  TrendingUp,
  Bell,
  ArrowUpRight,
  TrendingDown,
  Minus,
} from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

const tools = [
  { href: "/app/analyze", icon: Search, title: "Price Analyzer", tag: "analyze()", desc: "Deep-dive into pricing position across competitors and channels." },
  { href: "/app/compare", icon: BarChart3, title: "Price Comparison", tag: "compare()", desc: "Side-by-side competitor pricing with variance and trend analysis." },
  { href: "/app/pricing", icon: TrendingUp, title: "Dynamic Pricing", tag: "optimize()", desc: "AI-powered pricing suggestions based on market data and demand." },
  { href: "/app/alerts", icon: Bell, title: "Price Alerts", tag: "monitor()", desc: "Real-time notifications when competitor prices shift." },
];

const recentChanges = [
  { product: "MacBook Pro 14\"", competitor: "BestBuy", change: -5.2, price: "$1,849", time: "2h ago" },
  { product: "Sony WH-1000XM5", competitor: "Amazon", change: -12.0, price: "$278", time: "4h ago" },
  { product: "iPad Air M2", competitor: "Walmart", change: 3.1, price: "$629", time: "6h ago" },
  { product: "Samsung S24 Ultra", competitor: "Target", change: 0, price: "$1,199", time: "8h ago" },
  { product: "AirPods Pro 2", competitor: "Costco", change: -8.5, price: "$199", time: "12h ago" },
];

export default function AppDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Price Studio
          </h1>
          <span className="px-3 py-1 text-[10px] font-semibold font-mono tracking-[0.2em] uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
            Workspace
          </span>
        </div>
        <p className="text-gray-500 text-base max-w-md leading-relaxed">
          Your pricing intelligence command center.
        </p>
      </motion.div>

      {/* Stats — massive numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {[
          { label: "Products Tracked", value: "247", sub: "+12 this week" },
          { label: "Price Changes", value: "38", sub: "last 24 hours" },
          { label: "Avg Position", value: "#3", sub: "of 12 competitors" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="p-6 rounded-2xl border border-white/5 bg-[var(--bg-card,#13131d)]"
          >
            <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">
              {stat.label}
            </p>
            <p className="text-5xl font-mono font-bold text-white tracking-tight leading-none mb-2">
              {stat.value}
            </p>
            <p className="text-xs text-cyan-400/70">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Tool rows */}
      <div className="space-y-3 mb-16">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.25 + i * 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Link href={tool.href}>
              <div className="group flex items-center gap-6 px-6 py-5 rounded-2xl border border-white/5 bg-[var(--bg-card,#13131d)] hover:border-cyan-500/20 transition-all duration-300 cursor-pointer card-hover">
                {/* Row number */}
                <span className="text-[11px] font-mono text-gray-600 tabular-nums w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-cyan-500/8 border border-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/20 transition-all duration-300">
                  <tool.icon className="w-[18px] h-[18px] text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[15px] font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-500/60 bg-cyan-500/6 px-2 py-0.5 rounded-md border border-cyan-500/10">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed truncate">
                    {tool.desc}
                  </p>
                </div>

                {/* Favorite */}
                <FavoriteButton itemId={`tool-${tool.tag}`} itemLabel={tool.title} size="sm" />

                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Changes */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="rounded-2xl border border-white/5 bg-[var(--bg-card,#13131d)] overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Recent Competitor Changes</h2>
          <span className="text-[11px] font-mono text-gray-600">Last 24h</span>
        </div>
        <div className="divide-y divide-white/5">
          {recentChanges.map((item) => (
            <div key={item.product + item.competitor} className="px-6 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <FavoriteButton itemId={`product-${item.product}`} itemLabel={item.product} size="sm" />
              <div className="flex-1 ml-2">
                <p className="text-sm font-medium text-white">{item.product}</p>
                <p className="text-xs text-gray-600">{item.competitor}</p>
              </div>
              <div className="text-right flex items-center gap-4">
                <span className="text-sm font-mono text-white">{item.price}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-mono font-medium px-2 py-0.5 rounded-full ${
                  item.change < 0
                    ? "bg-emerald-500/10 text-emerald-400"
                    : item.change > 0
                    ? "bg-red-500/10 text-red-400"
                    : "bg-gray-500/10 text-gray-500"
                }`}>
                  {item.change < 0 ? <TrendingDown className="w-3 h-3" /> : item.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  {item.change === 0 ? "No change" : `${Math.abs(item.change)}%`}
                </span>
                <span className="text-[11px] font-mono text-gray-700 w-14 text-right">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
