"use client";

import { useState } from "react";

interface Asset {
  symbol: string;
  name: string;
  price: string;
  change: number; // positive or negative
  volume: string;
  sparkline: number[]; // relative coordinates for SVG path
}

const trendingAssets: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", price: "94,152.80", change: 3.42, volume: "28.4B", sparkline: [10, 25, 15, 35, 30, 48, 42, 60] },
  { symbol: "ETH", name: "Ethereum", price: "2,684.55", change: 1.84, volume: "14.1B", sparkline: [20, 15, 30, 28, 45, 38, 55, 52] },
  { symbol: "SOL", name: "Solana", price: "182.40", change: 8.91, volume: "4.8B", sparkline: [10, 18, 14, 28, 32, 50, 45, 65] },
  { symbol: "BNB", name: "Binance Coin", price: "587.12", change: -0.45, volume: "1.2B", sparkline: [50, 45, 48, 42, 38, 40, 32, 30] },
  { symbol: "ADA", name: "Cardano", price: "0.584", change: -1.24, volume: "310M", sparkline: [40, 42, 35, 38, 30, 25, 28, 22] },
];

const topGainers: Asset[] = [
  { symbol: "SOL", name: "Solana", price: "182.40", change: 8.91, volume: "4.8B", sparkline: [10, 18, 14, 28, 32, 50, 45, 65] },
  { symbol: "AVAX", name: "Avalanche", price: "28.94", change: 7.23, volume: "840M", sparkline: [15, 20, 18, 25, 38, 34, 48, 55] },
  { symbol: "LINK", name: "Chainlink", price: "19.35", change: 5.67, volume: "510M", sparkline: [20, 18, 25, 22, 30, 38, 35, 42] },
  { symbol: "XRP", name: "Ripple", price: "1.14", change: 4.88, volume: "2.3B", sparkline: [10, 12, 11, 15, 14, 18, 16, 20] },
];

const newAssets: Asset[] = [
  { symbol: "SUI", name: "Sui Network", price: "3.12", change: 12.45, volume: "420M", sparkline: [5, 12, 18, 15, 28, 35, 32, 45] },
  { symbol: "APT", name: "Aptos", price: "8.65", change: -2.31, volume: "180M", sparkline: [40, 35, 38, 32, 30, 34, 28, 25] },
  { symbol: "TAO", name: "Bittensor", price: "512.40", change: 0.18, volume: "95M", sparkline: [30, 32, 28, 35, 34, 30, 31, 32] },
];

export default function MarketsPreview() {
  const [activeTab, setActiveTab] = useState<"trending" | "gainers" | "new">("trending");

  const getAssets = () => {
    switch (activeTab) {
      case "trending":
        return trendingAssets;
      case "gainers":
        return topGainers;
      case "new":
        return newAssets;
      default:
        return trendingAssets;
    }
  };

  const assets = getAssets();

  return (
    <section id="markets" className="bg-zinc-950 py-20 border-b border-zinc-900 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Track Digital Assets
            </h2>
            <p className="text-zinc-400 mt-2 max-w-md">
              Simulated reference pricing matching global indicators. Practice entry and exit strategies risk-free.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "trending"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Trending
            </button>
            <button
              onClick={() => setActiveTab("gainers")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "gainers"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Top Gainers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === "new"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              New Listed
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-850 bg-zinc-900/10 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 text-xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-950/40">
                <th className="py-4 px-6">Asset Name</th>
                <th className="py-4 px-6">Last Price</th>
                <th className="py-4 px-6">24h Change</th>
                <th className="py-4 px-6 hidden sm:table-cell">24h Volume</th>
                <th className="py-4 px-6 hidden md:table-cell text-center">Trend (24h)</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/60 text-sm">
              {assets.map((asset) => {
                const isPositive = asset.change >= 0;
                // Generate svg path from sparkline array coordinates
                const sparkPath = asset.sparkline
                  .map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${(idx * 14).toFixed(1)} ${(70 - val).toFixed(1)}`)
                  .join(" ");

                return (
                  <tr key={asset.symbol} className="hover:bg-zinc-900/20 transition-colors group">
                    {/* Ticker Name */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 font-bold text-zinc-300 border border-zinc-850 group-hover:border-zinc-800 transition-colors">
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            {asset.symbol}
                            <span className="text-[10px] text-zinc-500 font-normal">/USDT</span>
                          </div>
                          <div className="text-xs text-zinc-500">{asset.name}</div>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-5 px-6 font-mono font-bold text-zinc-100">
                      ${asset.price}
                    </td>

                    {/* Change */}
                    <td className="py-5 px-6">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                          isPositive
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {isPositive ? "▲" : "▼"} {Math.abs(asset.change).toFixed(2)}%
                      </span>
                    </td>

                    {/* Volume */}
                    <td className="py-5 px-6 hidden sm:table-cell font-mono text-zinc-400">
                      ${asset.volume}
                    </td>

                    {/* Sparkline (Visual only) */}
                    <td className="py-5 px-6 hidden md:table-cell text-center">
                      <div className="inline-block w-28 h-8">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                          <path
                            d={sparkPath}
                            fill="none"
                            stroke={isPositive ? "#10b981" : "#f43f5e"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </td>

                    {/* Action button */}
                    <td className="py-5 px-6 text-right">
                      <button className="rounded-lg bg-zinc-900 border border-zinc-800 hover:border-emerald-500 hover:text-emerald-400 text-zinc-300 px-4.5 py-1.5 text-xs font-semibold transition-all">
                        Trade Now
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Small simulated data disclaimer */}
        <p className="mt-4 text-center text-xs font-mono text-zinc-600 select-none">
          * Prices are simulated simulation feeds for practice and study. They do not represent exact live Binance trade actions.
        </p>
      </div>
    </section>
  );
}
