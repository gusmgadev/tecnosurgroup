'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Lock } from 'lucide-react'
import { theme } from '@/lib/theme'

const navItems = [
  { label: 'Servicios',   href: '/#services' },
  { label: 'Proceso',     href: '/#process'  },
  { label: 'Clientes',    href: '/clientes'  },
  { label: 'Contactanos', href: '/#contact'  },
]

const linkStyle = {
  color: 'rgba(255,255,255,0.70)' as const,
  borderRadius: '99px',
  padding: '6px 16px',
  fontSize: theme.fontSizes.base,
  transition: theme.transitions.fast,
  display: 'block' as const,
  textDecoration: 'none' as const,
  cursor: 'pointer' as const,
  background: 'none' as const,
  border: 'none' as const,
}

const mobileLinkStyle = {
  color: 'rgba(255,255,255,0.75)' as const,
  padding: '10px 16px',
  borderRadius: '10px',
  display: 'block' as const,
  transition: theme.transitions.fast,
  fontSize: theme.fontSizes.base,
  textDecoration: 'none' as const,
  cursor: 'pointer' as const,
  background: 'none' as const,
  border: 'none' as const,
  width: '100%' as const,
  textAlign: 'left' as const,
}

function NavLink({ href, label, mobile = false, onClick }: { href: string; label: string; mobile?: boolean; onClick?: () => void }) {
  const pathname = usePathname()
  const router   = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    onClick?.()

    if (!href.startsWith('/#')) return // página completa — Link se encarga

    e.preventDefault()
    const sectionId = href.slice(2) // quita '/#'

    if (pathname === '/') {
      const el = document.getElementById(sectionId)
      if (el) {
        const nav = document.querySelector('header')
        const navH = nav ? nav.getBoundingClientRect().height : 100
        window.scrollTo({ top: el.offsetTop - navH, behavior: 'smooth' })
      }
    } else {
      router.push(href)
    }
  }

  if (!href.startsWith('/#')) {
    return (
      <Link
        href={href}
        onClick={onClick}
        style={mobile ? mobileLinkStyle : linkStyle}
        onMouseEnter={e => (e.currentTarget.style.color = mobile ? '#fff' : theme.colors.accent)}
        onMouseLeave={e => (e.currentTarget.style.color = mobile ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.70)')}
      >
        {label}
      </Link>
    )
  }

  return (
    <button
      onClick={handleClick}
      style={mobile ? mobileLinkStyle : linkStyle}
      onMouseEnter={e => {
        e.currentTarget.style.color = mobile ? '#fff' : theme.colors.accent
        if (mobile) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = mobile ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.70)'
        if (mobile) e.currentTarget.style.background = 'transparent'
      }}
    >
      {label}
    </button>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]     = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > window.innerHeight * 0.85)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)', transition: 'transform 0.3s ease' }}
    >
      {/* ── Barra principal ── */}
      <nav
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: scrolled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
          backdropFilter: `blur(${scrolled ? '16px' : '12px'})`,
          WebkitBackdropFilter: `blur(${scrolled ? '16px' : '12px'})`,
          border: '0.5px solid rgba(255,255,255,0.15)',
          borderRadius: '99px',
          padding: '8px 24px',
          transition: theme.transitions.fast,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 relative w-[80px] h-[80px] md:w-[130px] md:h-[130px] rounded-full flex items-center justify-center overflow-hidden"
          style={{ background: '#ffffff' }}
        >
          <Image
            src={theme.logo.path}
            alt="Tecnosur Group"
            fill
            style={{ objectFit: 'contain', padding: '6px' }}
            priority
          />
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink href={item.href} label={item.label} />
            </li>
          ))}
        </ul>

        {/* Login desktop */}
        <Link
          href="/auth/signin"
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '99px',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.65)',
            fontSize: theme.fontSizes.sm,
            textDecoration: 'none',
            transition: theme.transitions.fast,
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.color = '#ffffff'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)'
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
          }}
        >
          <Lock size={13} />
          Login
        </Link>

        {/* Hamburguesa mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center md:hidden"
          style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Dropdown mobile ── */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{
            maxWidth: '900px',
            margin: '8px auto 0',
            background: 'rgba(10,10,10,0.96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '0.5px solid rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '12px',
          }}
        >
          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink href={item.href} label={item.label} mobile onClick={() => setIsOpen(false)} />
              </li>
            ))}
            <li>
              <Link
                href="/auth/signin"
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'rgba(255,255,255,0.65)',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  transition: theme.transitions.fast,
                  fontSize: theme.fontSizes.base,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent' }}
              >
                <Lock size={14} />
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
