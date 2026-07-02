import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import SiteAtmosphere from '@/components/SiteAtmosphere';

type PageShellProps = {
  children: React.ReactNode;
  /** フッターを出さない場合 true */
  hideFooter?: boolean;
};

/**
 * 全下層ページ共通のガワ。
 * ダーク基調（#050507）＋ダークヘッダー＋共通アトモスフィア（星屑）を提供し、
 * コンテンツを z-10 に載せることで、どのページも同じ世界観に揃える。
 */
export default function PageShell({ children, hideFooter = false }: PageShellProps) {
  return (
    <main className="relative bg-black-main text-white-main min-h-screen">
      <SiteHeader theme="dark" />
      <SiteAtmosphere />

      <div className="relative z-10">
        {children}
        {!hideFooter && <SiteFooter />}
      </div>
    </main>
  );
}
