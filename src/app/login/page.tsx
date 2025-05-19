'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const router = useRouter()

  const validateForm = () => {
    let valid = true
    const newErrors = { email: '', password: '' }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = 'Por favor, insira um e-mail válido'
      valid = false
    }

    // Validar senha
    if (password.trim() === '') {
      newErrors.password = 'Por favor, insira sua senha'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Aqui você faria a chamada para a API de login
      console.log('Dados do login:', { email, password })
      // Simulando login bem-sucedido
      router.push('/profile')
    }
  }

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>Faça Login</h1>
        
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>E-mail*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.formInput} ${errors.email ? styles.invalid : ''}`}
              required
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Senha*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.formInput} ${errors.password ? styles.invalid : ''}`}
              required
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
          </div>

          <div className={styles.forgotPassword}>
            <Link href="/recuperar-senha" className={styles.forgotLink}>Esqueceu sua senha?</Link>
          </div>

          <button type="submit" className={styles.submitButton}>Entrar</button>

          <div className={styles.socialLogin}>
            <p className={styles.socialDivider}>Ou entre com</p>
            <div className={styles.socialIcons}>
              <Link href="#" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" fill="#1877F2">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="#DB4437">
                  <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm-83.5 216.5l42.5 46.5-42.5 46.5c-7 7.7-6.8 19.8.5 27.2 6.5 6.5 16.4 7.7 24.2 2.5l68.1-41.9c5.1-3.1 8.2-8.5 8.2-14.3v-38.1c0-5.8-3.1-11.2-8.2-14.3l-68.1-41.9c-5.4-3.3-12.4-3.6-18.2-.6-7.7 4-11.3 12.3-8.9 20.5zm168.3-20.5c-7-7.7-19.2-7.5-27.2.5-6.5 6.5-7.7 16.4-2.5 24.2l41.9 68.1c3.1 5.1 8.5 8.2 14.3 8.2h38.1c5.8 0 11.2-3.1 14.3-8.2l41.9-68.1c3.3-5.4 3.6-12.4.6-18.2 4-7.7-4.3-16-12.5-18.4l-68.1-41.9c-5.1-3.1-11.5-2.9-17.2.8z"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className={styles.registerLink}>
            Não tem uma conta? <Link href="/cadastro" className={styles.registerLinkText}>Cadastre-se</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login