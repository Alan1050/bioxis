import type { Language } from '../i18n/LanguageContext'

export type AreaId = 'medicine' | 'engineering' | 'outreach'

export type CollaboratorProfile = {
  id: string
  name: string
  photoUrl?: string | null
  profileUrl: string | null
  specialty: string
  interests: readonly string[]
  biography: string
  isAreaLeader?: boolean
  isPlaceholder?: boolean
}

export type AreaProfile = {
  id: AreaId
  name: string
  summary: string
  logoAlt: string
  people: readonly CollaboratorProfile[]
}

export type CollaboratorsDirectory = {
  bioxisLeader: CollaboratorProfile
  areas: readonly AreaProfile[]
}

const pendingProfileEs = (
  id: string,
  name: string,
  isAreaLeader = false,
): CollaboratorProfile => ({
  id,
  name,
  photoUrl: null,
  profileUrl: null,
  specialty: 'Especialidad por agregar',
  interests: ['Área de interés por agregar'],
  biography: 'Descripción profesional por agregar.',
  isAreaLeader,
  isPlaceholder: true,
})

const pendingProfileEn = (
  id: string,
  name: string,
  isAreaLeader = false,
): CollaboratorProfile => ({
  id,
  name,
  photoUrl: null,
  profileUrl: null,
  specialty: 'Specialty to be added',
  interests: ['Area of interest to be added'],
  biography: 'Professional description to be added.',
  isAreaLeader,
  isPlaceholder: true,
})

/*
 * Para capturar los datos:
 * - Reemplaza bioxisLeader con la información de la única persona líder de BIOXIS.
 * - Cada área debe tener exactamente un perfil con isAreaLeader: true.
 * - Reemplaza cada perfil pendiente dentro de su área.
 * - Duplica un perfil dentro de people si necesitas agregar más integrantes.
 * - Usa el mismo id para la versión en español y en inglés de una persona.
 */
