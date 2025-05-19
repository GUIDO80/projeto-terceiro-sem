import Link from 'next/link'
import styles from './FooterPages.module.css'

const FooterPages = () => {
  return (
    <footer className={styles.footerPages}>
      <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} Diesel. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default FooterPages