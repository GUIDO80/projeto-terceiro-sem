'use client'

import { useEffect, useState } from 'react'
import styles from './Orders.module.css'

interface User {
  name: string
  email: string
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

interface Order {
  id: string
  date: string
  status: 'delivered' | 'shipping' | 'processing' | 'canceled'
  products: {
    name: string
    quantity: number
    price: number
    image: string
  }[]
  total: number
}

const Orders = () => {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulando busca dos dados do usuário logado
    const fetchUserData = async () => {
      try {
        // Na prática, você buscaria esses dados da sua API/contexto de autenticação
        const userData: User = {
          name: 'Victor Silva',
          email: 'victor.silva@example.com',
          address: {
            street: 'Rua das Flores',
            number: '123',
            complement: 'Apto 101',
            neighborhood: 'Centro',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01001-000'
          }
        }
        
        const ordersData: Order[] = [
          {
            id: '12345',
            date: '10/04/2023',
            status: 'delivered',
            products: [
              {
                name: 'Nome do Produto 1',
                quantity: 1,
                price: 99.90,
                image: 'https://via.placeholder.com/80'
              },
              {
                name: 'Nome do Produto 2',
                quantity: 2,
                price: 199.80,
                image: 'https://via.placeholder.com/80'
              }
            ],
            total: 299.70
          },
          // ... outros pedidos
        ]

        setUser(userData)
        setOrders(ordersData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>
  }

  if (!user) {
    return <div className={styles.error}>Usuário não encontrado</div>
  }

  return (
    <section className={styles.orders}>
      <div className={styles.ordersContainer}>
        <h1 className={styles.ordersTitle}>MEUS PEDIDOS</h1>
        
        {/* Seção do Usuário com Endereço */}
        <div className={styles.userProfile}>
          <div className={styles.userDetails}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>
              <i className="fas fa-envelope"></i>
              {user.email}
            </p>
            
            <div className={styles.userMeta}>
              <div className={styles.userStats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{orders.length}</span>
                  <span className={styles.statLabel}>Pedidos</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>
                    {orders.filter(o => o.status === 'shipping').length}
                  </span>
                  <span className={styles.statLabel}>Em transporte</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>
                    R$ {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2).replace('.', ',')}
                  </span>
                  <span className={styles.statLabel}>Total gasto</span>
                </div>
              </div>
            </div>

            <div className={styles.userAddress}>
              <h3>Endereço de Entrega</h3>
              <p>
                {user.address.street}, {user.address.number}
                {user.address.complement && `, ${user.address.complement}`}
              </p>
              <p>
                {user.address.neighborhood} - {user.address.city}/{user.address.state}
              </p>
              <p>CEP: {user.address.zipCode}</p>
            </div>

          </div>
        </div>
        
        {/* Lista de Pedidos */}
        <div className={styles.ordersList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <span className={styles.orderNumber}>Pedido #{order.id}</span>
                  <span className={styles.orderDate}>{order.date}</span>
                </div>
                <div className={`${styles.orderStatus} ${styles[order.status]}`}>
                  {order.status === 'delivered' && 'Entregue'}
                  {order.status === 'shipping' && 'Em Transporte'}
                  {order.status === 'processing' && 'Processando'}
                  {order.status === 'canceled' && 'Cancelado'}
                </div>
              </div>
              
              <div className={styles.orderProducts}>
                {order.products.map((product, index) => (
                  <div key={index} className={styles.productItem}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <h3>{product.name}</h3>
                      <p>Quantidade: {product.quantity}</p>
                      <p className={styles.productPrice}>
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.orderFooter}>
                <div className={styles.orderTotal}>
                  <span>Total:</span>
                  <span className={styles.totalPrice}>
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className={styles.orderActions}>
                  <button className={styles.btnDetails}>Detalhes</button>
                  {order.status === 'delivered' ? (
                    <button className={styles.btnReorder}>Comprar Novamente</button>
                  ) : (
                    <button className={styles.btnTrack}>Rastrear Pedido</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Orders