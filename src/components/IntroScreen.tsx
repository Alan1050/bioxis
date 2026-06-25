import logoBioxis from '../assets/IMG_6503.jpg'

const IntroScreen = () => {
  return (
    <div className="intro-screen" aria-hidden="true">
      <div className="intro-brand">
        <img className="intro-logo" src={logoBioxis} alt="" decoding="sync" fetchPriority="high" loading="eager" />
        <span className="intro-brand-title">BIOXIS</span>
        <span className="intro-brand-subtitle">El eje entre la vida y el espacio</span>
      </div>
    </div>
  )
}

export default IntroScreen
