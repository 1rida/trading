"use client";
import { useState } from 'react';
import { useNotifications } from "@/lib/notification-context";

export default function NotificationsPage() {
    const { notifications, markAsRead, markAllAsRead, deleteNotification, clearNotifications } = useNotifications();
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Notifications</h1>
                    <div className="flex gap-2">
                        <button onClick={markAllAsRead} className="text-sm text-emerald-500 hover:text-emerald-400">Mark all read</button>
                        <button onClick={clearNotifications} className="text-sm text-rose-500 hover:text-rose-400">Clear all</button>
                    </div>
                </div>
                
                <div className="flex gap-4 mb-6">
                    <button onClick={() => setFilter('all')} className={`text-sm ${filter === 'all' ? 'text-white' : 'text-zinc-500'}`}>All</button>
                    <button onClick={() => setFilter('unread')} className={`text-sm ${filter === 'unread' ? 'text-white' : 'text-zinc-500'}`}>Unread</button>
                </div>

                <div className="space-y-2">
                    {filtered.length === 0 ? (
                        <p className="text-center text-zinc-500 py-10">No notifications found.</p>
                    ) : (
                        filtered.map(n => (
                            <div key={n.id} className={`p-4 rounded-lg border ${n.read ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-800 border-zinc-700'}`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{n.title}</h3>
                                        <p className="text-sm text-zinc-400">{n.message}</p>
                                        <span className="text-xs text-zinc-500">{new Date(n.timestamp).toLocaleString()}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {!n.read && <button onClick={() => markAsRead(n.id)} className="text-xs text-emerald-500">Read</button>}
                                        <button onClick={() => deleteNotification(n.id)} className="text-xs text-rose-500">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
