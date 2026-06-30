import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { COMPANY } from '@/data/company';

type LegalLayoutProps = {
  title: string;        // 英語見出し
  titleJa: string;      // 日本語見出し
  updated?: string;     // 改定日（任意）
  children: React.ReactNode;
};

export default function LegalLayout({ title, titleJa, updated, children }: LegalLayoutProps) {
  return (
    <main className="bg-white-main min-h-screen text-text-main">
      <SiteHeader theme="light" />

      {/* Header */}
      <header className="px-6 md:px-20 pt-40 md:pt-52 pb-12 md:pb-16 border-b border-black/10 max-w-[1100px] mx-auto w-full">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-text-sub mb-3">{title}</p>
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight">{titleJa}</h1>
        {updated && (
          <p className="mt-6 text-sm text-text-sub">最終更新日：{updated}</p>
        )}
      </header>

      {/* Body */}
      <article className="px-6 md:px-20 py-12 md:py-20 max-w-[1100px] mx-auto w-full">
        {children}
      </article>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-12 border-t border-black/10 max-w-[1100px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-widest hover:opacity-60 transition-opacity">
            {COMPANY.name}.
          </Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-text-sub">
            <Link href="/company" className="hover:text-text-main transition-colors">会社概要</Link>
            <Link href="/privacy" className="hover:text-text-main transition-colors">プライバシーポリシー</Link>
            <Link href="/legal" className="hover:text-text-main transition-colors">特定商取引法に基づく表記</Link>
          </nav>
          <p className="text-sm text-text-sub">© 2026 {COMPANY.name}. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
