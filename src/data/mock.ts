import type {
  Company,
  MonthlyFinancial,
  ReceivableData,
  Alert,
  GroupKpi,
  SynergyItem,
} from "@/types";

export const companies: Company[] = [
  {
    id: "mts",
    name: "MEテクノサービス",
    shortName: "テクノサービス",
    pmiStatus: "完了",
    joinedDate: "2023-04",
  },
  {
    id: "mpe",
    name: "MEプラントエンジニアリング",
    shortName: "プラントEng",
    pmiStatus: "最適化中",
    joinedDate: "2023-10",
  },
  {
    id: "mfm",
    name: "MEファシリティマネジメント",
    shortName: "ファシリティ",
    pmiStatus: "標準化中",
    joinedDate: "2024-04",
  },
  {
    id: "mit",
    name: "MEインフラテック",
    shortName: "インフラテック",
    pmiStatus: "最適化中",
    joinedDate: "2024-01",
  },
  {
    id: "mel",
    name: "MEエレクトロニクス",
    shortName: "エレクトロニクス",
    pmiStatus: "標準化中",
    joinedDate: "2024-07",
  },
  {
    id: "mge",
    name: "MEグリーンエナジー",
    shortName: "グリーンEn",
    pmiStatus: "統合初期",
    joinedDate: "2025-04",
  },
  {
    id: "mbt",
    name: "MEビルテクノ",
    shortName: "ビルテクノ",
    pmiStatus: "統合初期",
    joinedDate: "2025-07",
  },
  {
    id: "mps",
    name: "MEパワーシステムズ",
    shortName: "パワーSys",
    pmiStatus: "完了",
    joinedDate: "2023-01",
  },
];

