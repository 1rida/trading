"use client";
import { useDemoTrade } from '@/lib/demo-trading';

export default function OpenOrders() {
    const { openOrders, cancelOrder, resetDemo } = useDemoTrade();

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-[300px]">
      <div className="p-3 border-b border-zinc-800 bg-zinc-950 font-bold text-xs text-zinc-400 flex justify-between">
        <span>Open Orders</span>
        <button onClick={resetDemo} className="text-zinc-600 hover:text-white">Reset Account</button>
      </div>
      <div className="overflow-y-auto">
        {openOrders.length === 0 ? (
            <div className="p-4 text-center text-xs text-zinc-600">No open orders</div>
        ) : (
            <table className="w-full text-left text-[10px] text-zinc-400">
                <thead>
                    <tr className="bg-zinc-900 text-zinc-500">
                        <th className="p-2">Pair</th>
                        <th className="p-2">Side</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Amount</th>
                        <th className="p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {openOrders.map(o => (
                        <tr key={o.id} className="border-b border-zinc-800">
                            <td className="p-2 text-white">{o.pair}</td>
                            <td className={`p-2 ${o.side === 'buy' ? 'text-emerald-400' : 'text-rose-400'}`}>{o.side.toUpperCase()}</td>
                            <td className="p-2">{o.price}</td>
                            <td className="p-2">{o.amount}</td>
                            <td className="p-2"><button onClick={() => cancelOrder(o.id)} className="text-rose-500 hover:text-rose-300">Cancel</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>
    </div>
  );
}
