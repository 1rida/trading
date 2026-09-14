"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from "@/components/Footer";
import { MarketTable } from "@/components/dashboard/MarketTable";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

interface MarketPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: number;
}

export default function MarketsPage() {
  const [markets, setMarkets] = useState<MarketPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<keyof MarketPair | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  useEffect(() => {
    setFavorites(new Set(JSON.parse(localStorage.getItem('favorites') || '[]')));
    fetch('/api/markets')
      .then(res => res.json())
      .then(data => {
        setMarkets(data);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const toggleFavorite = (symbol: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(symbol)) newFavorites.delete(symbol);
    else newFavorites.add(symbol);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
  };

  const setSort = (key: keyof MarketPair) => {
      if (sortKey === key) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      else { setSortKey(key); setSortOrder('desc'); }
  };

  const displayedMarkets = filter === 'favorites' ? markets.filter(m => favorites.has(m.symbol)) : markets;

  return (
    <main className="min-h-screen bg-zinc-950">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mb-8">Markets</motion.h1>
        
        <motion.div variants={itemVariants} className="flex gap-4 mb-6">
            <button onClick={() => setFilter('all')} className={`text-sm ${filter === 'all' ? 'text-white' : 'text-zinc-500'}`}>All</button>
            <button onClick={() => setFilter('favorites')} className={`text-sm ${filter === 'favorites' ? 'text-white' : 'text-zinc-500'}`}>Favorites</button>
            <input type="text" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1 text-sm text-white" />
        </motion.div>

        <motion.div variants={itemVariants}>
            <MarketTable 
                markets={displayedMarkets} 
                searchQuery={searchQuery} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite}
                sortKey={sortKey}
                sortOrder={sortOrder}
                setSort={setSort}
                loading={loading}
                error={error}
            />
        </motion.div>
      </motion.div>
      <Footer />
    </main>
  );
}
