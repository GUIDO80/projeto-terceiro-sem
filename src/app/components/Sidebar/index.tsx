'use client'

import { RiCloseLine, RiShoppingCartLine, RiListCheck, RiHomeLine, RiLogoutBoxLine } from 'react-icons/ri'
import Link from 'next/link'
import styles from './Sidebar.module.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const handleLogout = () => {
    console.log('Usuário deslogado')
    onClose()
  }

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <h3>Victor</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          <RiCloseLine />
        </button>
      </div>

      <div className={styles.sidebarContent}>
        <div className={styles.sidebarSection}>
          <Link href="/about" className={styles.sidebarButton} onClick={onClose}>
            Sobre Nós
          </Link>
        </div>

        <div className={styles.sidebarSection}>
          <Link href="/shop" className={styles.sidebarButton} onClick={onClose}>
            Shop
          </Link>
        </div>

        <div className={styles.sidebarSection}>
          <Link href="/contact" className={styles.sidebarButton} onClick={onClose}>
            Contato
          </Link>
        </div>

        <div className={styles.sidebarDivider}></div>

        <div className={styles.sidebarSection}>
          <Link href="/cart" className={styles.sidebarButton} onClick={onClose}>
            <RiShoppingCartLine className={styles.sidebarIcon} />
            Carrinho
          </Link>
        </div>

        <div className={styles.sidebarSection}>
          <Link href="/orders" className={styles.sidebarButton} onClick={onClose}>
            <RiListCheck className={styles.sidebarIcon} />
            Meus Pedidos
          </Link>
        </div>

        <div className={styles.sidebarSection}>
          <Link href="/my-address" className={styles.sidebarButton} onClick={onClose}>
            <RiHomeLine className={styles.sidebarIcon} />
            Meu Endereço
          </Link>
        </div>

        <div className={`${styles.sidebarSection} ${styles.sidebarSectionLogout}`}>
          <button
            className={`${styles.sidebarButton} ${styles.sidebarButtonLogout}`}
            onClick={handleLogout}
          >
            <RiLogoutBoxLine className={styles.sidebarIcon} />
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar