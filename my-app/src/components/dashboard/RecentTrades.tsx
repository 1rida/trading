"use client";
import { useEffect, useState } from 'react';

interface Trade { id: number, price: number, amount: number, time: number, isBuyerMaker: boolean }

export default function RecentTrades({ symbol }: { symbol: string }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTrades = () => {
        fetch(`/api/trades?symbol=${symbol}`)
          .then(res => {
              if(!res.ok) throw new Error();
              return res.json();
          })
          .then(data => {
              setTrades(data.sort((a: Trade, b: Trade) => b.time - a.time).slice(0, 20));
              setError(false);
              setLoading(false);
          })
          .catch(() => {
              setError(true);
              setLoading(false);
          });
    };
    fetchTrades();
    const interval = setInterval(fetchTrades, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  if (loading) return <div className="p-4 text-center text-sm text-zinc-500">Loading Trades...</div>;
  if (error) return <div className="p-4 text-center text-sm text-rose-500">Error loading data.</div>;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="p-3 border-b border-zinc-800 bg-zinc-950 font-bold text-xs text-zinc-400">Recent Trades</div>
      <div className="flex-1 flex flex-col font-mono text-[11px] p-2 overflow-y-auto">
        {trades.map((trade) => (
            <div key={trade.id} className="grid grid-cols-3 py-0.5">
                <span className={trade.isBuyerMaker ? "text-rose-400" : "text-emerald-400"}>{trade.price.toFixed(2)}</span>
                <span className="text-right text-zinc-300">{trade.amount.toFixed(4)}</span>
                <span className="text-right text-zinc-600">{new Date(trade.time).toLocaleTimeString()}</span>
            </div>
        ))}
      </div>
    </div>
  );
}
