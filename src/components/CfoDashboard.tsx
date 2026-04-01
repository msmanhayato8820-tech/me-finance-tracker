"use client";

import {
  groupKpi,
  companies,
  getLatestMonthFinancials,
  formatCurrency,
  monthlyFinancials,
} from "@/data/mock";

export default function CfoDashboard() {
  const latestData = getLatestMonthFinancials();
  const prevMonthData = monthlyFinancials.filter(
    (f) => f.year === 2026 && f.month === 2
  );

  const kpiCards = [
    {
      label: "連結売上（月次）",
      value: formatCurrency(groupKpi.consolidatedRevenue),
      sub: `前年同月比 +${groupKpi.revenueGrowthRate}%`,
      color: "text-[var(--color-primary)]",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "連結営業利益",
      value: formatCurrency(groupKpi.consolidatedOperatingProfit),
      sub: `営業利益率 ${groupKpi.operatingProfitMargin}%`,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      label: "EBITDA",
      value: formatCurrency(groupKpi.ebitda),
      sub: `前年同月比 +${groupKpi.ebitdaGrowthRate}%`,
      color: "text-violet-700",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
    },
    {
      label: "営業利益率",
      value: `${groupKpi.operatingProfitMargin}%`,
      sub: "グループ全体",
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          CFO/経営企画ビュー
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          2026年3月度 グループ連結サマリー
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.label}
            className={`${kpi.bgColor} ${kpi.borderColor} border rounded-xl p-5 shadow-sm`}
          >
            <p className="text-xs font-medium text-slate-500 mb-1">
              {kpi.label}
            </p>
            <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Company Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">
            グループ会社別 月次業績比較（2026年3月）
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="text-left px-4 py-3 font-medium">会社名</th>
                <th className="text-right px-4 py-3 font-medium">
                  売上高（千円）
                </th>
                <th className="text-right px-4 py-3 font-medium">前月比</th>
                <th className="text-right px-4 py-3 font-medium">
                  原価率
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  営業利益（千円）
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  営業利益率
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  EBITDA（千円）
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {latestData.map((data) => {
                const company = companies.find(
                  (c) => c.id === data.companyId
                );
                const prev = prevMonthData.find(
                  (p) => p.companyId === data.companyId
                );
                const revenueChange = prev
                  ? ((data.revenue - prev.revenue) / prev.revenue) * 100
                  : 0;
                const costRatio = (data.costOfSales / data.revenue) * 100;
                const profitMargin =
                  (data.operatingProfit / data.revenue) * 100;
                const ebitda = data.operatingProfit + data.depreciation;

                return (
                  <tr key={data.companyId} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {company?.name}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {data.revenue.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        revenueChange >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {revenueChange >= 0 ? "+" : ""}
                      {revenueChange.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {costRatio.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {data.operatingProfit.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        profitMargin >= 8
                          ? "text-emerald-600"
                          : profitMargin >= 5
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {profitMargin.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {ebitda.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[var(--color-primary-light)] font-semibold text-slate-800">
                <td className="px-4 py-3">グループ合計</td>
                <td className="px-4 py-3 text-right">
                  {latestData
                    .reduce((s, d) => s + d.revenue, 0)
                    .toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-emerald-600">-</td>
                <td className="px-4 py-3 text-right">
                  {(
                    (latestData.reduce((s, d) => s + d.costOfSales, 0) /
                      latestData.reduce((s, d) => s + d.revenue, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </td>
                <td className="px-4 py-3 text-right">
                  {latestData
                    .reduce((s, d) => s + d.operatingProfit, 0)
                    .toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {(
                    (latestData.reduce((s, d) => s + d.operatingProfit, 0) /
                      latestData.reduce((s, d) => s + d.revenue, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </td>
                <td className="px-4 py-3 text-right">
                  {latestData
                    .reduce(
                      (s, d) => s + d.operatingProfit + d.depreciation,
                      0
                    )
                    .toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
