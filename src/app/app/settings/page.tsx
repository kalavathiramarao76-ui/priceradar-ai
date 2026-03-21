"use client";

import { useState, useEffect } from "react";
import { Settings, Trash2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const models = [
  { id: "", label: "Default (auto)" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini (fast)" },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (budget)" },
];

const STORAGE_KEYS = {
  endpoint: "priceradar-api-endpoint",
  model: "priceradar-model",
};

export default function SettingsPage() {
  const [endpoint, setEndpoint] = useState("");
  const [model, setModel] = useState("");
  const [saved, setSaved] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setEndpoint(localStorage.getItem(STORAGE_KEYS.endpoint) || "");
      setModel(localStorage.getItem(STORAGE_KEYS.model) || "");
    } catch {}
  }, []);

  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEYS.endpoint, endpoint);
      localStorage.setItem(STORAGE_KEYS.model, model);
    } catch {}
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearData = () => {
    if (!confirm("Clear all PriceRadar AI local data? This includes favorites and settings. This cannot be undone.")) return;
    try {
      const keys = Object.keys(localStorage).filter((k) => k.startsWith("priceradar"));
      keys.forEach((k) => localStorage.removeItem(k));
    } catch {}
    setEndpoint("");
    setModel("");
    setCleared(true);
    setTimeout(() => {
      setCleared(false);
      window.location.reload();
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
          <Settings className="w-4 h-4 text-cyan-400" />
        </div>
        <h1 className="text-2xl font-black text-white">Settings</h1>
      </div>
      <p className="text-gray-500 mb-8 ml-11">Configure your PriceRadar AI workspace</p>

      <div className="space-y-6">
        {/* Theme */}
        <section className="rounded-2xl bg-bg-card border border-white/5 p-6">
          <h2 className="text-sm font-bold text-white mb-1">Appearance</h2>
          <p className="text-xs text-gray-500 mb-4">Switch between dark, light, and system themes.</p>
          <ThemeToggle />
        </section>

        {/* API Endpoint */}
        <section className="rounded-2xl bg-bg-card border border-white/5 p-6">
          <h2 className="text-sm font-bold text-white mb-1">API Endpoint</h2>
          <p className="text-xs text-gray-500 mb-4">Custom OpenAI-compatible endpoint URL. Leave blank for default.</p>
          <input
            type="url"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.openai.com/v1"
            className="w-full px-4 py-3 bg-bg-card border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors text-sm"
          />
        </section>

        {/* Model */}
        <section className="rounded-2xl bg-bg-card border border-white/5 p-6">
          <h2 className="text-sm font-bold text-white mb-1">AI Model</h2>
          <p className="text-xs text-gray-500 mb-4">Choose the model for pricing analysis.</p>
          <div className="space-y-2">
            {models.map((m) => (
              <label
                key={m.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  model === m.id
                    ? "border-cyan-500/40 bg-cyan-500/5"
                    : "border-white/10 bg-transparent hover:border-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    model === m.id ? "border-cyan-500 bg-cyan-500" : "border-white/20"
                  }`}
                >
                  {model === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-white">{m.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Save */}
        <button
          onClick={save}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-bg-primary font-bold text-sm transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        >
          {saved ? "Saved!" : "Save Settings"}
        </button>

        {/* Danger Zone */}
        <section className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6">
          <h2 className="text-sm font-bold text-red-400 mb-1">Danger Zone</h2>
          <p className="text-xs text-gray-500 mb-4">
            Clear all locally stored data including favorites, onboarding, and settings.
          </p>
          <button
            onClick={clearData}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {cleared ? "Cleared!" : "Clear All Data"}
          </button>
        </section>
      </div>
    </div>
  );
}
