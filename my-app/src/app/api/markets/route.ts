import { NextResponse } from 'next/server';
import { mockMarkets } from '@/lib/mock-data';

export async function GET() {
  // Directly return mock data for now to bypass the 451 error from Binance API
  console.log('Bypassing Binance API, returning mock data.');
  return NextResponse.json(mockMarkets);
}
