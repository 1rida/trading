"use client";
import { useEffect, useState, useMemo } from 'react';
import { Candlestick, generateMockCandles } from "@/lib/mock-data";

interface TradingChartProps {
  symbol: string;
}

export function TradingChart({ symbol }: TradingChartProps) {
  const [data, setData] = useState<Candlestick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [interval, setInterval] = useState("1h");
  const [showSMA, setShowSMA] = useState(false);
  const [showEMA, setShowEMA] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/klines?symbol=${symbol}&interval=${interval}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(data => {
        if (data.error || !Array.isArray(data)) throw new Error('API Error');
        setData(data);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        setData(generateMockCandles());
        setError(true);
        setLoading(false);
      });
  }, [symbol, interval]);

  const smaValues = useMemo(() => {
    const calculateSMA = (period: number) => {
      return data.map((_, i) => {
        if (i < period - 1) return null;
        const slice = data.slice(i - period + 1, i + 1);
        return slice.reduce((sum, c) => sum + c.close, 0) / period;
      });
    };
    return showSMA ? calculateSMA(10) : [];
  }, [data, showSMA]);

  if (loading) return <div className="w-full h-[500px] flex items-center justify-center text-zinc-500 bg-zinc-900/50 rounded-xl">Loading Chart Data...</div>;

  // Chart Dimensions
  const width = 800;
  const height = 400;
  const padding = 40;
  const volumeHeight = 80;

  // Scales
  const allPrices = data.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...allPrices) * 0.999;
  const maxPrice = Math.max(...allPrices) * 1.001;
  const priceRange = maxPrice - minPrice;

  const maxVolume = Math.max(...data.map(c => c.volume));
  
  const candleWidth = (width - padding * 2) / data.length;

  const getY = (price: number) => height - volumeHeight - padding - ((price - minPrice) / priceRange) * (height - volumeHeight - padding * 2);
  const getX = (index: number) => padding + index * candleWidth + candleWidth / 2;
  const getVolumeY = (vol: number) => height - (vol / maxVolume) * volumeHeight;

  return (
    <div className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col h-[500px]">
      {error && <div className="mb-4 text-xs bg-rose-500/10 text-rose-500 text-center py-2 rounded">Using mock data (Binance API unavailable)</div>}
      <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold text-white">{symbol} Chart</h3>
          <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
            {["1m", "5m", "15m", "30m", "1h", "4h", "1D", "1W"].map((tf) => (
              <button 
                key={tf} 
                onClick={() => setInterval(tf)}
                className={`px-2 py-1 text-[10px] font-bold rounded ${interval === tf ? "bg-zinc-800 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"}`}>
                {tf}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowSMA(!showSMA)} className={`text-[10px] px-2 py-1 rounded border ${showSMA ? 'border-emerald-500 text-emerald-400' : 'border-zinc-700 text-zinc-500'}`}>SMA</button>
            <button onClick={() => setShowEMA(!showEMA)} className={`text-[10px] px-2 py-1 rounded border ${showEMA ? 'border-emerald-500 text-emerald-400' : 'border-zinc-700 text-zinc-500'}`}>EMA</button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden select-none">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          {/* Candles */}
          {data.map((candle, i) => {
            const isBullish = candle.close >= candle.open;
            const x = getX(i);
            const color = isBullish ? "#10b981" : "#f43f5e";

            return (
              <g key={i}>
                <line x1={x} y1={getY(candle.high)} x2={x} y2={getY(candle.low)} stroke={color} strokeWidth="1" />
                <rect x={x - candleWidth / 3} y={Math.min(getY(candle.open), getY(candle.close))} width={(candleWidth / 3) * 2} height={Math.max(Math.abs(getY(candle.open) - getY(candle.close)), 1)} fill={color} />
                {/* Volume */}
                <rect x={x - candleWidth / 3} y={getVolumeY(candle.volume)} width={(candleWidth / 3) * 2} height={height - getVolumeY(candle.volume)} fill={color} opacity="0.3" />
              </g>
            );
          })}
          {/* SMA Line */}
          {showSMA && <polyline points={smaValues.map((v, i) => v ? `${getX(i)},${getY(v)}` : '').join(' ')} fill="none" stroke="#fbbf24" strokeWidth="2" />}
        </svg>
      </div>
    </div>
  );
}
