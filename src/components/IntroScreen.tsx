import logoBioxis from '../assets/PNG/LogoBIOXISBlanco.png'
import { useLanguage } from '../i18n/LanguageContext'

const IntroScreen = () => {
  const { copy } = useLanguage()

  return (
    <div className="intro-screen" aria-hidden="true">
      <div className="intro-brand">
        <img className="intro-logo" src={logoBioxis} alt="" decoding="sync" fetchPriority="high" loading="eager" />
        <span className="intro-brand-title">BIOXIS</span>
        <span className="intro-brand-subtitle">{copy.intro.subtitle}</span>
      </div>
    </div>
  )
}

export default IntroScreen
