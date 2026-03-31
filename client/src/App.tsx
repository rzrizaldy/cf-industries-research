import { Switch, Route, Router, Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import {
  CheckCircle2, AlertTriangle, TrendingUp, TrendingDown,
  Minus, ExternalLink, Calendar, ArrowUpRight,
} from "lucide-react";
import {
  meta, criteriaMet, thesisBullets, oilTimeline, predictionMarkets,
  hormuzData, commodities, cfFinancials, analystRatings, insiderActivity,
  peers, variantPerception, scenarioAnalysis, killConditions, catalysts,
  macroSnapshot, sources,
} from "./lib/data";

// ─── Utility ──────────────────────────────────────────────────────────
const fmt = (n: number) => n.toLocaleString();
const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;
const usd = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const Num = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`font-mono font-bold ${className}`}>{children}</span>
);

// Chart colors
const PINK = "#FF3D8F";
const BLUE = "#2B4CFF";
const TEAL = "#1ABC9C";
const ORANGE = "#FF5500";

// ─── Navigation ───────────────────────────────────────────────────────
const tabs = [
  { path: "/", label: "1. THE BIG PICTURE" },
  { path: "/geopolitical", label: "2. WAR & OIL" },
  { path: "/variant", label: "3. WHY WALL STREET IS WRONG" },
  { path: "/fundamentals", label: "4. COMPANY DEEP DIVE" },
  { path: "/trade", label: "5. THE TRADE" },
];

