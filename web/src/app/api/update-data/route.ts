import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

// This endpoint is for manual updates or webhook triggers
// For automated crawling, use the scripts/crawl-naver.js with GitHub Actions

export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const dataPath = path.join(process.cwd(), 'src/data/store-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    return NextResponse.json({
      success: true,
      lastUpdated: data.lastUpdated,
      message: 'Data retrieved successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newData = await request.json();
    const dataPath = path.join(process.cwd(), 'src/data/store-data.json');

    // Read existing data
    const existingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Merge and update
    const updatedData = {
      ...existingData,
      ...newData,
      lastUpdated: new Date().toISOString(),
    };

    // Write back
    fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Data updated successfully',
      lastUpdated: updatedData.lastUpdated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    );
  }
}
