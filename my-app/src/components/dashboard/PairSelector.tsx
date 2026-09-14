"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface MarketPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export const PairSelector = ({ currentSymbol }: { currentSymbol: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markets, setMarkets] = useState<MarketPair[]>([]);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/markets')
      .then(res => res.json())
      .then(data => { if (!data.error) setMarkets(data); })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredMarkets = markets.filter(m => 
    m.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-2"
      >
        {currentSymbol.replace('USDT', '')} <span className="text-zinc-600 text-sm">/ USDT</span>
        <span className="text-zinc-500 text-sm">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 p-2">
            <input 
                type="text" 
                placeholder="Search pairs..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white mb-2"
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="max-h-64 overflow-y-auto">
                {filteredMarkets.map(m => (
                    <Link 
                        key={m.symbol} 
                        href={`/trade/${m.symbol}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex justify-between items-center p-2 rounded-lg hover:bg-zinc-900 ${currentSymbol === m.symbol ? "bg-zinc-900" : ""}`}
                    >
                        <span className="text-sm text-white">{m.symbol.replace('USDT', '')}</span>
                        <div className="text-right">
                            <div className="text-xs text-white">${m.price.toFixed(2)}</div>
                            <div className={`text-[10px] ${m.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {m.change24h > 0 ? '+' : ''}{m.change24h.toFixed(2)}%
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
