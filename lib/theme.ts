// ─────────────────────────────────────────────────────────────────────────────
// lib/theme.ts — Sistema de Diseño Base — Tecnosur Group
// Todos los componentes importan desde acá — un cambio acá cambia todo.
// ─────────────────────────────────────────────────────────────────────────────

export const theme = {

  // ── COLORES ────────────────────────────────────────────────────────────────
  colors: {
    primary:    "#0F0F10",   // negro base (fondo dominante)
    secondary:  "#1C1C1E",   // gris oscuro (cards, bloques)
    accent:     "#F2C230",   // amarillo/dorado (CTA, highlights)
    background: "#0F0F10",   // fondo general (oscuro)
    dark:       "#000000",   // negro puro (navbar fuerte / contrastes)
    text:       "#FFFFFF",   // texto principal
    textMuted:  "#A0A0A0",   // texto secundario
    border:     "#2A2A2A",   // bordes sutiles en dark mode
    success:    "#1D9E75",   // mensajes de éxito
    error:      "#E24B4A",   // mensajes de error
    warning:    "#EF9F27",   // mensajes de advertencia
  },

  // ── TIPOGRAFÍA ─────────────────────────────────────────────────────────────
  fonts: {
    primary:   "Nunito Sans, sans-serif",  // títulos
    secondary: "Nunito Sans, sans-serif",  // cuerpo
  },

  fontSizes: {
    xs:   "11px",
    sm:   "13px",
    base: "16px",
    lg:   "20px",
    xl:   "28px",
    xxl:  "40px",
  },

  fontWeights: {
    regular: 400,
    medium:  500,
    bold:    700,
  },

  // ── ESPACIADO ──────────────────────────────────────────────────────────────
  spacing: {
    xs:  "4px",
    sm:  "8px",
    md:  "16px",
    lg:  "24px",
    xl:  "48px",
    xxl: "80px",
  },

  // ── BORDES ─────────────────────────────────────────────────────────────────
  radii: {
    sm:   "6px",
    md:   "12px",
    lg:   "20px",
    full: "99px",
  },

  // ── SOMBRAS ────────────────────────────────────────────────────────────────
  shadows: {
    sm:  "0 1px 3px rgba(0,0,0,0.08)",
    md:  "0 4px 12px rgba(0,0,0,0.10)",
    nav: "0 2px 8px rgba(0,0,0,0.06)",
  },

  // ── TRANSICIONES ───────────────────────────────────────────────────────────
  transitions: {
    fast:   "0.15s ease",
    normal: "0.25s ease",
    slow:   "0.40s ease",
  },

  // ── BREAKPOINTS ────────────────────────────────────────────────────────────
  breakpoints: {
    mobile:  "640px",
    tablet:  "768px",
    desktop: "1024px",
  },

  // ── NAVBAR ─────────────────────────────────────────────────────────────────
  navbar: {
    height:       "64px",
    heightMobile: "56px",
    cta: {
      text: "Contactanos",
      href: "#contact",
    },
  },

  // ── HERO ───────────────────────────────────────────────────────────────────
  hero: {
    height:          "100vh",
    heightMobile:    "90vh",
    overlayOpacity:  0.75,
    blurAmount:      "4px",
    slideInterval:   3000,
    slideTransition: "1s",

    tag:            "SOLUCIONES A MEDIDA PARA CARGA Y ELEVACIÓN",
    title:          "Ingeniería y soluciones integrales en equipos de izaje y transporte de carga.",
    titleHighlight: "Hidrogruas",
    subtitle:       "Especialistas en Equipos de Izaje e Integración Vehicular — Hidrogrúas, 3er Eje y Fabricación de Carrocerías - Taller Homologado bajo normas bajo normas vigentes",

    cta: {
      primary:   { text: "Ver Servicios", href: "#services" },
      secondary: { text: "Contactanos",   href: "#contact"  },
    },

    images: [
      "/images/hero/hero-1.jpg",
      "/images/hero/hero-2.jpg",
      "/images/hero/hero-3.jpg",
    ],
  },

  // ── FOOTER ─────────────────────────────────────────────────────────────────
  footer: {
    description: "En Tecnosur Group, no solo instalamos equipos; diseñamos soluciones de integración vehicular que optimizan la operatividad de tu flota. Nos especializamos en el montaje de hidrogrúas, hidrolevadores y plataformas de carga,",
    copyright:   "Tecnosur Group 2026",

    social: {
      facebook:  "",  // sin Facebook por ahora — dejar vacío o completar si se crea
      instagram: "https://instagram.com/tecnosur.hidrogruas",
      linkedin:  "https://linkedin.com/company/tecnosur-group",
    },

    maps: {
      // PENDIENTE: ir a maps.google.com → buscar la dirección → Compartir → Insertar un mapa → copiar el src del iframe
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1691.8579503148444!2d-67.58414898886228!3d-45.927962541041126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbde5ab5b4632a129%3A0x710b9cfc4e556cc7!2sTecnosur%20-%20Servicios%20Hidraulicos!5e0!3m2!1ses!2sar!4v1777986830048!5m2!1ses!2sar",
      height:   "120px",
    },

    legal: {
      privacy: "/privacidad",
      terms:   "/terminos",
    },

    services: [
      { label: "Montaje de Hidrogrúas e Hidrolevadores", href: "#services" },
      { label: "Reformas Estructurales y 3er Eje",       href: "#services" },
      { label: "Fabricación de Carrocerías a Medida",    href: "#services" },
      { label: "Certificación bajo Normas Vigentes",     href: "#services" },
    ],

    nav: [
      { label: "Inicio",    href: "/" },
      { label: "Servicios", href: "#services" },
      { label: "Clientes",  href: "#clientes" },
      { label: "Proceso",   href: "#process" },
      { label: "Contacto",  href: "#contact" },
    ],
  },

  // ── CONTACTO ───────────────────────────────────────────────────────────────
  contact: {
    phone:    "+54 297 443-7049",
    email:    "tecnosurcr@gmail.com",
    whatsapp: "5492974437049",          // sin + ni espacios — formato para wa.me/
    address:  "Gdor. Manuel Pio Raso 1706, Rada Tilly, Chubut, Argentina",
  },

  // ── LOGO ───────────────────────────────────────────────────────────────────
  logo: {
    path:      "/images/logos/logo.png",       // logo sobre fondos claros
    pathWhite: "/images/logos/logo-white.png", // logo sobre fondos oscuros
    width:  160,
    height:  40,
  },

  // ── SERVICIOS ──────────────────────────────────────────────────────────────
  services: {
    title: "Nuestros Servicios",
    items: [
      {
        title:       'Montaje de Hidrogrúas e Hidrolevadores',
        description: 'Instalación profesional de equipos de izaje en vehículos comerciales, con garantía certificada.',
        image:       '/images/servicios/montaje higro.jpeg',
      },
      {
        title:       'Reformas Estructurales y 3er Eje',
        description: 'Adaptaciones vehiculares para incrementar capacidad de carga y estabilidad.',
        image:       '/images/servicios/reformas estructura.jpeg',
      },
      {
        title:       'Fabricación de Carrocerías a Medida',
        description: 'Diseño y construcción de carrocerías personalizadas según necesidades del cliente.',
        image:       '/images/servicios/fabricacion carrocerias.jpeg',
      },
      {
        title:       'Taller Homologado – Certificados de montaje y fabricación',
        description: 'Trámites y certificaciones oficiales de seguridad y cumplimiento normativo.',
        image:       '/images/servicios/taller homologado.jpeg',
      },
    ],
  },

  // ── CLIENTES (landing section) ─────────────────────────────────────────────
  clients: {
    title:    "Nuestros Clientes",
    subtitle: "Empresas que confían en nuestra trayectoria y calidad de trabajo",
    names: [
      "Manpetrol SA",
      "Electrificadora del Valle SA",
      "Baker Hughes Arg SRL",
      "Piedra Pampa SRL",
      "Electro Patagonia",
      "San Antonio Internacional",
      "San & Fran SRL",
      "Ebaex SRL",
      "Marbar SRL",
      "Vermaz SRL",
      "Petromark SRL",
      "Pecom Servicios Energía SAU",
      "Transportes Marianela SA",
      "Seave SA",
      "Nelson Oliva SRL",
      "Eisi SA",
      "Tecpe SA",
      "Mafers SA",
      "Transener SA",
      "Transpa SA",
      "Latitud 45 Petróleo y Gas SA",
      "Maxixon SRL",
      "Compañía General de Combustibles SA",
      "Petrosar SA",
      "EC Argentina SRL",
      "Halliburton Argentina SRL",
      "Ayca Servicios Generales SRL",
      "Calfrac Well Services SA",
      "Clamar SRL",
      "Clear Petroleum",
      "Copesa SA",
      "Dangus SRL",
      "Edwnred Argentina SA",
      "Schlumberger Argentina SA",
      "PGP SA Petroaike",
      "Wenlen SA",
    ],
  },

  // ── AUTH ───────────────────────────────────────────────────────────────────
  auth: {
    logo: {
      width:  120,
      height:  32,
    },
    redirectAfterLogin:    "/dashboard",
    redirectAfterLogout:   "/auth/signin",
    redirectAfterRegister: "/auth/signin",
  },

  // ── DASHBOARD ──────────────────────────────────────────────────────────────
  dashboard: {
    sidebarWidth:          "240px",
    sidebarWidthCollapsed: "64px",
    headerHeight:          "60px",
  },

} as const

// ─────────────────────────────────────────────────────────────────────────────
// Tipos exportados
// ─────────────────────────────────────────────────────────────────────────────

export type Theme = typeof theme
export type ThemeColors = typeof theme.colors
