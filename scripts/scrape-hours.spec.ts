import { test, expect } from '@playwright/test';

test('scrape operating hours from Naver Place', async ({ page }) => {
  // Navigate to Naver Place page
  await page.goto('https://pcmap.place.naver.com/restaurant/1886440182/home', {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  // Wait for page to load
  await page.waitForTimeout(3000);

  // Try to find and click on operating hours section to expand it
  const hoursButton = page.locator('text=영업시간').first();
  if (await hoursButton.isVisible()) {
    await hoursButton.click();
    await page.waitForTimeout(1000);
  }

  // Get the page content
  const content = await page.content();

  // Log the content around operating hours
  console.log('=== PAGE CONTENT ===');
  console.log(content);

  // Try to get text content
  const textContent = await page.locator('body').innerText();
  console.log('\n=== TEXT CONTENT ===');
  console.log(textContent);

  // Take a screenshot
  await page.screenshot({ path: 'hours-screenshot.png', fullPage: true });
});
