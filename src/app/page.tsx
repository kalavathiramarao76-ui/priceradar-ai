"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

/* ─── Letter Reveal ─── */
function LetterReveal({ text, className = "", delay = 0 }: {
  text: string; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transitionDelay: visible ? `${delay + i * 32}ms` : "0ms",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ─── Price Ticker Counter (stock-ticker style: numbers flicker up/down) ─── */
function PriceTicker({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  const prefix = value.match(/^[<>]*/)?.[0] || "";

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(num)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay(prefix + "0");
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        const start = performance.now();
        const dur = 1000;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          // Add jitter for stock-ticker feel
          const jitter = t < 0.85 ? (Math.random() - 0.5) * num * 0.08 : 0;
          const current = eased * num + jitter;
          const formatted = num >= 1000000
            ? (Math.max(0, current) / 1000000).toFixed(0) + "M"
            : num % 1 !== 0
            ? Math.max(0, current).toFixed(1)
            : Math.round(Math.max(0, current)).toString();
          setDisplay(prefix + formatted);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num, value, prefix]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

/* ─── Chart Draw Animation ─── */
function ChartDraw({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 200 60" className={className} fill="none">
      <polyline
        points="0,50 30,42 60,45 90,28 120,32 150,15 180,20 200,8"
        stroke="url(#chartGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: visible ? 0 : 300,
          transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Fade-in Observer ─── */
function useFadeIn() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      refs.current.forEach(el => { if (el) { el.style.opacity = "1"; el.style.transform = "none"; } });
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    refs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !refs.current.includes(el)) refs.current.push(el);
  };
  return addRef;
}

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
  const addRef = useFadeIn();

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
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-10">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Price Intelligence
          </div>

          <h1 className="text-8xl font-black tracking-tight text-white leading-none mb-8">
            <LetterReveal text="Know every" />
            <br />
            <span className="gradient-text"><LetterReveal text="price move." delay={340} /></span>
          </h1>

          {/* Chart draw animation under hero */}
          <div className="max-w-md mx-auto mb-8 opacity-60">
            <ChartDraw className="w-full h-auto" />
          </div>

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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-24">
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-1">
              <PriceTicker value="10M" suffix="+" />
            </div>
            <div className="text-sm text-gray-500">Prices Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-1">
              <PriceTicker value="<2" suffix="s" />
            </div>
            <div className="text-sm text-gray-500">AI Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-white mb-1">
              <PriceTicker value="99.9" suffix="%" />
            </div>
            <div className="text-sm text-gray-500">Accuracy Rate</div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">
              <LetterReveal text="Everything you need to" />
              <span className="gradient-text"><LetterReveal text=" dominate pricing" delay={700} /></span>
            </h2>
            <p className="text-gray-400 text-lg">
              Six powerful AI modules, one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                ref={addRef}
                className="p-8 rounded-2xl bg-bg-card border border-white/5 card-hover transition-all duration-700"
                style={{
                  opacity: 0,
                  transform: "translateY(24px)",
                  transitionDelay: `${i * 80}ms`,
                  willChange: "transform, opacity",
                }}
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
              </div>
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
