"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeatureCard = ({ title, description, icon }: { title: string, description: string, icon: string }) => (
  <motion.div
    variants={itemVariants}
    className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 hover:border-emerald-500/50 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
  >
    <div className="mb-4 text-3xl">{icon}</div>
    <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
  </motion.div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950 to-zinc-950"
        />
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
            ✨ Next-Gen Simulation Engine
          </motion.div>
          <motion.h1 variants={itemVariants} initial="hidden" animate="visible" className="text-6xl font-black tracking-tight sm:text-8xl">
            Trade Smarter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Master the Markets.</span>
          </motion.h1>
          <motion.p variants={itemVariants} initial="hidden" animate="visible" className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Build your confidence with $10,000 in virtual funds. No risk, pure skill development. Experience the thrill of trading without the actual capital commitment.
          </motion.p>
          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex gap-4 justify-center pt-4">
            <Link href="/trade/BTCUSDT" className="rounded-xl bg-emerald-500 px-8 py-4 font-bold text-zinc-950 hover:bg-emerald-400 transition-all hover:scale-105">
              Launch Platform
            </Link>
            <Link href="/landing" className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-8 py-4 font-bold text-white hover:bg-zinc-800 transition-all hover:scale-105">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Decorative Full Width Section */}
      <section className="py-20 bg-zinc-900/20 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
            {[ {label: "Virtual Funds", val: "$10,000"}, {label: "Market Pairs", val: "50+"}, {label: "Risk Level", val: "0%"} ].map((stat) => (
                <div key={stat.label}>
                    <div className="text-4xl font-black text-emerald-500 mb-2">{stat.val}</div>
                    <div className="text-zinc-400 text-sm font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-3 mb-12 text-center">
                <h2 className="text-4xl font-bold mb-4">Professional Tools for Everyone</h2>
                <p className="text-zinc-400">Everything you need to sharpen your trading edge in a completely simulated, safe environment.</p>
            </div>
            
            <FeatureCard title="Risk Management" description="Simulate complex stop-loss and take-profit scenarios to protect your virtual capital." icon="🛡️" />
            <FeatureCard title="Backtesting Suite" description="Analyze historical performance metrics to validate your trading strategies." icon="📈" />
            <FeatureCard title="Ultra-Low Latency" description="Experience professional-grade order execution speed in a simulated environment." icon="⚡" />
            <FeatureCard title="Portfolio Insights" description="Deep-dive analytics to monitor asset allocation and total ROI." icon="📊" />
            <FeatureCard title="Live Market Feeds" description="Get real-time market data updates on BTC, ETH, and other major pairs." icon="📡" />
            <FeatureCard title="Trading Journal" description="Automatic logging of every trade you make to review your decision process." icon="📖" />
          </motion.div>
        </div>
      </section>

      {/* How to Start */}
      <section className="py-24 bg-zinc-900/10 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">How to Begin</h2>
            <div className="space-y-8">
                {[ {title: "Create Account", desc: "Sign up for free and receive your virtual $10,000 balance."}, {title: "Explore Markets", desc: "Browse through various trading pairs and analyze the live charts."}, {title: "Execute Trades", desc: "Start placing buy/sell orders to practice your strategies in real-time."} ].map((step, i) => (
                    <motion.div key={step.title} initial={{opacity:0, x: -20}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay: i * 0.2}} className="flex gap-6 items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center font-bold text-emerald-400">0{i+1}</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-zinc-400">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
}
