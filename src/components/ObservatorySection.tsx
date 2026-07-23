import { useLanguage } from '../i18n/LanguageContext'

const ObservatorySection = () => {
  const { copy } = useLanguage()

  return (
    <section className="content-section" id="observatorio" aria-labelledby="observatorio-title">
      <div className="section-heading">
        <p className="eyebrow">{copy.observatory.eyebrow}</p>
        <h2 id="observatorio-title">{copy.observatory.title}</h2>
        <p>{copy.observatory.description}</p>
      </div>
    </section>
  )
}

export default ObservatorySection
