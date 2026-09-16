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
  { symbol: "BTCUSDT", name: "BTC", price: 76265.99, change24h: 0.33, high24h: 76560.76, low24h: 75064.82, volume: 15208 },
  { symbol: "ETHUSDT", name: "ETH", price: 2414.67, change24h: 0.23, high24h: 2430.64, low24h: 2369.11, volume: 330214 },
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
  { symbol: "WAVESUSDT", name: "WAVES", price: 1.08, change24h: 11.97, high24h: 1.08, low24h: 0.95, volume: 435098 },
  { symbol: "BTTUSDT", name: "BTT", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "USDSOLDUSDT", name: "USDSOLD", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "ONGUSDT", name: "ONG", price: 0.08, change24h: 0.68, high24h: 0.08, low24h: 0.07, volume: 8930917 },
  { symbol: "HOTUSDT", name: "HOT", price: 0.00, change24h: -1.37, high24h: 0.00, low24h: 0.00, volume: 313927212 },
  { symbol: "ZILUSDT", name: "ZIL", price: 0.00, change24h: 4.59, high24h: 0.00, low24h: 0.00, volume: 1040610465 },
  { symbol: "ZRXUSDT", name: "ZRX", price: 0.11, change24h: -4.88, high24h: 0.11, low24h: 0.10, volume: 2005322 },
  { symbol: "FETUSDT", name: "FET", price: 0.15, change24h: 0.85, high24h: 0.15, low24h: 0.15, volume: 56769830 },
  { symbol: "BATUSDT", name: "BAT", price: 0.07, change24h: -0.42, high24h: 0.07, low24h: 0.07, volume: 2951794 },
  { symbol: "XMRUSDT", name: "XMR", price: 118.70, change24h: 4.77, high24h: 119.60, low24h: 110.40, volume: 5017 },
  { symbol: "ZECUSDT", name: "ZEC", price: 1294.72, change24h: 14.90, high24h: 1385.65, low24h: 1098.88, volume: 412177 },
  { symbol: "IOSTUSDT", name: "IOST", price: 0.00, change24h: 14.67, high24h: 0.00, low24h: 0.00, volume: 7403703057 },
  { symbol: "CELRUSDT", name: "CELR", price: 0.00, change24h: -0.49, high24h: 0.00, low24h: 0.00, volume: 138267002 },
  { symbol: "DASHUSDT", name: "DASH", price: 55.40, change24h: 9.34, high24h: 57.54, low24h: 49.93, volume: 429408 },
  { symbol: "NANOUSDT", name: "NANO", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "OMGUSDT", name: "OMG", price: 0.38, change24h: -0.78, high24h: 0.39, low24h: 0.37, volume: 1799285 },
  { symbol: "THETAUSDT", name: "THETA", price: 0.18, change24h: -2.12, high24h: 0.18, low24h: 0.17, volume: 3347134 },
  { symbol: "ENJUSDT", name: "ENJ", price: 0.02, change24h: -1.18, high24h: 0.03, low24h: 0.02, volume: 29706550 },
  { symbol: "MITHUSDT", name: "MITH", price: 0.00, change24h: -5.22, high24h: 0.00, low24h: 0.00, volume: 121888804 },
  { symbol: "MATICUSDT", name: "MATIC", price: 0.38, change24h: -0.29, high24h: 0.38, low24h: 0.38, volume: 2834467 },
  { symbol: "ATOMUSDT", name: "ATOM", price: 1.49, change24h: -1.90, high24h: 1.52, low24h: 1.47, volume: 1056372 },
  { symbol: "TFUELUSDT", name: "TFUEL", price: 0.01, change24h: -0.43, high24h: 0.01, low24h: 0.01, volume: 29124606 },
  { symbol: "ONEUSDT", name: "ONE", price: 0.00, change24h: -1.60, high24h: 0.00, low24h: 0.00, volume: 547878935 },
  { symbol: "FTMUSDT", name: "FTM", price: 0.70, change24h: -0.77, high24h: 0.71, low24h: 0.69, volume: 1858967 },
  { symbol: "ALGOUSDT", name: "ALGO", price: 0.09, change24h: -2.01, high24h: 0.09, low24h: 0.09, volume: 33473760 },
  { symbol: "USDSBUSDT", name: "USDSB", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "GTOUSDT", name: "GTO", price: 0.01, change24h: -8.05, high24h: 0.01, low24h: 0.01, volume: 41038500 },
  { symbol: "ERDUSDT", name: "ERD", price: 0.00, change24h: 0.00, high24h: 0.00, low24h: 0.00, volume: 0 },
  { symbol: "DOGEUSDT", name: "DOGE", price: 0.08, change24h: 0.21, high24h: 0.08, low24h: 0.08, volume: 678611946 },
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
