import { ArrowDownRight, ArrowUpRight, Banknote, CreditCard, PiggyBank, TrendingUp, Wallet } from "lucide-react";
import type { AccountItem, ChartSegment, KpiItem, TransactionGroup } from "./shared/types/user";

export const KPI_DATA: KpiItem[] = [
  { id: '1', title: 'Чистый капитал', amount: 14850000, change: 5.4, isPositive: true, icon: Wallet },
  { id: '2', title: 'Инвестиции', amount: 8400000, change: 12.1, isPositive: true, icon: TrendingUp },
  { id: '3', title: 'Доходы', amount: 920000, change: 2.8, isPositive: true, icon: ArrowUpRight },
  { id: '4', title: 'Расходы', amount: 410000, change: 1.5, isPositive: false, icon: ArrowDownRight },
];

export const TRANSACTIONS_DATA: TransactionGroup[] = [
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

export const EXPENSES_SEGMENTS: ChartSegment[] = [
  { name: 'Прибыль / Бизнес', amount: 800000, percentage: 41, color: '#ef4444' },
  { name: 'Инвестиции', amount: 350000, percentage: 18, color: '#ec4899' },
  { name: 'Продукты и услуги', amount: 300000, percentage: 15, color: '#22c55e' },
  { name: 'Жилье и ЖКХ', amount: 280000, percentage: 14, color: '#3b82f6' },
  { name: 'Развлечения', amount: 230000, percentage: 12, color: '#bef264' },
];

export const ACCOUNTS_DATA: AccountItem[] = [
  { id: 'a1', title: 'Т-Банк (Основная)', category: 'Дебетовая карта', balance: 450000, currency: '₽', icon: CreditCard, badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { id: 'a2', title: 'БКС Брокер', category: 'Инвестиционный счет', balance: 8400000, currency: '₽', icon: TrendingUp, badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { id: 'a3', title: 'Сбербанк Накопительный', category: 'Депозит 16%', balance: 5800000, currency: '₽', icon: PiggyBank, badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { id: 'a4', title: 'Наличные', category: 'Сейф', balance: 200000, currency: '₽', icon: Banknote, badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
];