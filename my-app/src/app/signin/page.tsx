"use client";
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Footer from "@/components/Footer";
import { useAuth } from '@/lib/auth-context';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/portfolio';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const result = await login(email, password);
    if (result.success) {
      router.push(callbackUrl);
    } else {
      setError(result.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 shadow-2xl"
    >
        <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
        {error && <p className="text-rose-500 mb-4">{error}</p>}
        <form onSubmit={handleSignIn} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 outline-none transition-colors" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 outline-none transition-colors" required />
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" disabled={isLoading} className="w-full bg-emerald-500 py-3 rounded-xl text-zinc-950 font-bold hover:bg-emerald-400 disabled:opacity-50 mt-4 transition-all"
            >
                {isLoading ? 'Signing In...' : 'Sign In'}
            </motion.button>
        </form>
    </motion.div>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 py-16">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
          <SignInForm />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
