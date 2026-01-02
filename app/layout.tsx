import type { Metadata } from "next";
import { Noto_Sans_KR, Syne } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import FluidCursor from "@/components/FluidCursor";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import { CommandPalette } from "@/components/CommandPalette";
import { ShowreelProvider } from "@/context/ShowreelContext";
import ShowreelModal from "@/components/ShowreelModal";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto',
});

const syne = Syne({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: "IOV | Input Output Value",
  description: "Global Tech-Media Group. 아이디어를 가치로 증명하는 글로벌 MCN.",
  openGraph: {
    title: "IOV | Input Output Value",
    description: "아이디어를 가치로 증명하는 글로벌 Tech-Media Group. 크리에이터와 비즈니스를 연결합니다.",
    url: "https://iov.kr",
    siteName: "IOV",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IOV | Input Output Value",
    description: "Global Tech-Media Group",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${notoSansKr.variable} ${syne.variable} font-sans bg-[#0a0a0a] text-white antialiased selection:bg-lime-400 selection:text-black`}
      >
        <ShowreelProvider>
          <NoiseOverlay />
          <Preloader />
          <FluidCursor />
          <CommandPalette />
          <ShowreelModal />
          <SmoothScroll>
            <Navigation />
            {/*
              NOTE:
              position: sticky 는 조상 요소에 overflow(hidden/auto/scroll)가 있으면 (x축만이어도)
              Chrome에서 쉽게 깨진다. 스크롤 기반 고정 섹션(Scroll3DShowcase 등)을 위해
              main에는 overflow를 걸지 않는다.
            */}
            <main className="min-h-screen relative">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ShowreelProvider>
      </body>
    </html>
  );
}
