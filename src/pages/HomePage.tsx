import { useEffect, useMemo, useState } from 'react'
import HeroSection from '../components/HeroSection'
import HomeOverviewSection from '../components/HomeOverviewSection'
import IntroScreen from '../components/IntroScreen'

const HomePage = () => {
  const shouldReduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined' || shouldReduceMotion) return false
    return window.localStorage.getItem('bioxis-intro-seen') !== 'true'
  })

  useEffect(() => {
    if (!showIntro) return

    const timeout = window.setTimeout(() => {
      window.localStorage.setItem('bioxis-intro-seen', 'true')
      setShowIntro(false)
    }, 4200)

    return () => window.clearTimeout(timeout)
  }, [showIntro])

  return (
    <main className={showIntro ? 'intro-playing' : ''}>
      {showIntro && <IntroScreen />}
      <HeroSection enableEarth={!showIntro} />
      <HomeOverviewSection />
    </main>
  )
}

export default HomePage
