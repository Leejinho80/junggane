const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to Naver Place home page
    console.log('Navigating to Naver Place...');
    await page.goto('https://pcmap.place.naver.com/restaurant/1886440182/home', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for page to load
    await page.waitForTimeout(3000);

    // Try to find and click expand button for operating hours
    const expandButtons = page.locator('button, a, span').filter({ hasText: '펼쳐보기' });
    const count = await expandButtons.count();
    console.log(`Found ${count} expand buttons`);

    if (count > 0) {
      try {
        await expandButtons.first().click({ force: true, timeout: 5000 });
        await page.waitForTimeout(2000);
        console.log('Clicked expand button');
      } catch (e) {
        console.log('Could not click expand button:', e.message);
      }
    }

    // Get HTML content to look for hours data
    const html = await page.content();

    // Search for hour-related patterns in HTML
    const hourPatterns = html.match(/(월|화|수|목|금|토|일)요일[^<]*(\d{1,2}:\d{2})[^<]*(\d{1,2}:\d{2})?/g);
    if (hourPatterns) {
      console.log('\n=== HOUR PATTERNS FOUND ===');
      hourPatterns.forEach(p => console.log(p));
    }

    // Look for JSON data that might contain hours
    const jsonMatches = html.match(/"bizHour"[^}]+}/g);
    if (jsonMatches) {
      console.log('\n=== BIZ HOUR JSON ===');
      jsonMatches.forEach(m => console.log(m));
    }

    // Get text from the operating hours section specifically
    const hoursSection = await page.locator('[class*="time"], [class*="hour"], [class*="영업"]').allInnerTexts();
    console.log('\n=== HOURS SECTION TEXT ===');
    hoursSection.forEach(t => {
      if (t.trim()) console.log(t.trim());
    });

    // Get full text content
    const textContent = await page.locator('body').innerText();
    console.log('\n=== FULL TEXT ===');
    console.log(textContent);

    // Take a screenshot
    await page.screenshot({ path: 'hours-expanded.png', fullPage: true });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
