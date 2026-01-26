'use client';

import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 300px 이상 되면 버튼 표시
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="tel:0507-1400-6859"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#CD853F] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#B8860B] transition-all duration-300 hover:scale-110 animate-pulse-ring"
      aria-label="전화하기"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
