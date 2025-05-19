'use client'

import styles from './contact.module.css'

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Adicione aqui a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso!')
  }

  return (
    <div className={styles.contact__wrapper}>
      <div className={styles.contact__pattern}></div>
      <main className={styles.contact__container}>
        <div className={styles.contact__content}>
          <div className={styles.contact__info}>
            <h1>Fale Conosco</h1>
            <p>Preencha o formulário ou utilize nossos outros canais de contato.</p>
            
            <div className={styles.info__items}>
              <div className={styles.info__item}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2zm8 14H6c-.55 0-1-.45-1-1v-5h5v6zm0-8H5V6c0-.55.45-1 1-1h5v5zm8 8h-5v-6h5v5c0 .55-.45 1-1 1zm0-8h-5V5h5c.55 0 1 .45 1 1v5z"/>
                </svg>
                <div>
                  <h3>Endereço</h3>
                  <p>Rua Exemplo, 123 - Cidade/Estado</p>
                </div>
              </div>
              
              <div className={styles.info__item}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <div>
                  <h3>Email</h3>
                  <p>contato@exemplo.com</p>
                </div>
              </div>
              
              <div className={styles.info__item}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                <div>
                  <h3>Telefone</h3>
                  <p>(12) 1234-5678</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.contact__form}>
            <form onSubmit={handleSubmit}>
              <div className={styles.form__group}>
                <input type="text" id="name" name="name" placeholder=" " required />
                <label htmlFor="name">Nome</label>
              </div>
              <div className={styles.form__group}>
                <input type="email" id="email" name="email" placeholder=" " required />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className={styles.form__group}>
                <textarea id="message" name="message" rows={3} placeholder=" " required></textarea>
                <label htmlFor="message">Mensagem</label>
              </div>
              <button type="submit" className={styles.btn}>
                Enviar Mensagem
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}