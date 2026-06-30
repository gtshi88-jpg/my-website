import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY } from '@/data/company';

export default function SiteFooter() {
  return (
    <footer className="bg-black-main text-white-main px-6 md:px-20 py-20 md:py-28">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 pb-16 border-b border-white/10">
          <div className="max-w-md">
            <p className="text-2xl md:text-3xl font-light leading-snug mb-6">
              事業の成長を、Webでつくる。<br />
              まずはお気軽にご相談ください。
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide px-7 py-4 bg-white text-black rounded-full hover:opacity-80 transition-opacity"
            >
              お問い合わせ
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16 text-sm">
            <div>
              <p className="font-bold tracking-widest mb-4 text-white/50">SITEMAP</p>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/works" className="hover:text-white transition-colors">Work</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-widest mb-4 text-white/50">INFORMATION</p>
              <ul className="space-y-2 text-white/80">
                <li><Link href="/company" className="hover:text-white transition-colors">会社概要</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/legal" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8">
          <Link href="/" className="text-xl font-bold tracking-widest hover:opacity-60 transition-opacity">
            {COMPANY.name}.
          </Link>
          <p className="text-sm text-white/50">© 2026 {COMPANY.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
