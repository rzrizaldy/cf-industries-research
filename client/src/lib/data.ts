// All dashboard data — sourced from Phase 1A-E intelligence gathering + finance tools
// Updated April 2, 2026

export const meta = {
  title: "CF Industries (CF)",
  subtitle: "The Fertilizer Shock Trade",
  tagline: "Hormuz Crisis Second-Order Mispricing",
  date: "April 2, 2026",
  crisisDay: 34,
  position: "LONG",
  targetPrice: 185,
  currentPrice: 134.96,
  upsidePct: 37,
  stopLoss: 108,
  riskReward: "2.5:1",
  timeframe: "6-12 months",
  confidence: "HIGH",
};

export const criteriaMet = [
  { name: "Underpriced Tail Risk", met: true, detail: "Analysts rate HOLD at $115.50 avg PT while stock trades at $134.96. Polymarket gives only 12% chance of Hormuz normalizing by April 30." },
  { name: "Physical Supply Chain Confirmation", met: true, detail: "Qatar fertilizer exports halted (force majeure at 77 mtpa Ras Laffan). 1,900 vessels stranded. Hormuz transits down 95-100% from 138/day baseline." },
  { name: "Second-Order Beneficiary", met: true, detail: "CF benefits indirectly: cheap US Henry Hub gas ($2.81) vs $15+ global LNG. Competitor supply disrupted. Not a direct Hormuz play." },
  { name: "Prediction Market Divergence", met: true, detail: "Polymarket: only 12% chance Hormuz normalizes by April 30. Only 23% chance US escorts ships through. NOT reflected in consensus estimates." },
  { name: "Catalyst Within 3-6 Months", met: true, detail: "April 6 Trump deadline, April 19 sanctions waiver expiry, Q2 planting season demand surge, Q1 2026 earnings report." },
  { name: "Asymmetric Risk/Reward", met: true, detail: "Downside to $108 (17%). Upside to $185+ (42%). 2.5:1 risk-reward ratio." },
];

export const thesisBullets = [
  "CF Industries is a second-order beneficiary of Hormuz closure that consensus has failed to price",
  "US natural gas at $2.81/MMBtu vs. $15+ global LNG = widest cost advantage in a decade",
  "Qatar fertilizer exports halted (force majeure) — CF's domestic production fills the gap",
  "Consensus FY2026E of $30.77 EPS assumes oil normalizes — WTI just spiked to $112.87, Brent $109",
  "If disruption persists through Q2 planting season, FY2026 EPS could reach $38-50",
];

export const oilTimeline = [
  { date: "Feb 28", event: "Operation Epic Fury launched", oil: 75, marker: true },
  { date: "Mar 1", event: "IRGC declares Hormuz closed", oil: 85, marker: false },
  { date: "Mar 7", event: "1 transit/day. VLCC $423K record", oil: 90, marker: false },
  { date: "Mar 12", event: "Transits -92%. 984 tankers stuck", oil: 95, marker: false },
  { date: "Mar 18", event: "Qatar LNG force majeure", oil: 100, marker: true },
  { date: "Mar 21", event: "US bombs Natanz nuclear site", oil: 106, marker: false },
  { date: "Mar 25", event: "Iran rejects peace plan", oil: 107, marker: true },
  { date: "Mar 31", event: "Day 32. B-52 overland missions", oil: 105, marker: false },
  { date: "Apr 1", event: "Trump: Epic Fury 'nearing completion'. QatarEnergy tanker attacked", oil: 101, marker: true },
  { date: "Apr 2", event: "Day 34. Oil surges — WTI $113, Brent $109", oil: 109, marker: true },
];

export const predictionMarkets = {
  conflict: [
    { market: "US forces enter Iran by Apr 30", prob: 68, volume: "$62M", trend: "up" as const },
    { market: "US-Iran ceasefire by Apr 30", prob: 34, volume: "$66M", trend: "down" as const },
    { market: "US-Iran ceasefire by Dec 31", prob: 76, volume: "$66M", trend: "up" as const },
    { market: "US escorts ship through Hormuz by Apr 30", prob: 23, volume: "$3M", trend: "down" as const },
  ],
  hormuz: [
    { market: "Normal traffic by Apr 30", prob: 12, source: "Polymarket", trend: "down" as const },
    { market: "20+ ships transit any day by Apr 30", prob: 42, source: "Polymarket", trend: "flat" as const },
    { market: "Normal traffic by Jun 1", prob: 67, source: "Kalshi", trend: "up" as const },
  ],
  oil: [
    { market: "WTI hits $100 in April", prob: 99, trend: "up" as const },
    { market: "WTI hits $110 in April", prob: 85, trend: "up" as const },
    { market: "WTI hits $120 in April", prob: 58, trend: "up" as const },
    { market: "WTI hits $130 in April", prob: 40, trend: "up" as const },
    { market: "WTI hits $150 in April", prob: 20, trend: "flat" as const },
  ],
  macro: [
    { market: "US recession 2026", prob: 40, source: "Kalshi", trend: "up" as const },
    { market: "Fed holds April FOMC", prob: 100, source: "Kalshi", trend: "flat" as const },
    { market: "0 rate cuts in 2026", prob: 35, source: "Polymarket", trend: "up" as const },
  ],
};

