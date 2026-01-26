'use client';

import { MapPin, Clock, Car, Phone, ExternalLink, Train, Wifi, Users, Dog } from 'lucide-react';
import storeData from '@/data/store-data.json';

export default function Location() {
  const { phone, address, hours } = storeData;

  // 네이버 지도 URL
  const naverMapUrl = 'https://map.naver.com/p/entry/place/1886440182';

  type DayHours = { open: string; close: string; lastOrder: string } | { closed: boolean };

  const formatDayHours = (day: DayHours, showLastOrder = true) => {
    if ('closed' in day && day.closed) return null;
    if ('open' in day) {
      const lastOrder = showLastOrder && day.lastOrder ? ` (L.O ${day.lastOrder})` : '';
      return `${day.open} - ${day.close}${lastOrder}`;
    }
    return null;
  };

  return (
    <section id="location" className="py-20 md:py-28 bg-[#FFF8DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 */}
        <div className="text-center mb-12">
          <p className="text-[#CD853F] font-medium mb-2">LOCATION</p>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-4"
            style={{ fontFamily: "'Nanum Myeongjo', serif" }}
          >
            오시는 길
          </h2>
          <div className="w-16 h-1 bg-[#CD853F] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* 지도 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-auto">
            {/* Google 지도 임베드 - 방화동 좌표 */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1581.5!2d126.811958!3d37.5779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e6b0a4d1f7f%3A0x0!2z7ISc7Jq47Yq567OE7IucIOqwlOyEnOq1rCDquIjrgpntmZTroZwyM-q4uCAyNQ!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="정가네닭국수 위치"
            />
          </div>

          {/* 정보 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg space-y-5">
            {/* 주소 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#8B4513]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h3 className="font-bold text-[#333] mb-1">주소</h3>
                <p className="text-[#666]">{address}</p>
              </div>
            </div>

            {/* 교통 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#8B4513]/10 flex items-center justify-center flex-shrink-0">
                <Train className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h3 className="font-bold text-[#333] mb-1">교통</h3>
                <p className="text-[#666]">5호선 방화역 4번 출구에서 134m</p>
                <p className="text-[#999] text-sm mt-1">
                  4번 출구 → 공영주차장 통과 → 한 블럭 후 우측 50m
                </p>
              </div>
            </div>

            {/* 영업시간 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#8B4513]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h3 className="font-bold text-[#333] mb-2">영업시간</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#666]">월요일</span>
                    {formatDayHours(hours.monday) ? (
                      <span className="text-[#333]">{formatDayHours(hours.monday, false)} <span className="text-[#CD853F]">(L.O {'lastOrder' in hours.monday ? hours.monday.lastOrder : ''})</span></span>
                    ) : (
                      <span className="text-[#CD853F] font-medium">휴무</span>
                    )}
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#666]">화~금</span>
                    {formatDayHours(hours.tuesday) ? (
                      <span className="text-[#333]">{formatDayHours(hours.tuesday, false)} <span className="text-[#CD853F]">(L.O {'lastOrder' in hours.tuesday ? hours.tuesday.lastOrder : ''})</span></span>
                    ) : (
                      <span className="text-[#CD853F] font-medium">휴무</span>
                    )}
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#666]">토/일</span>
                    {formatDayHours(hours.saturday) ? (
                      <span className="text-[#333]">{formatDayHours(hours.saturday)}</span>
                    ) : (
                      <span className="text-[#CD853F] font-medium">정기휴무</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#8B4513]/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-[#8B4513]" />
              </div>
              <div>
                <h3 className="font-bold text-[#333] mb-1">전화번호</h3>
                <a
                  href={`tel:${phone}`}
                  className="text-[#8B4513] font-bold text-xl hover:text-[#CD853F] transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* 편의시설 */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-bold text-[#333] mb-3">편의시설</h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8DC] rounded-full text-xs text-[#666]">
                  <Wifi className="w-3 h-3" /> 무선 인터넷
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8DC] rounded-full text-xs text-[#666]">
                  <Users className="w-3 h-3" /> 단체 이용
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8DC] rounded-full text-xs text-[#666]">
                  <Car className="w-3 h-3" /> 주차 가능
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8DC] rounded-full text-xs text-[#666]">
                  <Dog className="w-3 h-3" /> 반려동물
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8DC] rounded-full text-xs text-[#666]">
                  포장 가능
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFF8DC] rounded-full text-xs text-[#666]">
                  예약 가능
                </span>
              </div>
            </div>

            {/* 네이버 지도 버튼 */}
            <a
              href={naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#03C75A] text-white py-4 rounded-xl font-semibold hover:bg-[#02b350] transition-colors mt-4"
            >
              <span>네이버 지도에서 보기</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
