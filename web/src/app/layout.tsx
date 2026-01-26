import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "정가네닭국수 | 강서구 방화동 닭칼국수 맛집 | 착한가격업소",
  description: "서울 강서구 방화동 닭칼국수 전문점. 행정안전부 선정 착한가격업소. 닭칼국수 11,000원, 닭개장칼국수, 닭한마리. 방화역 4번출구 134m. 전화 0507-1400-6859",
  keywords: "정가네닭국수, 닭칼국수, 방화동맛집, 강서구맛집, 방화역맛집, 닭개장칼국수, 닭한마리, 착한가격업소, 한식",
  openGraph: {
    title: "정가네닭국수 | 강서구 방화동 닭칼국수 맛집",
    description: "행정안전부 선정 착한가격업소. 담백하고 깔끔한 닭육수. 방화역 4번출구 134m",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#8B4513" />
        <link rel="icon" href="/favicon.ico" />
        {/* 폰트 로드 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
