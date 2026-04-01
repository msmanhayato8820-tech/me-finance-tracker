"use client";

import type { Role } from "@/types";

interface HeaderProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

export default function Header({ role, onRoleChange }: HeaderProps) {
  return (
    <header className="bg-[var(--color-primary)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[var(--color-primary)] font-bold text-sm">
                ME
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">
                ME-Finance Tracker
              </h1>
              <p className="text-xs text-blue-200 hidden sm:block">
                PMI財務統合ダッシュボード
              </p>
            </div>
          </div>

          {/* Role Switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-200 hidden sm:inline">
              ビュー:
            </span>
            <div className="flex bg-blue-900/40 rounded-lg p-0.5">
              <button
                onClick={() => onRoleChange("cfo")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  role === "cfo"
                    ? "bg-white text-[var(--color-primary)] shadow"
                    : "text-blue-200 hover:text-white"
                }`}
              >
                CFO/経営企画
              </button>
              <button
                onClick={() => onRoleChange("pmi")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  role === "pmi"
                    ? "bg-white text-[var(--color-primary)] shadow"
                    : "text-blue-200 hover:text-white"
                }`}
              >
                PMI担当
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
