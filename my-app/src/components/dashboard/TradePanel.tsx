"use client";
import { useState } from "react";
import { useDemoTrade } from "@/lib/demo-trading";

export const TradePanel = ({ symbol }: { symbol: string }) => {
  const { balances, holdings, currentPrice, placeOrder } = useDemoTrade();
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [type, setType] = useState<"limit" | "market">("limit");
  const [price, setPrice] = useState(currentPrice.toString());
  const [amount, setAmount] = useState("");

  const baseAsset = symbol.replace('USDT', '');
  const available = side === 'buy' ? balances.USDT : (holdings[baseAsset]?.amount || 0);

  const total = (parseFloat(price) * parseFloat(amount)) || 0;

  const handlePercentage = (p: number) => {
    if (side === 'buy') setAmount(((balances.USDT * p) / currentPrice).toFixed(4));
    else setAmount(((holdings[baseAsset]?.amount || 0) * p).toFixed(4));
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="flex p-1 bg-zinc-950 border-b border-zinc-800">
        <button onClick={() => setSide("buy")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${side === "buy" ? "bg-emerald-500 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"}`}>BUY</button>
        <button onClick={() => setSide("sell")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${side === "sell" ? "bg-rose-500 text-zinc-950" : "text-zinc-500 hover:text-zinc-300"}`}>SELL</button>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-4 border-b border-zinc-800 pb-2">
          {["Limit", "Market"].map((t) => (
            <button key={t} onClick={() => setType(t.toLowerCase() as "limit" | "market")} className={`text-[11px] font-bold uppercase tracking-wider ${type === t.toLowerCase() ? "text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}>{t}</button>
          ))}
        </div>

        <div className="space-y-3">
          {type === "limit" && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Price</span><span>USDT</span></div>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-100" />
            </div>
          )}

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500"><span>Amount</span><span>{baseAsset}</span></div>
            <input type="text" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-100" />
          </div>
          
          <div className="text-[10px] text-zinc-500">Total: {total.toFixed(2)} USDT</div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[0.25, 0.5, 0.75, 1].map((p) => (
            <button key={p} onClick={() => handlePercentage(p)} className="py-1.5 text-[10px] font-bold bg-zinc-900 border border-zinc-800 rounded text-zinc-400">{p*100}%</button>
          ))}
        </div>

        <div className="text-[10px] text-zinc-500">Available: {available.toFixed(4)} {side === 'buy' ? 'USDT' : baseAsset}</div>

        <button
          onClick={() => {
            const amt = parseFloat(amount);
            const prc = parseFloat(price);
            if (isNaN(amt) || amt <= 0) { alert("Invalid amount"); return; }
            if (type === "limit" && (isNaN(prc) || prc <= 0)) { alert("Invalid price"); return; }
            placeOrder({ pair: `${baseAsset}/USDT`, side, type, price: prc, amount: amt, total });
          }}
          className={`w-full py-3.5 rounded-xl font-bold text-sm ${side === "buy" ? "bg-emerald-500 text-zinc-950" : "bg-rose-500 text-zinc-950"}`}
        >
          {side === "buy" ? `Buy ${baseAsset}` : `Sell ${baseAsset}`}
        </button>
      </div>
    </div>
  );
};
