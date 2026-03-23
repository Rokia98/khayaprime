import { NextResponse } from 'next/server';
import { getConnection } from "@/lib/db";

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

  let connection;
  try {
    connection = await getConnection();
    const placeholders = ids.map(() => '?').join(',');
    const query = `SELECT id, name, price, imageUrl, category, gender FROM Product WHERE id IN (${placeholders})`;
    const [rows] = await connection.execute(query, ids);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error in wishlist API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}
