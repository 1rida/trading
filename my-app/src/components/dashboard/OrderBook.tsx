"use client";
import { useEffect, useState, useMemo } from 'react';

interface Order { price: number, amount: number }

export default function OrderBook({ symbol }: { symbol: string }) {
  const [data, setData] = useState<{asks: Order[], bids: Order[]}>({asks: [], bids: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDepth = () => {
        fetch(`/api/depth?symbol=${symbol}`)
          .then(res => {
              if(!res.ok) throw new Error();
              return res.json();
          })
          .then(data => {
              setData(data);
              setError(false);
              setLoading(false);
          })
          .catch(() => {
              setError(true);
              setLoading(false);
          });
    };
    fetchDepth();
    const interval = setInterval(fetchDepth, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  const maxTotal = useMemo(() => {
      const allOrders = [...data.asks, ...data.bids];
      return Math.max(...allOrders.map(o => o.price * o.amount), 1);
  }, [data]);

  if (loading) return <div className="p-4 text-center text-sm text-zinc-500">Loading Order Book...</div>;
  if (error) return <div className="p-4 text-center text-sm text-rose-500">Error loading data.</div>;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-64 sm:h-96">
      <div className="p-3 border-b border-zinc-800 bg-zinc-950 font-bold text-xs text-zinc-400">Order Book</div>
      <div className="flex-1 flex flex-col font-mono text-[11px] p-2 overflow-y-auto">
        {data.asks.slice().reverse().map((ask, i) => {
            const width = ((ask.price * ask.amount) / maxTotal) * 100;
            return (
                <div key={i} className="grid grid-cols-3 text-rose-400 relative py-0.5">
                    <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10" style={{ width: `${width}%` }} />
                    <span className="z-10">{ask.price.toFixed(2)}</span>
                    <span className="text-right text-zinc-300 z-10">{ask.amount.toFixed(4)}</span>
                    <span className="text-right text-zinc-600 z-10">{(ask.price * ask.amount).toFixed(2)}</span>
                </div>
            )
        })}
        <div className="py-2 text-center text-lg font-bold text-zinc-300 border-y border-zinc-800 my-2">--</div>
        {data.bids.map((bid, i) => {
            const width = ((bid.price * bid.amount) / maxTotal) * 100;
            return (
                <div key={i} className="grid grid-cols-3 text-emerald-400 relative py-0.5">
                    <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10" style={{ width: `${width}%` }} />
                    <span className="z-10">{bid.price.toFixed(2)}</span>
                    <span className="text-right text-zinc-300 z-10">{bid.amount.toFixed(4)}</span>
                    <span className="text-right text-zinc-600 z-10">{(bid.price * bid.amount).toFixed(2)}</span>
                </div>
            )
        })}
      </div>
    </div>
  );
}
