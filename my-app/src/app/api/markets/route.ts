import { NextResponse } from 'next/server';
import { mockMarkets } from '@/lib/mock-data';

export async function GET() {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr', {
      signal: controller.signal,
      next: { revalidate: 60 } 
    });
    clearTimeout(id);

    if (!response.ok) {
        console.error('Binance API response not ok:', response.status, response.statusText);
        throw new Error(`Failed to fetch from Binance: ${response.status} ${response.statusText}`);
    }

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
    clearTimeout(id);
    console.error('Binance markets error:', error);
    // Return mock data if fetch fails
    return NextResponse.json(mockMarkets);
  }
}
