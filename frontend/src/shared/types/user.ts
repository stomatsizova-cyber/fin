import type { LucideIcon } from "lucide-react";

export type TransactionType = 'income' | 'expense';
// export type ChartType = 'expenses' | 'income';
export type TimeframeType = '1M' | '6M' | '1Y' | 'ALL';

export type TabType = 'expenses' | 'income';

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