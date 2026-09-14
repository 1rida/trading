import React from 'react';

const positions = [
    { pair: "BTC/USDT", size: 0.1245, entry: 64200.50, pnl: 125.40 },
    { pair: "ETH/USDT", size: 2.5000, entry: 3450.20, pnl: -45.10 },
];

export const PositionsTable = () => (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden mt-4">
        <div className="px-4 py-3 border-b border-zinc-800 font-bold text-xs uppercase">Positions</div>
        <table className="w-full text-left text-xs">
            <thead className="text-zinc-500">
                <tr>
                    <th className="px-4 py-2">Pair</th>
                    <th className="px-4 py-2">Size</th>
                    <th className="px-4 py-2">Entry</th>
                    <th className="px-4 py-2 text-right">PnL</th>
                </tr>
            </thead>
            <tbody>
                {positions.map((p, i) => (
                    <tr key={i} className="border-t border-zinc-800/50">
                        <td className="px-4 py-2 text-white">{p.pair}</td>
                        <td className="px-4 py-2">{p.size}</td>
                        <td className="px-4 py-2">{p.entry}</td>
                        <td className={`px-4 py-2 text-right ${p.pnl >= 0 ? 'text-emerald-500': 'text-rose-500'}`}>{p.pnl}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const RecentTrades = () => (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden h-[200px] mt-4">
        <div className="px-4 py-3 border-b border-zinc-800 font-bold text-xs uppercase">Recent Trades</div>
        <div className="text-zinc-600 text-xs p-4 italic">Trade history placeholder...</div>
    </div>
);
