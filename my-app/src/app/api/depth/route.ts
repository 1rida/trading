import { NextResponse } from 'next/server';
import { MOCK_ORDER_BOOK } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTCUSDT';

  try {
    const response = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=10`, {
      next: { revalidate: 5 } 
    });

    if (!response.ok) throw new Error('Failed to fetch from Binance');

    const data = await response.json();

    const orderBook = {
        asks: data.asks.map((a: string[]) => ({ price: parseFloat(a[0]), amount: parseFloat(a[1]) })),
        bids: data.bids.map((b: string[]) => ({ price: parseFloat(b[0]), amount: parseFloat(b[1]) }))
    };

    return NextResponse.json(orderBook);
  } catch (error) {
    console.error('Binance depth error:', error);
    return NextResponse.json(MOCK_ORDER_BOOK);
  }
}
