export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 p-8 lg:p-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Information Collection</h2>
          <p>We do not collect personal financial information because this is a simulation platform.</p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">2. Data Usage</h2>
          <p>We use minimal data to maintain your simulation account state.</p>
        </section>
      </div>
    </main>
  );
}
