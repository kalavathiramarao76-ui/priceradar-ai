"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Radar,
  TrendingUp,
  Bell,
  BarChart3,
  ArrowRight,
  Zap,
  Shield,
  Eye,
} from "lucide-react";

const features = [
  {
    icon: Radar,
    title: "Price Analyzer",
    desc: "AI analyzes your pricing position against competitors in real-time",
  },
  {
    icon: BarChart3,
    title: "Smart Comparison",
    desc: "Side-by-side tables with actionable pricing recommendations",
  },
  {
    icon: TrendingUp,
    title: "Dynamic Pricing",
    desc: "Optimal price suggestions based on cost, margin, and market data",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    desc: "Instant alerts when competitors change their pricing strategy",
  },
  {
    icon: Eye,
    title: "Market Reports",
    desc: "AI-generated pricing intelligence for your product category",
  },
  {
    icon: Shield,
    title: "Competitor Matrix",
    desc: "Visual positioning map showing where you stand in the market",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary grid-pattern relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <Radar className="w-5 h-5 text-bg-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            PriceRadar<span className="text-cyan-400">.ai</span>
          </span>
        </div>
        <Link
          href="/app"
          className="px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-all"
        >
          Launch App
        </Link>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-10">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Price Intelligence
          </div>

          <h1 className="text-8xl font-black tracking-tight text-white leading-none mb-8">
            Know every
            <br />
            <span className="gradient-text">price move.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Track competitor prices, get AI-powered pricing recommendations,
            and never miss a market shift. Built for e-commerce teams that
            compete to win.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl text-bg-primary font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all"
            >
              Start Tracking
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/app/analyze"
              className="inline-flex items-center gap-2 px-8 py-4 bg-bg-tertiary border border-white/10 rounded-2xl text-white font-medium text-lg hover:border-cyan-500/30 transition-all"
            >
              Try Analyzer
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-24"
        >
          {[
            { value: "10M+", label: "Prices Tracked" },
            { value: "< 2s", label: "AI Response Time" },
            { value: "99.9%", label: "Accuracy Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Everything you need to
              <span className="gradient-text"> dominate pricing</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Six powerful AI modules, one unified platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="p-8 rounded-2xl bg-bg-card border border-white/5 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-5">
                  <feat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Radar className="w-4 h-4 text-cyan-500" />
            PriceRadar AI
          </div>
          <div className="text-gray-600 text-sm">
            Powered by AI. Built for e-commerce.
          </div>
        </div>
      </footer>
    </div>
  );
}
