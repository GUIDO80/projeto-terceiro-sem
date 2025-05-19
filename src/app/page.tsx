'use client' // Necessário por causa dos hooks e efeitos

import Link from 'next/link'
import styles from './Home.module.css'
import useScrollReveal from './hooks/useScrollReveal'

export default function Home() {
    useScrollReveal()

    return (
        <div className={styles.container}>
            <span className={styles.letterS}>A</span>
            <img
                src="/ivan.png"
                alt="header"
                className={styles.headerImage}
                width={400}
                height={400} // Adicione dimensões para otimização
            />

            <h4 className={styles.textLeft}>IVAN</h4>
            <h4 className={styles.textRight}>RTS</h4>

            <Link href="/shop" className={`${styles.btn} ${styles.explore}`}>
                EXPLORE MORE
            </Link>

            <h5 className={styles.feature1}>Diesel</h5>
            <h5 className={styles.feature2}>Watches</h5>
            <h5 className={styles.feature3}>Tough</h5>
            <h5 className={styles.feature4}>Modern</h5>

            <footer className={styles.footer}>
                <div className={styles.footerLinks}>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Twitter</a></li>
                </div>
            </footer>
        </div>
    )
}