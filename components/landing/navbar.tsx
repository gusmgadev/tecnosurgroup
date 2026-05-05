'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { theme } from '@/lib/theme'

const navItems = [
  { label: 'Servicios', href: '#services' },
  { label: 'Proceso',   href: '#process'  },
  { label: 'Clientes',  href: '#clientes' },
]

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden]    = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > lastY && y > 100)
      lastY = y
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
          className="flex-shrink-0"
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            src={theme.logo.path}
            alt="Tecnosur Group"
            width={80}
            height={80}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                style={{
                  color: 'rgba(255,255,255,0.70)',
                  borderRadius: '99px',
                  padding: '6px 16px',
                  fontSize: theme.fontSizes.base,
                  transition: theme.transitions.fast,
                  display: 'block',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = theme.colors.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href={theme.navbar.cta.href}
          className="hidden md:block"
          style={{
            background: '#ffffff',
            color: theme.colors.dark,
            borderRadius: '99px',
            padding: '8px 20px',
            fontWeight: theme.fontWeights.bold,
            fontSize: theme.fontSizes.base,
            transition: theme.transitions.fast,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {theme.navbar.cta.text}
        </a>

        {/* Hamburguesa mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          style={{
            color: '#ffffff',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
          }}
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
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    display: 'block',
                    transition: theme.transitions.fast,
                    fontSize: theme.fontSizes.base,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href={theme.navbar.cta.href}
                onClick={() => setIsOpen(false)}
                style={{
                  background: '#ffffff',
                  color: theme.colors.dark,
                  padding: '10px 16px',
                  borderRadius: '99px',
                  fontWeight: theme.fontWeights.bold,
                  display: 'block',
                  textAlign: 'center',
                  fontSize: theme.fontSizes.base,
                }}
              >
                {theme.navbar.cta.text}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
