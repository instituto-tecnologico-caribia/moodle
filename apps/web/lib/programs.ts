export interface Mentor {
  name: string
  role: string
  company: string
  image: string
}

export interface Module {
  title: string
  weeks: string
  topics: string[]
}

export interface Program {
  slug: string
  title: string
  tag: string
  tagColor: string
  duration: string
  description: string
  image: string
  fullDescription: string
  highlights: string[]
  curriculum: Module[]
  mentors: Mentor[]
  tuition: string
  nextCohort: string
  applicationDeadline: string
  certification: string
}

export const programs: Program[] = [
  {
    "slug": "english-immersive",
    "title": "English Immersive",
    "tag": "Open",
    "tagColor": "bg-rose-500",
    "duration": "1 Año",
    "description": "Desarrolla habilidades reales de comunicación en inglés a través de práctica inmersiva, instrucción guiada y constante interacción.",
    "image": "/images/program-english.jpg",
    "fullDescription": "Nuestro programa English Immersive está diseñado para estudiantes internacionales que desean alcanzar fluidez en inglés mientras se preparan para el éxito académico y profesional. A través de práctica diaria de conversación, talleres de escritura y actividades de inmersión cultural, desarrollarás la confianza y las habilidades necesarias para comunicarte efectivamente en cualquier entorno de habla inglesa.",
    "highlights": [
      "Práctica diaria de conversación en vivo con hablantes nativos",
      "Retroalimentación personalizada en pronunciación y gramática",
      "Módulos de inglés para negocios y escritura académica",
      "Talleres y eventos de integración cultural",
      "Preparación para TOEFL/IELTS incluida",
      "Acceso a nuestros programas de tecnología al completar el curso"
    ],
    "curriculum": [
      {
        "title": "Inglés Fundamental",
        "weeks": "Semanas 1-12",
        "topics": ["Fundamentos de gramática", "Ampliación de vocabulario", "Conceptos básicos de pronunciación", "Comprensión auditiva"]
      },
      {
        "title": "Fluidez Conversacional",
        "weeks": "Semanas 13-24",
        "topics": ["Práctica diaria de conversación", "Expresiones idiomáticas", "Bases de oratoria", "Discusión en grupo"]
      },
      {
        "title": "Inglés Académico",
        "weeks": "Semanas 25-36",
        "topics": ["Escritura académica", "Habilidades de investigación", "Técnicas de presentación", "Pensamiento crítico en inglés"]
      },
      {
        "title": "Inglés Profesional",
        "weeks": "Semanas 37-48",
        "topics": ["Comunicación empresarial", "Preparación para entrevistas", "Habilidades de networking", "Escritura profesional"]
      }
    ],
    "mentors": [
      { "name": "Sarah Mitchell", "role": "Instructora Principal de Idiomas", "company": "Cambridge CELTA", "image": "/images/mentor-1.jpg" },
      { "name": "James Rodriguez", "role": "Coach de Escritura Académica", "company": "Oxford University", "image": "/images/mentor-2.jpg" }
    ],
    "tuition": "$100.00",
    "nextCohort": "15 de marzo, 2026",
    "applicationDeadline": "28 de febrero, 2026",
    "certification": "Certificado de Inglés por Imersión"
  }
  ,
  {
    slug: "software-engineering",
    title: "Software Engineering",
    tag: "DPL Now",
    tagColor: "bg-blue-600",
    duration: "1.5 Years",
    description: "Learn to design and build scalable software using real-world architecture patterns, modern technologies, and industry best practices.",
    image: "/images/program-software.jpg",
    fullDescription: "Our Software Engineering program transforms aspiring developers into industry-ready engineers. You'll master full-stack development, system design, and software architecture through hands-on projects and real-world collaborations. Our curriculum is continuously updated with input from engineering leaders at top tech companies.",
    highlights: [
      "Full-stack development with React, Node.js, and cloud technologies",
      "System design and architecture fundamentals",
      "Agile methodologies and team collaboration",
      "Real-world capstone project with industry partners",
      "1-on-1 mentorship with senior engineers",
      "Interview preparation and career coaching"
    ],
    curriculum: [
      {
        title: "Programming Fundamentals",
        weeks: "Weeks 1-12",
        topics: ["JavaScript/TypeScript mastery", "Data structures & algorithms", "Git & version control", "Testing fundamentals"]
      },
      {
        title: "Frontend Development",
        weeks: "Weeks 13-24",
        topics: ["React & Next.js", "State management", "Responsive design", "Performance optimization"]
      },
      {
        title: "Backend & Databases",
        weeks: "Weeks 25-40",
        topics: ["Node.js & Express", "SQL & NoSQL databases", "API design & GraphQL", "Authentication & security"]
      },
      {
        title: "System Design & DevOps",
        weeks: "Weeks 41-56",
        topics: ["Cloud infrastructure (AWS/GCP)", "CI/CD pipelines", "Microservices architecture", "Scalability patterns"]
      },
      {
        title: "Capstone Project",
        weeks: "Weeks 57-72",
        topics: ["Industry partner project", "Agile team collaboration", "Code reviews", "Production deployment"]
      }
    ],
    mentors: [
      { name: "Michael Chen", role: "Principal Engineer", company: "Google", image: "/images/mentor-1.jpg" },
      { name: "Emily Park", role: "Engineering Manager", company: "Meta", image: "/images/mentor-2.jpg" },
      { name: "David Okonkwo", role: "Staff Engineer", company: "Stripe", image: "/images/mentor-3.jpg" }
    ],
    tuition: "$18,500",
    nextCohort: "April 1, 2026",
    applicationDeadline: "March 15, 2026",
    certification: "Nexus Software Engineering Diploma"
  },
  {
    slug: "artificial-intelligence-data-science",
    title: "Artificial Intelligence & Data Science",
    tag: "BSc Now",
    tagColor: "bg-emerald-600",
    duration: "1.5 Years",
    description: "Learn to build neural networks and manage Big Data ecosystems from scratch with hands-on projects.",
    image: "/images/program-data.jpg",
    fullDescription: "Dive deep into the world of artificial intelligence and data science with our comprehensive program. From machine learning fundamentals to advanced deep learning architectures, you'll gain the skills to solve complex problems and drive innovation. Work on real datasets from industry partners and build a portfolio that showcases your expertise.",
    highlights: [
      "Python, TensorFlow, and PyTorch mastery",
      "Machine learning and deep learning fundamentals",
      "Big data processing with Spark and Hadoop",
      "Natural language processing and computer vision",
      "Ethics in AI and responsible development",
      "Industry capstone with real-world data"
    ],
    curriculum: [
      {
        title: "Data Foundations",
        weeks: "Weeks 1-12",
        topics: ["Python for data science", "Statistics & probability", "Data visualization", "SQL & data wrangling"]
      },
      {
        title: "Machine Learning",
        weeks: "Weeks 13-28",
        topics: ["Supervised learning", "Unsupervised learning", "Model evaluation", "Feature engineering"]
      },
      {
        title: "Deep Learning",
        weeks: "Weeks 29-44",
        topics: ["Neural network architectures", "CNNs for computer vision", "RNNs & transformers", "Generative AI models"]
      },
      {
        title: "Big Data & MLOps",
        weeks: "Weeks 45-60",
        topics: ["Distributed computing", "Data pipelines", "Model deployment", "Monitoring & optimization"]
      },
      {
        title: "Capstone & Specialization",
        weeks: "Weeks 61-72",
        topics: ["Industry project", "Research paper", "Portfolio development", "Career preparation"]
      }
    ],
    mentors: [
      { name: "Dr. Aisha Patel", role: "Research Scientist", company: "DeepMind", image: "/images/mentor-2.jpg" },
      { name: "Robert Kim", role: "ML Engineering Lead", company: "OpenAI", image: "/images/mentor-1.jpg" },
      { name: "Lisa Thompson", role: "Data Science Director", company: "Netflix", image: "/images/mentor-3.jpg" }
    ],
    tuition: "$22,500",
    nextCohort: "April 1, 2026",
    applicationDeadline: "March 15, 2026",
    certification: "BSc in Artificial Intelligence & Data Science"
  }
]

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find(p => p.slug === slug)
}

export function getAllProgramSlugs(): string[] {
  return programs.map(p => p.slug)
}
