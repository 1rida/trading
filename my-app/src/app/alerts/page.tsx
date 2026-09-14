"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNotifications } from "@/lib/notification-context";
import { useAuth } from '@/lib/auth-context';
import Footer from "@/components/Footer";

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function AlertsPage() {
    const { alerts, addAlert, toggleAlert, deleteAlert } = useNotifications();
    const { user } = useAuth();
    const router = useRouter();
    const [pair, setPair] = useState('BTCUSDT');
    const [targetPrice, setTargetPrice] = useState('');
    const [condition, setCondition] = useState<'above' | 'below'>('above');

    const handleAddAlert = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push('/signin?callbackUrl=/alerts');
            return;
        }
        addAlert({ pair, targetPrice: parseFloat(targetPrice), condition });
        setTargetPrice('');
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto px-4 py-10">
                <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-8">Price Alerts</motion.h1>
                
                <motion.form variants={itemVariants} onSubmit={handleAddAlert} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-8 flex gap-4 items-end">
                    <div className="flex-1">
                        <label className="block text-sm text-zinc-400 mb-1">Pair</label>
                        <input value={pair} onChange={e => setPair(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm text-zinc-400 mb-1">Target Price</label>
                        <input type="number" value={targetPrice} onChange={e => setTargetPrice(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded" required />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm text-zinc-400 mb-1">Condition</label>
                        <select value={condition} onChange={e => setCondition(e.target.value as 'above' | 'below')} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded">
                            <option value="above">Above</option>
                            <option value="below">Below</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-emerald-500 text-zinc-950 px-4 py-2 rounded font-bold hover:bg-emerald-400">Add Alert</button>
                </motion.form>

                <motion.div variants={itemVariants} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead><tr className="bg-zinc-950 text-zinc-500 text-xs uppercase"><th className="p-4">Pair</th><th className="p-4">Condition</th><th className="p-4">Target</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
                        <tbody>
                            {alerts.map(a => (
                                <tr key={a.id} className="border-t border-zinc-800">
                                    <td className="p-4">{a.pair}</td>
                                    <td className="p-4 capitalize">{a.condition}</td>
                                    <td className="p-4">{a.targetPrice}</td>
                                    <td className="p-4">{a.enabled ? 'Active' : 'Disabled'}</td>
                                    <td className="p-4 flex gap-2">
                                        <button onClick={() => { if(user) toggleAlert(a.id); else router.push('/signin?callbackUrl=/alerts'); }} className="text-xs text-zinc-400">{a.enabled ? 'Disable' : 'Enable'}</button>
                                        <button onClick={() => { if(user) deleteAlert(a.id); else router.push('/signin?callbackUrl=/alerts'); }} className="text-xs text-rose-500">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </motion.div>
            <Footer />
        </main>
    );
}
