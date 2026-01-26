import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "정가네닭국수 | 강서구 방화동 닭칼국수 맛집 | 착한가격업소",
  description: "서울 강서구 방화동 닭칼국수 전문점. 행정안전부 선정 착한가격업소. 닭칼국수 11,000원, 닭개장칼국수, 닭한마리. 방화역 4번출구 134m. 전화 0507-1400-6859",
  keywords: "정가네닭국수, 닭칼국수, 방화동맛집, 강서구맛집, 방화역맛집, 닭개장칼국수, 닭한마리, 착한가격업소, 한식",
  authors: [{ name: "정가네닭국수" }],
  creator: "정가네닭국수",
  publisher: "정가네닭국수",
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "정가네닭국수 | 강서구 방화동 닭칼국수 맛집",
    description: "행정안전부 선정 착한가격업소. 담백하고 깔끔한 닭육수. 방화역 4번출구 134m",
    type: "website",
    locale: "ko_KR",
    siteName: "정가네닭국수",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "정가네닭국수 대표 메뉴",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "정가네닭국수 | 강서구 방화동 닭칼국수 맛집",
    description: "행정안전부 선정 착한가격업소. 담백하고 깔끔한 닭육수. 방화역 4번출구 134m",
    images: ["/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // 나중에 Google Search Console, Naver Webmaster 등록 시 추가
    // google: "구글 인증 코드",
    // other: { "naver-site-verification": "네이버 인증 코드" },
  },
};

// 음식점 구조화 데이터 (JSON-LD)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "정가네닭국수",
  image: "/hero-bg.jpg",
  "@id": "",
  url: "",
  telephone: "0507-1400-6859",
  priceRange: "₩₩",
  address: {
    "@type": "PostalAddress",
    streetAddress: "금낭화로23길 25 상가동 1층 108호",
    addressLocality: "강서구",
    addressRegion: "서울특별시",
    postalCode: "",
    addressCountry: "KR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.5779,
    longitude: 126.811958,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday"],
      opens: "11:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
      closes: "22:00",
    },
  ],
  servesCuisine: "한식",
  menu: [
    {
      "@type": "MenuItem",
      name: "닭칼국수",
      description: "신선한 닭반마리와 야채로 우려낸 담백하고 깔끔한 닭칼국수",
      offers: {
        "@type": "Offer",
        price: "11000",
        priceCurrency: "KRW",
      },
    },
    {
      "@type": "MenuItem",
      name: "닭개장 칼국수",
      description: "신선한 닭과 야채로 얼큰한 국물에 쫄깃한 생면",
      offers: {
        "@type": "Offer",
        price: "11000",
        priceCurrency: "KRW",
      },
    },
    {
      "@type": "MenuItem",
      name: "닭한마리 (2~3인)",
      description: "진하고 시원한 육수와 신선한 닭으로 만든 대표 닭한마리",
      offers: {
        "@type": "Offer",
        price: "38000",
        priceCurrency: "KRW",
      },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.64",
    reviewCount: "285",
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
        <link rel="canonical" href="https://junggane.vercel.app" />
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* 폰트 로드 */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
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
