import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const earthModule = import('./TierraConectada3D')
const TierraConectada3D = lazy(() => earthModule)

const HeroSection = () => {
  const { copy } = useLanguage()

  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">{copy.hero.eyebrow}</p>
        <h1 id="hero-title">BIOXIS</h1>
        <p className="hero-lead">
          {copy.hero.lead}
        </p>
        <div className="hero-actions" aria-label={copy.hero.actionsAria}>
          <Link className="primary-action" to="/publicaciones">
            {copy.hero.primaryAction}
          </Link>
          <Link className="secondary-action" to="/tablon-espacial">
            {copy.hero.secondaryAction}
          </Link>
        </div>
      </div>

      <div className="earth-stage" aria-label={copy.hero.earthAria}>
        <Suspense fallback={null}>
          <TierraConectada3D />
        </Suspense>
      </div>
    </section>
  )
}

export default HeroSection
