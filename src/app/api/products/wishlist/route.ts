import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

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
    const products = await prisma.product.findMany({
      where: {
        id: { in: ids }
      },
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
        category: true,
        gender: true
      }
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Database error in wishlist API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
