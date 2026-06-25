import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import './App.css'
import Header from './components/Header'
import CollaboratorsPage from './pages/CollaboratorsPage'
import HomePage from './pages/HomePage'
import ObservatoryPage from './pages/ObservatoryPage'
import PublicationsPage from './pages/PublicationsPage'
import SpaceBoardPage from './pages/SpaceBoardPage'

function ScrollToTop() {
  const { hash, pathname, search } = useLocation()

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    requestAnimationFrame(resetScroll)
  }, [pathname, search, hash])

  return null
}

function AppShell() {
  const { pathname } = useLocation()
  const shellClassName = pathname === '/' ? 'site-shell' : 'site-shell secondary-background'

  return (
    <div className={shellClassName}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publicaciones" element={<PublicationsPage />} />
        <Route path="/colaboradores" element={<CollaboratorsPage />} />
        <Route path="/tablon-espacial" element={<SpaceBoardPage />} />
        <Route path="/observatorio" element={<ObservatoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <AppShell />
    </Router>
  )
}

export default App
