# 정가네닭국수 스타일 가이드

## 1. 브랜드 아이덴티티

### 브랜드 키워드
- **정성** - 한 그릇 한 그릇 정성을 담아
- **전통** - 오랜 세월 지켜온 맛
- **가정식** - 엄마의 손맛, 집밥 같은 따뜻함
- **신뢰** - 믿고 먹을 수 있는 깨끗한 재료

### 브랜드 슬로건 (안)
1. "정성을 담아 끓여낸, 정가네 닭칼국수"
2. "엄마의 손맛 그대로"
3. "한 그릇의 정성, 정가네"

---

## 2. 컬러 팔레트

### Primary Colors (메인 컬러)
```css
--primary-brown: #8B4513;      /* 새들브라운 - 메인 브랜드 컬러 */
--primary-dark: #5D2E0C;       /* 다크브라운 - 헤더, 강조 */
```

### Secondary Colors (보조 컬러)
```css
--secondary-cream: #FFF8DC;    /* 콘실크 - 배경 */
--secondary-beige: #F5F5DC;    /* 베이지 - 섹션 배경 */
--secondary-warm: #FAEBD7;     /* 안티크화이트 - 카드 배경 */
```

### Accent Colors (포인트 컬러)
```css
--accent-orange: #CD853F;      /* 페루 - CTA 버튼 */
--accent-red: #B8860B;         /* 다크골든로드 - 호버 상태 */
```

### Text Colors (텍스트 컬러)
```css
--text-primary: #333333;       /* 본문 텍스트 */
--text-secondary: #666666;     /* 서브 텍스트 */
--text-light: #999999;         /* 비활성 텍스트 */
--text-white: #FFFFFF;         /* 밝은 배경 위 텍스트 */
```

### Semantic Colors (시맨틱 컬러)
```css
--success: #4CAF50;
--warning: #FF9800;
--error: #F44336;
```

---

## 3. 타이포그래피

### 폰트 패밀리
```css
/* 메인 폰트 - 본문용 */
--font-primary: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;

/* 포인트 폰트 - 제목용 (전통미) */
--font-accent: 'NanumMyeongjo', 'Nanum Myeongjo', serif;
```

### 폰트 사이즈 (Desktop)
```css
--text-hero: 48px;       /* 히어로 타이틀 */
--text-h1: 36px;         /* 섹션 타이틀 */
--text-h2: 28px;         /* 서브 타이틀 */
--text-h3: 22px;         /* 카드 타이틀 */
--text-body: 16px;       /* 본문 */
--text-small: 14px;      /* 캡션 */
--text-caption: 12px;    /* 푸터, 법적 고지 */
```

### 폰트 사이즈 (Mobile)
```css
--text-hero-m: 32px;
--text-h1-m: 26px;
--text-h2-m: 22px;
--text-h3-m: 18px;
--text-body-m: 15px;
--text-small-m: 13px;
```

### 폰트 굵기
```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### 줄 간격
```css
--line-height-tight: 1.3;
--line-height-normal: 1.6;
--line-height-relaxed: 1.8;
```

---

## 4. 간격 시스템 (Spacing)

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
--space-4xl: 96px;
```

---

## 5. 컴포넌트 스타일

### 버튼
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-brown);
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: background 0.3s ease;
}
.btn-primary:hover {
  background: var(--primary-dark);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--primary-brown);
  border: 2px solid var(--primary-brown);
  padding: 14px 30px;
  border-radius: 8px;
}

/* CTA Button (전화하기) */
.btn-cta {
  background: var(--accent-orange);
  color: white;
  padding: 18px 36px;
  border-radius: 50px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(205, 133, 63, 0.4);
}
```

### 카드
```css
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}
```

### 섹션
```css
.section {
  padding: 80px 0;
}
.section-title {
  font-family: var(--font-accent);
  font-size: var(--text-h1);
  color: var(--primary-brown);
  text-align: center;
  margin-bottom: 48px;
}
```

---

## 6. 이미지 스타일 가이드

### 음식 사진
- **조명**: 따뜻한 자연광 또는 웜톤 조명
- **각도**: 45도 또는 탑뷰
- **배경**: 나무 테이블, 한지, 도자기 등 전통적 소재
- **색온도**: 3500K ~ 4500K (따뜻한 톤)

### 이미지 처리
```css
/* 음식 사진 */
.food-image {
  border-radius: 12px;
  object-fit: cover;
}

/* 배경 오버레이 (히어로) */
.hero-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
```

---

## 7. 반응형 브레이크포인트

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* 태블릿 세로 */
--breakpoint-md: 768px;   /* 태블릿 가로 */
--breakpoint-lg: 1024px;  /* 노트북 */
--breakpoint-xl: 1280px;  /* 데스크톱 */
--breakpoint-2xl: 1536px; /* 대형 모니터 */
```

---

## 8. 애니메이션

```css
/* 기본 전환 */
--transition-fast: 0.15s ease;
--transition-normal: 0.3s ease;
--transition-slow: 0.5s ease;

/* 스크롤 애니메이션 */
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 9. 접근성 (40-60대 친화)

### 최소 요구사항
- 폰트 사이즈: 본문 최소 16px
- 터치 타겟: 최소 44px x 44px
- 색상 대비: WCAG AA 기준 4.5:1 이상
- 버튼 간격: 최소 8px

### 적용 예시
```css
/* 큰 터치 영역 */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 12px;
}

/* 고대비 텍스트 */
.high-contrast {
  color: #333333; /* on white: 12.63:1 */
}
```

---

## 10. 카피라이팅 톤

### 어조
- 따뜻하고 친근한 말투
- 존칭 사용 (합니다체)
- 과장 없는 정직한 표현

### 예시
```
❌ "최고의 맛! 대박 칼국수!"
✅ "정성을 담아 끓여낸 닭칼국수입니다"

❌ "미쳤다! 이 가격에 이 맛?"
✅ "푸짐한 한 그릇, 든든한 한 끼"

❌ "지금 바로 클릭!"
✅ "메뉴 보러 가기"
```
