import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const notoSansKr = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto',
});

export const metadata: Metadata = {
  title: "IOV | Ideas to Value",
  description: "아이디어 입력하고, 기술로 처리하여, 가치 있는 결과로 전환하는 차세대 MCN 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className={`${notoSansKr.variable} font-sans bg-[#0a0a0a] text-white antialiased selection:bg-lime-400 selection:text-black`}>
        <Navigation />
        <main className="min-h-screen relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
