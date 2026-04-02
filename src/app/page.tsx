"use client";

import { useState } from "react";
import type { Role, TabType } from "@/types";
import Header from "@/components/Header";
import CfoDashboard from "@/components/CfoDashboard";
import PmiDashboard from "@/components/PmiDashboard";
import FinancialTable from "@/components/FinancialTable";
import ReceivablesView from "@/components/ReceivablesView";
import SynergyTracker from "@/components/SynergyTracker";

export default function Home() {
  const [role, setRole] = useState<Role>("cfo");
  const [tab, setTab] = useState<TabType>("dashboard");

  const tabs: { key: TabType; label: string }[] = [
    { key: "dashboard", label: "ダッシュボード" },
    { key: "financial", label: "財務データ一覧" },
    { key: "receivables", label: "売掛金異常検知" },
    { key: "synergy", label: "シナジー管理" },
  ];

  return (
    <div className="min-h-screen">
      <Header role={role} onRoleChange={setRole} />

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1" aria-label="Tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.key
                    ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {tab === "dashboard" && role === "cfo" && <CfoDashboard />}
        {tab === "dashboard" && role === "pmi" && <PmiDashboard />}
        {tab === "financial" && <FinancialTable />}
        {tab === "receivables" && <ReceivablesView />}
        {tab === "synergy" && <SynergyTracker />}
      </main>
    </div>
  );
}
