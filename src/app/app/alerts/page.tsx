"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellRing,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  X,
  Loader2,
} from "lucide-react";

interface Alert {
  id: number;
  product: string;
  competitor: string;
  type: "drop" | "increase" | "threshold";
  threshold: number;
  currentPrice: number;
  previousPrice: number;
  change: number;
  triggered: boolean;
  time: string;
}

const initialAlerts: Alert[] = [
  { id: 1, product: "MacBook Pro 14\"", competitor: "BestBuy", type: "drop", threshold: 5, currentPrice: 1849, previousPrice: 1949, change: -5.1, triggered: true, time: "2m ago" },
  { id: 2, product: "Sony WH-1000XM5", competitor: "Amazon", type: "drop", threshold: 10, currentPrice: 278, previousPrice: 348, change: -20.1, triggered: true, time: "14m ago" },
  { id: 3, product: "iPad Air M2", competitor: "Walmart", type: "increase", threshold: 3, currentPrice: 629, previousPrice: 599, change: 5.0, triggered: true, time: "1h ago" },
  { id: 4, product: "AirPods Pro 2", competitor: "Target", type: "threshold", threshold: 200, currentPrice: 199, previousPrice: 229, change: -13.1, triggered: true, time: "3h ago" },
  { id: 5, product: "Samsung S24 Ultra", competitor: "Amazon", type: "drop", threshold: 5, currentPrice: 1199, previousPrice: 1199, change: 0, triggered: false, time: "--" },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [newCompetitor, setNewCompetitor] = useState("");
  const [newThreshold, setNewThreshold] = useState("5");
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState("");

  const triggeredCount = alerts.filter((a) => a.triggered).length;

  const handleSimulate = async () => {
    setSimulating(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are PriceRadar AI alert system. Simulate competitor price changes and generate an alert report.

Active Alerts:
${alerts.map((a) => `- ${a.product} (${a.competitor}): threshold ${a.threshold}%, current $${a.currentPrice}`).join("\n")}

Generate a simulation report:
1. **Alert Summary** - ${triggeredCount} of ${alerts.length} alerts triggered
2. **Critical Alerts** - Which require immediate action
3. **Market Context** - Why these changes might be happening
4. **Recommended Actions** - For each triggered alert
5. **Forecast** - Expected price movements in next 48 hours

Be specific. Format with markdown.`,
        }),
      });

      const data = await res.json();
      setResult(data.response || data.error || "Simulation failed");
    } catch {
      setResult("Failed to connect to AI service.");
    } finally {
      setSimulating(false);
    }
  };

  const addAlert = () => {
    if (!newProduct.trim()) return;
    const newAlert: Alert = {
      id: Date.now(),
      product: newProduct,
      competitor: newCompetitor || "All Competitors",
      type: "drop",
      threshold: parseFloat(newThreshold) || 5,
      currentPrice: Math.floor(Math.random() * 500) + 100,
      previousPrice: Math.floor(Math.random() * 500) + 100,
      change: 0,
      triggered: false,
      time: "--",
    };
    setAlerts([newAlert, ...alerts]);
    setNewProduct("");
    setNewCompetitor("");
    setShowAdd(false);
  };

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-teal-400" />
              </div>
              <h1 className="text-2xl font-black text-white">Price Alert Simulator</h1>
            </div>
            <p className="text-gray-500 ml-11">Set thresholds and simulate competitor price changes</p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-bg-card border border-white/10 rounded-xl text-sm text-white hover:border-cyan-500/30 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Alert
          </button>
        </div>
      </motion.div>

      {/* Add Alert Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-6 rounded-2xl bg-bg-card border border-cyan-500/20 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  placeholder="Product name"
                  className="px-4 py-2.5 bg-bg-primary border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 text-sm"
                />
                <input
                  type="text"
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                  placeholder="Competitor"
                  className="px-4 py-2.5 bg-bg-primary border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newThreshold}
                    onChange={(e) => setNewThreshold(e.target.value)}
                    placeholder="Threshold %"
                    className="flex-1 px-4 py-2.5 bg-bg-primary border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 text-sm"
                  />
                  <button
                    onClick={addAlert}
                    className="px-4 py-2.5 bg-cyan-500 rounded-xl text-bg-primary font-bold text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-bg-card border border-white/5">
          <p className="text-xs text-gray-500 mb-1">Total Alerts</p>
          <p className="text-xl font-black text-white">{alerts.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-bg-card border border-white/5">
          <p className="text-xs text-gray-500 mb-1">Triggered</p>
          <p className="text-xl font-black text-red-400">{triggeredCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-bg-card border border-white/5">
          <p className="text-xs text-gray-500 mb-1">Monitoring</p>
          <p className="text-xl font-black text-green-400">{alerts.length - triggeredCount}</p>
        </div>
      </div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-bg-card border border-white/5 overflow-hidden mb-6"
      >
        <div className="divide-y divide-white/5">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors ${
                alert.triggered ? "border-l-2 border-l-red-500" : "border-l-2 border-l-transparent"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  alert.triggered ? "bg-red-500/10" : "bg-green-500/10"
                }`}>
                  {alert.triggered ? (
                    <BellRing className="w-4 h-4 text-red-400" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{alert.product}</p>
                  <p className="text-xs text-gray-500">{alert.competitor} | Threshold: {alert.threshold}%</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-mono text-white">${alert.currentPrice}</p>
                  {alert.change !== 0 && (
                    <p className={`text-xs flex items-center gap-1 justify-end ${
                      alert.change < 0 ? "text-green-400" : "text-red-400"
                    }`}>
                      {alert.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                      {Math.abs(alert.change)}%
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-600 w-16 text-right">{alert.time}</span>
                <button
                  onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))}
                  className="text-gray-600 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <button
        onClick={handleSimulate}
        disabled={simulating}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-bg-primary font-bold text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all disabled:opacity-40"
      >
        {simulating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Simulating...
          </>
        ) : (
          <>
            <AlertTriangle className="w-4 h-4" /> Run Alert Simulation
          </>
        )}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-2xl bg-bg-card border border-white/5 p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-red-400 pulse-dot" />
              <span className="text-xs font-medium text-red-400">Alert Simulation Report</span>
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
