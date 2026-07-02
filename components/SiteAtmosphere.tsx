import HomeStarfield from '@/components/HomeStarfield';

/**
 * 全ページ共通の背景アトモスフィア。
 * トップページと同じ星屑（WebGL）＋プリズムのグローを敷き、下層ページまで世界観を地続きにする。
 * PageShell 内でコンテンツ（z-10）の背後（z-0 以下）に配置される。
 */
export default function SiteAtmosphere() {
  return (
    <>
      <div className="page-atmosphere" aria-hidden="true" />
      <HomeStarfield />
    </>
  );
}
