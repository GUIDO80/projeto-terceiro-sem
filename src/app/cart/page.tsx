'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Cart.module.css'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  maxQuantity: number
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    const loadCart = () => {
      setLoading(true)
      try {
        const items = JSON.parse(localStorage.getItem('cartItems') || '[]')
        console.log("Itens carregados do localStorage:", items)

        const validItems = items.map(item => ({
          ...item,
          price: isNaN(parseFloat(item.price)) || item.price <= 0 ? 0 : parseFloat(item.price),
        }))

        console.log("Itens após conversão dos preços:", validItems)
        setCartItems(validItems)
      } catch (error) {
        console.error('Erro ao carregar o carrinho:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) return

    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )

    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
  }

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
    setCartItems(updatedCart)
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'DESCONTO10') {
      setDiscount(0.1)
      alert('Cupom aplicado com sucesso!')
    } else {
      alert('Cupom inválido')
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal - (subtotal * discount)
  }

  const formatPrice = (price: number) => {
    if (typeof price !== 'number' || isNaN(price) || price === null) {
      console.error("Erro no preço:", price)
      return 'Erro no preço'
    }
    return price.toFixed(2).replace(',', '.')
  }

  // ✅ Função adicionada para finalizar a compra
  const finalizePurchase = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          total: calculateTotal(),
          appliedDiscount: discount,
        }),
      })

      if (response.ok) {
        alert('Compra finalizada com sucesso!')
        localStorage.removeItem('cartItems')
        setCartItems([])
      } else {
        const data = await response.json()
        alert(`Erro ao finalizar compra: ${data.message}`)
      }
    } catch (error) {
      console.error('Erro ao finalizar compra:', error)
      alert('Erro ao finalizar compra. Tente novamente.')
    }
  }

  if (loading) {
    return <div className={styles.loading}>Carregando seu carrinho...</div>
  }

  return (
    <section className={styles.cartSection}>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>SEU CARRINHO</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos para continuar</p>
            <Link href="/shop" className={styles.continueLink}>
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.itemsList}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemPrice}>
                      R$ {formatPrice(item.price)}
                    </p>

                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemSubtotal}>
                    <p>R$ {formatPrice(item.price * item.quantity)}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className={styles.removeButton}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <div className={styles.summaryCard}>
                <h3>RESUMO DO PEDIDO</h3>

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>R$ {formatPrice(calculateSubtotal())}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>

                {discount > 0 && (
                  <div className={styles.summaryRow}>
                    <span>Desconto</span>
                    <span className={styles.discount}>- {(discount * 100).toFixed(0)}%</span>
                  </div>
                )}

                <div className={styles.couponContainer}>
                  <input
                    type="text"
                    placeholder="Código do cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button onClick={applyCoupon}>Aplicar</button>
                </div>

                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>R$ {formatPrice(calculateTotal())}</span>
                </div>

                {/* ✅ Botão de finalizar compra com onClick */}
                <button className={styles.checkoutButton} onClick={finalizePurchase}>
                  Finalizar Compra
                </button>

                <Link href="/shop" className={styles.continueLink}>
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CartPage
