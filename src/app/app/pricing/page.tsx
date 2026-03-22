"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Loader2, DollarSign, Percent, Target, Zap } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import ExportMenu from "@/components/ExportMenu";
import AnalysisSkeleton from "@/components/AnalysisSkeleton";
import { useToast } from "@/components/ToastProvider";

export default function PricingPage() {
  const [cost, setCost] = useState("");
  const [targetMargin, setTargetMargin] = useState("");
  const [marketAvg, setMarketAvg] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { addToast } = useToast();

  const handleSuggest = async () => {
    if (!cost.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are PriceRadar AI, a dynamic pricing strategist. Generate optimal pricing recommendations.

Input Data:
- Product Cost: $${cost}
- Target Margin: ${targetMargin || "30"}%
- Market Average Price: $${marketAvg || "not specified"}
- Product Category: ${category || "General"}

Provide:
1. **Optimal Price Point** - The ideal selling price with justification
2. **Price Tiers** - Good/Better/Best pricing strategy with 3 tiers
3. **Psychological Pricing** - Charm pricing, anchor pricing, bundle suggestions
4. **Margin Analysis** - Detailed breakdown at each tier (cost, margin %, profit per unit)
5. **Competitive Window** - The safe price range to stay competitive
6. **Dynamic Adjustments** - When to raise/lower price based on:
   - Demand signals (high traffic, low conversion = too expensive)
   - Inventory levels
   - Day of week / seasonality
   - Competitor movements
7. **Revenue Projection** - Expected monthly revenue at each tier (assume 1000 units/month baseline)

Be very specific with numbers. Use tables where helpful. Format with markdown.`,
        }),
      });

      const data = await res.json();
      setResult(data.response || data.error || "Pricing suggestion failed");
      addToast({ title: "Pricing strategy generated", variant: "success" });
    } catch {
      setResult("Failed to connect to AI service.");
      addToast({ title: "Strategy generation failed", variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Quick calculator
  const costNum = parseFloat(cost) || 0;
  const marginNum = parseFloat(targetMargin) || 30;
  const suggestedPrice = costNum > 0 ? costNum / (1 - marginNum / 100) : 0;

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Dynamic Pricing Suggester</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-11">Input cost and market data, get AI-optimized pricing</p>
      </motion.div>

      {/* Input Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
            <DollarSign className="w-3 h-3" /> Product Cost
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="e.g. 85.00"
            className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
            <Percent className="w-3 h-3" /> Target Margin (%)
          </label>
          <input
            type="number"
            value={targetMargin}
            onChange={(e) => setTargetMargin(e.target.value)}
            placeholder="e.g. 30"
            className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
            <Target className="w-3 h-3" /> Market Average Price
          </label>
          <input
            type="number"
            value={marketAvg}
            onChange={(e) => setMarketAvg(e.target.value)}
            placeholder="e.g. 149.99"
            className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-2">
            <Zap className="w-3 h-3" /> Product Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Electronics, Fashion, Home"
            className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </motion.div>

      {/* Quick Calc */}
      {costNum > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 mb-6 flex items-center justify-between"
        >
          <span className="text-sm text-gray-400">
            Quick calc: At {marginNum}% margin, minimum price =
          </span>
          <span className="text-lg font-black text-cyan-400 font-mono">
            ${suggestedPrice.toFixed(2)}
          </span>
        </motion.div>
      )}

      <button
        onClick={handleSuggest}
        disabled={loading || !cost.trim()}
        aria-label={loading ? "Calculating pricing strategy" : "Get AI pricing strategy"}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-bg-primary font-bold text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all disabled:opacity-40"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Calculating...
          </>
        ) : (
          <>
            <TrendingUp className="w-4 h-4" /> Get AI Pricing Strategy
          </>
        )}
      </button>

      <AnimatePresence>
        {loading && !result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8"
          >
            <AnalysisSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 rounded-2xl bg-bg-card border border-white/5 p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
              <span className="text-xs font-medium text-cyan-400">AI Pricing Strategy</span>
              <div className="ml-auto flex items-center gap-1">
                <FavoriteButton itemId="priceradar-pricing" itemLabel="Pricing Strategy" size="sm" />
                <ExportMenu content={result} title="Pricing Strategy" />
              </div>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
              {result}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
