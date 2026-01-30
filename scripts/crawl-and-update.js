const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const NAVER_PLACE_ID = '1886440182';
const DATA_FILE_PATH = path.join(__dirname, '../web/src/data/store-data.json');

async function crawlNaverPlace() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Starting crawl...');

    // Navigate to Naver Place home page
    await page.goto(`https://pcmap.place.naver.com/restaurant/${NAVER_PLACE_ID}/home`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    // Click expand button for hours
    const expandButtons = page.locator('button, a, span').filter({ hasText: '펼쳐보기' });
    const count = await expandButtons.count();
    if (count > 0) {
      try {
        await expandButtons.first().click({ force: true, timeout: 5000 });
        await page.waitForTimeout(2000);
      } catch (e) {
        console.log('Could not click expand button');
      }
    }

    // Get page text
    const textContent = await page.locator('body').innerText();

    // Parse rating
    const ratingMatch = textContent.match(/별점\s*([\d.]+)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

    // Parse review count
    const reviewMatch = textContent.match(/방문자 리뷰\s*(\d+)/);
    const reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : null;

    // Parse hours
    const hours = {
      monday: parseHours(textContent, '월'),
      tuesday: parseHours(textContent, '화'),
      wednesday: parseHours(textContent, '수'),
      thursday: parseHours(textContent, '목'),
      friday: parseHours(textContent, '금'),
      saturday: parseHours(textContent, '토'),
      sunday: parseHours(textContent, '일'),
    };

    // Navigate to menu page
    await page.goto(`https://pcmap.place.naver.com/restaurant/${NAVER_PLACE_ID}/menu/list`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    const menuContent = await page.locator('body').innerText();
    const menu = parseMenu(menuContent);

    // Navigate to news/feed page
    console.log('Crawling news feed...');
    await page.goto(`https://m.place.naver.com/restaurant/${NAVER_PLACE_ID}/feed`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    const news = await parseNews(page);

    await browser.close();

    return {
      rating,
      reviewCount,
      hours,
      menu: menu.length > 0 ? menu : null,
      news: news.length > 0 ? news : null,
      crawledAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Crawl error:', error.message);
    await browser.close();
    throw error;
  }
}

function parseHours(text, dayKr) {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === dayKr && i + 1 < lines.length) {
      const nextLine = lines[i + 1].trim();
      if (nextLine.includes('정기휴무') || nextLine.includes('휴무')) {
        return { closed: true };
      }
      const timeMatch = nextLine.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
      if (timeMatch) {
        const loMatch = lines[i + 2]?.match(/(\d{1,2}:\d{2})\s*라스트오더/);
        return {
          open: timeMatch[1],
          close: timeMatch[2],
          lastOrder: loMatch ? loMatch[1] : null,
        };
      }
    }
  }
  return null;
}

async function parseNews(page) {
  const news = [];

  try {
    // Get all list items in the feed
    const listItems = page.locator('ul > li');
    const count = await listItems.count();

    // Get first 3 news items
    for (let i = 0; i < Math.min(count, 3); i++) {
      const item = listItems.nth(i);
      const itemText = await item.innerText();
      const lines = itemText.split('\n').map(l => l.trim()).filter(l => l);

      if (lines.length >= 2) {
        // Parse type (알림, 임시휴무, NEW, etc.)
        let type = '알림';
        const typeMatch = lines.find(l => /^(알림|임시휴무|NEW|공지)/.test(l));
        if (typeMatch) {
          type = typeMatch.match(/^(알림|임시휴무|NEW|공지)/)[1];
        }

        // Find title (usually after type or contains key info)
        let title = '';
        let content = '';

        for (const line of lines) {
          if (line.includes('정가네닭국수')) continue;
          if (/^\d{4}\.\d{2}\.\d{2}/.test(line)) continue;
          if (/^(알림|임시휴무|NEW|공지)\s/.test(line)) {
            title = line.replace(/^(알림|임시휴무|NEW|공지)\s*/, '');
          } else if (!title && line.length > 5) {
            title = line;
          } else if (title && line.length > 10 && !content) {
            content = line;
          }
        }

        // Parse date (absolute date or relative time)
        let date = '';
        const absoluteDateMatch = itemText.match(/(\d{4}\.\d{2}\.\d{2})/);
        if (absoluteDateMatch) {
          date = absoluteDateMatch[1];
        } else {
          // Handle relative time like "4분 전", "1시간 전" - use today's date
          const relativeMatch = itemText.match(/(\d+)(분|시간|일)\s*전/);
          if (relativeMatch) {
            const now = new Date();
            date = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
          }
        }

        if (title) {
          news.push({
            id: i + 1,
            type,
            title: title.substring(0, 50),
            content: content || title,
            date,
          });
        }
      }
    }
  } catch (e) {
    console.log('Error parsing news:', e.message);
  }

  return news;
}

function parseMenu(text) {
  const menu = [];
  const lines = text.split('\n');

  const menuPatterns = [
    { name: '닭칼국수', pattern: /닭칼국수.*?(\d{1,3}(?:,\d{3})*)\s*원/ },
    { name: '닭개장 칼국수', pattern: /닭개장\s*칼국수.*?(\d{1,3}(?:,\d{3})*)\s*원/ },
    { name: '닭한마리', pattern: /닭한마리.*?(\d{1,3}(?:,\d{3})*)\s*원/ },
    { name: '닭개장', pattern: /닭개장[^칼].*?(\d{1,3}(?:,\d{3})*)\s*원/ },
    { name: '반계탕', pattern: /반계탕.*?(\d{1,3}(?:,\d{3})*)\s*원/ },
    { name: '닭볶음탕', pattern: /닭볶음탕.*?(\d{1,3}(?:,\d{3})*)\s*원/ },
    { name: '닭곰탕', pattern: /닭곰탕.*?(\d{1,3}(?:,\d{3})*)\s*원/ },
    { name: '칼국수', pattern: /^칼국수.*?(\d{1,3}(?:,\d{3})*)\s*원/m },
  ];

  for (const item of menuPatterns) {
    const match = text.match(item.pattern);
    if (match) {
      menu.push({
        name: item.name,
        price: `${match[1]}원`,
        priceNum: parseInt(match[1].replace(/,/g, '')),
      });
    }
  }

  return menu;
}

async function updateDataFile(crawledData) {
  // Read existing data
  let existingData = {};
  try {
    existingData = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'));
  } catch (e) {
    console.log('No existing data file, creating new one');
  }

  // Check for changes
  const changes = [];

  if (crawledData.rating && crawledData.rating !== existingData.rating) {
    changes.push(`Rating: ${existingData.rating} -> ${crawledData.rating}`);
    existingData.rating = crawledData.rating;
  }

  if (crawledData.reviewCount && crawledData.reviewCount !== existingData.reviewCount) {
    changes.push(`Review count: ${existingData.reviewCount} -> ${crawledData.reviewCount}`);
    existingData.reviewCount = crawledData.reviewCount;
  }

  if (crawledData.hours) {
    const hoursChanged = JSON.stringify(crawledData.hours) !== JSON.stringify(existingData.hours);
    if (hoursChanged) {
      changes.push('Hours updated');
      existingData.hours = crawledData.hours;
    }
  }

  if (crawledData.menu && crawledData.menu.length > 0) {
    // Update prices if changed
    for (const newItem of crawledData.menu) {
      const existingItem = existingData.menu?.find(m => m.name === newItem.name);
      if (existingItem && existingItem.priceNum !== newItem.priceNum) {
        changes.push(`Menu price: ${newItem.name} ${existingItem.price} -> ${newItem.price}`);
        existingItem.price = newItem.price;
        existingItem.priceNum = newItem.priceNum;
      }
    }
  }

  // Update news
  if (crawledData.news && crawledData.news.length > 0) {
    const existingFirstNews = existingData.news?.[0];
    const newFirstNews = crawledData.news[0];

    // Check if there's a new news item (compare first item's title and date)
    if (!existingFirstNews ||
        existingFirstNews.title !== newFirstNews.title ||
        existingFirstNews.date !== newFirstNews.date) {
      changes.push(`News updated: ${newFirstNews.title}`);
      existingData.news = crawledData.news;
    }
  }

  existingData.lastUpdated = new Date().toISOString();

  // Write updated data
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(existingData, null, 2));

  return changes;
}

async function main() {
  console.log('=== Naver Place Crawler ===');
  console.log(`Target: ${NAVER_PLACE_ID}`);
  console.log(`Data file: ${DATA_FILE_PATH}`);
  console.log('');

  try {
    const crawledData = await crawlNaverPlace();
    console.log('Crawled data:', JSON.stringify(crawledData, null, 2));

    const changes = await updateDataFile(crawledData);

    if (changes.length > 0) {
      console.log('\n=== Changes detected ===');
      changes.forEach(c => console.log(`- ${c}`));
      console.log('\nData file updated!');
    } else {
      console.log('\nNo changes detected.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
