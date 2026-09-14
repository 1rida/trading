"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './auth-context';
import { useNotifications } from './notification-context';

export interface Order {
    id: string;
    pair: string;
    side: 'buy' | 'sell';
    type: 'limit' | 'market';
    price: number;
    amount: number;
    total: number;
    status: 'open' | 'filled' | 'cancelled';
    time: number;
}

export interface Holding {
    amount: number;
    avgEntryPrice: number;
}

interface DemoContextType {
    balances: { USDT: number };
    holdings: { [symbol: string]: Holding };
    openOrders: Order[];
    orderHistory: Order[];
    currentPrice: number;
    setCurrentPrice: (price: number) => void;
    placeOrder: (order: Omit<Order, 'id' | 'status' | 'time'>) => void;
    cancelOrder: (id: string) => void;
    resetDemo: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoTradeProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const { addNotification } = useNotifications();
    const [balances, setBalances] = useState({ USDT: 10000 });
    const [holdings, setHoldings] = useState<{ [symbol: string]: Holding }>({});
    const [openOrders, setOpenOrders] = useState<Order[]>([]);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [currentPrice, setCurrentPrice] = useState(0);

    const storageKey = user ? `demo-trade-state-${user.id}` : 'demo-trade-state-guest';

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const { b, hold, o, h } = JSON.parse(saved);
            setBalances(b); setHoldings(hold || {}); setOpenOrders(o); setOrderHistory(h);
        } else {
            setBalances({ USDT: 10000 });
            setHoldings({});
            setOpenOrders([]);
            setOrderHistory([]);
        }
    }, [storageKey]);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify({ b: balances, hold: holdings, o: openOrders, h: orderHistory }));
    }, [balances, holdings, openOrders, orderHistory, storageKey]);

    const placeOrder = (order: Omit<Order, 'id' | 'status' | 'time'>) => {
        const price = order.type === 'market' ? currentPrice : order.price;
        const total = price * order.amount;
        const asset = order.pair.split('/')[0];
        
        if (order.side === 'buy') {
            if (balances.USDT < total) { alert('Insufficient USDT'); return; }
            setBalances(prev => ({ ...prev, USDT: prev.USDT - total }));
            setHoldings(prev => {
                const old = prev[asset] || { amount: 0, avgEntryPrice: 0 };
                return { ...prev, [asset]: { 
                    amount: old.amount + order.amount, 
                    avgEntryPrice: ((old.avgEntryPrice * old.amount) + (price * order.amount)) / (old.amount + order.amount) 
                }};
            });
        } else {
            if ((holdings[asset]?.amount || 0) < order.amount) { alert(`Insufficient ${asset}`); return; }
            setBalances(prev => ({ ...prev, USDT: prev.USDT + total }));
            setHoldings(prev => ({ ...prev, [asset]: { ...prev[asset], amount: prev[asset].amount - order.amount } }));
        }

        const newOrder: Order = { ...order, id: Date.now().toString(), status: order.type === 'market' ? 'filled' : 'open', time: Date.now() };
        
        addNotification({
            type: 'order',
            title: 'Order Placed',
            message: `${order.side.toUpperCase()} ${order.amount} ${order.pair} at ${price}`,
            pair: order.pair
        });

        if (newOrder.status === 'filled') {
            setOrderHistory(prev => [newOrder, ...prev]);
            addNotification({
                type: 'order',
                title: 'Order Filled',
                message: `${order.side.toUpperCase()} ${order.amount} ${order.pair} filled at ${price}`,
                pair: order.pair
            });
        }
        else setOpenOrders(prev => [newOrder, ...prev]);
    };

    const cancelOrder = (id: string) => {
        const order = openOrders.find(o => o.id === id);
        if (!order) return;
        if (order.side === 'buy') setBalances(prev => ({ ...prev, USDT: prev.USDT + order.total }));
        else setHoldings(prev => ({ ...prev, [order.pair.split('/')[0]]: { ...prev[order.pair.split('/')[0]], amount: prev[order.pair.split('/')[0]].amount + order.amount } }));
        
        setOpenOrders(prev => prev.filter(o => o.id !== id));
        setOrderHistory(prev => [{ ...order, status: 'cancelled' }, ...prev]);
        
        addNotification({
            type: 'order',
            title: 'Order Cancelled',
            message: `${order.side.toUpperCase()} ${order.amount} ${order.pair} cancelled`,
            pair: order.pair
        });
    };

    const resetDemo = () => {
        if (confirm('Reset demo account?')) {
            setBalances({ USDT: 10000 });
            setHoldings({});
            setOpenOrders([]);
            setOrderHistory([]);
            addNotification({
                type: 'account',
                title: 'Account Reset',
                message: 'Demo account has been reset.'
            });
        }
    };

    return <DemoContext.Provider value={{ balances, holdings, openOrders, orderHistory, currentPrice, setCurrentPrice, placeOrder, cancelOrder, resetDemo }}>{children}</DemoContext.Provider>;
};

export const useDemoTrade = () => {
    const context = useContext(DemoContext);
    if (!context) throw new Error('useDemoTrade must be used within DemoTradeProvider');
    return context;
};