// 月次財務データ（2025年10月〜2026年3月）
export const monthlyFinancials: MonthlyFinancial[] = [
  // MEテクノサービス - 大手、売上6-8億
  { companyId: "mts", year: 2025, month: 10, revenue: 720000, costOfSales: 504000, grossProfit: 216000, sgaExpenses: 151200, operatingProfit: 64800, depreciation: 21600 },
  { companyId: "mts", year: 2025, month: 11, revenue: 680000, costOfSales: 476000, grossProfit: 204000, sgaExpenses: 148000, operatingProfit: 56000, depreciation: 20400 },
  { companyId: "mts", year: 2025, month: 12, revenue: 750000, costOfSales: 525000, grossProfit: 225000, sgaExpenses: 153000, operatingProfit: 72000, depreciation: 22500 },
  { companyId: "mts", year: 2026, month: 1, revenue: 690000, costOfSales: 483000, grossProfit: 207000, sgaExpenses: 149000, operatingProfit: 58000, depreciation: 20700 },
  { companyId: "mts", year: 2026, month: 2, revenue: 710000, costOfSales: 497000, grossProfit: 213000, sgaExpenses: 150000, operatingProfit: 63000, depreciation: 21300 },
  { companyId: "mts", year: 2026, month: 3, revenue: 780000, costOfSales: 546000, grossProfit: 234000, sgaExpenses: 156000, operatingProfit: 78000, depreciation: 23400 },

  // MEプラントエンジニアリング - 中大手、売上5-7億
  { companyId: "mpe", year: 2025, month: 10, revenue: 580000, costOfSales: 417600, grossProfit: 162400, sgaExpenses: 110200, operatingProfit: 52200, depreciation: 17400 },
  { companyId: "mpe", year: 2025, month: 11, revenue: 620000, costOfSales: 446400, grossProfit: 173600, sgaExpenses: 114000, operatingProfit: 59600, depreciation: 18600 },
  { companyId: "mpe", year: 2025, month: 12, revenue: 640000, costOfSales: 460800, grossProfit: 179200, sgaExpenses: 116000, operatingProfit: 63200, depreciation: 19200 },
  { companyId: "mpe", year: 2026, month: 1, revenue: 560000, costOfSales: 403200, grossProfit: 156800, sgaExpenses: 108000, operatingProfit: 48800, depreciation: 16800 },
  { companyId: "mpe", year: 2026, month: 2, revenue: 590000, costOfSales: 424800, grossProfit: 165200, sgaExpenses: 111000, operatingProfit: 54200, depreciation: 17700 },
  { companyId: "mpe", year: 2026, month: 3, revenue: 670000, costOfSales: 482400, grossProfit: 187600, sgaExpenses: 118000, operatingProfit: 69600, depreciation: 20100 },

  // MEファシリティマネジメント - 中堅、売上3-5億
  { companyId: "mfm", year: 2025, month: 10, revenue: 420000, costOfSales: 319200, grossProfit: 100800, sgaExpenses: 79800, operatingProfit: 21000, depreciation: 12600 },
  { companyId: "mfm", year: 2025, month: 11, revenue: 390000, costOfSales: 296400, grossProfit: 93600, sgaExpenses: 77000, operatingProfit: 16600, depreciation: 11700 },
  { companyId: "mfm", year: 2025, month: 12, revenue: 450000, costOfSales: 342000, grossProfit: 108000, sgaExpenses: 81000, operatingProfit: 27000, depreciation: 13500 },
  { companyId: "mfm", year: 2026, month: 1, revenue: 380000, costOfSales: 289000, grossProfit: 91000, sgaExpenses: 76000, operatingProfit: 15000, depreciation: 11400 },
  { companyId: "mfm", year: 2026, month: 2, revenue: 410000, costOfSales: 311600, grossProfit: 98400, sgaExpenses: 78000, operatingProfit: 20400, depreciation: 12300 },
  { companyId: "mfm", year: 2026, month: 3, revenue: 460000, costOfSales: 349600, grossProfit: 110400, sgaExpenses: 82000, operatingProfit: 28400, depreciation: 13800 },

  // MEインフラテック - 中大手、売上4-6億
  { companyId: "mit", year: 2025, month: 10, revenue: 520000, costOfSales: 390000, grossProfit: 130000, sgaExpenses: 93600, operatingProfit: 36400, depreciation: 15600 },
  { companyId: "mit", year: 2025, month: 11, revenue: 480000, costOfSales: 360000, grossProfit: 120000, sgaExpenses: 90000, operatingProfit: 30000, depreciation: 14400 },
  { companyId: "mit", year: 2025, month: 12, revenue: 550000, costOfSales: 412500, grossProfit: 137500, sgaExpenses: 96000, operatingProfit: 41500, depreciation: 16500 },
  { companyId: "mit", year: 2026, month: 1, revenue: 490000, costOfSales: 367500, grossProfit: 122500, sgaExpenses: 91000, operatingProfit: 31500, depreciation: 14700 },
  { companyId: "mit", year: 2026, month: 2, revenue: 510000, costOfSales: 382500, grossProfit: 127500, sgaExpenses: 92000, operatingProfit: 35500, depreciation: 15300 },
  { companyId: "mit", year: 2026, month: 3, revenue: 560000, costOfSales: 420000, grossProfit: 140000, sgaExpenses: 97000, operatingProfit: 43000, depreciation: 16800 },

  // MEエレクトロニクス - 中堅、売上3-4億
  { companyId: "mel", year: 2025, month: 10, revenue: 350000, costOfSales: 252000, grossProfit: 98000, sgaExpenses: 66500, operatingProfit: 31500, depreciation: 10500 },
  { companyId: "mel", year: 2025, month: 11, revenue: 320000, costOfSales: 230400, grossProfit: 89600, sgaExpenses: 64000, operatingProfit: 25600, depreciation: 9600 },
  { companyId: "mel", year: 2025, month: 12, revenue: 380000, costOfSales: 273600, grossProfit: 106400, sgaExpenses: 68000, operatingProfit: 38400, depreciation: 11400 },
  { companyId: "mel", year: 2026, month: 1, revenue: 310000, costOfSales: 223200, grossProfit: 86800, sgaExpenses: 63000, operatingProfit: 23800, depreciation: 9300 },
  { companyId: "mel", year: 2026, month: 2, revenue: 340000, costOfSales: 244800, grossProfit: 95200, sgaExpenses: 65000, operatingProfit: 30200, depreciation: 10200 },
  { companyId: "mel", year: 2026, month: 3, revenue: 370000, costOfSales: 266400, grossProfit: 103600, sgaExpenses: 67000, operatingProfit: 36600, depreciation: 11100 },

  // MEグリーンエナジー - 新規参画、売上2-3億
  { companyId: "mge", year: 2025, month: 10, revenue: 250000, costOfSales: 200000, grossProfit: 50000, sgaExpenses: 42500, operatingProfit: 7500, depreciation: 7500 },
  { companyId: "mge", year: 2025, month: 11, revenue: 230000, costOfSales: 184000, grossProfit: 46000, sgaExpenses: 41000, operatingProfit: 5000, depreciation: 6900 },
  { companyId: "mge", year: 2025, month: 12, revenue: 270000, costOfSales: 216000, grossProfit: 54000, sgaExpenses: 43500, operatingProfit: 10500, depreciation: 8100 },
  { companyId: "mge", year: 2026, month: 1, revenue: 240000, costOfSales: 192000, grossProfit: 48000, sgaExpenses: 42000, operatingProfit: 6000, depreciation: 7200 },
  { companyId: "mge", year: 2026, month: 2, revenue: 260000, costOfSales: 208000, grossProfit: 52000, sgaExpenses: 43000, operatingProfit: 9000, depreciation: 7800 },
  { companyId: "mge", year: 2026, month: 3, revenue: 280000, costOfSales: 224000, grossProfit: 56000, sgaExpenses: 44000, operatingProfit: 12000, depreciation: 8400 },

  // MEビルテクノ - 新規参画、売上2-3億
  { companyId: "mbt", year: 2025, month: 10, revenue: 280000, costOfSales: 218400, grossProfit: 61600, sgaExpenses: 50400, operatingProfit: 11200, depreciation: 8400 },
  { companyId: "mbt", year: 2025, month: 11, revenue: 260000, costOfSales: 202800, grossProfit: 57200, sgaExpenses: 49000, operatingProfit: 8200, depreciation: 7800 },
  { companyId: "mbt", year: 2025, month: 12, revenue: 300000, costOfSales: 234000, grossProfit: 66000, sgaExpenses: 51500, operatingProfit: 14500, depreciation: 9000 },
  { companyId: "mbt", year: 2026, month: 1, revenue: 270000, costOfSales: 210600, grossProfit: 59400, sgaExpenses: 50000, operatingProfit: 9400, depreciation: 8100 },
  { companyId: "mbt", year: 2026, month: 2, revenue: 290000, costOfSales: 226200, grossProfit: 63800, sgaExpenses: 50800, operatingProfit: 13000, depreciation: 8700 },
  { companyId: "mbt", year: 2026, month: 3, revenue: 310000, costOfSales: 241800, grossProfit: 68200, sgaExpenses: 52000, operatingProfit: 16200, depreciation: 9300 },

  // MEパワーシステムズ - 大手、売上5-7億
  { companyId: "mps", year: 2025, month: 10, revenue: 620000, costOfSales: 440200, grossProfit: 179800, sgaExpenses: 111600, operatingProfit: 68200, depreciation: 18600 },
  { companyId: "mps", year: 2025, month: 11, revenue: 590000, costOfSales: 418900, grossProfit: 171100, sgaExpenses: 108000, operatingProfit: 63100, depreciation: 17700 },
  { companyId: "mps", year: 2025, month: 12, revenue: 650000, costOfSales: 461500, grossProfit: 188500, sgaExpenses: 114000, operatingProfit: 74500, depreciation: 19500 },
  { companyId: "mps", year: 2026, month: 1, revenue: 580000, costOfSales: 411800, grossProfit: 168200, sgaExpenses: 107000, operatingProfit: 61200, depreciation: 17400 },
  { companyId: "mps", year: 2026, month: 2, revenue: 610000, costOfSales: 433100, grossProfit: 176900, sgaExpenses: 110000, operatingProfit: 66900, depreciation: 18300 },
  { companyId: "mps", year: 2026, month: 3, revenue: 680000, costOfSales: 482800, grossProfit: 197200, sgaExpenses: 117000, operatingProfit: 80200, depreciation: 20400 },
];

