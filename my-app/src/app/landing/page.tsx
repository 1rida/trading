import Hero from "@/components/Hero";
import MarketsPreview from "@/components/MarketsPreview";
import TradingToolsPreview from "@/components/TradingToolsPreview";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Hero />
      <MarketsPreview />
      <TradingToolsPreview />
    </main>
  );
}
