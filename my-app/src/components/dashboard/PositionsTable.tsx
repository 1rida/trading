"use client";

import { useState } from "react";

export default function PositionsTable() {
  const [activeTab, setActiveTab] = useState("open");

  const tabs = [
    { id: "open", label: "Open Orders (0)" },
    { id: "history", label: "Order History" },
    { id: "trades", label: "Trade History" },
    { id: "funds", label: "Funds" },
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full min-h-[300px]">
      <div className="flex border-b border-zinc-800 bg-zinc-950 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <svg className="h-8 w-8 text-zinc-700" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-bold text-zinc-400">No Active Positions</h4>
          <p className="text-xs text-zinc-600 mt-1 max-w-[240px]">
            Your simulated orders and historical fills will appear here once executed via the trade panel.
          </p>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center">
        <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
           <span>Account: Demo_User_01</span>
           <span className="text-emerald-500/50">Status: Verified Sandbox</span>
        </div>
        <button className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 underline underline-offset-4">
          Export Simulation Data
        </button>
      </div>
    </div>
  );
}
