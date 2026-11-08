import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Plus,
  Briefcase,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  Layers,
  type LucideIcon,
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// ==========================================
// Types & Interfaces
// ==========================================

export type AssetCategory = 'all' | 'stocks' | 'bonds' | 'etf' | 'cash';
export type DiversificationView = 'sectors' | 'assets' | 'currencies';

export interface InvestmentKPI {
  id: string;
  title: string;
  value: string;
  subValue: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
}

export interface HoldingItem {
  id: string;
  ticker: string;
  name: string;
  category: AssetCategory;
  sector: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
  annualDividend: number;
  dividendYield: number;
  weight: number;
}

export interface UpcomingDividend {
  id: string;
  ticker: string;
  name: string;
  exDate: string;
  paymentDate: string;
  amountPerShare: number;
  totalAmount: number;
  status: 'confirmed' | 'projected';
}

// ==========================================
// Mock Data
// ==========================================

const KPI_LIST: InvestmentKPI[] = [
  {
    id: '1',
    title: 'Портфель',
    value: '8 400 000 ₽',
    subValue: '+1 240 000 ₽ за всё время',
    change: '+17.3%',
    isPositive: true,
    icon: Briefcase,
  },
  {
    id: '2',
    title: 'Дивиденды / год',
    value: '785 000 ₽',
    subValue: '~65 416 ₽ в месяц',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
  },
  {
    id: '3',
    title: 'Див. доходность (YoC)',
    value: '9.35%',
    subValue: 'Текущая: 8.10%',
    change: '+1.25%',
    isPositive: true,
    icon: Award,
  },
  {
    id: '4',
    title: 'Общий доход (Total Return)',
    value: '2 150 000 ₽',
    subValue: 'Прирост + Дивиденды',
    change: '+30.7%',
    isPositive: true,
    icon: TrendingUp,
  },
];

const HOLDINGS_DATA: HoldingItem[] = [
  { id: 'h1', ticker: 'LKOH', name: 'Лукойл', category: 'stocks', sector: 'Энергетика', shares: 45, avgPrice: 6200, currentPrice: 6950, totalValue: 312750, pnl: 33750, pnlPercent: 12.1, annualDividend: 38500, dividendYield: 12.3, weight: 26.5 },
  { id: 'h2', ticker: 'SBER', name: 'Сбербанк', category: 'stocks', sector: 'Финансы', shares: 800, avgPrice: 240, currentPrice: 310, totalValue: 248000, pnl: 56000, pnlPercent: 29.1, annualDividend: 26600, dividendYield: 10.7, weight: 21.0 },
  { id: 'h3', ticker: 'SU26238', name: 'ОФЗ 26238', category: 'bonds', sector: 'Гос. облигации', shares: 250, avgPrice: 580, currentPrice: 610, totalValue: 152500, pnl: 7500, pnlPercent: 5.17, annualDividend: 17750, dividendYield: 11.6, weight: 12.9 },
  { id: 'h4', ticker: 'NVTK', name: 'Новатэк', category: 'stocks', sector: 'Энергетика', shares: 120, avgPrice: 1100, currentPrice: 1040, totalValue: 124800, pnl: -7200, pnlPercent: -5.45, annualDividend: 9400, dividendYield: 7.5, weight: 10.5 },
  { id: 'h5', ticker: 'TMOS', name: 'iNAV Мосбиржа ETF', category: 'etf', sector: 'Фонды', shares: 15000, avgPrice: 6.2, currentPrice: 6.8, totalValue: 102000, pnl: 9000, pnlPercent: 9.67, annualDividend: 0, dividendYield: 0, weight: 8.6 },
  { id: 'h6', ticker: 'ROSN', name: 'Роснефть', category: 'stocks', sector: 'Энергетика', shares: 200, avgPrice: 480, currentPrice: 535, totalValue: 107000, pnl: 11000, pnlPercent: 11.4, annualDividend: 11800, dividendYield: 11.0, weight: 9.0 },
  { id: 'h7', ticker: 'RUB', name: 'Рубли (Кэш)', category: 'cash', sector: 'Денежные средства', shares: 1, avgPrice: 137950, currentPrice: 137950, totalValue: 137950, pnl: 0, pnlPercent: 0, annualDividend: 0, dividendYield: 0, weight: 11.5 },
];

