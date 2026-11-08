import React, { useState, useMemo } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Search, 
  Bell, 
  Calendar,
  DollarSign,
  PieChart as PieIcon,
  CreditCard,
  Building,
  ShoppingBag,
  Briefcase,
  Layers,
  ChevronDown,
  Filter,
  type LucideIcon
} from 'lucide-react';

// ==========================================
// TypeScript Interfaces & Types
// ==========================================

export type TransactionType = 'income' | 'expense';
export type ChartType = 'expenses' | 'income';

export interface KpiItem {
  id: string;
  title: string;
  amount: number;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  color: string;
  borderColor: string;
}

export interface TransactionItem {
  id: number;
  title: string;
  source: string;
  amount: number;
  type: TransactionType;
  category: string;
  icon: LucideIcon;
}

export interface TransactionGroup {
  date: string;
  items: TransactionItem[];
}

export interface ChartSegment {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
}

// ==========================================
// Mock Data with Types
// ==========================================

const METRICS_DATA: KpiItem[] = [
  {
    id: 'net-worth',
    title: 'Чистый капитал',
    amount: 14850000,
    change: '+5.4%',
    isPositive: true,
    icon: Wallet,
    color: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'border-blue-500/30'
  },
  {
    id: 'investments',
    title: 'Инвестиции',
    amount: 8400000,
    change: '+12.1%',
    isPositive: true,
    icon: TrendingUp,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30'
  },
  {
    id: 'income',
    title: 'Доходы',
    amount: 1250000,
    change: '+8.2%',
    isPositive: true,
    icon: ArrowUpRight,
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30'
  },
  {
    id: 'expenses',
    title: 'Расходы',
    amount: 430000,
    change: '-3.1%',
    isPositive: false,
    icon: ArrowDownRight,
    color: 'from-rose-500/20 to-orange-500/20',
    borderColor: 'border-rose-500/30'
  }
];

const TRANSACTIONS_DATA: TransactionGroup[] = [
  {
    date: 'Пятница, 16 октября',
    items: [
      { id: 1, title: 'Зарплата', source: 'Яндекс', amount: 150000, type: 'income', category: 'Работа', icon: Briefcase },
      { id: 2, title: 'Дивиденды', source: 'Сбербанк', amount: 45000, type: 'income', category: 'Инвестиции', icon: Building },
      { id: 3, title: 'Супермаркет', source: 'ВкусВилл', amount: -4800, type: 'expense', category: 'Продукты', icon: ShoppingBag },
    ]
  },
  {
    date: 'Четверг, 15 октября',
    items: [
      { id: 4, title: 'Фриланс проект', source: 'Upwork', amount: 80000, type: 'income', category: 'Подработка', icon: CreditCard },
      { id: 5, title: 'Оплата облака', source: 'Яндекс Клауд', amount: -2400, type: 'expense', category: 'Сервисы', icon: Layers },
    ]
  },
  {
    date: 'Среда, 14 октября',
    items: [
      { id: 6, title: 'Ресторан', source: 'Mucha', amount: -6500, type: 'expense', category: 'Развлечения', icon: ShoppingBag },
      { id: 7, title: 'Крипто зачисления', source: 'Binance', amount: 32000, type: 'income', category: 'Инвестиции', icon: DollarSign },
    ]
  }
];

const EXPENSES_CHART_DATA: ChartSegment[] = [
  { id: 'exp-1', name: 'Инвестиции и вклады', value: 180000, color: '#ec4899', percentage: 41 },
  { id: 'exp-2', name: 'Жилье и ЖКУ', value: 95000, color: '#8b5cf6', percentage: 22 },
  { id: 'exp-3', name: 'Продукты и авто', value: 70000, color: '#3b82f6', percentage: 16 },
  { id: 'exp-4', name: 'Развлечения и отдых', value: 50000, color: '#84cc16', percentage: 12 },
  { id: 'exp-5', name: 'Прочее', value: 35000, color: '#ef4444', percentage: 9 },
];

const INCOME_CHART_DATA: ChartSegment[] = [
  { id: 'inc-1', name: 'Основная зарплата', value: 850000, color: '#10b981', percentage: 68 },
  { id: 'inc-2', name: 'Дивиденды и купоны', value: 220000, color: '#06b6d4', percentage: 18 },
  { id: 'inc-3', name: 'Фриланс & Консалтинг', value: 180000, color: '#6366f1', percentage: 14 },
];

// Helper for currency formatting
const formatCurrency = (val: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(val);
};

// ==========================================
// Main React TSX Component
// ==========================================

