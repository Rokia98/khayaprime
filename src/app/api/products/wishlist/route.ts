import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  if (!idsParam) {
    return NextResponse.json([]);
  }

  const ids = idsParam.split(',').map(Number);
  if (ids.some(isNaN)) {
    return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('Product')
      .select('id, name, price, imageUrl, category, gender')
      .in('id', ids);

    if (error) throw error;
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Database error in wishlist API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
