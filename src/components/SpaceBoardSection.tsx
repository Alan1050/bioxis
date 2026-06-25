const boardItems = [
  {
    type: "Evento",
    date: "Proximamente",
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "Noticia",
    date: "En monitoreo",
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "Aviso",
    date: "Abierto",
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const SpaceBoardSection = () => {
  return (
    <section
      className="content-section space-board-section"
      id="tablon-espacial"
      aria-labelledby="space-board-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Eventos y noticias</p>
        <h2 id="space-board-title">Tablón Espacial</h2>
        <p>
          Una pantalla preparada para publicar eventos, noticias relevantes, avisos internos y
          comunicaciones importantes de BIOXIS.
        </p>
      </div>

      <div className="board-timeline">
        {boardItems.map((item) => (
          <article className="board-item" key={item.title}>
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
