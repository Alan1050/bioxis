import { useLanguage } from '../i18n/LanguageContext'

const SpaceBoardSection = () => {
  const { copy } = useLanguage()

  return (
    <section
      className="content-section space-board-section"
      id="tablon-espacial"
      aria-labelledby="space-board-title"
    >
      <div className="section-heading">
        <p className="eyebrow">{copy.board.eyebrow}</p>
        <h2 id="space-board-title">{copy.board.title}</h2>
        <p>{copy.board.description}</p>
      </div>

      <div className="board-timeline">
        {copy.board.items.map((item, index) => (
          <article className="board-item" key={`${item.type}-${index}`}>
            <div className="board-meta">
              <span>{item.type}</span>
              <time>{item.date}</time>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SpaceBoardSection