export const collaboratorsByLanguage: Record<Language, CollaboratorsDirectory> = {
  es: {
    bioxisLeader: {
      id: "dorely-medina",
      name: "Dorely Medina Leal",
      photoUrl: null,
      profileUrl: null,
      specialty: "",
      interests: [],
      biography:
        "Representante de México en el voluntariado Alianza del Pacífico Juventud, Feminismo y Memoria en Chile y en el International Air and Space Program de la NASA, en el que desarrollé un proyecto científico y tecnológico para generar oxígeno en el espacio, además de realizar entrenamientos en S.C.U.B.A. y space walk training, entre otros. También soy creadora de Inspirar Cultivando Sueños, programa que promueve el liderazgo en jóvenes y busca combatir la deserción escolar, y del programa Ciencia para Todas por el Día Internacional de la Niña y la Mujer en la Ciencia, además de otras iniciativas sociales, científicas y tecnológicas.",
    },
    areas: [
      {
        id: "medicine",
        name: "Medicina Espacial",
        summary:
          "Salud, biología y bienestar humano aplicados a los retos de la exploración espacial.",
        logoAlt: "Logotipo del área de Medicina Espacial de BIOXIS",
        people: [
          {
            id: "lenin-rosales",
            name: "Lenin Manuel Rosales Ramirez",
            photoUrl: null,
            profileUrl: null,
            specialty: "Ciencias químicas, biológicas y farmacéuticas",
            interests: [
              "Medicina espacial",
              "Farmacología espacial",
              "Astrobiología",
            ],
            biography:
              "Soy Licenciado en Químico Farmacobiólogo (QFB), con un diplomado en Hematología y Banco de Sangre y amplia experiencia en el manejo de microorganismos. He participado en investigación internacional en la Universidad de Medellín, Colombia, enfocada en el biocontrol de hongos fitopatógenos mediante el uso de cepas antagonistas (Trichoderma sp.). Además, cuento con experiencia práctica en el sector salud público dentro del cepario del Laboratorio Estatal, realizando el manejo seguro de bacterias y hongos patógenos bajo protocolos estrictos de bioseguridad, así como la ejecución de protocolos de control de calidad.",
            isAreaLeader: true,
          },
          {
            id: "erandi-ruiz",
            name: "Erandi Daniela Ruiz Coronado",
            photoUrl: null,
            profileUrl: null,
            specialty: "Biología",
            interests: [
              "Astrobiología",
              "Medicina espacial",
              "Conservación de especies",
              "Educación ambiental",
              "Cetrería",
              "Comportamiento y entrenamiento animal",
            ],
            biography:
              "Soy estudiante de biología en la UdG. He trabajado tres temporadas en la conservación de tortugas marinas en Puerto Vallarta y Bahía de Banderas. En 2024 realicé un Verano Delfín en Tepic sobre contaminación y toxicología ambiental por metales pesados en suelos agrícolas del norte de Nayarit. También he trabajado durante más de un año en control biológico aviar con cetrería, cuidando y entrenando aguilillas de Harris en hoteles de Bahía de Banderas y Puerto Vallarta.",
          },
          {
            id: "isis-avedoy",
            name: "Isis Avedoy Cortez",
            photoUrl: null,
            profileUrl:
              "https://www.linkedin.com/in/isis-avedoy-cortez-861a70103/",
            specialty: "Ciencias Biomédicas",
            interests: [
              "Medicina aeroespacial",
              "Medicina genómica",
              "Biología molecular",
              "Biotecnología",
              "Radiación cósmica",
              "Reparación de ADN",
            ],
            biography:
              "Soy Ing. Bioquímica con especialidad en Biotecnología, participación en el proyecto de Biocomparabilidad de fármacos Embrel vs. Etanercept, experiencia docente en materias STEM y maestría en Educación por el Tec de Monterrey. También cuento con experiencia capacitando docentes sobre tecnologías emergentes aplicadas a la educación y con una Maestría en Ciencias Biomédicas, donde trabajé en un proyecto sobre la asociación de riesgo de las variantes rs16942 en BRCA1 y rs144848 en BRCA2 en una población de mujeres nayaritas.",
          },
        ],
      },
      {
        id: "engineering",
        name: "Ingeniería",
        summary:
          "Tecnología, software e infraestructura para desarrollar soluciones de investigación y exploración.",
        logoAlt: "Logotipo del área de Ingeniería de BIOXIS",
        people: [
          {
            id: "alan-medina",
            name: "Alan Emir Medina Delgado",
            photoUrl: null,
            profileUrl: "https://devalanmedina.netlify.app/",
            specialty: "Desarrollo y gestión de software e IA",
            interests: [
              "Desarrollo de software",
              "Inteligencia artificial",
              "Análisis de datos",
              "Investigación",
              "Inteligencia artificial predictiva",
              "Tecnología con impacto social y económico",
            ],
            biography:
              "Actualmente soy estudiante de Ingeniería en Desarrollo y Gestión de Software en la Universidad Tecnológica de Nayarit. Me interesa el desarrollo de software, el emprendimiento tecnológico y la inteligencia artificial predictiva. Trabajo en proyectos como Digitalizando a Nayarit, enfocado en impulsar la transformación digital de los negocios locales, y AuraFest, una plataforma para facilitar la organización de eventos. Además, busco construir plataformas de aprendizaje y educación gratuita que acerquen el conocimiento a más personas. He recibido reconocimientos por parte de Future Leaders in Tourism Summit Nayarit 2026 e Ibero4Jobs por mi participación en proyectos de innovación y retos empresariales.",
            isAreaLeader: true,
          },
          pendingProfileEs("engineering-member-1", "Nombre del integrante"),
        ],
      },
      {
        id: "outreach",
        name: "Divulgación Científica",
        summary:
          "Comunicación y experiencias que acercan la ciencia y el espacio a nuevas comunidades.",
        logoAlt: "Logotipo del área de Divulgación Científica de BIOXIS",
        people: [
          {
            id: "willian-valdivia",
            name: "Willian Alberto Valdivia González",
            photoUrl: null,
            profileUrl: null,
            specialty: "Finanzas y divulgación",
            interests: [
              "Física",
              "Análisis de datos",
              "Cosmología",
              "Gestión de proyectos",
              "Filosofía",
              "Política",
            ],
            biography:
              "Soy estudiante de Administración en la UAN. He desarrollado experiencia en el sector financiero en INBURSA como asesor, participado en proyectos de impacto social en InnovaTec y Posible, y actualmente soy enlace del Banco de México.",
            isAreaLeader: true,
          },
          pendingProfileEs("outreach-member-1", "Nombre del integrante"),
        ],
      },
    ],
  },
  en: {
    bioxisLeader: {
      id: "dorely-medina",
      name: "Dorely Medina Leal",
      photoUrl: null,
      profileUrl: null,
      specialty: "",
      interests: [],
      biography:
        "I represented Mexico in the Pacific Alliance volunteer program Youth, Feminism, and Memory in Chile and in NASA’s International Air and Space Program, where I developed a scientific and technological project to generate oxygen in space and completed training in S.C.U.B.A. and space walk training, among other activities. I am also the creator of Inspirar Cultivando Sueños, a program that promotes youth leadership and seeks to combat school dropout, and Ciencia para Todas, created for the International Day of Women and Girls in Science, in addition to other social, scientific, and technological initiatives.",
    },
    areas: [
      {
        id: "medicine",
        name: "Space Medicine",
        summary:
          "Health, biology, and human wellbeing applied to the challenges of space exploration.",
        logoAlt: "BIOXIS Space Medicine area logo",
        people: [
          {
            id: "lenin-rosales",
            name: "Lenin Manuel Rosales Ramirez",
            photoUrl: null,
            profileUrl: null,
            specialty: "Chemical, biological, and pharmaceutical sciences",
            interests: ["Space medicine", "Space pharmacology", "Astrobiology"],
            biography:
              "I hold a degree in Pharmaceutical Chemistry and Biology (QFB), a diploma in Hematology and Blood Banking, and extensive experience handling microorganisms. I participated in international research at the University of Medellín in Colombia focused on the biocontrol of phytopathogenic fungi using antagonistic strains (Trichoderma sp.). I also have practical experience in the public healthcare sector, working in the culture collection at the State Laboratory, where I safely handled pathogenic bacteria and fungi under strict biosafety protocols and carried out quality-control procedures.",
            isAreaLeader: true,
          },
          {
            id: "erandi-ruiz",
            name: "Erandi Daniela Ruiz Coronado",
            photoUrl: null,
            profileUrl: null,
            specialty: "Biology",
            interests: [
              "Astrobiology",
              "Space medicine",
              "Species conservation",
              "Environmental education",
              "Falconry",
              "Animal behavior and training",
            ],
            biography:
              "I am a biology student at UdG. I have worked for three seasons in sea turtle conservation in Puerto Vallarta and Bahía de Banderas. In 2024, I completed a Delfín research summer in Tepic focused on environmental pollution and heavy-metal toxicology in agricultural soils in northern Nayarit. I have also worked for more than a year in avian biological control through falconry, caring for and training Harris’s hawks at hotels in Bahía de Banderas and Puerto Vallarta.",
          },
          {
            id: "isis-avedoy",
            name: "Isis Avedoy Cortez",
            photoUrl: null,
            profileUrl:
              "https://www.linkedin.com/in/isis-avedoy-cortez-861a70103/",
            specialty: "Biomedical Sciences",
            interests: [
              "Aerospace medicine",
              "Genomic medicine",
              "Molecular biology",
              "Biotechnology",
              "Cosmic radiation",
              "DNA repair",
            ],
            biography:
              "I am a Biochemical Engineer specializing in Biotechnology. I participated in a drug biocomparability project involving Enbrel and etanercept, have taught STEM subjects, and hold a Master’s in Education from Tecnológico de Monterrey. I have also trained teachers in emerging technologies for education and hold a Master’s in Biomedical Sciences, where I researched risk associations involving the rs16942 variant in BRCA1 and rs144848 in BRCA2 among women in Nayarit.",
          },
        ],
      },
      {
        id: "engineering",
        name: "Engineering",
        summary:
          "Technology, software, and infrastructure for developing research and exploration solutions.",
        logoAlt: "BIOXIS Engineering area logo",
        people: [
          {
            id: "alan-medina",
            name: "Alan Emir Medina Delgado",
            photoUrl: null,
            profileUrl: "https://devalanmedina.netlify.app/",
            specialty: "Software development, management, and AI",
            interests: [
              "Software development",
              "Artificial intelligence",
              "Data analysis",
              "Research",
              "Predictive artificial intelligence",
              "technology with social and economic impact",
            ],
            biography:
              "I am currently studying Software Development and Management Engineering at the Technological University of Nayarit. I am interested in software development, technology entrepreneurship, and predictive artificial intelligence. I work on projects such as Digitalizando a Nayarit, which promotes the digital transformation of local businesses, and AuraFest, a platform that facilitates event planning. I also aim to build free learning and education platforms that make knowledge accessible to more people. I have received recognition from the Future Leaders in Tourism Summit Nayarit 2026 and Ibero4Jobs for my participation in innovation projects and business challenges.",
            isAreaLeader: true,
          },
          pendingProfileEn("engineering-member-1", "Member name"),
        ],
      },
      {
        id: "outreach",
        name: "Science Communication",
        summary:
          "Communication and experiences that bring science and space to new communities.",
        logoAlt: "BIOXIS Science Communication area logo",
        people: [
          {
            id: "willian-valdivia",
            name: "Willian Alberto Valdivia González",
            photoUrl: null,
            profileUrl: null,
            specialty: "Finance and science communication",
            interests: [
              "Physics",
              "Data analysis",
              "Cosmology",
              "Project management",
              "Philosophy",
              "Politics",
            ],
            biography:
              "I am a Business Administration student at UAN. I have gained experience in the financial sector as an advisor at INBURSA, participated in social-impact projects through InnovaTec and Posible, and currently serve as a liaison for the Bank of Mexico.",
            isAreaLeader: true,
          },
          pendingProfileEn("outreach-member-1", "Member name"),
        ],
      },
    ],
  },
};
