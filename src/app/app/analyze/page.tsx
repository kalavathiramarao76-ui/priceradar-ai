"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Radar, ArrowRight } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import ExportMenu from "@/components/ExportMenu";
import AnalysisSkeleton from "@/components/AnalysisSkeleton";
import { useToast } from "@/components/ToastProvider";

export default function AnalyzePage() {
  const [productUrl, setProductUrl] = useState("");
  const [competitorUrls, setCompetitorUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const { addToast } = useToast();

  const handleAnalyze = async () => {
    if (!productUrl.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are PriceRadar AI, an expert competitive pricing analyst. Analyze the pricing position for this product and its competitors.

Product/URL: ${productUrl}
Competitor URLs/Products: ${competitorUrls || "General market competitors"}

Provide a comprehensive pricing analysis with:
1. **Price Position Assessment** - Where this product stands vs competitors
2. **Competitive Landscape** - Key competitor pricing breakdown (use realistic mock data if URLs aren't real)
3. **Price Elasticity Insight** - How sensitive is demand at this price point
4. **Opportunities** - Where there's room to adjust pricing
5. **Risk Factors** - Threats from competitor pricing strategies
6. **Recommendation** - Clear actionable pricing recommendation with confidence score

Format with markdown. Be specific with numbers, percentages, and price points. Use a data-driven, analytical tone.`,
        }),
      });

      if (res.status === 429) {
        const errorData = await res.json();
        if (errorData.error === "FREE_LIMIT_REACHED") {
          window.dispatchEvent(new CustomEvent("usage-changed", { detail: errorData.count }));
          return;
        }
      }
      const data = await res.json();
      setResult(data.response || data.error || "Analysis failed");
      addToast({ title: "Price analysis complete", variant: "success" });
    } catch {
      setResult("Failed to connect to AI service. Please try again.");
      addToast({ title: "Analysis failed", variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Radar className="w-4 h-4 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Price Analyzer</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-11">
          Paste a product URL or name + competitor URLs for AI pricing analysis
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4 mb-8"
      >
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2">
            Your Product (URL or name)
          </label>
          <input
            type="text"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            placeholder="e.g. https://yourstore.com/product or 'Sony WH-1000XM5 Headphones'"
            aria-label="Product URL or name"
            className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2">
            Competitor URLs (one per line, optional)
          </label>
          <textarea
            value={competitorUrls}
            onChange={(e) => setCompetitorUrls(e.target.value)}
            placeholder={"https://competitor1.com/similar-product\nhttps://competitor2.com/similar-product"}
            rows={3}
            aria-label="Competitor URLs"
            className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !productUrl.trim()}
          aria-label={loading ? "Analyzing pricing" : "Analyze pricing"}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-bg-primary font-bold text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Analyze Pricing
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </motion.div>

      <AnimatePresence>
        {loading && !result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
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
            className="rounded-2xl bg-bg-card border border-white/5 p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
              <span className="text-xs font-medium text-cyan-400">AI Analysis Result</span>
              <div className="ml-auto flex items-center gap-1">
                <FavoriteButton itemId="priceradar-analysis" itemLabel="Price Analysis" size="sm" />
                <ExportMenu content={result} title="Price Analysis" />
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
