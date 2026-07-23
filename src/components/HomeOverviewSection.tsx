import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const HomeOverviewSection = () => {
  const { copy } = useLanguage()

  return (
    <>
      <section
        className="home-intro-section"
        aria-labelledby="home-intro-title"
      >
        <div className="section-heading">
          <p className="eyebrow">{copy.home.introEyebrow}</p>
          <h2 id="home-intro-title">{copy.home.introTitle}</h2>
          <p>{copy.home.introCopy}</p>
        </div>

        <div className="mission-statement">
          <p>{copy.home.missionCopy}</p>
        </div>
      </section>

      <section
        className="home-modules-section"
        aria-labelledby="home-modules-title"
      >
        <div className="section-heading">
          <p className="eyebrow">{copy.home.modulesEyebrow}</p>
          <h2 id="home-modules-title">{copy.home.modulesTitle}</h2>
        </div>

        <div className="home-module-grid">
          {copy.home.modules.map((module) => (
            <Link
              className="home-module-card"
              key={module.path}
              to={module.path}
            >
              <span>{module.label}</span>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}

export default HomeOverviewSection
