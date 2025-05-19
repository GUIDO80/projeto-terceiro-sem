'use client'

import { useEffect } from 'react'

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  additionalRef?: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (ref.current && !ref.current.contains(target)) {
        if (additionalRef && additionalRef.current && !additionalRef.current.contains(target)) {
          callback()
        } else if (!additionalRef) {
          callback()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback, additionalRef])
}

export default useOutsideClick