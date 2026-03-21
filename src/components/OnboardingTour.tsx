"use client";

import { useState, useEffect } from "react";
import { Radar, Search, Bell } from "lucide-react";

const steps = [
  {
    title: "Welcome to PriceRadar",
    desc: "Your AI-powered competitive pricing platform. Track competitor prices, get smart recommendations, and never miss a market shift.",
    icon: Radar,
  },
  {
    title: "Analyze Prices",
    desc: "Paste a product URL or name along with competitors. Our AI delivers instant pricing position analysis with actionable insights.",
    icon: Search,
  },
  {
    title: "Set Price Alerts",
    desc: "Configure alerts for competitor price changes. Get notified when the market moves so you can react in real-time.",
    icon: Bell,
  },
];

export default function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("priceradar-onboarded");
    if (!seen) setVisible(true);
  }, []);

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setConfetti(true);
      setTimeout(() => {
        localStorage.setItem("priceradar-onboarded", "true");
        setVisible(false);
      }, 1500);
    }
  };

  const skip = () => {
    localStorage.setItem("priceradar-onboarded", "true");
    setVisible(false);
  };

  if (!visible) return null;

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={skip} />

      {/* Confetti */}
      {confetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[101]">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                backgroundColor: ["#06b6d4", "#14b8a6", "#22d3ee", "#fbbf24", "#818cf8", "#f43f5e"][i % 6],
                animation: `confetti-fall ${1.5 + Math.random() * 1.5}s ease-in forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Card */}
      <div
        className="relative z-[102] max-w-md w-full mx-4 rounded-2xl p-8 text-center"
        style={{
          background: "rgba(19, 19, 29, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--border-color)",
        }}
      >
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-cyan-400" : i < step ? "w-4 bg-cyan-400/40" : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}
        >
          <Icon className="w-8 h-8 text-cyan-400" />
        </div>

        <h2 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          {current.title}
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
          {current.desc}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={skip}
            className="text-xs font-mono transition-colors hover:text-white"
            style={{ color: "var(--text-muted)" }}
          >
            Skip tour
          </button>
          <button
            onClick={next}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            style={{ color: "var(--bg-primary)" }}
          >
            {step === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
