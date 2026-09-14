"use client";

import React from 'react';

export const MarketSearch = ({ onSearch }: { onSearch: (val: string) => void }) => (
  <div className="relative mb-6">
    <input
      type="text"
      placeholder="Search markets (BTC, ETH...)"
      onChange={(e) => onSearch(e.target.value)}
      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
    />
  </div>
);
