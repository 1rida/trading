export default function TradingToolsPreview() {
  const tools = [
    {
      title: "Sub-Millisecond Execution",
      description: "Our simulated order matching engine records, pairs, and executes transactions in memory to simulate high-frequency trading dynamics.",
      badge: "Performance",
      svg: (
        <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      title: "Smart Order Management",
      description: "Practice configuring sophisticated trade triggers. Enter stop-loss tags, bracket limits, or take-profit targets to structure risk with precision.",
      badge: "Risk Control",
      svg: (
        <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      ),
    },
    {
      title: "Granular Portfolio Insights",
      description: "Analyze key trading stats including Win/Loss ratio, Average Trade Duration, Net Equity lines, and individual asset exposure distribution.",
      badge: "Analytics",
      svg: (
        <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      ),
    },
    {
      title: "Interactive Sandbox Mode",
      description: "Run out of credit? Instantly replenish your virtual wallet balance back to $10,000 USD virtual credit at the press of a button.",
      badge: "Risk-Free",
      svg: (
        <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="bg-zinc-950 py-20 border-b border-zinc-900 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Simulated Tools, Professional Capabilities
          </h2>
          <p className="text-zinc-400 text-lg">
            Experience complete feature sets of top crypto and equity exchanges without risking actual capital.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-zinc-900 bg-zinc-900/15 p-8 transition-all hover:border-zinc-800 hover:bg-zinc-900/30 overflow-hidden"
            >
              {/* Corner ambient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/0 group-hover:bg-emerald-500/5 blur-3xl rounded-full transition-all duration-300 pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                {/* SVG Icon circle wrapper */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-850 group-hover:border-zinc-800 text-white shadow-inner group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all duration-300">
                  {tool.svg}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {tool.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 px-2 py-0.5 bg-zinc-900 border border-zinc-850 rounded">
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
