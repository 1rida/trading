export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 lg:py-32 border-b border-zinc-900">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400 border border-emerald-500/20">
              ⚡ Next-Generation Engine
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-2xl leading-none">
              Master the Markets, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                With Zero Risk.
              </span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-xl">
              ApexTrader is a premium real-time paper trading simulator. Track market fluctuations, execute complex order types, and build your trading confidence with <strong className="text-zinc-200 font-semibold">$10,000 of virtual funds</strong>.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button className="rounded-xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 duration-200">
                Start Trading Free
              </button>
              <button className="rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 px-6 py-3.5 text-base font-bold text-white transition-all hover:-translate-y-0.5 duration-200">
                Explore Markets
              </button>
            </div>

            {/* Stats list */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-900 max-w-xl">
              <div>
                <p className="text-2xl font-black text-white">$10K</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Starting Balance</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">0ms</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Latency Simulation</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Risk-Free</p>
              </div>
            </div>
          </div>

          {/* Visual Chart Mockup Column */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
              {/* Glass sheen effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 rounded-2xl pointer-events-none" />

              {/* Header inside mockup */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-zinc-500 ml-2">BTCUSDT · SIMULATION DATA ONLY</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20 font-bold">
                  $94,152.80
                </span>
              </div>

              {/* Mock Candle chart visualization */}
              <div className="h-64 flex items-end gap-1.5 justify-between relative mt-4">
                {/* Horizontal grid lines */}
                <div className="absolute inset-x-0 top-0 border-t border-zinc-900/80 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/4 border-t border-zinc-900/80 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/2 border-t border-zinc-900/80 pointer-events-none" />
                <div className="absolute inset-x-0 top-3/4 border-t border-zinc-900/80 pointer-events-none" />

                {/* Candles built using HTML/CSS */}
                <div className="flex flex-col items-center justify-end h-full w-full">
                  <div className="h-10 w-0.5 bg-zinc-800"></div>
                  <div className="h-12 w-full rounded bg-zinc-800/80 hover:bg-zinc-700 transition-all"></div>
                  <div className="h-4 w-0.5 bg-zinc-800"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full w-full">
                  <div className="h-6 w-0.5 bg-emerald-500"></div>
                  <div className="h-16 w-full rounded bg-emerald-500/80 hover:bg-emerald-400 transition-all"></div>
                  <div className="h-8 w-0.5 bg-emerald-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full w-full">
                  <div className="h-8 w-0.5 bg-emerald-500"></div>
                  <div className="h-24 w-full rounded bg-emerald-500/80 hover:bg-emerald-400 transition-all"></div>
                  <div className="h-6 w-0.5 bg-emerald-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full w-full">
                  <div className="h-12 w-0.5 bg-rose-500"></div>
                  <div className="h-14 w-full rounded bg-rose-500/80 hover:bg-rose-400 transition-all"></div>
                  <div className="h-8 w-0.5 bg-rose-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full w-full">
                  <div className="h-4 w-0.5 bg-emerald-500"></div>
                  <div className="h-32 w-full rounded bg-emerald-500/80 hover:bg-emerald-400 transition-all"></div>
                  <div className="h-10 w-0.5 bg-emerald-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full w-full">
                  <div className="h-16 w-0.5 bg-rose-500"></div>
                  <div className="h-20 w-full rounded bg-rose-500/80 hover:bg-rose-400 transition-all"></div>
                  <div className="h-12 w-0.5 bg-rose-500"></div>
                </div>
                <div className="flex flex-col items-center justify-end h-full w-full">
                  <div className="h-6 w-0.5 bg-emerald-500"></div>
                  <div className="h-40 w-full rounded bg-emerald-500/80 hover:bg-emerald-400 transition-all"></div>
                  <div className="h-14 w-0.5 bg-emerald-500"></div>
                </div>
              </div>

              {/* Legend with explicit mock disclaimer */}
              <div className="mt-6 flex justify-between items-center text-xs font-mono text-zinc-500 border-t border-zinc-800 pt-4">
                <span>Vol: 14,249.50 BTC</span>
                <span className="text-zinc-600 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800/60 select-none">
                  * Visual Mock Data Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
