"use client";
import React from 'react';

export default function TradingRulesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          Trading & Simulation Rules
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Welcome to the ApexTrader paper trading simulator. To maintain an educational and realistic learning environment, the following simulated trading rules apply to all user accounts.
        </p>

        <div className="space-y-8">
          {/* Rule 1: Account Funding */}
          <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-3">
              1. Simulated Account Funding
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Every newly registered simulation account begins with a virtual starting balance of <strong className="text-emerald-400">10,000.00 USDT</strong>. You can reset your simulated balances, holdings, and transaction history at any time from the Account Settings page under the <strong className="text-rose-400">Danger Zone</strong>.
            </p>
          </section>

          {/* Rule 2: Order Types */}
          <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-3">
              2. Supported Order Types
            </h2>
            <div className="space-y-4 text-sm text-zinc-400">
              <div>
                <strong className="text-white block mb-1">● Market Orders</strong>
                <p>Market orders execute immediately at the current real-time public market ticker price. Ensure you have sufficient simulated balances to cover both the trade value and simulated transaction fees.</p>
              </div>
              <div>
                <strong className="text-white block mb-1">● Limit Orders</strong>
                <p>Limit orders are placed in the simulated order book and will trigger when the public market price crosses your specified limit price. These are completely virtual and have no impact on live order books of public exchanges.</p>
              </div>
            </div>
          </section>

          {/* Rule 3: Public Market Data */}
          <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-3">
              3. Live Market Feed Reference
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Our market rates, order book depths, and historical candles are fetched directly from the Binance public API feed. While we strive to maintain high system uptime, please be aware that temporary feed delays, maintenance periods, or differences in local browser time may affect simulated executions. Never use this mock environment for actual investment execution.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
