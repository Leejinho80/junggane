const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const sites = [
  { name: 'bonif', url: 'https://www.bonif.co.kr', label: '본죽' },
  { name: 'sinjeon', url: 'https://www.sinjeon.co.kr', label: '신전떡볶이' },
  { name: 'mdkgs', url: 'http://mdkgs.co.kr', label: '명동칼국수' },
  { name: 'hyunpung', url: 'http://hyunpungkalguksu.com', label: '현풍닭칼국수' }
];

const screenshotsDir = path.join(__dirname, 'benchmarks');

async function analyzeSite(browser, site) {
  const results = {
    name: site.label,
    url: site.url,
    desktop: {},
    mobile: {},
    performance: {}
  };

  try {
    // Desktop 분석
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    });
    const desktopPage = await desktopContext.newPage();

    const startTime = Date.now();
    await desktopPage.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
    const loadTime = Date.now() - startTime;

    results.performance.loadTime = loadTime;
    results.performance.loadTimeSeconds = (loadTime / 1000).toFixed(2);

    // Desktop 스크린샷
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, `${site.name}-desktop.png`),
      fullPage: false
    });

    // 전체 페이지 스크린샷
    await desktopPage.screenshot({
      path: path.join(screenshotsDir, `${site.name}-desktop-full.png`),
      fullPage: true
    });

    // 페이지 정보 수집
    results.desktop.title = await desktopPage.title();
    results.desktop.hasNavigation = await desktopPage.locator('nav, header, .nav, .header, #nav, #header').count() > 0;
    results.desktop.hasHero = await desktopPage.locator('.hero, .banner, .slider, .main-visual, #hero, #banner').count() > 0;
    results.desktop.hasFooter = await desktopPage.locator('footer, .footer, #footer').count() > 0;

    // 컬러 추출 시도
    const bgColor = await desktopPage.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    results.desktop.backgroundColor = bgColor;

    // 폰트 추출
    const fontFamily = await desktopPage.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    results.desktop.fontFamily = fontFamily;

    await desktopContext.close();

    // Mobile 분석
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Mobile 스크린샷
    await mobilePage.screenshot({
      path: path.join(screenshotsDir, `${site.name}-mobile.png`),
      fullPage: false
    });

    // 모바일 반응형 체크
    results.mobile.hasHamburgerMenu = await mobilePage.locator('.hamburger, .menu-toggle, .mobile-menu, [class*="hamburger"], [class*="toggle"]').count() > 0;
    results.mobile.hasTelLink = await mobilePage.locator('a[href^="tel:"]').count() > 0;

    await mobileContext.close();

    results.status = 'success';
  } catch (error) {
    results.status = 'error';
    results.error = error.message;
  }

  return results;
}

async function main() {
  // 스크린샷 디렉토리 생성
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🔍 경쟁사 사이트 분석 시작...\n');

  const browser = await chromium.launch({ headless: true });
  const allResults = [];

  for (const site of sites) {
    console.log(`📊 분석 중: ${site.label} (${site.url})`);
    const result = await analyzeSite(browser, site);
    allResults.push(result);
    console.log(`   ✅ 완료 - 로딩시간: ${result.performance.loadTimeSeconds || 'N/A'}초\n`);
  }

  await browser.close();

  // 결과 저장
  const reportPath = path.join(screenshotsDir, 'analysis-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(allResults, null, 2), 'utf-8');

  // 콘솔 리포트 출력
  console.log('\n' + '='.repeat(60));
  console.log('📋 벤치마킹 분석 결과');
  console.log('='.repeat(60) + '\n');

  for (const result of allResults) {
    console.log(`【 ${result.name} 】`);
    console.log(`   URL: ${result.url}`);
    console.log(`   로딩 속도: ${result.performance.loadTimeSeconds || 'N/A'}초`);
    console.log(`   페이지 타이틀: ${result.desktop.title || 'N/A'}`);
    console.log(`   네비게이션: ${result.desktop.hasNavigation ? '✅' : '❌'}`);
    console.log(`   히어로 섹션: ${result.desktop.hasHero ? '✅' : '❌'}`);
    console.log(`   푸터: ${result.desktop.hasFooter ? '✅' : '❌'}`);
    console.log(`   모바일 햄버거메뉴: ${result.mobile.hasHamburgerMenu ? '✅' : '❌'}`);
    console.log(`   전화 바로걸기: ${result.mobile.hasTelLink ? '✅' : '❌'}`);
    console.log(`   배경색: ${result.desktop.backgroundColor || 'N/A'}`);
    console.log('');
  }

  console.log('📁 스크린샷 저장 위치:', screenshotsDir);
  console.log('📄 분석 리포트:', reportPath);
}

main().catch(console.error);
