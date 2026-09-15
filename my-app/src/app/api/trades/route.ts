import { NextResponse } from 'next/server';

interface BinanceTrade {
    id: number;
    price: string;
    qty: string;
    time: number;
    isBuyerMaker: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTCUSDT';

  try {
    const response = await fetch(`https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=15`, {
      next: { revalidate: 5 } 
    });

    if (!response.ok) throw new Error('Failed to fetch from Binance');

    const data: BinanceTrade[] = await response.json();

    const trades = data.map((t) => ({
        id: t.id,
        price: parseFloat(t.price),
        amount: parseFloat(t.qty),
        time: t.time,
        isBuyerMaker: t.isBuyerMaker
    }));

    return NextResponse.json(trades);
  } catch (error) {
    console.error('Binance trades error:', error);
    return NextResponse.json([]);
  }
}
