import { NextResponse } from 'next/server';
import { generateMockCandles } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTCUSDT';
  const interval = searchParams.get('interval') || '1h';

  try {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=24`);

    if (!response.ok) throw new Error('Failed to fetch from Binance');

    const data = await response.json();

    if (!Array.isArray(data)) throw new Error('Invalid data format from Binance');

    const candles = data.map((d: (string | number)[]) => ({
      time: d[0],
      open: parseFloat(d[1] as string),
      high: parseFloat(d[2] as string),
      low: parseFloat(d[3] as string),
      close: parseFloat(d[4] as string),
      volume: parseFloat(d[5] as string),
    }));

    return NextResponse.json(candles);
  } catch (error) {
    console.error('Binance klines error:', error);
    return NextResponse.json(generateMockCandles());
  }
}
