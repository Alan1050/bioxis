import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'

const TierraConectada3D = lazy(() => import('./TierraConectada3D'))

type HeroSectionProps = {
  enableEarth?: boolean
}

const HeroSection = ({ enableEarth = true }: HeroSectionProps) => {
  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">El eje entre la vida y el espacio</p>
        <h1 id="hero-title">BIOXIS</h1>
        <p className="hero-lead">
          Plataforma de exploracion para publicaciones, misiones y colaboraciones donde la vida, la
          ciencia y el espacio se conectan.
        </p>
        <div className="hero-actions" aria-label="Acciones principales">
          <Link className="primary-action" to="/publicaciones">
            Ver publicaciones
          </Link>
          <Link className="secondary-action" to="/tablon-espacial">
            Ver tablero
          </Link>
        </div>
      </div>

      <div className="earth-stage" aria-label="Planeta Tierra conectado en 3D">
        {enableEarth && (
          <Suspense fallback={null}>
            <TierraConectada3D />
          </Suspense>
        )}
      </div>
    </section>
  )
}

export default HeroSection
