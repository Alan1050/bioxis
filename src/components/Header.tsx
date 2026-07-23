import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoBioxis from '../assets/IMG_6503.jpg'
import { useLanguage } from '../i18n/LanguageContext'

const Header = () => {
  const { copy, toggleLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const navigationItems = [
    { href: '/', label: copy.nav.home },
    { href: '/publicaciones', label: copy.nav.publications },
    { href: '/colaboradores', label: copy.nav.collaborators },
    { href: '/tablon-espacial', label: copy.nav.board },
    { href: '/observatorio', label: copy.nav.observatory },
  ]

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    const closeOutside = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return
      setIsMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`site-header${isMenuOpen ? ' is-menu-open' : ''}`} ref={headerRef}>
      <NavLink className="brand-mark" to="/" aria-label={copy.nav.brandAria} onClick={closeMenu}>
        <img src={logoBioxis} alt="" />
        <span>BIOXIS</span>
      </NavLink>

      <div className="header-controls">
        <nav className="main-nav" id="main-navigation" aria-label={copy.nav.aria}>
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              key={item.href}
              to={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="language-toggle"
          type="button"
          onClick={toggleLanguage}
          aria-label={copy.language.switchLabel}
          title={copy.language.switchLabel}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14.7 14.7 0 0 1 0 18M12 3a14.7 14.7 0 0 0 0 18" />
          </svg>
          <span>{copy.language.next}</span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          ref={menuButtonRef}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-label={isMenuOpen ? copy.nav.closeMenu : copy.nav.openMenu}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

export default Header