const UPCOMING_DIVIDENDS: UpcomingDividend[] = [
  { id: 'd1', ticker: 'LKOH', name: 'Лукойл', exDate: '07.12.2026', paymentDate: '22.12.2026', amountPerShare: 514, totalAmount: 23130, status: 'confirmed' },
  { id: 'd2', ticker: 'ROSN', name: 'Роснефть', exDate: '11.01.2027', paymentDate: '26.01.2027', amountPerShare: 30.77, totalAmount: 6154, status: 'confirmed' },
  { id: 'd3', ticker: 'SBER', name: 'Сбербанк', exDate: '10.05.2027', paymentDate: '25.05.2027', amountPerShare: 33.3, totalAmount: 26640, status: 'projected' },
];

const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(val);
};

// ==========================================
// Header Component
// ==========================================

const Header: React.FC = () => {
  return (
    <header className="relative bg-[#131522]/80 backdrop-blur-xl border border-slate-800/80 rounded-full px-5 py-3 shadow-2xl flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <PieIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            CapitalFlow
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">Инвестиционный портфель (Snowball Analytics)</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-xs text-slate-300 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>Ноябрь 2026</span>
        </button>

        <button
          type="button"
          aria-label="Уведомления"
          className="w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white transition-colors relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Сделка</span>
        </button>
      </div>
    </header>
  );
};

// ==========================================
// Dividend Forecast Bar Chart
// ==========================================