export const receivables: ReceivableData[] = [
  { companyId: "mts", balance: 1250000, turnoverDays: 52, industryAvgDays: 55, isAnomaly: false, trend: "stable" },
  { companyId: "mpe", balance: 1180000, turnoverDays: 61, industryAvgDays: 55, isAnomaly: false, trend: "up" },
  { companyId: "mfm", balance: 980000, turnoverDays: 95, industryAvgDays: 55, isAnomaly: true, trend: "up" },
  { companyId: "mit", balance: 890000, turnoverDays: 58, industryAvgDays: 55, isAnomaly: false, trend: "down" },
  { companyId: "mel", balance: 720000, turnoverDays: 78, industryAvgDays: 55, isAnomaly: true, trend: "up" },
  { companyId: "mge", balance: 650000, turnoverDays: 105, industryAvgDays: 55, isAnomaly: true, trend: "up" },
  { companyId: "mbt", balance: 580000, turnoverDays: 68, industryAvgDays: 55, isAnomaly: false, trend: "stable" },
  { companyId: "mps", balance: 1050000, turnoverDays: 48, industryAvgDays: 55, isAnomaly: false, trend: "down" },
];

export const alerts: Alert[] = [
  {
    id: "a1",
    companyId: "mge",
    type: "receivable",
    severity: "high",
    message: "MEグリーンエナジーの売掛金回転日数が105日に到達。業界平均55日を大幅に超過しており、回収リスクが高まっています。",
    date: "2026-03-28",
  },
  {
    id: "a2",
    companyId: "mfm",
    type: "receivable",
    severity: "high",
    message: "MEファシリティマネジメントの売掛金回転日数が95日に到達。90日超過のため緊急対応が必要です。",
    date: "2026-03-25",
  },
  {
    id: "a3",
    companyId: "mel",
    type: "receivable",
    severity: "medium",
    message: "MEエレクトロニクスの売掛金回転日数が78日。前月比+8日で上昇傾向が続いています。",
    date: "2026-03-20",
  },
  {
    id: "a4",
    companyId: "mge",
    type: "profit",
    severity: "medium",
    message: "MEグリーンエナジーの営業利益率が4.3%と低水準。PMI統合初期のコスト増が影響。",
    date: "2026-03-18",
  },
  {
    id: "a5",
    companyId: "mbt",
    type: "cost",
    severity: "low",
    message: "MEビルテクノの原価率が78%で高止まり。統合後のサプライチェーン最適化を推奨。",
    date: "2026-03-15",
  },
  {
    id: "a6",
    companyId: "mfm",
    type: "profit",
    severity: "medium",
    message: "MEファシリティマネジメントの販管費率が前月比+1.2pt。人件費増加の精査が必要。",
    date: "2026-03-12",
  },
  {
    id: "a7",
    companyId: "mpe",
    type: "receivable",
    severity: "low",
    message: "MEプラントエンジニアリングの売掛金残高が11.8億円に増加。大型案件の検収遅延の可能性。",
    date: "2026-03-10",
  },
];

