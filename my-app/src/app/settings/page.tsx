"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useDemoTrade } from "@/lib/demo-trading";
import { useNotifications, NotificationPreferences } from "@/lib/notification-context";

export default function SettingsPage() {
    const { user, updateProfile, changePassword } = useAuth();
    const router = useRouter();
    const { resetDemo } = useDemoTrade();
    const { preferences, togglePreference } = useNotifications();
    
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    const [profileMessage, setProfileMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) { router.push('/signin?callbackUrl=/settings'); return; }
        const result = await updateProfile(fullName);
        setProfileMessage(result.success ? 'Profile updated successfully' : result.message || 'Error updating profile');
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) { router.push('/signin?callbackUrl=/settings'); return; }
        if (newPassword !== confirmNewPassword) {
            setPasswordMessage('New passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            setPasswordMessage('New password must be at least 8 characters');
            return;
        }
        const result = await changePassword(currentPassword, newPassword);
        setPasswordMessage(result.success ? 'Password changed successfully' : result.message || 'Error changing password');
        if (result.success) {
            setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword('');
        }
    };

    if (!user) {
        return (
            <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Settings</h1>
                    <p className="text-zinc-400 mb-6">Please <a href="/signin?callbackUrl=/settings" className="text-emerald-500 hover:underline">sign in</a> to manage your settings.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
                <h1 className="text-3xl font-bold">Settings</h1>
                
                {/* Profile Section */}
                <section className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-4">Profile</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Full Name</label>
                            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Email</label>
                            <input type="email" value={user?.email} disabled className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded text-zinc-500" />
                        </div>
                        {profileMessage && <p className="text-sm text-emerald-500">{profileMessage}</p>}
                        <button type="submit" className="bg-emerald-500 text-zinc-950 px-4 py-2 rounded font-bold hover:bg-emerald-400">Update Profile</button>
                    </form>
                </section>

                {/* Notifications Section */}
                <section className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
                    <div className="space-y-3">
                        {(Object.keys(preferences) as (keyof NotificationPreferences)[]).map((key) => (
                            <label key={key} className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={preferences[key]} onChange={() => togglePreference(key)} className="accent-emerald-500" />
                                <span className="capitalize">{key} Notifications</span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Security Section */}
                <section className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                    <h2 className="text-xl font-semibold mb-4">Security</h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Current Password</label>
                            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">New Password</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Confirm New Password</label>
                            <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded" required />
                        </div>
                        {passwordMessage && <p className="text-sm text-emerald-500">{passwordMessage}</p>}
                        <button type="submit" className="bg-emerald-500 text-zinc-950 px-4 py-2 rounded font-bold hover:bg-emerald-400">Change Password</button>
                    </form>
                </section>

                {/* Danger Zone */}
                <section className="bg-zinc-900/50 p-6 rounded-xl border border-rose-900/50">
                    <h2 className="text-xl font-semibold text-rose-500 mb-4">Danger Zone</h2>
                    <button onClick={resetDemo} className="bg-rose-500/10 text-rose-500 px-4 py-2 rounded font-bold hover:bg-rose-500/20">Reset Demo Account Data</button>
                </section>
            </div>
        </main>
    );
}
