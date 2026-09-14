"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDemoTrade } from "@/lib/demo-trading";
import { useAuth } from '@/lib/auth-context';
import Footer from "@/components/Footer";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

interface MarketPair {
  symbol: string;
  price: number;
}

export default function PortfolioPage() {
  const { balances, holdings, resetDemo } = useDemoTrade();
  const { user } = useAuth();
  const router = useRouter();
  const [prices, setPrices] = useState<{ [symbol: string]: number }>({});

  useEffect(() => {
    fetch('/api/markets')
      .then(res => res.json())
      .then(data => {
        const pMap: { [symbol: string]: number } = {};
        data.forEach((m: MarketPair) => pMap[m.symbol] = m.price);
        setPrices(pMap);
      });
  }, []);

  const totalUSDT = Object.entries(holdings).reduce((sum, [symbol, h]) => sum + (h.amount * (prices[symbol] || 0)), balances.USDT);
  const totalInvested = Object.entries(holdings).reduce((sum, [, h]) => sum + (h.amount * h.avgEntryPrice), 0);
  const unrealizedPL = totalUSDT - totalInvested - balances.USDT;

  const handleReset = () => {
    if (!user) {
        router.push('/signin?callbackUrl=/portfolio');
        return;
    }
    resetDemo();
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8">Portfolio</motion.h1>
        
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div variants={itemVariants} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="text-zinc-500 text-sm">Total Value (USDT)</div>
                <div className="text-3xl font-bold">{totalUSDT.toFixed(2)}</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="text-zinc-500 text-sm">Available USDT</div>
                <div className="text-3xl font-bold">{balances.USDT.toFixed(2)}</div>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="text-zinc-500 text-sm">Unrealized P&L</div>
                <div className={`text-3xl font-bold ${unrealizedPL >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{unrealizedPL.toFixed(2)}</div>
            </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead><tr className="bg-zinc-950 text-zinc-500 text-xs uppercase"><th className="p-4">Asset</th><th className="p-4">Amount</th><th className="p-4">Avg Price</th><th className="p-4">Value</th><th className="p-4">P&L</th></tr></thead>
                <tbody>
                    {Object.entries(holdings).map(([symbol, h]) => (
                        <tr key={symbol} className="border-t border-zinc-800">
                            <td className="p-4">{symbol}</td>
                            <td className="p-4">{h.amount.toFixed(4)}</td>
                            <td className="p-4">{h.avgEntryPrice.toFixed(2)}</td>
                            <td className="p-4">{(h.amount * (prices[symbol] || 0)).toFixed(2)}</td>
                            <td className={`p-4 ${((prices[symbol] || 0) - h.avgEntryPrice) * h.amount >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {((prices[symbol] || 0) - h.avgEntryPrice).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
        <motion.button variants={itemVariants} onClick={handleReset} className="mt-8 text-rose-500 hover:text-rose-300">Reset Demo Account</motion.button>
      </motion.div>
      <Footer />
    </main>
  );
}
