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

const modules = [
  { href: "/app/analyze", icon: Search, title: "Price Analyzer", desc: "Analyze pricing position", color: "cyan" },
  { href: "/app/compare", icon: BarChart3, title: "Price Comparison", desc: "Side-by-side comparison", color: "teal" },
  { href: "/app/pricing", icon: TrendingUp, title: "Dynamic Pricing", desc: "AI pricing suggestions", color: "cyan" },
  { href: "/app/alerts", icon: Bell, title: "Price Alerts", desc: "Monitor price changes", color: "teal" },
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
    <div className="max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-gray-500 mb-8">Your pricing intelligence overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Products Tracked", value: "247", change: "+12" },
          { label: "Competitor Changes", value: "38", change: "+5 today" },
          { label: "Avg. Position", value: "#3", change: "of 12" },
          { label: "Price Alerts", value: "7", change: "active" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-bg-card border border-white/5"
          >
            <p className="text-xs text-gray-500 mb-2">{s.label}</p>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-cyan-400 mt-1">{s.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Modules */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
          >
            <Link
              href={mod.href}
              className="block p-6 rounded-2xl bg-bg-card border border-white/5 card-hover group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <mod.icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{mod.title}</h3>
              <p className="text-xs text-gray-500">{mod.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Changes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-bg-card border border-white/5 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Recent Competitor Changes</h2>
          <span className="text-xs text-gray-500">Last 24h</span>
        </div>
        <div className="divide-y divide-white/5">
          {recentChanges.map((item) => (
            <div key={item.product + item.competitor} className="px-6 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.product}</p>
                <p className="text-xs text-gray-500">{item.competitor}</p>
              </div>
              <div className="text-right flex items-center gap-4">
                <span className="text-sm font-mono text-white">{item.price}</span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.change < 0
                    ? "bg-green-500/10 text-green-400"
                    : item.change > 0
                    ? "bg-red-500/10 text-red-400"
                    : "bg-gray-500/10 text-gray-400"
                }`}>
                  {item.change < 0 ? <TrendingDown className="w-3 h-3" /> : item.change > 0 ? <ArrowUpRight className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  {item.change === 0 ? "No change" : `${Math.abs(item.change)}%`}
                </span>
                <span className="text-xs text-gray-600 w-14 text-right">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
