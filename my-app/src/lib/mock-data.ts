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
  { symbol: "BTCUSDT", name: "Bitcoin", price: 76265.99, change24h: 0.33, high24h: 76560.76, low24h: 75064.82, volume: 15208 },
  { symbol: "ETHUSDT", name: "Ethereum", price: 2414.67, change24h: 0.23, high24h: 2430.64, low24h: 2369.11, volume: 330214 },
  { symbol: "BNBUSDT", name: "BNB", price: 720.40, change24h: 0.43, high24h: 721.93, low24h: 704.29, volume: 126013 },
  { symbol: "BCCUSDT", name: "BCC", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "NEOUSDT", name: "NEO", price: 2.07, change24h: -0.81, high24h: 2.11, low24h: 2.02, volume: 211856 },
  { symbol: "LTCUSDT", name: "LTC", price: 51.23, change24h: -0.60, high24h: 51.57, low24h: 50.20, volume: 370858 },
  { symbol: "QTUMUSDT", name: "QTUM", price: 0.86, change24h: -1.03, high24h: 0.87, low24h: 0.84, volume: 163631 },
  { symbol: "ADAUSDT", name: "ADA", price: 0.20, change24h: -0.71, high24h: 0.20, low24h: 0.19, volume: 147156663 },
  { symbol: "XRPUSDT", name: "XRP", price: 1.31, change24h: 1.85, high24h: 1.32, low24h: 1.25, volume: 214680682 },
  { symbol: "EOSUSDT", name: "EOS", price: 0.78, change24h: -0.66, high24h: 0.80, low24h: 0.77, volume: 1180285 },
  { symbol: "TUSDUSDT", name: "TUSD", price: 1.00, change24h: 0.01, high24h: 1.00, low24h: 1.00, volume: 53722 },
  { symbol: "IOTAUSDT", name: "IOTA", price: 0.04, change24h: -0.51, high24h: 0.04, low24h: 0.04, volume: 16612948 },
  { symbol: "XLMUSDT", name: "XLM", price: 0.18, change24h: 2.60, high24h: 0.18, low24h: 0.17, volume: 130486909 },
  { symbol: "ONTUSDT", name: "ONT", price: 0.05, change24h: 0.27, high24h: 0.05, low24h: 0.05, volume: 6718339 },
  { symbol: "TRXUSDT", name: "TRX", price: 0.34, change24h: 0.90, high24h: 0.34, low24h: 0.33, volume: 85486486 },
  { symbol: "ETCUSDT", name: "ETC", price: 7.29, change24h: 0.97, high24h: 7.30, low24h: 7.09, volume: 233331 },
  { symbol: "ICXUSDT", name: "ICX", price: 0.01, change24h: -14.96, high24h: 0.01, low24h: 0.01, volume: 32136814 },
  { symbol: "VENUSDT", name: "VEN", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "NULSUSDT", name: "NULS", price: 0.03, change24h: -7.19, high24h: 0.03, low24h: 0.02, volume: 6282246 },
  { symbol: "VETUSDT", name: "VET", price: 0.01, change24h: -1.80, high24h: 0.01, low24h: 0.01, volume: 237672986 },
  { symbol: "PAXUSDT", name: "PAX", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "BCHABCUSDT", name: "BCHABC", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "BCHSVUSDT", name: "BCHSV", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "USDCUSDT", name: "USDC", price: 1.00, change24h: 0.03, high24h: 1.00, low24h: 1.00, volume: 3157270566 },
  { symbol: "LINKUSDT", name: "LINK", price: 10.98, change24h: -0.63, high24h: 11.07, low24h: 10.62, volume: 2224685 },
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
