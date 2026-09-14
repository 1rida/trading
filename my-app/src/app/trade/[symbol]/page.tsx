"use client";

import React from 'react';
import { TradingChart, TradeHeader, TradePanel } from "@/components/dashboard/TradeDashboard";
import OrderBook from "@/components/dashboard/OrderBook";
import RecentTrades from "@/components/dashboard/RecentTrades";
import OpenOrders from "@/components/dashboard/OpenOrders";
import OrderHistory from "@/components/dashboard/OrderHistory";

export default function TradePage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol || 'BTCUSDT';

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 overflow-hidden">
                <TradeHeader symbol={symbol} />
                <TradingChart symbol={symbol} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OpenOrders />
                <OrderHistory />
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-6">
            <TradePanel symbol={symbol} />
            <OrderBook symbol={symbol} />
            <RecentTrades symbol={symbol} />
          </div>
        </div>
      </div>
    </main>
  );
}
