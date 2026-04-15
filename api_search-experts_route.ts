// 放路徑: src/app/api/search-experts/route.ts
// Google Places API 代理 — 安全地喺後端使用 API Key

import { NextRequest, NextResponse } from 'next/server';

type SearchResult = {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  rating: number;
  userRatingsTotal: number;
  website: string;
  types: string[];
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  if (!query) {
    return NextResponse.json({ error: '缺少 query 參數' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: '伺服器未設定 GOOGLE_PLACES_API_KEY 環境變數' }, { status: 500 });
  }

  try {
    // Step 1: Text Search — 搵符合 "水電工 中環" 嘅商戶
    const searchQuery = location ? `${query} ${location}` : query;
    const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&language=zh-HK&region=hk&key=${apiKey}`;

    const searchRes = await fetch(textSearchUrl);
    const searchData = await searchRes.json();

    if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
      return NextResponse.json({
        error: `Google API 錯誤: ${searchData.status}`,
        details: searchData.error_message
      }, { status: 500 });
    }

    const places = (searchData.results || []).slice(0, 20);

    // Step 2: 為每個結果攞詳細資料(包括電話)
    const results: SearchResult[] = await Promise.all(
      places.map(async (place: any) => {
        try {
          const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,international_phone_number,rating,user_ratings_total,website,types&language=zh-HK&key=${apiKey}`;
          const detailsRes = await fetch(detailsUrl);
          const detailsData = await detailsRes.json();
          const d = detailsData.result || {};
          return {
            placeId: place.place_id,
            name: d.name || place.name || '',
            address: d.formatted_address || place.formatted_address || '',
            phone: d.international_phone_number || d.formatted_phone_number || '',
            rating: d.rating || place.rating || 0,
            userRatingsTotal: d.user_ratings_total || 0,
            website: d.website || '',
            types: d.types || place.types || []
          };
        } catch {
          return {
            placeId: place.place_id,
            name: place.name || '',
            address: place.formatted_address || '',
            phone: '',
            rating: place.rating || 0,
            userRatingsTotal: 0,
            website: '',
            types: place.types || []
          };
        }
      })
    );

    return NextResponse.json({ results, count: results.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || '未知錯誤' }, { status: 500 });
  }
}
