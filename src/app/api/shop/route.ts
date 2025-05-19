// src/app/api/shop/route.ts

import { NextResponse } from 'next/server'

let shopProducts = [
  { id: 1, name: "Produto 1", price: 99.99, image: "/assets/product3.jpg", category: "arte-digital" },
  { id: 2, name: "Produto 2", price: 149.99, image: "/assets/product3.jpg", category: "pintura" }
]

export async function GET() {
  return NextResponse.json(shopProducts)
}

export async function POST(req: Request) {
  const newProduct = await req.json()
  newProduct.id = shopProducts.length + 1
  shopProducts.push(newProduct)
  return NextResponse.json(newProduct, { status: 201 })
}
