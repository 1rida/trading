"use client";
import React, { useEffect } from 'react';
import { PairSelector } from './PairSelector';
import { useDemoTrade } from '@/lib/demo-trading';

interface TickerData {
    price: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume: number;
}

export const TradeHeader = ({ symbol }: { symbol: string }) => {
    const { setCurrentPrice } = useDemoTrade();
    const [ticker, setTicker] = React.useState<TickerData | null>(null);

    useEffect(() => {
        const fetchTicker = () => {
            fetch(`/api/ticker?symbol=${symbol}`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.error('Ticker API error:', data.error);
                        return;
                    }
                    setTicker(data);
                    setCurrentPrice(data.price);
                })
                .catch(err => console.error(err));
        };
        fetchTicker();
        const interval = setInterval(fetchTicker, 5000);
        return () => clearInterval(interval);
    }, [symbol, setCurrentPrice]);

    return (
        <div className="p-4 border-b border-zinc-900 bg-zinc-950 rounded-t-xl flex items-center justify-between">
            <PairSelector currentSymbol={symbol} />
            {ticker && (
                <div className="flex gap-6 text-xs font-mono">
                    <div className="flex flex-col">
                        <span className="text-zinc-500">Price</span>
                        <span className="text-white">${ticker.price.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500">24h Change</span>
                        <span className={ticker.change24h >= 0 ? "text-emerald-500" : "text-rose-500"}>{ticker.change24h.toFixed(2)}%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500">24h High</span>
                        <span className="text-white">${ticker.high24h.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500">24h Low</span>
                        <span className="text-white">${ticker.low24h.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-zinc-500">24h Vol</span>
                        <span className="text-white">{ticker.volume.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
