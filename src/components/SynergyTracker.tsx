"use client";

import { useState } from "react";
import { synergyItems, companies } from "@/data/mock";
import type { SynergyCategory, SynergyStatus } from "@/types";

const STATUS_CONFIG: Record<
  SynergyStatus,
  { label: string; badge: string }
> = {
  完了: { label: "完了", badge: "bg-green-100 text-green-800" },
  進行中: { label: "進行中", badge: "bg-blue-100 text-blue-800" },
  遅延: { label: "遅延", badge: "bg-red-100 text-red-800" },
  未着手: { label: "未着手", badge: "bg-gray-100 text-gray-500" },
};

const CATEGORY_CONFIG: Record<SynergyCategory, { label: string; color: string }> = {
  コスト: { label: "コスト", color: "bg-purple-100 text-purple-800" },
  レベニュー: { label: "レベニュー", color: "bg-teal-100 text-teal-800" },
};

function AchievementBar({ pct }: { pct: number }) {
  const color =
    pct >= 100
      ? "bg-green-500"
      : pct >= 80
      ? "bg-blue-500"
      : pct >= 50
      ? "bg-amber-400"
      : "bg-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className="text-xs font-bold w-9 text-right">{pct}%</span>
    </div>
  );
}

export default function SynergyTracker() {
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterCategory, setFilterCategory] = useState<"all" | SynergyCategory>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | SynergyStatus>("all");

  // --- 全体サマリー ---
  const totalPlanned = synergyItems.reduce((s, i) => s + i.plannedAmount, 0);
  const totalActual = synergyItems.reduce((s, i) => s + i.actualAmount, 0);
  const overallPct = totalPlanned > 0 ? Math.round((totalActual / totalPlanned) * 100) : 0;
  const completedCount = synergyItems.filter((i) => i.status === "完了").length;
  const delayedCount = synergyItems.filter((i) => i.status === "遅延").length;

  // --- 会社別サマリー ---
  const companySummaries = companies.map((c) => {
    const items = synergyItems.filter((i) => i.companyId === c.id);
    const planned = items.reduce((s, i) => s + i.plannedAmount, 0);
    const actual = items.reduce((s, i) => s + i.actualAmount, 0);
    const pct = planned > 0 ? Math.round((actual / planned) * 100) : 0;
    return { company: c, planned, actual, pct, items };
  }).sort((a, b) => b.pct - a.pct);

  // --- フィルター後アイテム ---
  const filtered = synergyItems.filter((i) => {
    if (filterCompany !== "all" && i.companyId !== filterCompany) return false;
    if (filterCategory !== "all" && i.category !== filterCategory) return false;
    if (filterStatus !== "all" && i.status !== filterStatus) return false;
    return true;
  });

  const statusKeys: SynergyStatus[] = ["完了", "進行中", "遅延", "未着手"];
  const categoryKeys: SynergyCategory[] = ["コスト", "レベニュー"];

  return (
    <div className="space-y-6">
      {/* KPIカード */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">シナジー達成サマリー</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">計画総額</p>
            <p className="text-2xl font-bold text-gray-800">{(totalPlanned / 100).toFixed(0)}百万円</p>
            <p className="text-xs text-gray-400 mt-1">{synergyItems.length}施策</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">実績総額</p>
            <p className="text-2xl font-bold text-[var(--color-primary)]">{(totalActual / 100).toFixed(0)}百万円</p>
            <p className="text-xs text-gray-400 mt-1">計画比 {overallPct}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">完了施策</p>
            <p className="text-2xl font-bold text-green-600">{completedCount}件</p>
            <p className="text-xs text-gray-400 mt-1">全{synergyItems.length}件中</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-500 mb-1">遅延施策</p>
            <p className={`text-2xl font-bold ${delayedCount > 0 ? "text-red-600" : "text-gray-400"}`}>
              {delayedCount}件
            </p>
            <p className="text-xs text-gray-400 mt-1">要対応</p>
          </div>
        </div>
      </section>

      {/* 会社別達成率ランキング */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">会社別達成率ランキング</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">順位</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">会社</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">PMIフェーズ</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">計画（万円）</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">実績（万円）</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 min-w-[160px]">達成率</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {companySummaries.map(({ company, planned, actual, pct }, idx) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-center">
                      {idx === 0 ? (
                        <span className="text-lg">🥇</span>
                      ) : idx === 1 ? (
                        <span className="text-lg">🥈</span>
                      ) : idx === 2 ? (
                        <span className="text-lg">🥉</span>
                      ) : (
                        <span className="text-gray-400 font-medium">{idx + 1}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{company.shortName}</td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-xs text-gray-500">{company.pmiStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 hidden md:table-cell">
                      {planned.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-800 hidden md:table-cell">
                      {actual.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <AchievementBar pct={pct} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 施策一覧 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">施策一覧</h2>
        </div>

        {/* フィルター */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">会社</label>
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              >
                <option value="all">すべて</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.shortName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">カテゴリ</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as "all" | SynergyCategory)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              >
                <option value="all">すべて</option>
                {categoryKeys.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">ステータス</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | SynergyStatus)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              >
                <option value="all">すべて</option>
                {statusKeys.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">{filtered.length}件</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">施策</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">会社</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">カテゴリ</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">計画（万円）</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">実績（万円）</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 min-w-[140px]">達成率</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">目標日</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">ステータス</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => {
                  const company = companies.find((c) => c.id === item.companyId);
                  const pct =
                    item.plannedAmount > 0
                      ? Math.round((item.actualAmount / item.plannedAmount) * 100)
                      : 0;
                  const rowBg =
                    item.status === "遅延"
                      ? "bg-red-50/40"
                      : item.status === "完了"
                      ? "bg-green-50/30"
                      : "";
                  return (
                    <tr key={item.id} className={`hover:bg-gray-50 ${rowBg}`}>
                      <td className="px-4 py-3 font-medium text-gray-800 max-w-[220px]">
                        <p className="truncate">{item.description}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden sm:table-cell text-xs">
                        {company?.shortName}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_CONFIG[item.category].color}`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500 hidden md:table-cell">
                        {item.plannedAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-800 hidden md:table-cell">
                        {item.actualAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <AchievementBar pct={pct} />
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell">
                        {item.targetDate}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_CONFIG[item.status].badge}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                      条件に一致する施策がありません
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
