"use client";

import {
  companies,
  monthlyFinancials,
  receivables,
  alerts,
  getMonthLabel,
} from "@/data/mock";
import type { PmiStatus } from "@/types";

const statusColors: Record<PmiStatus, { bg: string; text: string; dot: string }> = {
  統合初期: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  標準化中: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  最適化中: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  完了: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
};

const severityStyles: Record<string, { bg: string; text: string; border: string }> = {
  high: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" },
  medium: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  low: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
};

const severityLabels: Record<string, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export default function PmiDashboard() {
  const months = [
    { year: 2025, month: 10 },
    { year: 2025, month: 11 },
    { year: 2025, month: 12 },
    { year: 2026, month: 1 },
    { year: 2026, month: 2 },
    { year: 2026, month: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">PMI担当ビュー</h2>
        <p className="text-sm text-slate-500 mt-1">
          M&A参画後の各社業績推移・PMI進捗・異常アラート
        </p>
      </div>

      {/* PMI Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {companies.map((company) => {
          const style = statusColors[company.pmiStatus];
          const latestData = monthlyFinancials.find(
            (f) =>
              f.companyId === company.id && f.year === 2026 && f.month === 3
          );
          const profitMargin = latestData
            ? ((latestData.operatingProfit / latestData.revenue) * 100).toFixed(
                1
              )
            : "-";
          const receivable = receivables.find(
            (r) => r.companyId === company.id
          );

          return (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-slate-800 text-sm leading-tight">
                  {company.name}
                </h4>
                <span
                  className={`${style.bg} ${style.text} text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 shrink-0 ml-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                  ></span>
                  {company.pmiStatus}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>参画日:</span>
                  <span className="font-medium">{company.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>営業利益率:</span>
                  <span
                    className={`font-medium ${
                      Number(profitMargin) >= 8
                        ? "text-emerald-600"
                        : Number(profitMargin) >= 5
                        ? "text-amber-600"
                        : "text-red-600"
                    }`}
                  >
                    {profitMargin}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>売掛金回転日数:</span>
                  <span
                    className={`font-medium ${
                      receivable?.isAnomaly ? "text-red-600" : "text-slate-700"
                    }`}
                  >
                    {receivable?.turnoverDays ?? "-"}日
                    {receivable?.isAnomaly && " !!"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Trend Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">
            各社 月次営業利益推移（千円）
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="text-left px-4 py-3 font-medium sticky left-0 bg-slate-50 z-10">
                  会社名
                </th>
                {months.map((m) => (
                  <th
                    key={`${m.year}-${m.month}`}
                    className="text-right px-4 py-3 font-medium"
                  >
                    {getMonthLabel(m.year, m.month)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800 sticky left-0 bg-white z-10">
                    {company.shortName}
                  </td>
                  {months.map((m, idx) => {
                    const data = monthlyFinancials.find(
                      (f) =>
                        f.companyId === company.id &&
                        f.year === m.year &&
                        f.month === m.month
                    );
                    const prevMonth =
                      idx > 0 ? months[idx - 1] : null;
                    const prevData = prevMonth
                      ? monthlyFinancials.find(
                          (f) =>
                            f.companyId === company.id &&
                            f.year === prevMonth.year &&
                            f.month === prevMonth.month
                        )
                      : null;
                    const change =
                      data && prevData
                        ? data.operatingProfit - prevData.operatingProfit
                        : null;

                    return (
                      <td
                        key={`${m.year}-${m.month}`}
                        className="px-4 py-3 text-right"
                      >
                        <span className="text-slate-700">
                          {data?.operatingProfit.toLocaleString() ?? "-"}
                        </span>
                        {change !== null && (
                          <span
                            className={`block text-xs ${
                              change >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {change >= 0 ? "+" : ""}
                            {change.toLocaleString()}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">
            アラート一覧
            <span className="ml-2 text-xs font-normal text-slate-500">
              ({alerts.length}件)
            </span>
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {alerts.map((alert) => {
            const style = severityStyles[alert.severity];
            return (
              <div
                key={alert.id}
                className={`px-5 py-3 flex items-start gap-3 ${style.bg}`}
              >
                <span
                  className={`shrink-0 mt-0.5 text-xs font-bold px-2 py-0.5 rounded border ${style.border} ${style.text}`}
                >
                  {severityLabels[alert.severity]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {alert.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
