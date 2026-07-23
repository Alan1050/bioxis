import { useLanguage } from '../i18n/LanguageContext'

const PublicationsSection = () => {
  const { copy } = useLanguage()

  return (
    <section className="content-section" id="bitacora-orbital" aria-labelledby="bitacora-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.publications.eyebrow}</p>
        <h2 id="bitacora-title">{copy.publications.title}</h2>
        <p>{copy.publications.description}</p>
      </div>

      <div className="feature-grid">
        {copy.publications.topics.map((topic) => (
          <article className="feature-card" key={topic.number}>
            <span>{topic.number}</span>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PublicationsSection
