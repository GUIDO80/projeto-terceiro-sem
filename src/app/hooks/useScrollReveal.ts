'use client'

import { useEffect } from 'react'

const useScrollReveal = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importação dinâmica para evitar problemas SSR
      import('scrollreveal').then((ScrollReveal) => {
        const scrollRevealOption = {
          distance: "50px",
          origin: "bottom",
          duration: 1000,
        }

        ScrollReveal.default().reveal(".letterS", {
          duration: 1000,
          delay: 1000,
        })

        // Adicione aqui as outras configurações de reveal...

        return () => ScrollReveal.default().destroy()
      })
    }
  }, [])
}

export default useScrollReveal