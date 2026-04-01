import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ME-Finance Tracker | PMI財務統合ダッシュボード",
  description:
    "M&Aで参画したグループ各社の月次売上・原価・営業利益をグループ横断で比較し、売掛金の異常検知やEBITDA改善を可視化するPMI財務統合ダッシュボード",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-100">{children}</body>
    </html>
  );
}
