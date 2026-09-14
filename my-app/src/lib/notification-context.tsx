"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './auth-context';

export type NotificationType = 'order' | 'alert' | 'security' | 'account';

export interface AppNotification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: number;
    read: boolean;
    pair?: string;
}

export interface PriceAlert {
    id: string;
    pair: string;
    condition: 'above' | 'below';
    targetPrice: number;
    enabled: boolean;
    triggered: boolean;
}

export interface NotificationPreferences {
    order: boolean;
    alert: boolean;
    security: boolean;
    account: boolean;
}

interface NotificationContextType {
    notifications: AppNotification[];
    alerts: PriceAlert[];
    preferences: NotificationPreferences;
    unreadCount: number;
    addNotification: (n: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
    togglePreference: (key: keyof NotificationPreferences) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    deleteNotification: (id: string) => void;
    clearNotifications: () => void;
    addAlert: (a: Omit<PriceAlert, 'id' | 'triggered' | 'enabled'>) => void;
    toggleAlert: (id: string) => void;
    deleteAlert: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const defaultPreferences = { order: true, alert: true, security: true, account: true };

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const [alerts, setAlerts] = useState<PriceAlert[]>([]);
    const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);

    const storageKeyNotifications = user ? `notifications-${user.id}` : 'notifications-guest';
    const storageKeyAlerts = user ? `alerts-${user.id}` : 'alerts-guest';
    const storageKeyPrefs = user ? `prefs-${user.id}` : 'prefs-guest';

    const addNotification = useCallback((n: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
        if (!preferences[n.type]) return; // Respect preferences
        const newNotif: AppNotification = { ...n, id: Date.now().toString(), timestamp: Date.now(), read: false };
        setNotifications(prev => [newNotif, ...prev]);
    }, [preferences]);

    useEffect(() => {
        const savedNotifs = localStorage.getItem(storageKeyNotifications);
        const savedAlerts = localStorage.getItem(storageKeyAlerts);
        const savedPrefs = localStorage.getItem(storageKeyPrefs);
        if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
        if (savedAlerts) setAlerts(JSON.parse(savedAlerts));
        if (savedPrefs) setPreferences(JSON.parse(savedPrefs));
    }, [storageKeyNotifications, storageKeyAlerts, storageKeyPrefs]);

    useEffect(() => {
        localStorage.setItem(storageKeyNotifications, JSON.stringify(notifications));
        localStorage.setItem(storageKeyAlerts, JSON.stringify(alerts));
        localStorage.setItem(storageKeyPrefs, JSON.stringify(preferences));
    }, [notifications, alerts, preferences, storageKeyNotifications, storageKeyAlerts, storageKeyPrefs]);

    const togglePreference = (key: keyof NotificationPreferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Price monitoring
    useEffect(() => {
        const interval = setInterval(async () => {
            const activeAlerts = alerts.filter(a => a.enabled && !a.triggered);
            if (activeAlerts.length === 0) return;

            // Fetch latest prices for active alerts
            const pairs = Array.from(new Set(activeAlerts.map(a => a.pair)));
            for (const pair of pairs) {
                try {
                    const res = await fetch(`/api/ticker?symbol=${pair}`);
                    const data = await res.json();
                    const price = parseFloat(data.price);

                    activeAlerts.filter(a => a.pair === pair).forEach(alert => {
                        const isTriggered = alert.condition === 'above' ? price >= alert.targetPrice : price <= alert.targetPrice;
                        if (isTriggered) {
                            addNotification({
                                type: 'alert',
                                title: 'Price Alert Triggered',
                                message: `${alert.pair} reached ${price} (${alert.condition} ${alert.targetPrice})`,
                                pair: alert.pair
                            });
                            setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, triggered: true } : a));
                        }
                    });
                } catch (e) {
                    console.error('Error fetching price for alert', e);
                }
            }
        }, 10000); // Check every 10 seconds
        return () => clearInterval(interval);
    }, [alerts, preferences, addNotification]);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const addAlert = (a: Omit<PriceAlert, 'id' | 'triggered' | 'enabled'>) => {
        const newAlert: PriceAlert = { ...a, id: Date.now().toString(), enabled: true, triggered: false };
        setAlerts(prev => [...prev, newAlert]);
    };

    const toggleAlert = (id: string) => {
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
    };

    const deleteAlert = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            alerts,
            preferences,
            unreadCount: notifications.filter(n => !n.read).length,
            addNotification,
            togglePreference,
            markAsRead,
            markAllAsRead,
            deleteNotification,
            clearNotifications,
            addAlert,
            toggleAlert,
            deleteAlert
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within NotificationProvider');
    return context;
};
