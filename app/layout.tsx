import type { Metadata } from "next";
import { Manrope, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor"; // 追加

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "PORTFOLIO | Photographer & UI Engineer",
  description: "Digital Craftsman based in Japan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${manrope.variable} ${notoSansJP.variable} font-sans antialiased selection:bg-black selection:text-white`}>
        <CustomCursor /> {/* ここに追加 */}
        {children}
      </body>
    </html>
  );
}
