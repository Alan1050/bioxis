const publicationTopics = [
  {
    number: "01",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    number: "02",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    number: "03",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const PublicationsSection = () => {
  return (
    <section className="content-section" id="bitacora-orbital" aria-labelledby="bitacora-title">
      <div className="section-heading">
        <p className="eyebrow">Publicaciones</p>
        <h2 id="bitacora-title">Bitacora Orbital</h2>
        <p>
          Articulos, hallazgos y notas de campo para seguir el pulso de la vida mas alla de la
          superficie terrestre.
        </p>
      </div>

      <div className="feature-grid">
        {publicationTopics.map((topic) => (
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
