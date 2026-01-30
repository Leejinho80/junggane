'use client';

import { Star, Bell, Calendar } from 'lucide-react';
import storeData from '@/data/store-data.json';

export default function About() {
  const { rating, reviewCount, news } = storeData;

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FFF8DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 이미지 */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20201029_2%2F1603946418291SFlFe_JPEG%2FiA9HrYlsaNNhTqbiLc33VYhs.jpg"
                alt="정가네닭국수 음식"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* 장식 요소 */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#8B4513]/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#CD853F]/10 rounded-full -z-10" />
          </div>

          {/* 텍스트 */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#CD853F]/10 text-[#CD853F] px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 fill-current" />
              착한가격업소
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold text-[#8B4513]"
              style={{ fontFamily: "'Nanum Myeongjo', serif" }}
            >
              정가네 이야기
            </h2>

            <div className="w-16 h-1 bg-[#CD853F]" />

            <p className="text-[#666] leading-relaxed text-lg">
              방화동에서 사랑받는 <strong className="text-[#8B4513]">정가네닭국수</strong>는
              <br />
              오직 <strong className="text-[#8B4513]">정성</strong> 하나로 손님을 맞이합니다.
            </p>

            <p className="text-[#666] leading-relaxed">
              매일 아침 신선한 국내산 닭과 야채로 직접 육수를 우려내고,
              담백하고 깔끔한 맛으로 지역 주민들에게 꾸준한 사랑을 받고 있습니다.
              푸짐한 양과 친절한 서비스로 한 그릇의 따뜻한 정성을 전해드립니다.
            </p>

            {/* 리뷰 하이라이트 */}
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#CD853F]">
              <p className="text-[#666] text-sm italic">
                &ldquo;국물이 깔끔하고 닭이 부드러워요. 사장님도 친절하시고 양도 푸짐해서 좋아요!&rdquo;
              </p>
              <p className="text-[#999] text-xs mt-2">- 네이버 방문자 리뷰</p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#8B4513]">{rating}</p>
                <p className="text-sm text-[#999] mt-1">네이버 평점</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#8B4513]">{reviewCount}+</p>
                <p className="text-sm text-[#999] mt-1">리뷰 수</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#8B4513]">담백</p>
                <p className="text-sm text-[#999] mt-1">깔끔한 육수</p>
              </div>
            </div>
          </div>
        </div>

        {/* 소식 섹션 */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <p className="text-[#CD853F] font-medium mb-2">NEWS</p>
            <h3
              className="text-2xl md:text-3xl font-bold text-[#8B4513]"
              style={{ fontFamily: "'Nanum Myeongjo', serif" }}
            >
              정가네 소식
            </h3>
            <div className="w-12 h-1 bg-[#CD853F] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 bg-[#CD853F]/10 text-[#CD853F] px-3 py-1 rounded-full text-xs font-medium">
                    <Bell className="w-3 h-3" />
                    {item.type}
                  </span>
                </div>
                <h4 className="font-bold text-[#333] mb-2 line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[#666] text-sm mb-4 line-clamp-3 whitespace-pre-line">
                  {item.content}
                </p>
                <div className="flex items-center gap-1 text-[#999] text-xs">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://m.place.naver.com/restaurant/1886440182/feed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8B4513] hover:text-[#CD853F] transition-colors text-sm font-medium"
            >
              네이버에서 더 보기 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
