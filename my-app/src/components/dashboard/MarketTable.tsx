"use client";
import React from 'react';
import Link from 'next/link';

interface MarketPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: number;
}

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-zinc-950 border border-zinc-900 rounded-xl ${className}`}>
    {children}
  </div>
);

interface MarketTableProps {
  markets: MarketPair[];
  searchQuery: string;
  favorites: Set<string>;
  toggleFavorite: (symbol: string) => void;
  sortKey: keyof MarketPair | '';
  sortOrder: 'asc' | 'desc';
  setSort: (key: keyof MarketPair) => void;
  loading: boolean;
  error: boolean;
}

export const MarketTable = ({ markets, searchQuery, favorites, toggleFavorite, sortKey, sortOrder, setSort, loading, error }: MarketTableProps) => {
  if (loading) return <div className="text-zinc-500 text-center py-10">Loading Binance data...</div>;

  const filteredMarkets = markets
    .filter(m => m.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
        if (!sortKey) return 0;
        const valA = a[sortKey] as number;
        const valB = b[sortKey] as number;
        return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  const Header = ({ label, sortKey: key }: { label: string, sortKey: keyof MarketPair }) => (
      <th className="px-6 py-3 text-right cursor-pointer hover:text-white" onClick={() => setSort(key)}>
          {label} {sortKey === key ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
      </th>
  );

  return (
    <Card className="overflow-hidden">
        {error && <div className="p-2 text-xs bg-rose-500/10 text-rose-500 text-center border-b border-rose-900">Error loading Binance data</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="text-xs uppercase bg-zinc-900/50 text-zinc-500">
            <tr>
              <th className="px-6 py-3">Favorite</th>
              <th className="px-6 py-3">Asset</th>
              <Header label="Price" sortKey="price" />
              <Header label="24h Change" sortKey="change24h" />
              <Header label="24h High" sortKey="high24h" />
              <Header label="24h Low" sortKey="low24h" />
              <Header label="Volume" sortKey="volume" />
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarkets.map((m) => (
              <tr key={m.symbol} className="border-t border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                <td className="px-6 py-4 cursor-pointer" onClick={() => toggleFavorite(m.symbol)}>
                    {favorites.has(m.symbol) ? '★' : '☆'}
                </td>
                <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                  {m.symbol.replace('USDT', '')} <span className="text-zinc-600 text-[10px]">{m.symbol}</span>
                </td>
                <td className="px-6 py-4 text-right">${m.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td className={`px-6 py-4 text-right ${m.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {m.change24h > 0 ? '+' : ''}{m.change24h.toFixed(2)}%
                </td>
                <td className="px-6 py-4 text-right">${m.high24h.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td className="px-6 py-4 text-right">${m.low24h.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td className="px-6 py-4 text-right">{m.volume.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                <td className="px-6 py-4 text-center">
                  <Link href={`/trade/${m.symbol}`} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-1.5 rounded-lg text-xs font-bold transition-all">Trade</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
