'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home } from 'lucide-react'
import { theme } from '@/lib/theme'

interface Props {
  alwaysVisible?: boolean
}

export function FloatingHomeButton({ alwaysVisible = false }: Props) {
  const [visible, setVisible] = useState(alwaysVisible)
  const pathname = usePathname()

  useEffect(() => {
    if (alwaysVisible) return
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [alwaysVisible])

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!visible) return null

  return (
    <Link
      href="/"
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderRadius: '99px',
        background: theme.colors.accent,
        color: '#000000',
        fontSize: theme.fontSizes.sm,
        fontWeight: theme.fontWeights.bold,
        textDecoration: 'none',
        boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
        transition: theme.transitions.fast,
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
    >
      <Home size={15} />
      Inicio
    </Link>
  )
}
