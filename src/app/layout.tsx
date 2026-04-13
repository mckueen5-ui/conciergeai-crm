import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConciergeAI - 专家招募系统",
  description: "内部CRM仪表盘：管理专家线索、筛选行业/城市、一键发送多语言邀请。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className="dark">
      <body className="min-h-screen bg-dark antialiased">{children}</body>
    </html>
  );
}
