"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Footer from "@/components/Footer";
import { mockAuthService } from '@/lib/mock-auth';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    const result = mockAuthService.register(fullName, email, password);
    if (result.success) {
      router.push('/signin');
    } else {
      setError(result.message || 'An error occurred');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 py-16">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800 shadow-2xl"
        >
            <h1 className="text-3xl font-bold text-white mb-8">Sign Up</h1>
            {error && <p className="text-rose-500 mb-4">{error}</p>}
            <form onSubmit={handleSignUp} className="space-y-4">
            <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 outline-none transition-colors" required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 outline-none transition-colors" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 outline-none transition-colors" required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white focus:border-emerald-500 outline-none transition-colors" required />
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" className="w-full bg-emerald-500 py-3 rounded-xl text-zinc-950 font-bold hover:bg-emerald-400 mt-4 transition-all"
            >
                Sign Up
            </motion.button>
            </form>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
