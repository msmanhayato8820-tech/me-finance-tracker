"use client";

import { useState } from "react";
import { companies, monthlyFinancials, getMonthLabel } from "@/data/mock";

export default function FinancialTable() {
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const periods = [
    { year: 2025, month: 10 },
    { year: 2025, month: 11 },
    { year: 2025, month: 12 },
    { year: 2026, month: 1 },
    { year: 2026, month: 2 },
    { year: 2026, month: 3 },
  ];

  // 前月データ取得
  const getPrevMonthData = (companyId: string, year: number, month: number) => {
    let prevYear = year;
    let prevMonth = month - 1;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = year - 1;
    }
    return monthlyFinancials.find(
      (f) =>
        f.companyId === companyId &&
        f.year === prevYear &&
        f.month === prevMonth
    );
  };

  const filteredData = monthlyFinancials.filter((f) => {
    const companyMatch =
      selectedCompany === "all" || f.companyId === selectedCompany;
    const periodMatch =
      selectedPeriod === "all" ||
      `${f.year}-${f.month}` === selectedPeriod;
    return companyMatch && periodMatch;
  });

  // Sort by year/month desc, then company
  filteredData.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month !== b.month) return b.month - a.month;
    return a.companyId.localeCompare(b.companyId);
  });

  const renderChange = (current: number, previous: number | undefined) => {
    if (previous === undefined) return <span className="text-slate-400">-</span>;
    const change = ((current - previous) / previous) * 100;
    return (
      <span
        className={`text-xs font-medium ${
          change >= 0 ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {change >= 0 ? "+" : ""}
        {change.toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">財務データ一覧</h2>
        <p className="text-sm text-slate-500 mt-1">
          グループ会社ごとの月次財務データ（売上・原価・粗利・販管費・営業利益）
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            会社
          </label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="block w-full sm:w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
          >
            <option value="all">全社</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            期間
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="block w-full sm:w-40 rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white shadow-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
          >
            <option value="all">全期間</option>
            {periods.map((p) => (
              <option key={`${p.year}-${p.month}`} value={`${p.year}-${p.month}`}>
                {getMonthLabel(p.year, p.month)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="text-left px-4 py-3 font-medium">期間</th>
                <th className="text-left px-4 py-3 font-medium">会社名</th>
                <th className="text-right px-4 py-3 font-medium">
                  売上高
                </th>
                <th className="text-right px-4 py-3 font-medium">前月比</th>
                <th className="text-right px-4 py-3 font-medium">
                  原価
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  粗利
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  粗利率
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  販管費
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  営業利益
                </th>
                <th className="text-right px-4 py-3 font-medium">前月比</th>
                <th className="text-right px-4 py-3 font-medium">
                  営業利益率
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((data) => {
                const company = companies.find(
                  (c) => c.id === data.companyId
                );
                const prev = getPrevMonthData(
                  data.companyId,
                  data.year,
                  data.month
                );
                const grossMargin =
                  (data.grossProfit / data.revenue) * 100;
                const profitMargin =
                  (data.operatingProfit / data.revenue) * 100;

                return (
                  <tr
                    key={`${data.companyId}-${data.year}-${data.month}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-slate-600">
                      {getMonthLabel(data.year, data.month)}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {company?.shortName}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {data.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {renderChange(data.revenue, prev?.revenue)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {data.costOfSales.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {data.grossProfit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {grossMargin.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">
                      {data.sgaExpenses.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-800">
                      {data.operatingProfit.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {renderChange(
                        data.operatingProfit,
                        prev?.operatingProfit
                      )}
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
          全{filteredData.length}件 ｜ 単位: 千円
        </div>
      </div>
    </div>
  );
}
