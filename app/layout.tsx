import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-en",
});

export const metadata: Metadata = {
  title: "Capto - iOS & Android 화면 캡처 for macOS",
  description: "iOS와 Android 기기의 화면을 macOS에서 쉽게 캡처하세요. 앱 개발자와 디자이너를 위한 전문 스크린 캡처 도구.",
  keywords: ["iOS 캡처", "Android 캡처", "스크린샷", "macOS", "화면 캡처", "앱 개발", "UI 디자인"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Capto - iOS & Android 화면 캡처",
    description: "전문가를 위한 크로스 플랫폼 스크린 캡처 솔루션",
    url: "https://capto.app",
    siteName: "Capto",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Capto - iOS & Android 화면 캡처",
    description: "전문가를 위한 크로스 플랫폼 스크린 캡처 솔루션",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
