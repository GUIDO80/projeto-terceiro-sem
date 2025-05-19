import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'; // ou '@/lib/prisma' se usar alias

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        image: data.image,
        category: data.category,
        description: data.description ?? null,
        stock: data.stock ?? 0,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
