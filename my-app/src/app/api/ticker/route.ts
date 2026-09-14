import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTCUSDT';

  try {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`, {
      next: { revalidate: 10 } 
    });

    if (!response.ok) throw new Error('Failed to fetch from Binance');

    const m = await response.json();

    const ticker = {
      symbol: m.symbol,
      price: parseFloat(m.lastPrice),
      change24h: parseFloat(m.priceChangePercent),
      high24h: parseFloat(m.highPrice),
      low24h: parseFloat(m.lowPrice),
      volume: parseFloat(m.volume)
    };

    return NextResponse.json(ticker);
  } catch (error) {
    console.error('Binance ticker error:', error);
    return NextResponse.json({ error: 'Failed to fetch ticker data' }, { status: 500 });
  }
}
