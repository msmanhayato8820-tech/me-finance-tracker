"use client";

import { companies, receivables, alerts } from "@/data/mock";

export default function ReceivablesView() {
  const receivableAlerts = alerts.filter((a) => a.type === "receivable");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">売掛金異常検知</h2>
        <p className="text-sm text-slate-500 mt-1">
          各社の売掛金残高と回転日数、異常検知アラート
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">
            売掛金残高合計
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {(
              receivables.reduce((s, r) => s + r.balance, 0) / 10000
            ).toFixed(1)}
            億円
          </p>
          <p className="text-xs text-slate-500 mt-1">グループ8社合計</p>
        </div>
        <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-5">
          <p className="text-xs font-medium text-red-600 mb-1">
            異常検知企業数
          </p>
          <p className="text-2xl font-bold text-red-700">
            {receivables.filter((r) => r.isAnomaly).length}社
          </p>
          <p className="text-xs text-red-500 mt-1">
            回転日数が業界平均を大幅超過
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-5">
          <p className="text-xs font-medium text-amber-600 mb-1">
            グループ平均回転日数
          </p>
          <p className="text-2xl font-bold text-amber-700">
            {Math.round(
              receivables.reduce((s, r) => s + r.turnoverDays, 0) /
                receivables.length
            )}
            日
          </p>
          <p className="text-xs text-amber-500 mt-1">
            業界平均: {receivables[0]?.industryAvgDays ?? 55}日
          </p>
        </div>
      </div>

      {/* Receivables Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">
            各社 売掛金残高・回転日数一覧
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="text-left px-4 py-3 font-medium">会社名</th>
                <th className="text-right px-4 py-3 font-medium">
                  売掛金残高（千円）
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  回転日数
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  業界平均
                </th>
                <th className="text-right px-4 py-3 font-medium">
                  乖離
                </th>
                <th className="text-center px-4 py-3 font-medium">
                  トレンド
                </th>
                <th className="text-center px-4 py-3 font-medium">
                  ステータス
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receivables
                .sort((a, b) => b.turnoverDays - a.turnoverDays)
                .map((data) => {
                  const company = companies.find(
                    (c) => c.id === data.companyId
                  );
                  const deviation =
                    data.turnoverDays - data.industryAvgDays;
                  const trendIcon =
                    data.trend === "up"
                      ? "↑"
                      : data.trend === "down"
                      ? "↓"
                      : "→";
                  const trendColor =
                    data.trend === "up"
                      ? "text-red-600"
                      : data.trend === "down"
                      ? "text-emerald-600"
                      : "text-slate-500";

                  return (
                    <tr
                      key={data.companyId}
                      className={`hover:bg-slate-50 ${
                        data.isAnomaly ? "bg-red-50/50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {company?.name}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-700">
                        {data.balance.toLocaleString()}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-bold ${
                          data.isAnomaly
                            ? "text-red-600"
                            : deviation > 10
                            ? "text-amber-600"
                            : "text-slate-700"
                        }`}
                      >
                        {data.turnoverDays}日
                      </td>
                      <td className="px-4 py-3 text-right text-slate-500">
                        {data.industryAvgDays}日
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-medium ${
                          deviation > 30
                            ? "text-red-600"
                            : deviation > 10
                            ? "text-amber-600"
                            : deviation <= 0
                            ? "text-emerald-600"
                            : "text-slate-600"
                        }`}
                      >
                        {deviation > 0 ? "+" : ""}
                        {deviation}日
                      </td>
                      <td
                        className={`px-4 py-3 text-center font-bold ${trendColor}`}
                      >
                        {trendIcon}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {data.isAnomaly ? (
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            異常
                          </span>
                        ) : deviation > 10 ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            注意
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            正常
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receivable Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800">
            売掛金関連アラート
            <span className="ml-2 text-xs font-normal text-slate-500">
              ({receivableAlerts.length}件)
            </span>
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {receivableAlerts.map((alert) => {
            const isHigh = alert.severity === "high";
            return (
              <div
                key={alert.id}
                className={`px-5 py-3 flex items-start gap-3 ${
                  isHigh ? "bg-red-50" : "bg-amber-50"
                }`}
              >
                <span
                  className={`shrink-0 mt-0.5 text-xs font-bold px-2 py-0.5 rounded border ${
                    isHigh
                      ? "border-red-200 text-red-800"
                      : "border-amber-200 text-amber-800"
                  }`}
                >
                  {isHigh ? "高" : alert.severity === "medium" ? "中" : "低"}
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
