'use client';

import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const navItems = [
  { name: '소개', href: '#about' },
  { name: '메뉴', href: '#menu' },
  { name: '오시는 길', href: '#location' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <a href="#" className="flex items-center space-x-2">
            <span
              className={`text-xl md:text-2xl font-bold transition-colors ${
                isScrolled ? 'text-[#8B4513]' : 'text-white'
              }`}
              style={{ fontFamily: "'Nanum Myeongjo', serif" }}
            >
              정가네닭국수
            </span>
          </a>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#CD853F] ${
                  isScrolled ? 'text-[#333]' : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="tel:0507-1400-6859"
              className="flex items-center gap-2 bg-[#CD853F] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#B8860B] transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4" />
              전화하기
            </a>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[#333]' : 'text-white'
            }`}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 mb-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#333] font-medium py-2 hover:text-[#CD853F] transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="tel:0507-1400-6859"
                className="flex items-center justify-center gap-2 bg-[#CD853F] text-white px-5 py-3 rounded-full font-semibold hover:bg-[#B8860B] transition-colors mt-2"
              >
                <Phone className="w-4 h-4" />
                전화하기
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