// グループKPI（直近月: 2026年3月ベース）
export const groupKpi: GroupKpi = {
  consolidatedRevenue: 4110000, // 41.1億円（月次）≒ 半期約246.6億円
  consolidatedOperatingProfit: 364000, // 3.64億円
  ebitda: 487600, // 4.876億円（営業利益 + 減価償却）
  operatingProfitMargin: 8.9,
  revenueGrowthRate: 5.2,
  ebitdaGrowthRate: 7.8,
};

export const synergyItems: SynergyItem[] = [
  // MEテクノサービス（完了）- 高達成
  { id: "sy-001", companyId: "mts", category: "コスト", description: "調達共通化・一括発注によるコスト削減", plannedAmount: 1200, actualAmount: 1380, targetDate: "2025-09-30", status: "完了" },
  { id: "sy-002", companyId: "mts", category: "レベニュー", description: "グループ横断営業による新規顧客獲得", plannedAmount: 2000, actualAmount: 2250, targetDate: "2025-12-31", status: "完了" },

  // MEパワーシステムズ（完了）- 高達成
  { id: "sy-003", companyId: "mps", category: "コスト", description: "バックオフィス統合による間接費削減", plannedAmount: 800, actualAmount: 920, targetDate: "2025-06-30", status: "完了" },
  { id: "sy-004", companyId: "mps", category: "レベニュー", description: "MEテクノとの技術連携による受注拡大", plannedAmount: 1500, actualAmount: 1680, targetDate: "2025-12-31", status: "完了" },

  // MEプラントエンジニアリング（最適化中）- 良好
  { id: "sy-005", companyId: "mpe", category: "コスト", description: "設備保全費用のグループ共通化", plannedAmount: 600, actualAmount: 510, targetDate: "2026-03-31", status: "進行中" },
  { id: "sy-006", companyId: "mpe", category: "レベニュー", description: "工場向けソリューションのクロスセル", plannedAmount: 1800, actualAmount: 1440, targetDate: "2026-06-30", status: "進行中" },

  // MEインフラテック（最適化中）- 良好
  { id: "sy-007", companyId: "mit", category: "コスト", description: "資材調達統合・ベンダー集約", plannedAmount: 700, actualAmount: 630, targetDate: "2026-03-31", status: "進行中" },
  { id: "sy-008", companyId: "mit", category: "レベニュー", description: "インフラ点検サービスのグループ展開", plannedAmount: 1200, actualAmount: 900, targetDate: "2026-06-30", status: "進行中" },

  // MEファシリティマネジメント（標準化中）- 中程度
  { id: "sy-009", companyId: "mfm", category: "コスト", description: "清掃・警備サービス統合発注", plannedAmount: 400, actualAmount: 240, targetDate: "2026-06-30", status: "進行中" },
  { id: "sy-010", companyId: "mfm", category: "レベニュー", description: "グループビルへのFM一括提供", plannedAmount: 900, actualAmount: 450, targetDate: "2026-09-30", status: "遅延" },

  // MEエレクトロニクス（標準化中）- 中程度
  { id: "sy-011", companyId: "mel", category: "コスト", description: "電子部品共同仕入れによるコスト最適化", plannedAmount: 350, actualAmount: 175, targetDate: "2026-06-30", status: "進行中" },
  { id: "sy-012", companyId: "mel", category: "レベニュー", description: "IoTセンサー製品のグループ内展開", plannedAmount: 1000, actualAmount: 400, targetDate: "2026-09-30", status: "遅延" },

  // MEグリーンエナジー（統合初期）- 低達成
  { id: "sy-013", companyId: "mge", category: "コスト", description: "再エネ電力のグループ内融通コスト削減", plannedAmount: 500, actualAmount: 50, targetDate: "2026-12-31", status: "未着手" },
  { id: "sy-014", companyId: "mge", category: "レベニュー", description: "グループ施設への太陽光・省エネ提案", plannedAmount: 1500, actualAmount: 150, targetDate: "2026-12-31", status: "進行中" },

  // MEビルテクノ（統合初期）- 低達成
  { id: "sy-015", companyId: "mbt", category: "コスト", description: "建設資材のグループ一括調達", plannedAmount: 300, actualAmount: 30, targetDate: "2026-12-31", status: "未着手" },
  { id: "sy-016", companyId: "mbt", category: "レベニュー", description: "グループ会社ビル改修受注", plannedAmount: 800, actualAmount: 80, targetDate: "2026-12-31", status: "進行中" },
];

// ユーティリティ関数
export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function getCompanyFinancials(companyId: string): MonthlyFinancial[] {
  return monthlyFinancials.filter((f) => f.companyId === companyId);
}

export function getLatestMonthFinancials(): MonthlyFinancial[] {
  return monthlyFinancials.filter((f) => f.year === 2026 && f.month === 3);
}

export function formatCurrency(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(1)}億`;
  }
  return `${Math.round(value / 100)}百万`;
}

export function formatCurrencyMan(value: number): string {
  return `${(value / 10).toFixed(0)}万`;
}

export function getMonthLabel(year: number, month: number): string {
  return `${year}/${month.toString().padStart(2, "0")}`;
}