export default function App(): React.ReactElement {
  const [chartType, setChartType] = useState<ChartType>('expenses');
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [selectedPeriod] = useState<string>('Октябрь 2026');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const activeChartData = useMemo<ChartSegment[]>(() => {
    return chartType === 'expenses' ? EXPENSES_CHART_DATA : INCOME_CHART_DATA;
  }, [chartType]);

  const totalChartAmount = useMemo<number>(() => {
    return activeChartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [activeChartData]);

  const handleTabChange = (type: ChartType): void => {
    setChartType(type);
    setHoveredSlice(null);
  };

  return (
    <div className="min-h-screen bg-[#090a10] text-slate-100 font-sans p-3 sm:p-6 md:p-8 selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. Header Bar */}
        <header className="relative bg-[#131522]/80 backdrop-blur-xl border border-slate-800/80 rounded-full px-5 py-3 shadow-2xl flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <PieIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CapitalFlow
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">Финансовый обзор</p>
            </div>
          </div>

          {/* Controls / Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Period Selector Button */}
            <div className="relative">
              <button 
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-xs text-slate-300 transition"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>{selectedPeriod}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onBlur={() => searchQuery === '' && setIsSearchOpen(false)}
                  autoFocus
                  className="w-32 sm:w-48 px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded-full text-white focus:outline-none focus:border-indigo-500 transition-all"
                />
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="w-9 h-9 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white transition"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <button 
              type="button"
              className="relative w-9 h-9 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            </button>

            {/* Add Transaction Action Button */}
            <button 
              type="button"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Добавить</span>
            </button>
          </div>
        </header>

        {/* 2. Top Metrics Cards (4 items layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS_DATA.map((metric: KpiItem) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={metric.id}
                className="relative overflow-hidden rounded-2xl bg-[#131522]/90 backdrop-blur-md border border-slate-800/80 p-5 hover:border-slate-700/80 transition-all duration-300 group shadow-lg"
              >
                {/* Background glow effect */}
                <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${metric.color} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400">{metric.title}</span>
                  <div className={`p-2 rounded-xl bg-slate-800/60 border ${metric.borderColor} text-slate-300`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {formatCurrency(metric.amount)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className={`font-semibold ${metric.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {metric.change}
                    </span>
                    <span className="text-slate-500">vs прошлый мес.</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Dashboard Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Block: Transactions List (7 Cols) */}
          <div className="lg:col-span-7 bg-[#131522]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">Транзакции</h2>
                  <p className="text-xs text-slate-400 mt-0.5">История операций по категориям</p>
                </div>
                <button 
                  type="button"
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Фильтры</span>
                </button>
              </div>

              {/* Transactions Groups */}
              <div className="space-y-5">
                {TRANSACTIONS_DATA.map((group: TransactionGroup, groupIdx: number) => (
                  <div key={groupIdx} className="space-y-2.5">
                    <div className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                      {group.date}
                    </div>
                    <div className="space-y-2">
                      {group.items.map((tx: TransactionItem) => {
                        const IconComponent = tx.icon;
                        const isIncome = tx.amount > 0;
                        return (
                          <div 
                            key={tx.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-800/40 hover:border-slate-700/60 transition group cursor-pointer"
                          >
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-100">{tx.title}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-rose-950/60 text-rose-300 border border-rose-800/40">
                                    {tx.source}
                                  </span>
                                  <span className="text-[11px] text-slate-500">{tx.category}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className={`text-sm sm:text-base font-bold ${isIncome ? 'text-emerald-400' : 'text-slate-300'}`}>
                              {isIncome ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* View All Button */}
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex justify-center">
              <button 
                type="button"
                className="text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Показать всю историю
              </button>
            </div>
          </div>

          {/* Right Block: Donut Chart Section (5 Cols) */}
          <div className="lg:col-span-5 relative bg-[#131522]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col">
            
            {/* Header / Tab Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex p-1 bg-slate-900/80 border border-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleTabChange('expenses')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    chartType === 'expenses'
                      ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-400 border border-rose-500/30 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Расходы
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('income')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                    chartType === 'income'
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Доходы
                </button>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Всего</span>
                <span className="text-sm font-bold text-slate-200">{formatCurrency(totalChartAmount)}</span>
              </div>
            </div>

            {/* Interactive Donut SVG Chart */}
            <div className="relative flex-1 flex items-center justify-center min-h-[260px]">
              <svg viewBox="0 0 200 200" className="w-56 h-56 sm:w-64 sm:h-64 transform -rotate-90">
                {activeChartData.map((slice: ChartSegment, index: number) => {
                  const previousTotal = activeChartData
                    .slice(0, index)
                    .reduce((sum, item) => sum + item.percentage, 0);
                  
                  const strokeDasharray = `${slice.percentage} ${100 - slice.percentage}`;
                  const strokeDashoffset = -previousTotal;
                  const isHovered = hoveredSlice === index;

                  return (
                    <circle
                      key={slice.id}
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke={slice.color}
                      strokeWidth={isHovered ? 28 : 22}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      pathLength="100"
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 12px ${slice.color})` : 'none',
                        opacity: hoveredSlice !== null && !isHovered ? 0.4 : 1
                      }}
                      onMouseEnter={() => setHoveredSlice(index)}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  );
                })}
              </svg>

              {/* Center Dynamic HUD Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
                {hoveredSlice !== null && activeChartData[hoveredSlice] ? (
                  <div className="animate-fade-in">
                    <p className="text-[11px] font-medium text-slate-400">
                      {activeChartData[hoveredSlice].name}
                    </p>
                    <p className="text-lg font-extrabold text-white">
                      {formatCurrency(activeChartData[hoveredSlice].value)}
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-indigo-300 border border-slate-700">
                      {activeChartData[hoveredSlice].percentage}% от общей суммы
                    </span>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Категории</p>
                    <p className="text-xl font-bold text-slate-100">{activeChartData.length}</p>
                    <p className="text-[10px] text-slate-500 mt-1">наведите для деталей</p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Legend */}
            <div className="mt-4 grid grid-cols-1 gap-2 pt-4 border-t border-slate-800/60">
              {activeChartData.map((item: ChartSegment, index: number) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={`flex items-center justify-between p-2 rounded-lg transition cursor-pointer ${
                    hoveredSlice === index ? 'bg-slate-800/70 border border-slate-700' : 'hover:bg-slate-800/30 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-3 h-3 rounded-full shadow-sm" 
                      style={{ backgroundColor: item.color }} 
                    />
                    <span className="text-xs font-medium text-slate-300">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-100">{formatCurrency(item.value)}</span>
                    <span className="text-[11px] font-semibold text-slate-500 w-8 text-right">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}