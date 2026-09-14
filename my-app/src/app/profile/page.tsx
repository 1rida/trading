"use client";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
    const { user } = useAuth();
    
    if (!user) {
        return (
            <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Profile</h1>
                    <p className="text-zinc-400">Please <a href="/signin?callbackUrl=/profile" className="text-emerald-500 hover:underline">sign in</a> to view your profile.</p>
                </div>
            </main>
        );
    }
    
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6">Profile</h1>
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <p><strong>Name:</strong> {user.fullName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt || '').toLocaleDateString()}</p>
                </div>
            </div>
        </main>
    );
}
