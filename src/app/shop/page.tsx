// Shop.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from './Shop.module.css'

interface Product {
  id: string
  name: string
  price: number | string // Alterando para permitir string (se necessário)
  image: string
  category: string
}

const PRODUCTS_PER_PAGE = 12

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([])

  const router = useRouter()

  const filteredProducts = useMemo(() => {
    return selectedCategory === "todos"
      ? products
      : products.filter(product => product.category === selectedCategory)
  }, [products, selectedCategory])

  useEffect(() => {
    fetch('/api/shop')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Erro ao carregar produtos:', err))
  }, [])

  useEffect(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE
    const end = start + PRODUCTS_PER_PAGE
    const productsToShow = filteredProducts.slice(start, end)

    setVisibleProducts(productsToShow)
  }, [currentPage, filteredProducts])

  const handleNextPage = () => setCurrentPage(prev => prev + 1)
  const handlePrevPage = () => setCurrentPage(prev => prev - 1)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
  }

  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]')

    // Garantir que o preço seja numérico
    const price = typeof product.price === 'string' ? parseFloat(product.price.replace(',', '.')) : product.price

    const existingItemIndex = existingCart.findIndex((item: Product) => item.id === product.id)

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push({ ...product, price, quantity: 1 }) // Garantir que o preço seja numérico
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCart))
    router.push('/cart')
  }

  const hasNextPage = (currentPage * PRODUCTS_PER_PAGE) < filteredProducts.length

  return (
    <main className={styles.shop}>
      <div className={styles.shopHeader}>
        <h1 className={styles.shopTitle}>Nossa Galeria</h1>
        <p className={styles.shopSubtitle}>Descubra obras exclusivas para seu espaço</p>
        
        <div className={styles.filterContainer}>
          <select 
            className={styles.filterSelect} 
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="todos">Todas Categorias</option>
            <option value="arte-digital">Arte Digital</option>
            <option value="pintura">Pintura</option>
            <option value="fotografia">Fotografia</option>
            <option value="escultura">Escultura</option>
          </select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {visibleProducts.map((product, index) => {
          return (
            <div 
              key={product.id} 
              className={`${styles.productCard} ${styles.visible}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={styles.productImageContainer}>
                <Image 
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={250}
                  className={styles.productImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.onerror = null
                    target.src = '/assets/placeholder.jpg'
                  }}
                />
                <button 
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(product)}
                  aria-label="Adicionar ao carrinho"
                >
                  <FaShoppingCart className={styles.cartIcon} />
                </button>
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <span className={styles.productPrice}>
                  R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.pagination}>
        <button 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.paginationBtn}
        >
          <FaChevronLeft /> Anterior
        </button>
        <span className={styles.pageNumber}>Página {currentPage}</span>
        <button 
          onClick={handleNextPage}
          disabled={!hasNextPage}
          className={styles.paginationBtn}
        >
          Próxima <FaChevronRight />
        </button>
      </div>
    </main>
  )
}
