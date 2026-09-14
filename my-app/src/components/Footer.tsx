import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-16 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900">
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 font-bold text-base">
                ▲
              </div>
              <span className="text-lg font-bold text-white">
                ApexTrader
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
              Risk-free paper trading platform engineered for educational study, practice trading strategies, and building market competence.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-zinc-200">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/markets" className="hover:text-white transition-colors">Markets</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/trading-rules" className="hover:text-white transition-colors">Rules</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-zinc-200">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/trading-rules" className="hover:text-white transition-colors">User Guides</Link></li>
              <li><Link href="/trading-rules" className="hover:text-white transition-colors">API Docs</Link></li>
              <li><Link href="/settings" className="hover:text-white transition-colors">Status Page</Link></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-zinc-200">Platform Status</h4>
            <div className="rounded-xl border border-zinc-900 bg-zinc-950 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Sandbox Systems Operational
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
                <div>Mock Feed: <span className="text-zinc-400">Active</span></div>
                <div>Server Latency: <span className="text-zinc-400">8ms</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Regulatory Notice */}
        <div className="pt-8 space-y-6">
          <div className="rounded-xl border border-zinc-900/60 bg-zinc-900/10 p-5 text-xs leading-relaxed space-y-2">
            <span className="font-bold text-zinc-400 uppercase tracking-wider block">⚠️ RISK WARNING & SIMULATION DISCLAIMER</span>
            <p>
              ApexTrader is an original, simulated **paper trading platform** designed solely for educational, analytical, and strategy-testing purposes. All account balances, portfolios, credits, prices, and assets displayed on this platform are completely **virtual and fictitious**. There is no real money, actual capital, or real cryptocurrency involved in any operation. 
            </p>
            <p>
              This site has absolutely no connection, registration, or endorsement from Binance, any cryptocurrency exchanges, regulatory bodies, or financial institutions. No deposits or real trading actions can be made. Under no circumstances should any price information, market indicators, or charts be used for real-world investments. Real cryptocurrency and derivative trading involves substantial financial risk. Past simulated performance is not indicative of future actual results.
            </p>
          </div>

          {/* Copyright bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} ApexTrader Simulator. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