function TopNav() {
  const [location] = useLocation();
  return (
    <header className="w-full" data-testid="top-nav">
      {/* Black title bar */}
      <div className="bg-[#1A1A1A] text-white px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-sm font-bold tracking-wider" data-testid="site-title">CF_INDUSTRIES_RESEARCH</h1>
        <span className="tag-badge bg-[#2B4CFF] text-white text-[0.6rem]" data-testid="author-badge">
          BY RIZALDY UTOMO — PUBLIC POLICY, ANALYTICS, AI MANAGEMENT @ CMU
        </span>
      </div>
      {/* Tab bar */}
      <nav className="flex flex-wrap border-b-[3px] border-[#1A1A1A] bg-white" data-testid="tab-bar">
        {tabs.map((tab) => {
          const isActive = location === tab.path;
          return (
            <Link key={tab.path} href={tab.path}>
              <button
                data-testid={`tab-${tab.path}`}
                className={`px-4 py-2.5 text-[0.7rem] font-bold tracking-wide border-r-[3px] border-[#1A1A1A] transition-colors ${
                  isActive
                    ? "bg-[#2B4CFF] text-white"
                    : "bg-white text-[#1A1A1A] hover:bg-[#F2F0E9]"
                }`}
              >
                {tab.label}
              </button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

// ─── Section Label Component ──────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return <h2 className="section-label" data-testid={`section-${children.replace(/\s/g, "_")}`}>{children}</h2>;
}

// ─── Panel Component (thick border card) ──────────────────────────────
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-[3px] border-[#1A1A1A] bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────────────
function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 overflow-y-auto h-[calc(100vh-96px)]">
      {children}
    </div>
  );
}

// ─── Trend icon ───────────────────────────────────────────────────────
function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-green-600 inline" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-red-600 inline" />;
  return <Minus className="w-3.5 h-3.5 text-gray-500 inline" />;
}

// ═════════════════════════════════════════════════════════════════════
// PAGE 1: THE BIG PICTURE
// ═════════════════════════════════════════════════════════════════════
function TheBigPicture() {
  return (
    <PageWrap>
      {/* INVESTMENT THESIS */}
      <SectionLabel>INVESTMENT_THESIS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📊 THE BIG PICTURE — WHY WE LIKE CF INDUSTRIES</div>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold">Position:</span>
            <span className="metric-blue">LONG CF</span>
            <span className="font-bold">Current Price:</span>
            <span className="metric-highlight" data-testid="current-price">{usd(meta.currentPrice)}</span>
            <span className="font-bold">Target:</span>
            <span className="metric-highlight" data-testid="target-price">{usd(meta.targetPrice)}</span>
            <span className="font-bold">Upside:</span>
            <span className="metric-green" data-testid="upside-pct">+{meta.upsidePct}%</span>
          </div>

          <div className="border-l-4 border-[#FF4D00] pl-4 py-2 bg-[#FFF8F0] text-sm leading-relaxed" data-testid="thesis-intro">
            <p className="font-bold mb-2">💡 Think of it this way:</p>
            <p>
              CF Industries makes fertilizer. They use super cheap American natural gas (<span className="metric-highlight text-sm">{usd(2.89)}</span>) to make it, while their competitors overseas have to pay 5x more (<span className="metric-highlight text-sm">$15+</span>) for energy. Right now, a military conflict has shut down the Strait of Hormuz — a narrow water passage near Iran where ~20% of the world's oil and gas flows. This means CF's competitors literally can't get the energy they need. CF wins BIG.
            </p>
          </div>
        </div>
      </Panel>

      {/* CRITERIA CHECKLIST */}
      <SectionLabel>CRITERIA_CHECKLIST</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {criteriaMet.map((c, i) => (
          <Panel key={i} className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {i === 0 && "Wall Street says HOLD — but their models assume the crisis ends soon. Prediction markets disagree."}
                  {i === 1 && "Qatar's fertilizer exports are halted. 1,900 ships are stuck. The Strait is basically closed."}
                  {i === 2 && "CF benefits indirectly — like an umbrella store making bank when it rains."}
                  {i === 3 && "People betting real money say this crisis continues. Wall Street's models haven't caught up."}
                  {i === 4 && "Multiple big events coming in April-May that could push the stock higher."}
                  {i === 5 && "We could lose ~17% (down to $108), but we could gain ~42% (up to $185). That's a 2.5:1 payoff."}
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      {/* CORE THESIS */}
      <SectionLabel>CORE_THESIS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🎯 THE 5 KEY REASONS</div>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3 items-start">
            <span className="metric-blue text-xs flex-shrink-0">01</span>
            <span>CF doesn't sell oil, but they win BIG when oil prices go crazy — kind of like how an umbrella store makes more money when it rains. Wall Street hasn't figured this out yet.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="metric-blue text-xs flex-shrink-0">02</span>
            <span>US natural gas costs <span className="metric-highlight text-xs">{usd(2.89)}</span> vs <span className="metric-highlight text-xs">$15+</span> globally — that's the biggest cost advantage in over a decade.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="metric-blue text-xs flex-shrink-0">03</span>
            <span>Qatar (a major competitor) declared a "force majeure" — an emergency so big they legally can't deliver fertilizer. CF fills the gap.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="metric-blue text-xs flex-shrink-0">04</span>
            <span>Wall Street thinks CF will earn <span className="metric-highlight text-xs">$30.77</span> per share next year. But they're assuming oil prices go back to normal. Prediction markets say that's unlikely.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="metric-blue text-xs flex-shrink-0">05</span>
            <span>If the crisis lasts through spring planting season, CF could actually earn <span className="metric-highlight text-xs">$38-50</span> per share — way more than expected.</span>
          </li>
        </ol>
      </Panel>

      {/* POSITION SUMMARY */}
      <SectionLabel>POSITION_SUMMARY</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">💰 OUR TRADE</div>
        <table className="w-full text-sm border-collapse" data-testid="position-table">
          <thead>
            <tr className="border-b-[3px] border-[#1A1A1A]">
              <th className="text-left py-2 font-bold">METRIC</th>
              <th className="text-right py-2 font-bold">VALUE</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              ["Entry Price", usd(meta.currentPrice)],
              ["Target Price", usd(meta.targetPrice)],
              ["Stop Loss (emergency exit)", usd(meta.stopLoss)],
              ["Risk-Reward Ratio", meta.riskReward],
              ["Timeframe", meta.timeframe],
              ["Confidence", meta.confidence],
            ].map(([label, val], i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2.5">{label}</td>
                <td className="py-2.5 text-right">
                  <span className={i < 3 ? "metric-highlight text-xs" : "font-bold"}>{val}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-3">💡 Stop loss = the price where we'd sell to limit our losses — like an emergency exit.</p>
      </Panel>
    </PageWrap>
  );
}

// ═════════════════════════════════════════════════════════════════════
// PAGE 2: WAR & OIL
// ═════════════════════════════════════════════════════════════════════
function WarAndOil() {
  return (
    <PageWrap>
      {/* CRISIS STATUS */}
      <SectionLabel>CRISIS_STATUS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🔴 OPERATION EPIC FURY — LIVE STATUS</div>
        <div className="text-center space-y-3">
          <div className="text-3xl font-bold">Day <span className="metric-highlight text-3xl">{meta.crisisDay}</span> of Operation Epic Fury</div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span>Brent Crude: <span className="metric-highlight">{usd(commodities[0].price)}</span></span>
            <span>WTI: <span className="metric-highlight">{usd(commodities[1].price)}</span></span>
            <span>Nat Gas: <span className="metric-green">{usd(commodities[2].price)}</span></span>
            <span>Strait Transits: <span className="metric-blue">{hormuzData.currentTransits}/day</span> (was {hormuzData.baselineTransits})</span>
          </div>
        </div>
      </Panel>

      {/* WHAT HAPPENED — Oil Timeline */}
      <SectionLabel>WHAT_HAPPENED</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📈 OIL PRICES SINCE THE CRISIS STARTED</div>
        <p className="text-sm mb-4 text-gray-600">Here's what happened to oil prices since the crisis started. Each jump matches a major escalation:</p>
        <div className="h-[300px]" data-testid="oil-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={oilTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} domain={[70, 115]} />
              <RechartsTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white border-[2px] border-[#1A1A1A] p-3 text-xs">
                      <div className="font-bold">{d.date}</div>
                      <div>Oil: <span className="metric-highlight text-xs">${d.oil}</span></div>
                      <div className="text-gray-600 mt-1">{d.event}</div>
                    </div>
                  );
                }}
              />
              <Area type="monotone" dataKey="oil" stroke={ORANGE} fill={ORANGE} fillOpacity={0.15} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 space-y-1">
          {oilTimeline.filter(t => t.marker).map((t, i) => (
            <div key={i} className="text-xs flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF4D00] inline-block flex-shrink-0"></span>
              <span className="font-bold">{t.date}:</span>
              <span className="text-gray-600">{t.event}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* PREDICTION MARKETS */}
      <SectionLabel>PREDICTION_MARKETS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🎰 WHERE PEOPLE BET REAL MONEY ON WHAT HAPPENS NEXT</div>
        <p className="text-sm mb-4 text-gray-600">
          These are websites where people bet <strong>REAL MONEY</strong> on what they think will happen next. Think of it like sports betting, but for world events. When 68% of bettors say something will happen, that's a strong signal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conflict */}
          <div>
            <div className="text-xs font-bold mb-3 uppercase tracking-wider">⚔️ Military Conflict</div>
            {predictionMarkets.conflict.map((m, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{m.market}</span>
                  <span className="font-bold">{m.prob}% <TrendIcon trend={m.trend} /></span>
                </div>
                <div className="w-full h-4 bg-gray-100 border border-[#1A1A1A]">
                  <div className="h-full bg-[#FF3D8F]" style={{ width: `${m.prob}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Hormuz */}
          <div>
            <div className="text-xs font-bold mb-3 uppercase tracking-wider">🚢 Strait of Hormuz</div>
            {predictionMarkets.hormuz.map((m, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{m.market}</span>
                  <span className="font-bold">{m.prob}% <TrendIcon trend={m.trend} /></span>
                </div>
                <div className="w-full h-4 bg-gray-100 border border-[#1A1A1A]">
                  <div className="h-full bg-[#2B4CFF]" style={{ width: `${m.prob}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Oil */}
          <div>
            <div className="text-xs font-bold mb-3 uppercase tracking-wider">🛢️ Oil Prices</div>
            {predictionMarkets.oil.map((m, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{m.market}</span>
                  <span className="font-bold">{m.prob}% <TrendIcon trend={m.trend} /></span>
                </div>
                <div className="w-full h-4 bg-gray-100 border border-[#1A1A1A]">
                  <div className="h-full bg-[#FF5500]" style={{ width: `${m.prob}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Macro */}
          <div>
            <div className="text-xs font-bold mb-3 uppercase tracking-wider">🌍 Big-Picture Economy</div>
            {predictionMarkets.macro.map((m, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{m.market}</span>
                  <span className="font-bold">{m.prob}% <TrendIcon trend={m.trend} /></span>
                </div>
                <div className="w-full h-4 bg-gray-100 border border-[#1A1A1A]">
                  <div className="h-full bg-[#1ABC9C]" style={{ width: `${m.prob}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* SHIPPING CHAOS */}
      <SectionLabel>SHIPPING_CHAOS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🚢 STRAIT OF HORMUZ — THE BOTTLENECK</div>
        <p className="text-sm mb-4 text-gray-600">
          The Strait of Hormuz is a narrow water passage near Iran. About 20% of the world's oil passes through it every day. Right now, it's basically shut down.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Normal Daily Transits", value: String(hormuzData.baselineTransits), badge: "metric-blue" },
            { label: "Current Daily Transits", value: String(hormuzData.currentTransits), badge: "metric-highlight" },
            { label: "Vessels Stranded", value: fmt(hormuzData.vesselsStranded), badge: "metric-highlight" },
            { label: "Disruption Level", value: `${hormuzData.disruptionPct}%`, badge: "metric-highlight" },
            { label: "Oil Flow (M bbl/day)", value: `${hormuzData.oilFlowCurrent} of ${hormuzData.oilFlowBaseline}`, badge: "metric-highlight" },
            { label: "Seafarers Trapped", value: fmt(hormuzData.seafarersTrapped), badge: "metric-blue" },
            { label: "Vessels Attacked", value: String(hormuzData.vesselsAttacked), badge: "metric-highlight" },
            { label: "War Risk Premium", value: hormuzData.warRiskMultiplier, badge: "metric-highlight" },
          ].map((s, i) => (
            <div key={i} className="border-[2px] border-[#1A1A1A] p-3 text-center">
              <div className="text-[0.65rem] text-gray-500 uppercase tracking-wider mb-2">{s.label}</div>
              <div className={`${s.badge} text-lg`} data-testid={`shipping-${i}`}>{s.value}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* COMMODITY PRICES */}
      <SectionLabel>COMMODITY_PRICES</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">💰 KEY PRICES RIGHT NOW</div>
        <table className="w-full text-sm border-collapse" data-testid="commodity-table">
          <thead>
            <tr className="border-b-[3px] border-[#1A1A1A]">
              {["Commodity", "Price", "Change", "52-Week Low", "52-Week High"].map(h => (
                <th key={h} className="text-left py-2 font-bold text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {commodities.map((c, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2.5 font-bold">{c.name}</td>
                <td className="py-2.5"><span className="metric-highlight text-xs">{usd(c.price)}</span></td>
                <td className={`py-2.5 font-bold ${c.change >= 0 ? "text-green-600" : "text-red-600"}`}>{pct(c.change)}</td>
                <td className="py-2.5 text-gray-500">{usd(c.yearLow)}</td>
                <td className="py-2.5 text-gray-500">{usd(c.yearHigh)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </PageWrap>
  );
}

// ═════════════════════════════════════════════════════════════════════
// PAGE 3: WHY WALL STREET IS WRONG
// ═════════════════════════════════════════════════════════════════════
function WhyWallStreetIsWrong() {
  return (
    <PageWrap>
      {/* THE GAP */}
      <SectionLabel>THE_GAP</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🔍 WHERE WE THINK WALL STREET IS GETTING IT WRONG</div>
        <p className="text-sm mb-4 text-gray-600">
          Here's where we think Wall Street analysts are getting it wrong. They're using old assumptions that don't account for the crisis:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse" data-testid="gap-table">
            <thead>
              <tr className="border-b-[3px] border-[#1A1A1A]">
                <th className="text-left py-2 font-bold text-xs w-[15%]">Factor</th>
                <th className="text-left py-2 font-bold text-xs w-[30%]">What Analysts Think</th>
                <th className="text-left py-2 font-bold text-xs w-[35%]">What Our Data Shows</th>
                <th className="text-left py-2 font-bold text-xs w-[20%]">Our Edge</th>
              </tr>
            </thead>
            <tbody>
              {variantPerception.map((v, i) => (
                <tr key={i} className="border-b border-gray-200 align-top">
                  <td className="py-3 font-bold text-xs">{v.factor}</td>
                  <td className="py-3 text-xs text-gray-600">{v.consensus}</td>
                  <td className="py-3 text-xs">
                    <span className="border-l-4 border-[#FF4D00] pl-2 block">{v.ourView}</span>
                  </td>
                  <td className="py-3"><span className="tag-badge bg-[#2B4CFF] text-white text-[0.6rem]">{v.edge}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* FOUR POSSIBLE FUTURES */}
      <SectionLabel>FOUR_POSSIBLE_FUTURES</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🔮 WHAT COULD HAPPEN — 4 SCENARIOS</div>
        <p className="text-sm mb-4 text-gray-600">
          Nobody knows the future, but we can think about the most likely outcomes and how each one affects CF's stock:
        </p>
        <div className="space-y-4">
          {scenarioAnalysis.map((s, i) => {
            const colors = ["#FF3D8F", "#FF5500", "#1ABC9C", "#2B4CFF"];
            const explanations = [
              "The crisis ends quickly — peace deal happens, Strait reopens, oil drops back to normal. CF goes back to being a regular fertilizer company. We lose money on this trade.",
              "The most likely outcome: Strait stays partially blocked for months. Oil stays high. CF makes more money than Wall Street expects, and the stock goes up.",
              "Crisis drags on all year. Oil stays above $120. CF becomes super profitable because their competitors can't get cheap energy. Stock could hit $185-220.",
              "Worst case for the world, best case for the trade: multiple shipping routes get blocked. Oil goes to $140+. CF profits would be extraordinary.",
            ];
            return (
              <div key={i} className="border-[2px] border-[#1A1A1A] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-sm">{s.scenario}</div>
                  <span className="metric-highlight text-xs">{s.probability}% chance</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{explanations[i]}</p>
                <div className="w-full h-5 bg-gray-100 border border-[#1A1A1A] mb-2">
                  <div className="h-full" style={{ width: `${s.probability}%`, background: colors[i] }}></div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span>Oil: <span className="font-bold">{s.oil}</span></span>
                  <span>CF EPS: <span className="font-bold">{s.cfEps}</span></span>
                  <span>CF Price: <span className="font-bold">{s.cfPrice}</span></span>
                  <span>Return: <span className={`font-bold ${s.returnPct >= 0 ? "text-green-600" : "text-red-600"}`}>{pct(s.returnPct)}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* WHEN TO BAIL */}
      <SectionLabel>WHEN_TO_BAIL</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">⚠️ THINGS THAT WOULD MAKE US WRONG</div>
        <p className="text-sm mb-4 text-gray-600">
          These are the things that would make us WRONG. If any of these happen, we sell immediately:
        </p>
        <div className="space-y-3">
          {killConditions.map((k, i) => {
            const severities = ["CRITICAL", "HIGH", "HIGH", "MEDIUM"];
            const sevColors = ["bg-red-600", "bg-[#FF5500]", "bg-[#FF5500]", "bg-yellow-500"];
            const simpleExplanations = [
              "If peace breaks out and ships start flowing through the Strait again before April 15 — game over for our thesis.",
              "If US natural gas prices spike above $6, CF loses its huge cost advantage. That's the whole reason we like them.",
              "If the world economy tanks so badly that farmers stop buying fertilizer — nobody wins.",
              "If something goes wrong at CF's own factories — a fire, explosion, or supply chain issue specific to them.",
            ];
            return (
              <div key={i} className="border-[2px] border-[#1A1A1A] p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#FF5500] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">{k}</span>
                    <span className={`tag-badge ${sevColors[i]} text-white`}>{severities[i]}</span>
                  </div>
                  <p className="text-xs text-gray-600">{simpleExplanations[i]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* KEY DATES */}
      <SectionLabel>KEY_DATES</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📅 MARK YOUR CALENDAR — DATES THAT COULD MOVE THE STOCK BIG TIME</div>
        <div className="space-y-3">
          {catalysts.map((c, i) => {
            const dotColors: Record<string, string> = { CRITICAL: "#FF3D8F", HIGH: "#FF5500", MEDIUM: "#2B4CFF" };
            const badgeColors: Record<string, string> = { CRITICAL: "bg-[#FF3D8F]", HIGH: "bg-[#FF5500]", MEDIUM: "bg-[#2B4CFF]" };
            return (
              <div key={i} className="flex items-center gap-3 text-sm border-b border-gray-200 pb-3">
                <div className="w-3 h-3 flex-shrink-0" style={{ background: dotColors[c.impact] }}></div>
                <span className="font-bold w-16 flex-shrink-0">{c.date}</span>
                <span className="flex-1">{c.event}</span>
                <span className={`tag-badge ${badgeColors[c.impact]} text-white`}>{c.impact}</span>
              </div>
            );
          })}
        </div>
      </Panel>
    </PageWrap>
  );
}

// ═════════════════════════════════════════════════════════════════════
// PAGE 4: COMPANY DEEP DIVE
// ═════════════════════════════════════════════════════════════════════
function CompanyDeepDive() {
  const segmentColors = [ORANGE, TEAL, BLUE, PINK, "#8B5CF6"];
  return (
    <PageWrap>
      {/* MEET CF INDUSTRIES */}
      <SectionLabel>MEET_CF_INDUSTRIES</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🏭 WHO IS CF INDUSTRIES?</div>
        <p className="text-sm leading-relaxed">
          <strong>CF Industries (NYSE: CF)</strong> is one of the biggest fertilizer makers in North America. They take natural gas and turn it into nitrogen-based fertilizers — the stuff farmers need to grow crops. Their main products are ammonia, urea, and UAN (a liquid fertilizer). They're headquartered in Deerfield, Illinois, and they're publicly traded, meaning anyone can buy their stock.
        </p>
      </Panel>

      {/* FINANCIAL SCORECARD */}
      <SectionLabel>FINANCIAL_SCORECARD</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📊 THE NUMBERS — HOW HEALTHY IS CF?</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
          {[
            { label: "Revenue", value: `$${(cfFinancials.annual.revenue / 1000).toFixed(1)}B`, badge: "metric-highlight" },
            { label: "EBITDA", value: `$${(cfFinancials.annual.ebitda / 1000).toFixed(1)}B`, badge: "metric-blue" },
            { label: "Profit Margin", value: `${cfFinancials.annual.ebitdaMargin}%`, badge: "metric-green" },
            { label: "Cash", value: `$${(cfFinancials.annual.cash / 1000).toFixed(1)}B`, badge: "metric-green" },
            { label: "Debt", value: `$${(cfFinancials.annual.debt / 1000).toFixed(1)}B`, badge: "metric-highlight" },
            { label: "Stock Price", value: usd(meta.currentPrice), badge: "metric-blue" },
          ].map((m, i) => (
            <div key={i} className="border-[2px] border-[#1A1A1A] p-3 text-center">
              <div className="text-[0.65rem] text-gray-500 uppercase tracking-wider mb-2">{m.label}</div>
              <div className={`${m.badge} text-sm`}>{m.value}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500">💡 EBITDA = how much money the company makes before taxes and accounting stuff. A higher margin means they're really good at turning revenue into profit.</p>
      </Panel>

      {/* QUARTERLY RESULTS */}
      <SectionLabel>QUARTERLY_RESULTS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📈 QUARTERLY PERFORMANCE (2025)</div>
        <p className="text-sm mb-4 text-gray-600">How CF performed each quarter last year — Revenue, EBITDA, and Net Income (in millions):</p>
        <div className="h-[300px]" data-testid="quarterly-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cfFinancials.quarterly} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="period" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} />
              <RechartsTooltip />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: "JetBrains Mono" }} />
              <Bar dataKey="revenue" name="Revenue" fill={BLUE} />
              <Bar dataKey="ebitda" name="EBITDA" fill={TEAL} />
              <Bar dataKey="netIncome" name="Net Income" fill={ORANGE} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      {/* WHAT THEY SELL */}
      <SectionLabel>WHAT_THEY_SELL</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🧪 PRODUCT BREAKDOWN — WHAT CF ACTUALLY SELLS</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="h-[280px]" data-testid="segment-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cfFinancials.segments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="revenue"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {cfFinancials.segments.map((_, i) => (
                    <Cell key={i} fill={segmentColors[i]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {cfFinancials.segments.map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-4 h-4 flex-shrink-0" style={{ background: segmentColors[i] }}></div>
                <div>
                  <span className="font-bold">{s.name}</span>
                  <span className="text-gray-500 ml-2">${s.revenue}M revenue</span>
                  {i === 0 && <span className="text-xs text-gray-400 ml-2">— used in fertilizers, explosives, and chemicals</span>}
                  {i === 1 && <span className="text-xs text-gray-400 ml-2">— the most common nitrogen fertilizer</span>}
                  {i === 2 && <span className="text-xs text-gray-400 ml-2">— liquid fertilizer sprayed on fields</span>}
                  {i === 3 && <span className="text-xs text-gray-400 ml-2">— ammonium nitrate, used for mining too</span>}
                  {i === 4 && <span className="text-xs text-gray-400 ml-2">— diesel exhaust fluid and other products</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      {/* WHAT WALL STREET EXPECTS */}
      <SectionLabel>WHAT_WALL_STREET_EXPECTS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🔮 FORWARD ESTIMATES — WHAT ANALYSTS PREDICT</div>
        <p className="text-sm mb-4 text-gray-600">
          Analysts think CF will earn <span className="metric-highlight text-sm">${cfFinancials.estimates.fy2026.eps}</span> per share next year (EPS = earnings per share — how much profit per single share of stock). Here's the full breakdown:
        </p>
        <table className="w-full text-sm border-collapse" data-testid="estimates-table">
          <thead>
            <tr className="border-b-[3px] border-[#1A1A1A]">
              <th className="text-left py-2 font-bold text-xs">Metric</th>
              <th className="text-right py-2 font-bold text-xs">FY2026 Estimate</th>
              <th className="text-right py-2 font-bold text-xs">FY2027 Estimate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["EPS", `$${cfFinancials.estimates.fy2026.eps}`, `$${cfFinancials.estimates.fy2027.eps}`],
              ["Revenue", `$${(cfFinancials.estimates.fy2026.revenue / 1000).toFixed(1)}B`, `$${(cfFinancials.estimates.fy2027.revenue / 1000).toFixed(1)}B`],
              ["EBITDA", `$${(cfFinancials.estimates.fy2026.ebitda / 1000).toFixed(1)}B`, `$${(cfFinancials.estimates.fy2027.ebitda / 1000).toFixed(1)}B`],
              ["Free Cash Flow", `$${(cfFinancials.estimates.fy2026.fcf / 1000).toFixed(1)}B`, `$${(cfFinancials.estimates.fy2027.fcf / 1000).toFixed(1)}B`],
            ].map(([label, fy26, fy27], i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2.5 font-bold">{label}</td>
                <td className="py-2.5 text-right"><span className="metric-highlight text-xs">{fy26}</span></td>
                <td className="py-2.5 text-right"><span className="metric-blue text-xs">{fy27}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      {/* ANALYST RATINGS */}
      <SectionLabel>ANALYST_RATINGS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📋 WHAT WALL STREET ANALYSTS SAY</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm mb-3">Out of <span className="font-bold">{analystRatings.totalRatings}</span> analysts covering CF:</p>
            <div className="space-y-2 mb-4">
              {[
                { label: "Buy (Bullish)", count: analystRatings.bullish, color: "#1ABC9C", pct: (analystRatings.bullish / analystRatings.totalRatings) * 100 },
                { label: "Hold (Neutral)", count: analystRatings.neutral, color: "#2B4CFF", pct: (analystRatings.neutral / analystRatings.totalRatings) * 100 },
                { label: "Sell (Bearish)", count: analystRatings.bearish, color: "#FF3D8F", pct: (analystRatings.bearish / analystRatings.totalRatings) * 100 },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{r.label}</span>
                    <span className="font-bold">{r.count} analysts</span>
                  </div>
                  <div className="w-full h-4 bg-gray-100 border border-[#1A1A1A]">
                    <div className="h-full" style={{ width: `${r.pct}%`, background: r.color }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm space-y-1">
              <div>Consensus: <span className="metric-blue">{analystRatings.consensus}</span></div>
              <div>Avg Price Target: <span className="metric-highlight">{usd(analystRatings.avgPT)}</span></div>
              <div>Range: <span className="font-bold">{usd(analystRatings.lowPT)} — {usd(analystRatings.highPT)}</span></div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold mb-3 uppercase tracking-wider">Recent Calls</p>
            <div className="space-y-2">
              {analystRatings.recent.map((r, i) => {
                const sentColor = r.sentiment === "bullish" ? "bg-[#1ABC9C]" : r.sentiment === "bearish" ? "bg-[#FF3D8F]" : "bg-[#2B4CFF]";
                return (
                  <div key={i} className="flex items-center gap-2 text-xs border-b border-gray-200 pb-2">
                    <span className="text-gray-500 w-14">{r.date}</span>
                    <span className="font-bold flex-1">{r.firm}</span>
                    <span>{r.rating}</span>
                    <span className="metric-highlight text-xs">${r.pt}</span>
                    <span className={`tag-badge ${sentColor} text-white`}>{r.sentiment}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Panel>

      {/* INSIDER ACTIVITY */}
      <SectionLabel>INSIDER_ACTIVITY</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">👔 INSIDER TRADING — WHAT COMPANY EXECS ARE DOING</div>
        <p className="text-sm mb-4 text-gray-600">
          When company executives buy or sell their own stock, it tells us something. Recently, several CF execs have been <strong>selling</strong> shares:
        </p>
        <table className="w-full text-sm border-collapse" data-testid="insider-table">
          <thead>
            <tr className="border-b-[3px] border-[#1A1A1A]">
              <th className="text-left py-2 font-bold text-xs">Date</th>
              <th className="text-left py-2 font-bold text-xs">Name</th>
              <th className="text-left py-2 font-bold text-xs">Type</th>
              <th className="text-right py-2 font-bold text-xs">Shares</th>
              <th className="text-right py-2 font-bold text-xs">Price</th>
            </tr>
          </thead>
          <tbody>
            {insiderActivity.map((a, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-2.5 text-gray-500">{a.date}</td>
                <td className="py-2.5">{a.name}</td>
                <td className="py-2.5"><span className="tag-badge bg-[#FF3D8F] text-white">{a.type}</span></td>
                <td className="py-2.5 text-right font-bold">{fmt(a.shares)}</td>
                <td className="py-2.5 text-right"><span className="metric-highlight text-xs">{usd(a.price)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-3">💡 Insider selling doesn't always mean bad news — execs sell for personal reasons too (taxes, diversification). But it's worth watching.</p>
      </Panel>

      {/* HOW CF COMPARES */}
      <SectionLabel>HOW_CF_COMPARES</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">⚖️ PEER COMPARISON — HOW CF STACKS UP</div>
        <p className="text-sm mb-4 text-gray-600">
          Here's how CF compares to other fertilizer companies. P/E ratio = how many years of profits you're paying for when you buy the stock (lower can be better).
        </p>
        <table className="w-full text-sm border-collapse" data-testid="peer-table">
          <thead>
            <tr className="border-b-[3px] border-[#1A1A1A]">
              <th className="text-left py-2 font-bold text-xs">Company</th>
              <th className="text-right py-2 font-bold text-xs">Price</th>
              <th className="text-right py-2 font-bold text-xs">P/E Ratio</th>
              <th className="text-right py-2 font-bold text-xs">Market Cap</th>
              <th className="text-right py-2 font-bold text-xs">EBITDA Margin</th>
            </tr>
          </thead>
          <tbody>
            {peers.map((p, i) => (
              <tr key={i} className={`border-b border-gray-200 ${p.isCurrent ? "bg-[#FFF8F0]" : ""}`}>
                <td className="py-2.5">
                  <span className="font-bold">{p.ticker}</span>
                  <span className="text-gray-500 ml-2">{p.name}</span>
                  {p.isCurrent && <span className="tag-badge bg-[#FF4D00] text-white ml-2 text-[0.55rem]">OUR PICK</span>}
                </td>
                <td className="py-2.5 text-right">{usd(p.price)}</td>
                <td className="py-2.5 text-right">{p.pe.toFixed(2)}x</td>
                <td className="py-2.5 text-right">${p.marketCap}</td>
                <td className="py-2.5 text-right"><span className={p.isCurrent ? "metric-green text-xs" : ""}>{p.ebitdaMargin}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-3">💡 CF has the highest EBITDA margin (46.5%) — meaning they're the most profitable per dollar of revenue. That's partly because of cheap US natural gas.</p>
      </Panel>
    </PageWrap>
  );
}

// ═════════════════════════════════════════════════════════════════════
// PAGE 5: THE TRADE
// ═════════════════════════════════════════════════════════════════════
function TheTrade() {
  const minPrice = 80;
  const maxPrice = 220;
  const range = maxPrice - minPrice;
  const currentPct = ((meta.currentPrice - minPrice) / range) * 100;
  const targetPct = ((meta.targetPrice - minPrice) / range) * 100;
  const stopPct = ((meta.stopLoss - minPrice) / range) * 100;

  return (
    <PageWrap>
      {/* TRADE SETUP */}
      <SectionLabel>TRADE_SETUP</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🎯 OUR POSITION</div>
        <p className="text-sm mb-4">
          We're buying CF stock at <span className="metric-highlight">{usd(meta.currentPrice)}</span>, hoping it goes to <span className="metric-green">{usd(meta.targetPrice)}</span> (<span className="font-bold text-green-600">+{meta.upsidePct}%</span>). If it drops to <span className="metric-highlight">{usd(meta.stopLoss)}</span>, we sell to limit our loss.
        </p>

        {/* Visual price range bar */}
        <div className="relative h-12 bg-gray-100 border-[2px] border-[#1A1A1A] mb-2" data-testid="price-bar">
          {/* Stop loss zone */}
          <div className="absolute top-0 h-full bg-red-100" style={{ left: 0, width: `${stopPct}%` }}></div>
          {/* Upside zone */}
          <div className="absolute top-0 h-full bg-green-50" style={{ left: `${currentPct}%`, width: `${targetPct - currentPct}%` }}></div>
          {/* Stop marker */}
          <div className="absolute top-0 h-full w-0.5 bg-red-500" style={{ left: `${stopPct}%` }}>
            <div className="absolute -top-5 -translate-x-1/2 text-[0.6rem] font-bold text-red-600">STOP ${meta.stopLoss}</div>
          </div>
          {/* Current marker */}
          <div className="absolute top-0 h-full w-1 bg-[#2B4CFF]" style={{ left: `${currentPct}%` }}>
            <div className="absolute -bottom-5 -translate-x-1/2 text-[0.6rem] font-bold text-[#2B4CFF]">NOW {usd(meta.currentPrice)}</div>
          </div>
          {/* Target marker */}
          <div className="absolute top-0 h-full w-0.5 bg-green-600" style={{ left: `${targetPct}%` }}>
            <div className="absolute -top-5 -translate-x-1/2 text-[0.6rem] font-bold text-green-600">TARGET {usd(meta.targetPrice)}</div>
          </div>
        </div>
        <div className="flex justify-between text-[0.6rem] text-gray-400 mt-6">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: "Risk-Reward", value: meta.riskReward },
            { label: "Timeframe", value: meta.timeframe },
            { label: "Confidence", value: meta.confidence },
            { label: "Max Downside", value: `${((meta.stopLoss - meta.currentPrice) / meta.currentPrice * 100).toFixed(0)}%` },
          ].map((m, i) => (
            <div key={i} className="border-[2px] border-[#1A1A1A] p-3 text-center">
              <div className="text-[0.65rem] text-gray-500 uppercase tracking-wider mb-2">{m.label}</div>
              <div className="font-bold text-sm">{m.value}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* SCENARIO MAP */}
      <SectionLabel>SCENARIO_MAP</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📊 WHAT COULD HAPPEN TO OUR TRADE</div>
        <div className="space-y-3">
          {scenarioAnalysis.map((s, i) => {
            const colors = ["#FF3D8F", "#FF5500", "#1ABC9C", "#2B4CFF"];
            return (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-[200px] flex-shrink-0 text-xs font-bold">{s.scenario}</span>
                <div className="flex-1 h-6 bg-gray-100 border border-[#1A1A1A] relative">
                  <div className="h-full flex items-center" style={{ width: `${s.probability}%`, background: colors[i] }}>
                    <span className="text-white text-[0.6rem] font-bold px-2 whitespace-nowrap">{s.probability}% — {s.cfPrice}</span>
                  </div>
                </div>
                <span className={`w-14 text-right text-xs font-bold ${s.returnPct >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {pct(s.returnPct)}
                </span>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* UPCOMING CATALYSTS */}
      <SectionLabel>UPCOMING_CATALYSTS</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📅 BIG DATES COMING UP</div>
        <p className="text-sm mb-4 text-gray-600">These events could cause major moves in CF's stock price:</p>
        <div className="space-y-3">
          {catalysts.map((c, i) => {
            const dotColors: Record<string, string> = { CRITICAL: "#FF3D8F", HIGH: "#FF5500", MEDIUM: "#2B4CFF" };
            const badgeColors: Record<string, string> = { CRITICAL: "bg-[#FF3D8F]", HIGH: "bg-[#FF5500]", MEDIUM: "bg-[#2B4CFF]" };
            return (
              <div key={i} className="flex items-center gap-3 text-sm border-b border-gray-200 pb-3">
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="font-bold w-16 flex-shrink-0">{c.date}</span>
                <span className="flex-1">{c.event}</span>
                <span className={`tag-badge ${badgeColors[c.impact]} text-white`}>{c.impact}</span>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* MACRO BACKDROP */}
      <SectionLabel>MACRO_BACKDROP</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">🌍 THE BIG-PICTURE ECONOMY</div>
        <p className="text-sm mb-4 text-gray-600">
          These are the big-picture economic numbers that affect everything — interest rates, inflation, jobs, and the dollar:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Fed Rate", value: macroSnapshot.fedRate, note: "Interest rates set by the Federal Reserve" },
            { label: "Inflation (CPI)", value: macroSnapshot.cpiYoy, note: "How fast prices are rising" },
            { label: "Unemployment", value: macroSnapshot.unemployment, note: "% of people looking for work" },
            { label: "10-Year Treasury", value: macroSnapshot.tenYear, note: "Long-term interest rate benchmark" },
            { label: "Dollar Index", value: macroSnapshot.dxy, note: "How strong the US dollar is" },
            { label: "Core CPI", value: macroSnapshot.coreCpiYoy, note: "Inflation without food and energy" },
            { label: "Jobs (NFP)", value: macroSnapshot.nfp, note: "Jobs added/lost last month" },
            { label: "PPI", value: macroSnapshot.ppiYoy, note: "Inflation for businesses" },
            { label: "2-Year Treasury", value: macroSnapshot.twoYear, note: "Short-term rate benchmark" },
            { label: "Labor Force", value: macroSnapshot.lfpr, note: "% of adults working or looking" },
          ].map((m, i) => (
            <div key={i} className="border-[2px] border-[#1A1A1A] p-3">
              <div className="text-[0.6rem] text-gray-500 uppercase tracking-wider mb-1">{m.label}</div>
              <div className="font-bold text-sm mb-1">{m.value}</div>
              <div className="text-[0.55rem] text-gray-400">{m.note}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* SOURCES AND METHODOLOGY */}
      <SectionLabel>SOURCES_AND_METHODOLOGY</SectionLabel>
      <Panel>
        <div className="panel-header mb-4 -m-5 mb-5 px-5 py-3">📚 OUR SOURCES</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(sources).map(([category, items]) => {
            const labels: Record<string, string> = {
              predictionMarkets: "🎰 Prediction Markets",
              shipping: "🚢 Shipping Data",
              osint: "🔍 Intelligence Sources",
              macro: "📊 Economic Data",
              finance: "💰 Financial Data",
            };
            return (
              <div key={category}>
                <div className="text-xs font-bold uppercase tracking-wider mb-2">{labels[category] || category}</div>
                <div className="space-y-1">
                  {items.map((s: { name: string; url: string }, i: number) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[#2B4CFF] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 py-4 border-t-[3px] border-[#1A1A1A]" data-testid="footer">
        Built with Perplexity Computer — March 31, 2026 | This is NOT investment advice. Do your own research!
      </div>
    </PageWrap>
  );
}

// ═════════════════════════════════════════════════════════════════════
// APP SHELL
// ═════════════════════════════════════════════════════════════════════
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <div className="min-h-screen bg-background text-foreground font-mono">
            <TopNav />
            <Switch>
              <Route path="/" component={TheBigPicture} />
              <Route path="/geopolitical" component={WarAndOil} />
              <Route path="/variant" component={WhyWallStreetIsWrong} />
              <Route path="/fundamentals" component={CompanyDeepDive} />
              <Route path="/trade" component={TheTrade} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
