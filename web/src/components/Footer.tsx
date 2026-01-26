'use client';

import storeData from '@/data/store-data.json';

export default function Footer() {
  const { phone, address, hours } = storeData;

  type DayHours = { open: string; close: string; lastOrder: string } | { closed: boolean };

  const formatDayHours = (day: DayHours) => {
    if ('closed' in day && day.closed) return '휴무';
    if ('open' in day) return `${day.open}-${day.close}`;
    return '휴무';
  };

  const hoursText = `영업시간: 월 ${formatDayHours(hours.monday)} / 화~금 ${formatDayHours(hours.tuesday)} / 토·일 ${formatDayHours(hours.saturday)}`;

  return (
    <footer className="bg-[#5D2E0C] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          {/* 로고 */}
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: "'Nanum Myeongjo', serif" }}
          >
            정가네닭국수
          </h3>

          {/* 정보 */}
          <div className="text-white/70 text-sm space-y-1">
            <p>주소: {address}</p>
            <p>5호선 방화역 4번 출구 134m</p>
            <p>
              전화:{' '}
              <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            </p>
            <p>{hoursText}</p>
          </div>

          {/* 구분선 */}
          <div className="w-16 h-px bg-white/20 mx-auto my-6" />

          {/* 저작권 */}
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} 정가네닭국수. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
