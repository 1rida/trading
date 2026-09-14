export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 p-8 lg:p-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
          <p>By accessing ApexTrader, you agree to these Terms of Service. If you do not agree, please do not use this site.</p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Simulation Only</h2>
          <p>ApexTrader is a simulation platform. All data is fictitious and for educational purposes only.</p>
        </section>
      </div>
    </main>
  );
}
