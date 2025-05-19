import Image from 'next/image'
import styles from './About.module.css'

export default function About() {
  return (
    <>
      <section className={styles.aboutUs}>
        <div className={styles.aboutUsContainer}>
          <h1 className={styles.aboutUsTitle}>Sobre Nós</h1>
          
          <div className={styles.aboutUsContent}>
            <div className={styles.aboutUsImage}>
              <Image 
                src="/assets/arte.png" 
                alt="Arte representando a marca Diesel"
                width={600}
                height={400}
                className={styles.aboutUsImg}
              />
            </div>
            
            <div className={styles.aboutUsText}>
              <p>
                Bem-vindo ao <strong>Diesel</strong>, o seu destino online para encontrar 
                peças únicas e exclusivas que transformam qualquer espaço em um ambiente especial.
              </p>
              
              <p>
                Nossa missão é conectar você a obras que contam histórias, peças que 
                inspiram e designs que encantam.
              </p>
              
              <h2>Nossa Coleção:</h2>
              <ul className={styles.aboutUsList}>
                <li><strong>Cerâmicas</strong>: Peças artesanais funcionais e artísticas</li>
                <li><strong>Artes</strong>: Quadros e esculturas expressivas</li>
                <li><strong>Móveis</strong>: Design moderno com conforto</li>
              </ul>
              
              <p>
                Acreditamos no poder transformador da arte e do design em ambientes e vidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de galeria de produtos */}
      <section className={styles.funGallery}>
        <div className={styles.funGalleryContainer}>
          <h2 className={styles.funGalleryTitle}>Conheça Nossas Categorias</h2>
          <p className={styles.funGallerySubtitle}>Arte, fotografia, escultura e pintura que vão deixar seu espaço único!</p>
          <div className={styles.funGalleryGrid}>
            {/* Card 1: Arte Digital */}
            <div className={styles.funCard}>
              <Image 
                src="/assets/arte-digital.jpg" 
                alt="Arte Digital" 
                width={300}
                height={200}
                className={styles.funCardImage}
              />
              <div className={styles.funCardContent}>
                <h3 className={styles.funCardTitle}>Arte Digital</h3>
                <p className={styles.funCardDescription}>Criações digitais que combinam tecnologia e criatividade para um visual moderno e impactante.</p>
              </div>
            </div>
            
            {/* Card 2: Fotografia */}
            <div className={styles.funCard}>
              <Image 
                src="/assets/fotografia.jpg" 
                alt="Fotografia" 
                width={300}
                height={200}
                className={styles.funCardImage}
              />
              <div className={styles.funCardContent}>
                <h3 className={styles.funCardTitle}>Fotografia</h3>
                <p className={styles.funCardDescription}>Imagens que capturam momentos únicos e transformam paredes em galerias de arte.</p>
              </div>
            </div>
            
            {/* Card 3: Escultura */}
            <div className={styles.funCard}>
              <Image 
                src="/assets/escultura.jpg" 
                alt="Escultura" 
                width={300}
                height={200}
                className={styles.funCardImage}
              />
              <div className={styles.funCardContent}>
                <h3 className={styles.funCardTitle}>Escultura</h3>
                <p className={styles.funCardDescription}>Peças tridimensionais que trazem vida e movimento para qualquer ambiente.</p>
              </div>
            </div>
            
            {/* Card 4: Pintura */}
            <div className={styles.funCard}>
              <Image 
                src="/assets/pintura.jpg" 
                alt="Pintura" 
                width={300}
                height={200}
                className={styles.funCardImage}
              />
              <div className={styles.funCardContent}>
                <h3 className={styles.funCardTitle}>Pintura</h3>
                <p className={styles.funCardDescription}>Obras de arte que expressam emoções e contam histórias através de cores e formas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}