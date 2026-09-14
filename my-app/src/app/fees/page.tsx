"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Footer from "@/components/Footer";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 flex-grow"
      >
        <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Simulated Fee Schedule
        </motion.h1>
        <motion.p variants={itemVariants} className="text-zinc-400 text-lg mb-8">
          ApexTrader is a 100% risk-free demo trading simulator. All fees listed below are virtual and simulated to provide a realistic experience of cryptocurrency trading costs. No actual money or payment is ever required or processed.
        </motion.p>

        <motion.div variants={containerVariants} className="space-y-8">
          {/* Spot Trading Fees */}
          <motion.section variants={itemVariants} className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-500">●</span> Spot Trading Fees
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-400">
                <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Market</th>
                    <th className="py-3 px-4">Maker Fee</th>
                    <th className="py-3 px-4">Taker Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">BTC / USDT</td>
                    <td className="py-4 px-4 text-emerald-400">0.1000%</td>
                    <td className="py-4 px-4 text-emerald-400">0.1000%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">ETH / USDT</td>
                    <td className="py-4 px-4 text-emerald-400">0.1000%</td>
                    <td className="py-4 px-4 text-emerald-400">0.1000%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">SOL / USDT</td>
                    <td className="py-4 px-4 text-emerald-400">0.1000%</td>
                    <td className="py-4 px-4 text-emerald-400">0.1000%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Deposit and Withdrawal Fees */}
          <motion.section variants={itemVariants} className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-500">●</span> Account Operations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800/50">
                <h3 className="font-semibold text-white mb-2">Simulated Deposits</h3>
                <p className="text-xs text-zinc-400 mb-2">All virtual credit deposits to your paper trading account are processed completely free of charge.</p>
                <span className="text-emerald-400 font-bold text-lg">0.00% (FREE)</span>
              </div>
              <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800/50">
                <h3 className="font-semibold text-white mb-2">Simulated Withdrawals</h3>
                <p className="text-xs text-zinc-400 mb-2">Simulated withdrawals are provided purely to test application flow. No actual assets can be withdrawn.</p>
                <span className="text-emerald-400 font-bold text-lg">0.00% (FREE)</span>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
      <Footer />
    </main>
  );
}
