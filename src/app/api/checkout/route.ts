// src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    // Simulação de salvamento do pedido
    console.log("Pedido recebido:", orderData);

    return NextResponse.json({ message: 'Pedido realizado com sucesso!' }, { status: 200 });
  } catch (error) {
    console.error("Erro ao finalizar compra:", error);
    return NextResponse.json({ message: 'Erro ao processar pedido' }, { status: 500 });
  }
}
