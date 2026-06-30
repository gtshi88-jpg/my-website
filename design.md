# design.md

Prism Works サイトのデザインシステム定義。`app/globals.css` の実装を正とし、UI を追加・変更する際はここで定義したトークン・パターンに揃える。Tailwind v4（CSS-first）で構築されており、デザイン値の多くは `globals.css` 内のユーティリティクラスとセクション単位の CSS にハードコードされている。

---

## 1. デザイン原則

- **モノクロ基調 + 微量のアクセント**。黒（`#050507` / `#111111`）と白（`#ffffff` / `#f7f7f4`）を主軸に、ティール（`#5eead4`）とローズ（`#fb7185`）を極小の発光・グラデーションでのみ使う。
- **スクロールで「現れる」演出が体験の核**。セクションはマスク（`.section-scene::after`）が剥がれて出現し、コピーや要素は奥行きを持って立ち上がる。詳細は `app/page.tsx` の IntersectionObserver と連動（`CLAUDE.md` 参照）。
- **奥行き（depth / 3D）の表現**。`perspective`・`rotateX`・`translateZ`・グリッドオーバーレイ・ティルトカードで平面に立体感を与える。
- **静かな高級感**。余白広め、フォントは細め（`font-weight: 200〜300`）で大きく、ラベルは太字（`700〜800`）+ 広いトラッキング（`letter-spacing: 0.2em〜0.3em`）+ 大文字。
- **アクセシビリティ優先**。`prefers-reduced-motion`・`pointer: coarse` で演出を確実にフォールバックする。

---

## 2. カラートークン

`globals.css` 内のユーティリティクラスとして定義。新規色は増やさず以下を使う。

| 用途 | 値 | クラス / 参照 |
|------|-----|------|
| 黒（背景・主） | `#050507` | `.bg-black-main` |
| 黒（テキスト・UI主） | `#111111` | `.text-text-main`、`body` 既定文字色 |
| 白（背景） | `#ffffff` | `.bg-white-main` |
| 白（ダーク面の文字） | `#f7f7f4` | `.text-white-main` |
| ソフトグレー背景 | `#f6f6f3` | `data-section-theme="soft"` |
| サブテキスト | `rgba(17,17,17,0.58)` | `.text-text-sub` |
| サブテキスト弱 | `rgba(17,17,17,0.35)` | `.text-text-sub/60` |
| サブテキスト極弱 | `rgba(17,17,17,0.18)` | `.text-text-sub/30` |
| アクセント（ティール） | `rgba(94,234,212,*)` | グラデ・発光のみ |
| アクセント（ローズ） | `rgba(251,113,133,*)` | グラデ・発光のみ |

**ボーダー / 罫線**: ライト面は `rgba(17,17,17,0.12)`、ダーク面は `rgba(255,255,255,0.16)` が基準。

---

## 3. セクションテーマ

`document.body` と各 `.section-scene` の `data-section-theme` 属性で背景トーンを切り替える（値: `dark` / `light` / `grid` / `soft`）。スクロール位置に応じて `app/page.tsx` が body に書き込む。背景色のトランジションは `0.8s cubic-bezier(0.76,0,0.24,1)`。

- `dark` / `grid` のときだけ `.section-tone-layer`（ティール+ローズの放射グラデ）が `opacity: 1` で出現。
- セクションを演出に参加させるには `class="section-scene"` と `data-section-theme="..."` を付与し、`--section-mask-color` を自動継承させる。

---

## 4. タイポグラフィ

フォントは `app/layout.tsx` で `next/font` 読み込み、CSS 変数化。

- **見出し / 英字**: Manrope → `--font-manrope`
- **日本語**: Noto Sans JP → `--font-noto-sans-jp`
- `body` は `font-sans antialiased`、`lang="ja"`。

ウェイトの使い分け（重要・一貫させる）:

| 役割 | weight | 例 |
|------|--------|-----|
| 大見出し・スタッツ数値 | `200〜300`（細） | `.service-flow-row h3`、`.service-detail-stat span` |
| 本文 | `400〜600` | 段落、`.service-deliverable` |
| ラベル / キッカー / メタ | `700〜800` + `letter-spacing 0.2em〜0.3em` + `text-transform: uppercase` | `.hero-kicker`、`.service-detail-toc__title` |

サイズはほぼ `clamp()` による流体タイポグラフィ。トラッキングは大見出しでマイナス（`-0.02em〜-0.06em`）、ラベルでプラス。

---

## 5. 余白・角丸・形状

