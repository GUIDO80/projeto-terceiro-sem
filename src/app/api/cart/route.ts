// src/app/api/cart/route.ts

import { NextResponse } from 'next/server';

let mockCart = [
  { id: '1', name: 'Produto Premium', price: "R$199,90", quantity: 2, image: 'https://via.placeholder.com/80', maxQuantity: 5 },
  { id: '2', name: 'Kit Básico', price: "R$89,90", quantity: 1, image: 'https://via.placeholder.com/80', maxQuantity: 10 }
];

// Função GET: Retorna todos os itens do carrinho
export async function GET() {
  return NextResponse.json(mockCart);
}

// Função POST: Adiciona um novo item ao carrinho
export async function POST(req: Request) {
  try {
    const newItem = await req.json();

    // Garantir que o item possui todos os campos necessários
    if (!newItem.id || !newItem.name || !newItem.price || !newItem.quantity || !newItem.image || !newItem.maxQuantity) {
      return NextResponse.json({ message: 'Dados do produto incompletos' }, { status: 400 });
    }

    // Verificar se o produto já existe no carrinho
    const existingItem = mockCart.find(item => item.id === newItem.id);
    if (existingItem) {
      return NextResponse.json({ message: 'Produto já existe no carrinho' }, { status: 409 });
    }

    // Adicionar item ao carrinho
    mockCart.push(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    return NextResponse.json({ message: 'Erro ao adicionar item ao carrinho' }, { status: 500 });
  }
}

// Função PUT: Atualiza a quantidade de um item no carrinho
export async function PUT(req: Request) {
  try {
    const { id, quantity } = await req.json();

    if (typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json({ message: 'Quantidade inválida' }, { status: 400 });
    }

    const itemIndex = mockCart.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return NextResponse.json({ message: 'Item não encontrado' }, { status: 404 });
    }

    // Atualizar a quantidade, garantindo que não ultrapasse o limite máximo
    mockCart[itemIndex].quantity = Math.min(Math.max(1, quantity), mockCart[itemIndex].maxQuantity);
    return NextResponse.json(mockCart[itemIndex]);
  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);
    return NextResponse.json({ message: 'Erro ao atualizar item no carrinho' }, { status: 500 });
  }
}

// Função DELETE: Remove um item do carrinho
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const itemIndex = mockCart.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return NextResponse.json({ message: 'Item não encontrado' }, { status: 404 });
    }

    // Remover item do carrinho
    mockCart = mockCart.filter(item => item.id !== id);
    return NextResponse.json({ message: 'Item removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover item:', error);
    return NextResponse.json({ message: 'Erro ao remover item do carrinho' }, { status: 500 });
  }
}
