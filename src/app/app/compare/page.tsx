"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Loader2, TrendingDown, TrendingUp, Minus, Award } from "lucide-react";

const mockData = [
  { name: "Your Product", price: 299, rating: 4.5, shipping: "Free", stock: "In Stock", warranty: "2 yr" },
  { name: "Amazon Basics", price: 249, rating: 4.2, shipping: "$5.99", stock: "In Stock", warranty: "1 yr" },
  { name: "BestBuy Elite", price: 329, rating: 4.7, shipping: "Free", stock: "Limited", warranty: "3 yr" },
  { name: "Walmart Value", price: 219, rating: 3.9, shipping: "$8.99", stock: "In Stock", warranty: "1 yr" },
  { name: "Target Select", price: 279, rating: 4.3, shipping: "Free", stock: "In Stock", warranty: "2 yr" },
];

export default function ComparePage() {
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");


  const handleCompare = async () => {
    if (!productName.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are PriceRadar AI. Generate a detailed price comparison analysis for: "${productName}"

Create a comparison covering 5 competitors with:
1. **Price Comparison Summary** - Rank all competitors by price
2. **Value Score** - Rate each on price-to-value ratio (1-10)
3. **Feature Parity** - What features justify price differences
4. **Best Deal** - Which offers the best overall value
5. **Price Prediction** - Expected price trends for next 30 days
6. **Your Strategy** - How to position against each competitor

Be specific with prices, percentages, and actionable insights. Use markdown formatting.`,
        }),
      });

      const data = await res.json();
      setResult(data.response || data.error || "Comparison failed");
    } catch {
      setResult("Failed to connect to AI service.");
    } finally {
      setLoading(false);
    }
  };

  const lowestPrice = Math.min(...mockData.map((d) => d.price));

  return (
    <div className="max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-teal-400" />
          </div>
          <h1 className="text-2xl font-black text-white">Price Comparison</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-11">Side-by-side comparison with AI recommendations</p>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-bg-card border border-white/5 overflow-hidden mb-8"
      >
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Live Competitor Table</h2>
          <p className="text-xs text-gray-500 mt-0.5">Wireless Headphones Category</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Competitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">vs. You</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Shipping</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockData.map((row, i) => {
                const diff = ((row.price - mockData[0].price) / mockData[0].price) * 100;
                const isCheapest = row.price === lowestPrice;
                return (
                  <tr key={row.name} className={`hover:bg-white/[0.02] transition-colors ${i === 0 ? "bg-cyan-500/[0.03]" : ""}`}>
                    <td className="px-6 py-3 font-medium text-white flex items-center gap-2">
                      {row.name}
                      {isCheapest && <Award className="w-3.5 h-3.5 text-yellow-500" />}
                      {i === 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400">YOU</span>}
                    </td>
                    <td className="px-6 py-3 font-mono text-white">${row.price}</td>
                    <td className="px-6 py-3">
                      {i === 0 ? (
                        <span className="text-gray-600">--</span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                          diff < 0 ? "text-red-400" : diff > 0 ? "text-green-400" : "text-gray-400"
                        }`}>
                          {diff < 0 ? <TrendingDown className="w-3 h-3" /> : diff > 0 ? <TrendingUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {diff === 0 ? "Same" : `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-300">{row.rating}/5</td>
                    <td className="px-6 py-3 text-gray-300">{row.shipping}</td>
                    <td className="px-6 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        row.stock === "In Stock" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {row.stock}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-300">{row.warranty}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* AI Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2">Product to Compare</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. 'Sony WH-1000XM5' or 'Gaming Laptop under $1500'"
              className="flex-1 px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button
              onClick={handleCompare}
              disabled={loading || !productName.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-bg-primary font-bold text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all disabled:opacity-40"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BarChart3 className="w-4 h-4" />}
              Compare
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-2xl bg-bg-card border border-white/5 p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-teal-400 pulse-dot" />
              <span className="text-xs font-medium text-teal-400">AI Comparison Result</span>
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
