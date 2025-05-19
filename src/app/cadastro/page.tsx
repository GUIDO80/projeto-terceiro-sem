'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './Cadastro.module.css'

interface FormData {
    nome: string
    cpf: string
    data_nascimento: string
    email: string
    telefone_celular: string
    senha: string
    confirmar_senha: string
    endereco: string
}

interface FormErrors {
    nome: string
    cpf: string
    data_nascimento: string
    email: string
    telefone_celular: string
    senha: string
    confirmar_senha: string
    endereco: string
}

export default function Cadastro() {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        cpf: '',
        data_nascimento: '',
        email: '',
        telefone_celular: '',
        senha: '',
        confirmar_senha: '',
        endereco: ''
    })

    const [errors, setErrors] = useState<FormErrors>({
        nome: '',
        cpf: '',
        data_nascimento: '',
        email: '',
        telefone_celular: '',
        senha: '',
        confirmar_senha: '',
        endereco: ''
    })

    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length > 3) value = value.replace(/^(\d{3})/, '$1.')
        if (value.length > 7) value = value.replace(/^(\d{3})\.(\d{3})/, '$1.$2.')
        if (value.length > 11) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})/, '$1.$2.$3-')
        setFormData(prev => ({
            ...prev,
            cpf: value.substring(0, 14)
        }))
    }

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length > 0) value = '(' + value
        if (value.length > 3) value = value.substring(0, 3) + ') ' + value.substring(3)
        if (value.length > 10) value = value.substring(0, 10) + '-' + value.substring(10)
        setFormData(prev => ({
            ...prev,
            telefone_celular: value.substring(0, 15)
        }))
    }

    const validateForm = (): boolean => {
        let valid = true
        const newErrors: FormErrors = {
            nome: '',
            cpf: '',
            data_nascimento: '',
            email: '',
            telefone_celular: '',
            senha: '',
            confirmar_senha: '',
            endereco: ''
        }

        // Validar nome
        if (formData.nome.trim() === '') {
            newErrors.nome = 'Por favor, insira seu nome completo'
            valid = false
        }

        // Validar CPF
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
        if (!cpfRegex.test(formData.cpf)) {
            newErrors.cpf = 'Por favor, insira um CPF válido'
            valid = false
        }

        // Validar data de nascimento
        if (!formData.data_nascimento) {
            newErrors.data_nascimento = 'Por favor, insira uma data válida'
            valid = false
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Por favor, insira um e-mail válido'
            valid = false
        }

        // Validar telefone
        const telefoneRegex = /^\(\d{2}\) \d{5}\-\d{4}$/
        if (!telefoneRegex.test(formData.telefone_celular)) {
            newErrors.telefone_celular = 'Por favor, insira um telefone válido'
            valid = false
        }

        // Validar senha
        if (formData.senha.length < 6) {
            newErrors.senha = 'A senha deve ter pelo menos 6 caracteres'
            valid = false
        }

        // Validar confirmação de senha
        if (formData.senha !== formData.confirmar_senha) {
            newErrors.confirmar_senha = 'As senhas não coincidem'
            valid = false
        }

        // Validar endereço
        if (formData.endereco.trim() === '') {
            newErrors.endereco = 'Por favor, insira seu endereço completo'
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            // Aqui você faria a chamada para a API de cadastro
            console.log('Dados do cadastro:', {
                nome: formData.nome,
                cpf: formData.cpf,
                email: formData.email,
                senha: formData.senha,
                data_nascimento: formData.data_nascimento,
                endereco: formData.endereco,
                telefone_celular: formData.telefone_celular
            })

            // Simulando cadastro bem-sucedido
            router.push('/login') // Redireciona para a página de login
        }
    }

    return (
        <section className={styles.cadastroSection}>
            <div className={styles.cadastroContainer}>
                <h1 className={styles.cadastroTitle}>Criar uma conta</h1>

                <form className={styles.cadastroForm} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                        {/* Nome Completo */}
                        <div className={styles.formGroup}>
                            <label htmlFor="nome" className={styles.formLabel}>Nome Completo*</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className={`${styles.formInput} ${errors.nome ? styles.invalid : ''}`}
                                required
                            />
                            {errors.nome && <span className={styles.errorMessage}>{errors.nome}</span>}
                        </div>

                        {/* CPF */}
                        <div className={styles.formGroup}>
                            <label htmlFor="cpf" className={styles.formLabel}>CPF*</label>
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleCpfChange}
                                placeholder="000.000.000-00"
                                className={`${styles.formInput} ${errors.cpf ? styles.invalid : ''}`}
                                required
                            />
                            {errors.cpf && <span className={styles.errorMessage}>{errors.cpf}</span>}
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        {/* Data de Nascimento */}
                        <div className={styles.formGroup}>
                            <label htmlFor="data_nascimento" className={styles.formLabel}>Data de Nascimento*</label>
                            <input
                                type="date"
                                id="data_nascimento"
                                name="data_nascimento"
                                value={formData.data_nascimento}
                                onChange={handleChange}
                                className={`${styles.formInput} ${errors.data_nascimento ? styles.invalid : ''}`}
                                required
                            />
                            {errors.data_nascimento && <span className={styles.errorMessage}>{errors.data_nascimento}</span>}
                        </div>

                        {/* Telefone Celular */}
                        <div className={styles.formGroup}>
                            <label htmlFor="telefone_celular" className={styles.formLabel}>Telefone Celular*</label>
                            <input
                                type="tel"
                                id="telefone_celular"
                                name="telefone_celular"
                                value={formData.telefone_celular}
                                onChange={handleTelefoneChange}
                                placeholder="(00) 00000-0000"
                                className={`${styles.formInput} ${errors.telefone_celular ? styles.invalid : ''}`}
                                required
                            />
                            {errors.telefone_celular && <span className={styles.errorMessage}>{errors.telefone_celular}</span>}
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        {/* Email */}
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>E-mail*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`${styles.formInput} ${errors.email ? styles.invalid : ''}`}
                                required
                            />
                            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        {/* Senha */}
                        <div className={styles.formGroup}>
                            <label htmlFor="senha" className={styles.formLabel}>Senha*</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                className={`${styles.formInput} ${errors.senha ? styles.invalid : ''}`}
                                required
                                minLength={6}
                            />
                            {errors.senha && <span className={styles.errorMessage}>{errors.senha}</span>}
                        </div>

                        {/* Confirmar Senha */}
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmar_senha" className={styles.formLabel}>Confirmar Senha*</label>
                            <input
                                type="password"
                                id="confirmar_senha"
                                name="confirmar_senha"
                                value={formData.confirmar_senha}
                                onChange={handleChange}
                                className={`${styles.formInput} ${errors.confirmar_senha ? styles.invalid : ''}`}
                                required
                            />
                            {errors.confirmar_senha && <span className={styles.errorMessage}>{errors.confirmar_senha}</span>}
                        </div>
                    </div>

                    {/* Endereço */}
                    <div className={styles.formGroup}>
                        <label htmlFor="endereco" className={styles.formLabel}>Endereço Completo*</label>
                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            placeholder="Rua, número, complemento, bairro, cidade, estado"
                            className={`${styles.formInput} ${errors.endereco ? styles.invalid : ''}`}
                            required
                        />
                        {errors.endereco && <span className={styles.errorMessage}>{errors.endereco}</span>}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Criar Conta
                    </button>

                    <div className={styles.loginLink}>
                        Já tem uma conta?{' '}
                        <Link href="/login" className={styles.loginLinkText}>
                            Faça login
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}