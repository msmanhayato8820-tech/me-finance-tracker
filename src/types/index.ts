export type Role = "cfo" | "pmi";

export type TabType = "dashboard" | "financial" | "receivables" | "synergy";

export type PmiStatus = "統合初期" | "標準化中" | "最適化中" | "完了";

export interface Company {
  id: string;
  name: string;
  shortName: string;
  pmiStatus: PmiStatus;
  joinedDate: string;
}

export interface MonthlyFinancial {
  companyId: string;
  year: number;
  month: number;
  revenue: number;
  costOfSales: number;
  grossProfit: number;
  sgaExpenses: number;
  operatingProfit: number;
  depreciation: number;
}

export interface ReceivableData {
  companyId: string;
  balance: number;
  turnoverDays: number;
  industryAvgDays: number;
  isAnomaly: boolean;
  trend: "up" | "down" | "stable";
}

export interface Alert {
  id: string;
  companyId: string;
  type: "receivable" | "profit" | "cost";
  severity: "high" | "medium" | "low";
  message: string;
  date: string;
}

export type SynergyCategory = "コスト" | "レベニュー";
export type SynergyStatus = "完了" | "進行中" | "遅延" | "未着手";

export interface SynergyItem {
  id: string;
  companyId: string;
  category: SynergyCategory;
  description: string;
  plannedAmount: number;   // 万円
  actualAmount: number;    // 万円
  targetDate: string;
  status: SynergyStatus;
}

export interface GroupKpi {
  consolidatedRevenue: number;
  consolidatedOperatingProfit: number;
  ebitda: number;
  operatingProfitMargin: number;
  revenueGrowthRate: number;
  ebitdaGrowthRate: number;
}
