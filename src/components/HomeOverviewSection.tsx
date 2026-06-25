import { Link } from 'react-router-dom'

const homeModules = [
  {
    label: "Publicaciones",
    title: "Bitacora Orbital",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/publicaciones",
  },
  {
    label: "División",
    title: "Tripulación Bioxis",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/colaboradores",
  },
  {
    label: "Eventos y noticias",
    title: "Tablón Espacial",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/tablon-espacial",
  },
  {
    label: "Exploración",
    title: "Observatorio de Señales",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    path: "/observatorio",
  },
];

const HomeOverviewSection = () => {
  return (
    <>
      <section
        className="home-intro-section"
        aria-labelledby="home-intro-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Nucleo de misión</p>
          <h2 id="home-intro-title">
            Una división para crear, conectar y divulgar
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>

        <div className="mission-statement">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat
          </p>
        </div>
      </section>

      <section
        className="home-modules-section"
        aria-labelledby="home-modules-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Modulos principales</p>
          <h2 id="home-modules-title">Centro de navegación Bioxis</h2>
        </div>

        <div className="home-module-grid">
          {homeModules.map((module) => (
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