- **角丸**: 標準 `8px`（カード・ボタン・フレーム）、小要素 `6px`、ピル/ドット `999px`。`.work-frame` などは `border-radius: 8px` に統一。
- **セクション内パディング**: `clamp()` 多用（例 `clamp(5rem, 9vh, 7rem)`）。
- **グリッドオーバーレイ**: 多くのセクション背景に `8vw × 8vw` の方眼（`linear-gradient` 1px 線）+ 両端フェードの `mask-image`。ライト面は `rgba(17,17,17,0.04~0.045)`、ダーク面は `rgba(255,255,255,0.12)`。

---

## 6. モーション / イージング

イージングは用途で固定。新規アニメも以下から選ぶ。

| イージング | 用途 | 代表 duration |
|-----------|------|------|
| `cubic-bezier(0.76,0,0.24,1)` | テーマ切替・マスク・ローダー（力強い加減速） | `0.7s〜1.05s` |
| `cubic-bezier(0.22,1,0.36,1)` | コピー/要素のリビール（やわらかい減速） | `0.95s` |
| `cubic-bezier(0.77,0,0.175,1)` | テキストリビール（行が下から出る） | `1s` |
| `cubic-bezier(0.25,0.46,0.45,0.94)` | 画像ホバーのズーム | `0.8s` |
| `ease` | 細かなホバー（色・border・transform） | `0.25s〜0.35s` |

主なクラス:

- `.reveal-text` / `.reveal-text span` … `overflow: hidden` の行を `translateY(100%) → 0`。`.is-visible` で発火。
- `.section-lift-item` … `translate3d + rotateX + blur` で奥行きのある立ち上がり。
- `.section-copy-panel` … `translateY(3rem)` からのフェードアップ。
- `@keyframes mediaMarquee` … `translateX(0 → -50%)` を `36s linear infinite`（無限マーキー）。

---

## 7. シグネチャーコンポーネント

実装は `components/`・`components/ui/` と `globals.css` に分散。再実装せず既存を使う。

- **カスタムカーソル** (`CustomCursor` + `.cursor-dot` / `.cursor-outline`): サイト全体 `cursor: none`。`mix-blend-mode: difference` の二重円。`body.hovering` で拡大。`pointer: coarse` 端末では非表示・通常カーソルに戻す。
- **ティルトカード** (`components/ui/DepthTilt` + `.depth-card`): `--tilt-x/y`・`--shine-x/y` を JS で更新し `rotateX/Y` とシャインを適用。ホバーで `box-shadow` 強調。
- **Works フローカード** (`.work-card` 一式): ホバーで画像 `scale(1.05)`、内側クローム枠（`translateZ(36px)`）とラジアルシャインが浮上。
- **ヒーロー** (`.hero-shell` + `HeroScene3D`): ダークグラデ背景 + 3D プリズムグリッド（`rotateX(58deg)`）+ Three.js キャンバス（`mix-blend-mode: screen`）。WebGL 不可時は `.hero-scene-fallback`。
- **Works 横スクロール** (`.works-flow-section`): sticky な縦長セクション内で `.works-flow-track` を横移動。フィルターボタン（`.works-filter-button`）、進捗バー（`.works-progress-bar`）付き。
- **サービス詳細** (`app/services/[slug]`): TOC、ブラウザモック（`.service-browser-mock`、`backdrop-filter: blur`）、フィーチャー（左右交互 `is-reverse`）、ダークなフロー一覧、関連実績グリッドで構成。
- **共通UI** (`components/ui/`): `Reveal` / `RevealText`（出現）、`LazyVideo`（遅延ロード）、`ParallaxImage`、`DepthTilt`。

---

## 8. レスポンシブ / アクセシビリティ

ブレークポイントは Tailwind 既定 + `globals.css` のメディアクエリ。

- **`max-width: 767px`（モバイル）**: 3D ヒーローシーン非表示、Works 横スクロールを縦積みグリッド化、サービス詳細の多段グリッドを 1 カラム化、装飾擬似要素を一部 `display: none`。
- **`prefers-reduced-motion: reduce`**: 全 animation/transition を `0.01ms` に短縮、`scroll-behavior: auto`、ティルト/グリッド/マーキー等の `transform` を無効化。`HeroScene3D` も JS 側で配慮（`CLAUDE.md` 参照）。
- **`pointer: coarse`**: カスタムカーソル無効化、`cursor: auto` に戻す。

新しい装飾・アニメーションを足すときは、この 3 条件すべてでの破綻を必ず確認すること。
