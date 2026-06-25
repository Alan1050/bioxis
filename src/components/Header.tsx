import { NavLink } from 'react-router-dom'
import logoBioxis from '../assets/IMG_6503.jpg'

const navigationItems = [
  { href: '/', label: 'Inicio' },
  { href: '/publicaciones', label: 'Publicaciones' },
  { href: '/colaboradores', label: 'Colaboradores' },
  { href: '/tablon-espacial', label: 'Tablon Espacial' },
  { href: '/observatorio', label: 'Observatorio' },
]

const Header = () => {
  return (
    <header className="site-header">
      <NavLink className="brand-mark" to="/" aria-label="BIOXIS inicio">
        <img src={logoBioxis} alt="" />
        <span>BIOXIS</span>
      </NavLink>

      <nav className="main-nav" aria-label="Navegacion principal">
        {navigationItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            key={item.href}
            to={item.href}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header
