"use client";
import { useDemoTrade } from "@/lib/demo-trading";

export default function WalletPage() {
    const { balances } = useDemoTrade();
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">Wallet</h1>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-sm">Available USDT Balance</div>
                    <div className="text-4xl font-bold text-emerald-500">{balances.USDT.toFixed(2)} USDT</div>
                </div>
            </div>
        </main>
    );
}
