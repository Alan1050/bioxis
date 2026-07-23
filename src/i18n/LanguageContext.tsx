/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Language = 'es' | 'en'

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      publications: 'Publicaciones',
      collaborators: 'Colaboradores',
      board: 'Tablón Espacial',
      observatory: 'Observatorio',
      aria: 'Navegación principal',
      brandAria: 'BIOXIS, ir al inicio',
      openMenu: 'Abrir menú de navegación',
      closeMenu: 'Cerrar menú de navegación',
    },
    language: {
      next: 'EN',
      switchLabel: 'Cambiar idioma a inglés',
    },
    intro: {
      subtitle: 'El eje entre la vida y el espacio',
    },
    hero: {
      eyebrow: 'El eje entre la vida y el espacio',
      lead: 'Plataforma de exploración para publicaciones, misiones y colaboraciones donde la vida, la ciencia y el espacio se conectan.',
      primaryAction: 'Ver publicaciones',
      secondaryAction: 'Ver tablero',
      actionsAria: 'Acciones principales',
      earthAria: 'Planeta Tierra conectado en 3D',
      canvasAria: 'Escena 3D interactiva de la Tierra con órbitas y satélites',
    },
    home: {
      introEyebrow: 'Núcleo de misión',
      introTitle: 'Una división para crear, conectar y divulgar',
      introCopy: 'BIOXIS reúne ciencia, comunicación y colaboración para explorar las conexiones entre la vida y el espacio.',
      missionCopy: 'Construimos un punto de encuentro para compartir conocimiento, impulsar misiones y acercar la exploración espacial a nuevas comunidades.',
      modulesEyebrow: 'Módulos principales',
      modulesTitle: 'Centro de navegación BIOXIS',
      modules: [
        {
          label: 'Publicaciones',
          title: 'Bitácora Orbital',
          description: 'Artículos, hallazgos y notas de campo de la comunidad BIOXIS.',
          path: '/publicaciones',
        },
        {
          label: 'División',
          title: 'Tripulación BIOXIS',
          description: 'Conoce a las personas, disciplinas y colaboraciones que impulsan el proyecto.',
          path: '/colaboradores',
        },
        {
          label: 'Eventos y noticias',
          title: 'Tablón Espacial',
          description: 'Consulta próximos eventos, anuncios y novedades de la misión.',
          path: '/tablon-espacial',
        },
        {
          label: 'Exploración',
          title: 'Observatorio de Señales',
          description: 'Explora recursos, transmisiones y señales de investigación.',
          path: '/observatorio',
        },
      ],
    },
    publications: {
      eyebrow: 'Publicaciones',
      title: 'Bitácora Orbital',
      description: 'Artículos, hallazgos y notas de campo para seguir el pulso de la vida más allá de la superficie terrestre.',
      topics: [
        { number: '01', title: 'Lorem ipsum dolor', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { number: '02', title: 'Lorem ipsum dolor', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { number: '03', title: 'Lorem ipsum dolor', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      ],
    },
    collaborators: {
      eyebrow: 'Tres áreas, una misión',
      title: 'Áreas BIOXIS',
      description: 'Conoce las tres áreas que forman BIOXIS, su liderazgo general y a las personas que aportan experiencia, investigación y creatividad a cada misión.',
      divisionNavAria: 'Ir a un área',
      divisionKicker: 'Área',
      team: 'Equipo',
      leader: 'Liderazgo general de BIOXIS',
      areaLeader: 'Líder de área',
      member: 'Integrante',
      fullName: 'Nombre completo',
      specialty: 'Especialidad',
      interests: 'Áreas de interés',
      interestCarousel: 'Carrusel de áreas de interés de',
      previousInterest: 'Ver intereses anteriores',
      nextInterest: 'Ver más intereses',
      pauseInterests: 'Pausar carrusel de intereses',
      playInterests: 'Reanudar carrusel de intereses',
      photoAlt: 'Fotografía de',
      profile: 'LinkedIn / Portafolio',
      profilePending: 'Perfil por agregar',
      openProfile: 'Abrir perfil profesional de',
      biography: 'Descripción profesional',
    },
    board: {
      eyebrow: 'Eventos y noticias',
      title: 'Tablón Espacial',
      description: 'Eventos, noticias relevantes, avisos internos y comunicaciones importantes de BIOXIS.',
      items: [
        { type: 'Evento', date: 'Próximamente', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { type: 'Noticia', date: 'En monitoreo', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { type: 'Aviso', date: 'Abierto', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
    },
    observatory: {
      eyebrow: 'Exploración',
      title: 'Observatorio de Señales',
      description: 'Un módulo base para futuras galerías, transmisiones, recursos descargables o mapas de investigación.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      publications: 'Publications',
      collaborators: 'Collaborators',
      board: 'Space Board',
      observatory: 'Observatory',
      aria: 'Main navigation',
      brandAria: 'BIOXIS, go to home',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    language: {
      next: 'ES',
      switchLabel: 'Switch language to Spanish',
    },
    intro: {
      subtitle: 'Where life and space converge',
    },
    hero: {
      eyebrow: 'Where life and space converge',
      lead: 'An exploration platform for publications, missions, and collaborations connecting life, science, and space.',
      primaryAction: 'View publications',
      secondaryAction: 'View board',
      actionsAria: 'Main actions',
      earthAria: 'Connected 3D planet Earth',
      canvasAria: 'Interactive 3D scene of Earth with orbits and satellites',
    },
    home: {
      introEyebrow: 'Mission core',
      introTitle: 'A division to create, connect, and share',
      introCopy: 'BIOXIS brings science, communication, and collaboration together to explore the connections between life and space.',
      missionCopy: 'We are building a meeting point for sharing knowledge, advancing missions, and bringing space exploration to new communities.',
      modulesEyebrow: 'Main modules',
      modulesTitle: 'BIOXIS navigation center',
      modules: [
        {
          label: 'Publications',
          title: 'Orbital Log',
          description: 'Articles, findings, and field notes from the BIOXIS community.',
          path: '/publicaciones',
        },
        {
          label: 'Division',
          title: 'BIOXIS Crew',
          description: 'Meet the people, disciplines, and collaborations driving the project.',
          path: '/colaboradores',
        },
        {
          label: 'Events and news',
          title: 'Space Board',
          description: 'Browse upcoming events, announcements, and mission updates.',
          path: '/tablon-espacial',
        },
        {
          label: 'Exploration',
          title: 'Signal Observatory',
          description: 'Explore resources, broadcasts, and research signals.',
          path: '/observatorio',
        },
      ],
    },
    publications: {
      eyebrow: 'Publications',
      title: 'Orbital Log',
      description: 'Articles, findings, and field notes tracking the pulse of life beyond Earth’s surface.',
      topics: [
        { number: '01', title: 'Lorem ipsum dolor', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { number: '02', title: 'Lorem ipsum dolor', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { number: '03', title: 'Lorem ipsum dolor', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      ],
    },
    collaborators: {
      eyebrow: 'Three areas, one mission',
      title: 'BIOXIS Areas',
      description: 'Meet the three areas that make up BIOXIS, its general leadership, and the people contributing experience, research, and creativity to every mission.',
      divisionNavAria: 'Jump to an area',
      divisionKicker: 'Area',
      team: 'Team',
      leader: 'BIOXIS general leadership',
      areaLeader: 'Area lead',
      member: 'Member',
      fullName: 'Full name',
      specialty: 'Specialty',
      interests: 'Areas of interest',
      interestCarousel: 'Areas of interest carousel for',
      previousInterest: 'View previous interests',
      nextInterest: 'View more interests',
      pauseInterests: 'Pause interests carousel',
      playInterests: 'Resume interests carousel',
      photoAlt: 'Photo of',
      profile: 'LinkedIn / Portfolio',
      profilePending: 'Profile to be added',
      openProfile: 'Open professional profile for',
      biography: 'Professional description',
    },
    board: {
      eyebrow: 'Events and news',
      title: 'Space Board',
      description: 'Events, relevant news, internal notices, and important BIOXIS communications.',
      items: [
        { type: 'Event', date: 'Coming soon', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { type: 'News', date: 'Monitoring', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { type: 'Notice', date: 'Open', title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
    },
    observatory: {
      eyebrow: 'Exploration',
      title: 'Signal Observatory',
      description: 'A foundation for future galleries, broadcasts, downloadable resources, and research maps.',
    },
  },
} as const

type LanguageContextValue = {
  language: Language
  copy: (typeof translations)[Language]
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'es'
    return window.localStorage.getItem('bioxis-language') === 'en' ? 'en' : 'es'
  })

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('bioxis-language', language)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      copy: translations[language],
      toggleLanguage: () => setLanguage((current) => (current === 'es' ? 'en' : 'es')),
    }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