export const hormuzData = {
  baselineTransits: 138,
  currentTransits: 2,
  disruptionPct: 98,
  oilFlowBaseline: 20,
  oilFlowCurrent: 1,
  vesselsStranded: 1900,
  seafarersTrapped: 20000,
  vesselsAttacked: 20,
  vlccPeakRate: 423736,
  warRiskMultiplier: "10x",
  capeDiversionsIncrease: 360,
};

export const commodities = [
  { name: "Brent Crude", ticker: "BZUSD", price: 109.02, change: 7.86, yearLow: 58.39, yearHigh: 119.40 },
  { name: "WTI Crude", ticker: "CLUSD", price: 112.87, change: 12.75, yearLow: 54.98, yearHigh: 119.48 },
  { name: "Natural Gas", ticker: "NGUSD", price: 2.81, change: -0.01, yearLow: 2.62, yearHigh: 7.83 },
];

export const cfFinancials = {
  quarterly: [
    { period: "Q1 '25", revenue: 1663, grossProfit: 677, ebitda: 695, netIncome: 312, eps: 1.85, fcf: 452 },
    { period: "Q2 '25", revenue: 1890, grossProfit: 846, ebitda: 903, netIncome: 386, eps: 2.37, fcf: 318 },
    { period: "Q3 '25", revenue: 1659, grossProfit: 632, ebitda: 823, netIncome: 353, eps: 2.19, fcf: 717 },
    { period: "Q4 '25", revenue: 1872, grossProfit: 769, ebitda: 871, netIncome: 404, eps: 2.59, fcf: 313 },
  ],
  annual: {
    revenue: 7084, ebitda: 3292, netIncome: 1455, eps: 9.00, fcf: 1800,
    ebitdaMargin: 46.5, cash: 1982, debt: 3947,
  },
  estimates: {
    fy2026: { eps: 30.77, revenue: 6965, ebitda: 2714, fcf: 1904 },
    fy2027: { eps: 21.41, revenue: 6733, ebitda: 2273, fcf: 1295 },
  },
  segments: [
    { name: "Ammonia", revenue: 547, margin: 228, volume: 1156, color: "hsl(38, 92%, 55%)" },
    { name: "Granular Urea", revenue: 497, margin: 240, volume: 1225, color: "hsl(173, 80%, 40%)" },
    { name: "UAN", revenue: 490, margin: 182, volume: 1826, color: "hsl(215, 70%, 50%)" },
    { name: "AN", revenue: 141, margin: 42, volume: 455, color: "hsl(280, 65%, 55%)" },
    { name: "Other", revenue: 197, margin: 77, volume: 761, color: "hsl(340, 75%, 55%)" },
  ],
};

export const analystRatings = {
  consensus: "HOLD",
  totalRatings: 10,
  bullish: 3,
  neutral: 5,
  bearish: 2,
  avgPT: 115.50,
  medianPT: 111.50,
  highPT: 150,
  lowPT: 85,
  recent: [
    { date: "Mar 31", firm: "Mizuho", rating: "Underperform", pt: 105, sentiment: "bearish" as const },
    { date: "Mar 26", firm: "UBS", rating: "Neutral", pt: 140, sentiment: "neutral" as const },
    { date: "Mar 18", firm: "BofA", rating: "Underperform", pt: 103, sentiment: "bearish" as const },
    { date: "Feb 20", firm: "Wells Fargo", rating: "Overweight", pt: 113, sentiment: "bullish" as const },
    { date: "Feb 2", firm: "Scotiabank", rating: "Sector Perform", pt: 82, sentiment: "neutral" as const },
  ],
};

export const insiderActivity = [
  { date: "Mar 17", name: "Bert A. Frost (SVP Sales)", type: "SALE", shares: 6000, price: 126.00 },
  { date: "Mar 17", name: "Richard A. Hoker (SVP)", type: "SALE", shares: 3499, price: 125.38 },
  { date: "Mar 17", name: "Erik M. Mayer (VP)", type: "SALE", shares: 1500, price: 124.69 },
  { date: "Mar 2", name: "Ashraf K. Malik (SVP)", type: "SALE", shares: 8631, price: 103.08 },
];

