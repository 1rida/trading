import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr', {
      next: { revalidate: 60 } 
    });

    if (!response.ok) throw new Error('Failed to fetch from Binance');

    const data = await response.json();

    // Map all data to expected structure, filtering for USDT pairs
    const markets = data
      .filter((m: { symbol: string }) => m.symbol.endsWith('USDT'))
      .map((m: { symbol: string, lastPrice: string, priceChangePercent: string, highPrice: string, lowPrice: string, volume: string }) => ({
        symbol: m.symbol,
        name: m.symbol.replace('USDT', ''),
        price: parseFloat(m.lastPrice),
        change24h: parseFloat(m.priceChangePercent),
        high24h: parseFloat(m.highPrice),
        low24h: parseFloat(m.lowPrice),
        volume: parseFloat(m.volume)
      }));

    return NextResponse.json(markets);
  } catch (error) {
    console.error('Binance markets error:', error);
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 });
  }
}
