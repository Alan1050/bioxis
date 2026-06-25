const collaborators = [
  {
    rol: "Lorem ipsum",
    nombre: "Lorem ipsum",
    especialidad: "Lorem ipsum dolor sit amet",
  },
  {
    rol: "Lorem ipsum",
    nombre: "Lorem ipsum",
    especialidad: "Lorem ipsum dolor sit amet",
  },
  {
    rol: "Lorem ipsum",
    nombre: "Lorem ipsum",
    especialidad: "Lorem ipsum dolor sit amet",
  },
  {
    rol: "Lorem ipsum",
    nombre: "Lorem ipsum",
    especialidad: "Lorem ipsum dolor sit amet",
  },
];

const CollaboratorsSection = () => {
  return (
    <section
      className="content-section collaborators-section"
      id="tripulacion-bioxis"
      aria-labelledby="collaborators-title"
    >
      <div className="section-heading">
        <p className="eyebrow">División</p>
        <h2 id="collaborators-title">Tripulación Bioxis</h2>
        <p>
          Pantalla base para presentar a quienes pertenecen a la división, sus roles y el enfoque de
          cada orbitador dentro del proyecto.
        </p>
      </div>

      <div className="collaborator-grid">
        {collaborators.map((collaborator) => (
          <article className="collaborator-card" key={collaborator.rol}>
            <div className="avatar-placeholder" aria-hidden="true">
              {collaborator.rol.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p>{collaborator.rol}</p>
              <h3>{collaborator.nombre}</h3>
              <span>{collaborator.especialidad}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CollaboratorsSection
