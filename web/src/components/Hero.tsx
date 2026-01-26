'use client';

import { Phone, MapPin, Star } from 'lucide-react';
import storeData from '@/data/store-data.json';

export default function Hero() {
  const { rating, reviewCount, phone, hours } = storeData;

  type DayHours = { open: string; close: string; lastOrder: string } | { closed: boolean };

  // 영업시간 포맷
  const formatDayHours = (day: DayHours) => {
    if ('closed' in day && day.closed) return '휴무';
    if ('open' in day) return `${day.open}-${day.close}`;
    return '휴무';
  };

  const hoursText = `영업시간: 월 ${formatDayHours(hours.monday)} / 화~금 ${formatDayHours(hours.tuesday)} / 토·일 ${formatDayHours(hours.saturday)}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* 배경 이미지 - Unsplash 무료 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-bg.jpg')`,
        }}
      />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 착한가격업소 배지 */}
        <div
          className="inline-flex items-center gap-2 bg-[#CD853F]/90 text-white px-4 py-2 rounded-full text-sm mb-6 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <Star className="w-4 h-4 fill-current" />
          <span>행정안전부 선정 착한가격업소</span>
        </div>

        {/* 서브 타이틀 */}
        <p
          className="text-[#CD853F] text-lg md:text-xl mb-4 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          정성을 담아 끓여낸
        </p>

        {/* 메인 타이틀 */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up"
          style={{
            fontFamily: "'Nanum Myeongjo', serif",
            animationDelay: '0.4s'
          }}
        >
          정가네 닭국수
        </h1>

        {/* 별점 */}
        <div
          className="flex items-center justify-center gap-2 mb-6 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-400/50'}`}
              />
            ))}
          </div>
          <span className="text-white/90 text-lg font-semibold">{rating}</span>
          <span className="text-white/60 text-sm">(리뷰 {reviewCount}+)</span>
        </div>

        {/* 설명 */}
        <p
          className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          신선한 닭과 야채로 우려낸 담백하고 깔끔한 육수
          <br className="hidden sm:block" />
          방화동에서 사랑받는 동네 맛집
        </p>

        {/* CTA 버튼들 */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: '0.8s' }}
        >
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 bg-[#CD853F] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#B8860B] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <Phone className="w-5 h-5" />
            전화 예약하기
          </a>
          <a
            href="#location"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
          >
            <MapPin className="w-5 h-5" />
            오시는 길
          </a>
        </div>

        {/* 영업시간 */}
        <div
          className="mt-10 md:mt-16 mb-20 md:mb-0 text-white/70 text-sm animate-fade-in-up space-y-1"
          style={{ animationDelay: '1s' }}
        >
          <p>{hoursText}</p>
          <p>방화역 4번 출구 134m</p>
        </div>
      </div>

      {/* 스크롤 인디케이터 - 모바일에서 숨김 */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