export const peers = [
  { ticker: "CF", name: "CF Industries", price: 134.96, pe: 15.05, marketCap: "20.7B", ebitdaMargin: 46.5, isCurrent: true },
  { ticker: "NTR", name: "Nutrien", price: 76.81, pe: 16.48, marketCap: "37.2B", ebitdaMargin: 22.0, isCurrent: false },
  { ticker: "MOS", name: "Mosaic", price: 26.53, pe: 15.61, marketCap: "8.4B", ebitdaMargin: 18.5, isCurrent: false },
  { ticker: "LXU", name: "LSB Industries", price: 15.77, pe: 46.37, marketCap: "1.1B", ebitdaMargin: 12.0, isCurrent: false },
];

export const variantPerception = [
  { factor: "Hormuz Duration", consensus: "Reopens by late April/early May", ourView: "75%+ probability remains closed through April 15. 33% closed through June 1.", edge: "Prediction markets vs. analyst assumptions" },
  { factor: "Natural Gas Cost Advantage", consensus: "Henry Hub at $2.89 is temporary; global LNG normalizes", ourView: "Qatar LNG facility damage takes YEARS to repair. Global gas prices stay elevated.", edge: "Physical supply chain data (QatarEnergy force majeure)" },
  { factor: "Fertilizer Pricing", consensus: "FY2026 rev $6.96B implies modest price increases", ourView: "If Hormuz closed during planting, fertilizer prices spike 30-50%. Revenue could hit $8-9B.", edge: "Second-order supply chain analysis" },
  { factor: "FY2026 EPS", consensus: "$30.77", ourView: "$38-45 if disruption persists through Q2", edge: "Unmodeled scenario in consensus" },
];

export const scenarioAnalysis = [
  { scenario: "Bear: Quick Resolution", probability: 20, oil: "$70-80", cfEps: "$22-25", cfPrice: "$95-110", returnPct: -20, color: "hsl(0, 70%, 50%)" },
  { scenario: "Base: Prolonged Partial Closure", probability: 45, oil: "$95-115", cfEps: "$35-40", cfPrice: "$155-175", returnPct: 25, color: "hsl(38, 92%, 55%)" },
  { scenario: "Bull: Extended Full Closure", probability: 25, oil: "$120-140", cfEps: "$42-50", cfPrice: "$185-220", returnPct: 55, color: "hsl(120, 60%, 45%)" },
  { scenario: "Tail: Dual Chokepoint", probability: 10, oil: "$140-170", cfEps: "$50-60+", cfPrice: "$220-280", returnPct: 90, color: "hsl(173, 80%, 40%)" },
];

export const killConditions = [
  "Rapid Hormuz reopening (ceasefire + commercial transit restoration — Polymarket gives only 12% by Apr 30)",
  "US natural gas spikes above $6/MMBtu (erodes cost advantage)",
  "Global recession drives fertilizer demand destruction (-15%+ volumes)",
  "CF-specific operational disruption (plant outage, logistics failure)",
];

export const catalysts = [
  { date: "Apr 6", event: "Trump deadline: Iran deal or intensified strikes", impact: "HIGH" as const },
  { date: "Apr 10", event: "March CPI — first data capturing full oil spike", impact: "MEDIUM" as const },
  { date: "Apr 15", event: "Hormuz reopening checkpoint (12% chance by Polymarket)", impact: "HIGH" as const },
  { date: "Apr 19", event: "OFAC Iran oil sanctions waiver expires", impact: "HIGH" as const },
  { date: "May", event: "CF Q1 2026 earnings — first Hormuz premium quarter", impact: "CRITICAL" as const },
  { date: "May-Jun", event: "Peak N. Hemisphere planting season", impact: "HIGH" as const },
];

export const macroSnapshot = {
  fedRate: "3.50-3.75%",
  cpiYoy: "2.4%",
  coreCpiYoy: "2.5%",
  ppiYoy: "3.4%",
  nfp: "-92,000",
  unemployment: "4.4%",
  lfpr: "62.0%",
  tenYear: "4.33%",
  twoYear: "3.80%",
  dxy: "100.07",
};

export const sources = {
  predictionMarkets: [
    { name: "Polymarket", url: "https://polymarket.com" },
    { name: "Kalshi", url: "https://kalshi.com" },
  ],
  shipping: [
    { name: "Lloyd's List", url: "https://www.lloydslist.com" },
    { name: "Kpler", url: "https://www.kpler.com" },
    { name: "Windward", url: "https://windward.ai" },
  ],
  osint: [
    { name: "ACLED", url: "https://acleddata.com" },
    { name: "Critical Threats (ISW)", url: "https://www.criticalthreats.org" },
    { name: "OSINT Pulse", url: "https://osintpulse.substack.com" },
  ],
  macro: [
    { name: "BLS", url: "https://www.bls.gov" },
    { name: "FRED", url: "https://fred.stlouisfed.org" },
    { name: "CNBC", url: "https://www.cnbc.com" },
  ],
  finance: [
    { name: "Perplexity Finance (CF)", url: "https://perplexity.ai/finance/CF" },
    { name: "Perplexity Finance (NTR)", url: "https://perplexity.ai/finance/NTR" },
  ],
};
