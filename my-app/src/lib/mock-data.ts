export interface MarketPair {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: number;
}

export interface MarketTicker {
    symbol: string;
    baseAsset: string;
    lastPrice: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
}

export interface Candlestick {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const mockMarkets: MarketPair[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", price: 65432.10, change24h: 2.5, high24h: 66000, low24h: 64000, volume: 15420.5 },
  { symbol: "ETHUSDT", name: "Ethereum", price: 3456.78, change24h: -1.2, high24h: 3500, low24h: 3400, volume: 45200.2 },
  { symbol: "SOLUSDT", name: "Solana", price: 145.67, change24h: 5.8, high24h: 150, low24h: 135, volume: 125000.7 },
  { symbol: "ADAUSDT", name: "Cardano", price: 0.38, change24h: 0.5, high24h: 0.40, low24h: 0.37, volume: 500000.0 },
];

export const generateMockCandles = (): Candlestick[] => {
  const now = Date.now();
  return Array.from({ length: 24 }).map((_, i) => ({
    time: now - (23 - i) * 60 * 60 * 1000,
    open: 60000 + Math.random() * 5000,
    high: 65000 + Math.random() * 1000,
    low: 59000 - Math.random() * 1000,
    close: 60000 + Math.random() * 5000,
    volume: 10 + Math.random() * 100,
  }));
};

export const MOCK_ORDER_BOOK = {
  asks: [
    { price: 94155.50, amount: 0.1245, total: 11722.34 },
    { price: 94154.20, amount: 0.5400, total: 50843.26 },
    { price: 94153.10, amount: 0.8920, total: 83984.56 },
  ],
  bids: [
    { price: 94152.00, amount: 0.4500, total: 42368.40 },
    { price: 94151.50, amount: 1.2000, total: 112981.80 },
    { price: 94150.00, amount: 0.8500, total: 79987.50 },
  ]
};
