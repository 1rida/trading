"use client";
import { useDemoTrade } from '@/lib/demo-trading';

export default function OrderHistory() {
    const { orderHistory } = useDemoTrade();

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[300px]">
      <div className="p-3 border-b border-zinc-800 bg-zinc-950 font-bold text-xs text-zinc-400">Order History</div>
      <div className="overflow-y-auto">
        {orderHistory.length === 0 ? (
            <div className="p-4 text-center text-xs text-zinc-600">No order history</div>
        ) : (
            <table className="w-full text-left text-[10px] text-zinc-400">
                <thead>
                    <tr className="bg-zinc-900 text-zinc-500">
                        <th className="p-2">Pair</th>
                        <th className="p-2">Side</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map(o => (
                        <tr key={o.id} className="border-b border-zinc-800">
                            <td className="p-2 text-white">{o.pair}</td>
                            <td className={`p-2 ${o.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>{o.side.toUpperCase()}</td>
                            <td className="p-2">{o.price}</td>
                            <td className="p-2">{o.amount}</td>
                            <td className="p-2">{o.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>
    </div>
  );
}