const DividendForecastChart: React.FC = () => {
  const data: ChartData<'bar'> = {
    labels: ['Ноя', 'Дек', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт'],
    datasets: [
      {
        label: 'Выплаты дивидендов (₽)',
        data: [12000, 48500, 18200, 8500, 14000, 22000, 95000, 110000, 84000, 15000, 9000, 41000],
        backgroundColor: '#6366f1',
        hoverBackgroundColor: '#818cf8',
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#e2e8f0',
        bodyColor: '#818cf8',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => `Прогноз: ${formatCurrency(ctx.parsed.y ?? 0)}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 10 } } },
      y: {
        grid: { color: 'rgba(30, 41, 59, 0.5)' },
        ticks: { color: '#64748b', font: { size: 10 }, callback: (v) => `${Number(v) / 1000}k ₽` },
      },
    },
  };

  return (
    <div className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold text-slate-100">Календарь дивидендов</h2>
          <p className="text-xs text-slate-400">Прогноз пассивного дохода на 12 месяцев</p>
        </div>
        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
          Итого: ~785 000 ₽
        </span>
      </div>
      <div className="w-full h-44">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

// ==========================================
// Diversification Component
// ==========================================

const AllocationChart: React.FC = () => {
  const [view, setView] = useState<DiversificationView>('sectors');

  const sectorLabels = ['Энергетика', 'Финансы', 'Гос. облигации', 'Денежные средства', 'Фонды (ETF)'];
  const sectorData = [46, 21, 13, 11.5, 8.5];
  const colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#ec4899'];

  const doughnutData: ChartData<'doughnut'> = {
    labels: sectorLabels,
    datasets: [
      {
        data: sectorData,
        backgroundColor: colors,
        borderColor: '#131522',
        borderWidth: 3,
      },
    ],
  };

  const doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  };

  return (
    <div className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-base font-semibold text-slate-100">Диверсификация</h2>
          <p className="text-xs text-slate-400">Структура активов</p>
        </div>
        <div className="flex gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800 text-[10px]">
          {(['sectors', 'assets', 'currencies'] as DiversificationView[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`px-2 py-0.5 rounded capitalize transition-all ${
                view === v ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {v === 'sectors' ? 'Сектора' : v === 'assets' ? 'Активы' : 'Валюты'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center my-2">
        <div className="relative h-44 flex items-center justify-center">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] text-slate-400">Топ Сектор</span>
            <span className="text-xs font-bold text-slate-100">Энергетика</span>
            <span className="text-[10px] text-rose-400 font-semibold">46%</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs">
          {sectorLabels.map((lbl, i) => (
            <div key={lbl} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900/30 border border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[i] }}></span>
                <span className="text-slate-300">{lbl}</span>
              </div>
              <span className="font-mono text-slate-400">{sectorData[i]}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Upcoming Dividends Component
// ==========================================

const UpcomingDividendsSection: React.FC = () => {
  return (
    <div className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-100">Ближайшие выплаты</h2>
            <p className="text-xs text-slate-400">Реестры и выплаты дивидендов</p>
          </div>
          <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            Все выплаты
          </button>
        </div>

        <div className="space-y-3">
          {UPCOMING_DIVIDENDS.map((div) => (
            <div
              key={div.id}
              className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/50 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-400">
                  {div.ticker.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">{div.name}</span>
                    {div.status === 'confirmed' ? (
                      <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Утвержден
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Clock className="w-2.5 h-2.5" /> Прогноз
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Отсечка: {div.exDate} • Выплата: {div.paymentDate}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-emerald-400">+{formatCurrency(div.totalAmount)}</div>
                <div className="text-[10px] text-slate-400">{div.amountPerShare} ₽ / акцию</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Main App / Page Component
// ==========================================

export default function Invastments() {
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHoldings = HOLDINGS_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header />

        {/* Top KPI Cards Row */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_LIST.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.id}
                className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 shadow-xl hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{kpi.title}</span>
                  <div className="p-2 rounded-xl bg-slate-800/50 text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xl font-bold tracking-tight text-white">{kpi.value}</div>
                  <div className="flex items-center gap-1 mt-1 text-[11px]">
                    <span className="font-semibold text-emerald-400">{kpi.change}</span>
                    <span className="text-slate-500">{kpi.subValue}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Charts & Analytics Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DividendForecastChart />
          <AllocationChart />
        </section>

        {/* Upcoming Dividends Row */}
        <section className="grid grid-cols-1 gap-6">
          <UpcomingDividendsSection />
        </section>

        {/* Holdings Table Section */}
        <section className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-100">Активы в портфеле</h2>
              <p className="text-xs text-slate-400">Детальный состав и доходность бумаг</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter Tabs */}
              <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800 text-xs">
                {(['all', 'stocks', 'bonds', 'etf', 'cash'] as AssetCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg capitalize transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat === 'all'
                      ? 'Все'
                      : cat === 'stocks'
                      ? 'Акции'
                      : cat === 'bonds'
                      ? 'Облигации'
                      : cat === 'etf'
                      ? 'Фонды'
                      : 'Кэш'}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Поиск бумаг..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/40 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Актив</th>
                  <th className="py-3 px-4">Кол-во</th>
                  <th className="py-3 px-4">Ср. цена</th>
                  <th className="py-3 px-4">Текущая</th>
                  <th className="py-3 px-4">Стоимость</th>
                  <th className="py-3 px-4">Доходность (P&L)</th>
                  <th className="py-3 px-4">Див. доход</th>
                  <th className="py-3 px-4">Доля</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHoldings.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors cursor-pointer">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center font-bold text-[10px] text-slate-200">
                          {item.ticker.slice(0, 3)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100">{item.name}</div>
                          <div className="text-[10px] text-slate-500">{item.ticker} • {item.sector}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono">{item.shares.toLocaleString('ru-RU')} шт</td>
                    <td className="py-3 px-4 font-mono">{item.avgPrice.toLocaleString('ru-RU')} ₽</td>
                    <td className="py-3 px-4 font-mono">{item.currentPrice.toLocaleString('ru-RU')} ₽</td>
                    <td className="py-3 px-4 font-bold text-slate-100">{formatCurrency(item.totalValue)}</td>
                    <td className="py-3 px-4">
                      <div className={`font-semibold ${item.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {item.pnl >= 0 ? '+' : ''}{formatCurrency(item.pnl)}
                      </div>
                      <div className={`text-[10px] ${item.pnlPercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {item.pnlPercent >= 0 ? '+' : ''}{item.pnlPercent}%
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-200">{formatCurrency(item.annualDividend)}</div>
                      <div className="text-[10px] text-indigo-400">{item.dividendYield}% YoC</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-indigo-500 h-1.5 rounded-full"
                            style={{ width: `${item.weight * 3}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-[11px] text-slate-400">{item.weight}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}