"use client";

import { motion } from "framer-motion";
import { MarketSearch } from "@/components/dashboard/MarketSearch";
import { MarketTable } from "@/components/dashboard/MarketTable";
import OpenOrders from "@/components/dashboard/OpenOrders";
import OrderBook from "@/components/dashboard/OrderBook";
import OrderHistory from "@/components/dashboard/OrderHistory";
import PositionsTable from "@/components/dashboard/PositionsTable";
import RecentTrades from "@/components/dashboard/RecentTrades";
import { TradeHeader } from "@/components/dashboard/TradeHeader";
import { TradingChart } from "@/components/dashboard/TradingChart";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  return (
    <motion.main 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-zinc-950 text-white p-4 lg:p-8"
    >
      <div className="max-w-[1600px] mx-auto space-y-6">
        <motion.h1 variants={itemVariants} className="text-3xl font-bold">Trading Dashboard</motion.h1>

        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Area */}
          <div className="lg:col-span-9 space-y-6">
            <motion.div variants={itemVariants}><TradeHeader symbol="BTCUSDT" /></motion.div>
            <motion.div variants={itemVariants}><TradingChart symbol="BTCUSDT" /></motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}><OpenOrders /></motion.div>
              <motion.div variants={itemVariants}><PositionsTable /></motion.div>
            </div>
            <motion.div variants={itemVariants}><OrderHistory /></motion.div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div variants={itemVariants}><MarketSearch onSearch={() => {}} /></motion.div>
            <motion.div variants={itemVariants}>
                <MarketTable markets={[]} searchQuery="" favorites={new Set<string>()} toggleFavorite={() => {}} sortKey="symbol" sortOrder="asc" setSort={() => {}} loading={false} error={false} />
            </motion.div>
            <motion.div variants={itemVariants}><OrderBook symbol="BTCUSDT" /></motion.div>
            <motion.div variants={itemVariants}><RecentTrades symbol="BTCUSDT" /></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
