import { Link } from 'react-router-dom'
import TierraConectada3D from './TierraConectada3D'

const HeroSection = () => {
  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">El eje entre la vida y el espacio</p>
        <h1 id="hero-title">BIOXIS</h1>
        <p className="hero-lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="hero-actions" aria-label="Acciones principales">
          <Link className="primary-action" to="/publicaciones">
            Lorem ipsum
          </Link>
          <Link className="secondary-action" to="/tablon-espacial">
            Lorem ipsum
          </Link>
        </div>
      </div>

      <div className="earth-stage" aria-label="Planeta Tierra conectado en 3D">
        <TierraConectada3D />
      </div>
    </section>
  );
}

export default HeroSection
