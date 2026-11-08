import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  PieChart,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Search,
  Bell,
  Plus,
  CreditCard,
  Banknote,
  PiggyBank,
  type LucideIcon,
} from 'lucide-react';
import { ExpensesDoughnutSection } from '../DonutChart/DonutChart';

// Регистрируем необходимые модули Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// ==========================================
// TypeScript Interfaces & Types
// ==========================================

export type TransactionType = 'income' | 'expense';
export type ChartType = 'expenses' | 'income';
export type TimeframeType = '1M' | '6M' | '1Y' | 'ALL';

export interface KpiItem {
  id: string;
  title: string;
  amount: number;
  change: number;
  isPositive: boolean;
  icon: LucideIcon;
}

export interface TransactionItem {
  id: string;
  title: string;
  source: string;
  amount: number;
  type: TransactionType;
}

export interface TransactionGroup {
  dateLabel: string;
  items: TransactionItem[];
}

export interface ChartSegment {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface AccountItem {
  id: string;
  title: string;
  category: string;
  balance: number;
  currency: string;
  icon: LucideIcon;
  badgeColor: string;
}

// ==========================================
// Mock Data
// ==========================================

const KPI_DATA: KpiItem[] = [
  { id: '1', title: 'Чистый капитал', amount: 14850000, change: 5.4, isPositive: true, icon: Wallet },
  { id: '2', title: 'Инвестиции', amount: 8400000, change: 12.1, isPositive: true, icon: TrendingUp },
  { id: '3', title: 'Доходы', amount: 920000, change: 2.8, isPositive: true, icon: ArrowUpRight },
  { id: '4', title: 'Расходы', amount: 410000, change: 1.5, isPositive: false, icon: ArrowDownRight },
];

const TRANSACTIONS_DATA: TransactionGroup[] = [
  {
    dateLabel: 'Пятница, 16 октября',
    items: [
      { id: 't1', title: 'Зарплата', source: 'Яндекс', amount: 10000, type: 'income' },
      { id: 't2', title: 'Зарплата', source: 'Яндекс', amount: 10000, type: 'income' },
      { id: 't3', title: 'Зарплата', source: 'Яндекс', amount: 10000, type: 'income' },
    ],
  },
  {
    dateLabel: 'Четверг, 15 октября',
    items: [
      { id: 't4', title: 'Зарплата', source: 'Яндекс', amount: 10000, type: 'income' },
    ],
  },
];

const EXPENSES_SEGMENTS: ChartSegment[] = [
  { name: 'Прибыль / Бизнес', amount: 800000, percentage: 41, color: '#ef4444' },
  { name: 'Инвестиции', amount: 350000, percentage: 18, color: '#ec4899' },
  { name: 'Продукты и услуги', amount: 300000, percentage: 15, color: '#22c55e' },
  { name: 'Жилье и ЖКХ', amount: 280000, percentage: 14, color: '#3b82f6' },
  { name: 'Развлечения', amount: 230000, percentage: 12, color: '#bef264' },
];

const ACCOUNTS_DATA: AccountItem[] = [
  { id: 'a1', title: 'Т-Банк (Основная)', category: 'Дебетовая карта', balance: 450000, currency: '₽', icon: CreditCard, badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { id: 'a2', title: 'БКС Брокер', category: 'Инвестиционный счет', balance: 8400000, currency: '₽', icon: TrendingUp, badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { id: 'a3', title: 'Сбербанк Накопительный', category: 'Депозит 16%', balance: 5800000, currency: '₽', icon: PiggyBank, badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { id: 'a4', title: 'Наличные', category: 'Сейф', balance: 200000, currency: '₽', icon: Banknote, badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
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

interface HeaderProps {
  selectedPeriod: string;
}

const Header: React.FC<HeaderProps> = ({ selectedPeriod }) => {
  return (
    <header className="relative bg-[#131522]/80 backdrop-blur-xl border border-slate-800/80 rounded-full px-5 py-3 shadow-2xl flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            CapitalFlow
          </h1>
          <p className="text-[11px] text-slate-400 hidden sm:block">Финансовый обзор</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 text-xs text-slate-300 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{selectedPeriod}</span>
        </button>

        <button
          type="button"
          aria-label="Поиск"
          className="w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <Search className="w-4 h-4" />
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Добавить</span>
        </button>
      </div>
    </header>
  );
};

// ==========================================
// Net Worth Chart (Chart.js Line)
// ==========================================

const NetWorthChartSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState<TimeframeType>('6M');

  const lineData: ChartData<'line'> = {
    labels: ['Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт'],
    datasets: [
      {
        label: 'Чистый капитал',
        data: [12100000, 12600000, 13000000, 13800000, 14200000, 14850000],
        borderColor: '#6366f1',
        borderWidth: 3,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 160);
          gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#818cf8',
        pointBorderColor: '#131522',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#94a3b8',
        bodyColor: '#818cf8',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${formatCurrency(ctx.parsed.y ?? 0)}`,
        }
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 10 } },
      },
      y: {
        grid: { color: 'rgba(30, 41, 59, 0.6)' },
        ticks: {
          color: '#64748b',
          font: { size: 10 },
          callback: (value) => `${Number(value) / 1000000}M ₽`,
        },
      },
    },
  };

  return (
    <div className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold text-slate-100">Динамика чистого капитала</h2>
          <p className="text-xs text-slate-400">График построен на Chart.js</p>
        </div>

        <div className="flex gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
          {(['1M', '6M', '1Y', 'ALL'] as TimeframeType[]).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                timeframe === tf
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-44 mt-2">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

// ==========================================
// Expenses Doughnut Chart (Chart.js Doughnut)
// ==========================================

// const ExpensesDoughnutSection: React.FC = () => {
//   const [chartType, setChartType] = useState<ChartType>('expenses');

//   const doughnutData: ChartData<'doughnut'> = {
//     labels: EXPENSES_SEGMENTS.map((s) => s.name),
//     datasets: [
//       {
//         data: EXPENSES_SEGMENTS.map((s) => s.amount),
//         backgroundColor: EXPENSES_SEGMENTS.map((s) => s.color),
//         borderColor: '#131522',
//         borderWidth: 3,
//         hoverOffset: 6,
//       },
//     ],
//   };

//   const doughnutOptions: ChartOptions<'doughnut'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     cutout: '75%',
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: '#0f172a',
//         titleColor: '#e2e8f0',
//         bodyColor: '#94a3b8',
//         borderColor: 'rgba(51, 65, 85, 0.8)',
//         borderWidth: 1,
//         padding: 10,
//         callbacks: {
//           label: (ctx) => ` ${formatCurrency(ctx.parsed)}`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="lg:col-span-5 bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between min-h-[380px] relative">
//       <div className="flex items-center justify-between mb-2 z-10">
//         <div className="flex gap-2">
//           <button
//             type="button"
//             onClick={() => setChartType('expenses')}
//             className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
//               chartType === 'expenses'
//                 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-lg'
//                 : 'text-slate-400 hover:text-slate-200'
//             }`}
//           >
//             Расходы
//           </button>
//           <button
//             type="button"
//             onClick={() => setChartType('income')}
//             className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
//               chartType === 'income'
//                 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-lg'
//                 : 'text-slate-400 hover:text-slate-200'
//             }`}
//           >
//             Доходы
//           </button>
//         </div>
//       </div>

//       <div className="relative flex-1 flex items-center justify-center my-4 h-52">
//         <Doughnut data={doughnutData} options={doughnutOptions} />

//         <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//           <div className="text-[10px] text-slate-400">Прибыль</div>
//           <div className="text-sm font-bold text-slate-100">800 000 ₽</div>
//           <div className="text-[10px] font-semibold text-rose-400">41%</div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800/60 z-10">
//         {EXPENSES_SEGMENTS.map((seg) => (
//           <div key={seg.name} className="flex items-center gap-1.5">
//             <span
//               className="w-2.5 h-2.5 rounded-full flex-shrink-0"
//               style={{ backgroundColor: seg.color }}
//             ></span>
//             <span className="text-slate-300 truncate">{seg.name}</span>
//             <span className="text-slate-500 ml-auto font-mono">{seg.percentage}%</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// ==========================================
// Main App Component
// ==========================================

export default function App() {
  const [selectedPeriod] = useState<string>('Октябрь 2026');

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Header selectedPeriod={selectedPeriod} />

        {/* 4 KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_DATA.map((kpi) => {
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
                  <div className="text-xl font-bold tracking-tight text-white">
                    {formatCurrency(kpi.amount)}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[11px]">
                    <span
                      className={`font-semibold ${
                        kpi.isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {kpi.isPositive ? `+${kpi.change}%` : `-${kpi.change}%`}
                    </span>
                    <span className="text-slate-500">vs прошлый мес.</span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Accounts & Net Worth Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-slate-100">Счета и активы</h2>
                  <p className="text-xs text-slate-400">Распределение ликвидности</p>
                </div>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Управлять
                </button>
              </div>

              <div className="space-y-3">
                {ACCOUNTS_DATA.map((acc) => {
                  const Icon = acc.icon;
                  return (
                    <div
                      key={acc.id}
                      className="p-3 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/50 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${acc.badgeColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                            {acc.title}
                          </h4>
                          <span className="text-[10px] text-slate-400">{acc.category}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-100">{formatCurrency(acc.balance)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <NetWorthChartSection />
        </section>

        {/* Transactions & Doughnut Chart */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-[#131522]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-100">Транзакции</h2>
                <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Все операции
                </button>
              </div>

              <div className="space-y-4">
                {TRANSACTIONS_DATA.map((group) => (
                  <div key={group.dateLabel}>
                    <div className="text-[11px] text-slate-400 mb-2 font-medium">
                      {group.dateLabel}
                    </div>
                    <div className="space-y-2">
                      {group.items.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-700/50 border border-slate-600/40 flex items-center justify-center text-slate-300 font-bold text-xs">
                              {tx.source[0]}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">{tx.title}</div>
                              <div className="inline-block px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 text-[10px] font-medium mt-0.5 border border-rose-900/40">
                                {tx.source}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`text-xs font-bold ${
                              tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                            }`}
                          >
                            {tx.type === 'income' ? '+' : '-'} {tx.amount.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ExpensesDoughnutSection />
        </section>
      </div>
    </div>
  );
}