export type PageId = "inicio" | "nosotros" | "productos" | "servicios" | "contacto"

export type ProductCategory =
  | "all"
  | "compression"
  | "tension"
  | "torsion"
  | "wire"
  | "die"
  | "stamped"
  | "agricultural"
  | "welding"
  | "specialty"
  | "hardware"

export interface Product {
  id: number
  name: string
  category: Exclude<ProductCategory, "all">
  categoryLabel: string
  description: string
  image: string
  details: string
  applications: string[]
  fabrication: string
  materials: string
}

export const COMPANY_INFO = {
  name: "ResorTech Industrial S.A. de C.V.",
  shortName: "RESORTECH",
  foundedYear: 1995,
  logo: "/brand-logo.svg",
  whatsappNumber: "5215501000001",
  phones: [
    { display: "+52 (55) 0100-0001", raw: "+525501000001" },
    { display: "+52 (442) 010-0002", raw: "+524420100002" },
    { display: "+52 (442) 010-0003", raw: "+524420100003" },
  ],
  emails: ["ventas@resortech-demo.example", "contacto@resortech-demo.example"],
  location: "Parque Industrial Querétaro, Qro., México",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parque+Industrial+Queretaro+Mexico",
  facebookUrl: "https://www.facebook.com/",
  hours: {
    weekdays: "Lunes a Viernes: 8:00 a 13:00 y de 14:00 a 17:00",
    saturday: "Sábados: 8:00 a 13:00",
    sunday: "Domingos: Cerrado",
  },
} as const

export function buildWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send/?phone=${COMPANY_INFO.whatsappNumber}&text=${encodeURIComponent(
    message,
  )}&type=phone_number&app_absent=0`
}

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "productos", label: "Productos" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
]

export const HERO_SLIDES = [
  { src: "/spring-manufacturing.jpg", alt: "Manufactura de resortes industriales en ResorTech Industrial" },
  { src: "/quality-control.jpg", alt: "Control de calidad en manufactura metalmecánica" },
  { src: "/industrial-facility.jpg", alt: "Instalaciones industriales de ResorTech Industrial" },
  { src: "/industrial-machinery-2.jpg", alt: "Maquinaria industrial de alta precisión" },
  { src: "/precision-equipment.jpg", alt: "Equipo de precisión para fabricación de resortes" },
]

export const PRODUCT_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "all", label: "Todas las categorías" },
  { id: "compression", label: "Resortes de Compresión" },
  { id: "tension", label: "Resortes de Tensión" },
  { id: "torsion", label: "Resortes de Torsión" },
  { id: "wire", label: "Formas de Alambre" },
  { id: "die", label: "Resortes de Troquel" },
  { id: "stamped", label: "Piezas Troqueladas" },
  { id: "agricultural", label: "Accesorios Agrícolas" },
  { id: "welding", label: "Electrosoldadura Decorativa" },
  { id: "specialty", label: "Resortes Especiales" },
  { id: "hardware", label: "Ganchos y Sujetadores" },
]

const STANDARD_SPRING_MATERIALS =
  'Diámetros de material: desde .008" (0.20 mm) hasta 2" (50.8 mm). Aceros al carbón: MBII ASTM A227, Piano ASTM A228, OT ASTM A229, CrSi ASTM A401, Grado Maquinaria. Aceros inoxidables: T-302, T-304, T-310, T-316, 17-7PH. Acabados: Galvanizado electrolítico (sello azul o amarillo), galvanizado mecánico, fosfatado, pavonado, niquelado, pintura en polvo (powder coat), plastisol y electro-pulido.'

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Resortes de Compresión",
    category: "compression",
    categoryLabel: "Compresión",
    description: "Resortes helicoidales diseñados para resistir fuerzas de compresión en uso industrial.",
    image: "/compression-spring-new.jpg",
    details:
      "Los resortes de compresión son elementos mecánicos que almacenan energía cuando se comprimen. Fabricados con materiales de alta calidad como acero al carbono, acero inoxidable y aleaciones especiales. Ideales para aplicaciones automotrices, industriales y de maquinaria pesada.",
    applications: [
      "Suspensión automotriz",
      "Maquinaria industrial",
      "Válvulas y actuadores",
      "Equipos de construcción",
    ],
    fabrication:
      "Fabricados regularmente en forma cilíndrica, aunque también se pueden fabricar cónicos o bicónicos, en alambre redondo, de sección cuadrada o rectangular, con extremos adaptados a las necesidades de ensamble de cada cliente.",
    materials: STANDARD_SPRING_MATERIALS,
  },
  {
    id: 2,
    name: "Resortes de Tensión",
    category: "tension",
    categoryLabel: "Tensión",
    description: "Resortes de extensión que trabajan bajo fuerzas de tracción con ganchos a medida.",
    image: "/tension-spring-new.jpg",
    details:
      "Los resortes de tensión están diseñados para operar con una fuerza de tracción, estirándose cuando se aplica una carga. Cuentan con ganchos o terminales en los extremos para facilitar su instalación y uso en diversas aplicaciones.",
    applications: ["Puertas de garaje", "Trampolines", "Balanzas", "Mecanismos de retorno"],
    fabrication:
      "También conocidos como resortes de extensión, almacenan energía que se libera al estirarse. Sus ganchos o terminales se diseñan según los requerimientos de ensamble de cada aplicación: electrodomésticos, balanzas, puertas industriales, rampas de andén, equipo médico y mantenimiento general.",
    materials: STANDARD_SPRING_MATERIALS,
  },
  {
    id: 3,
    name: "Resortes de Torsión",
    category: "torsion",
    categoryLabel: "Torsión",
    description: "Resortes que proporcionan torque rotacional y fuerza angular de retorno.",
    image: "/torsion-spring-new.jpg",
    details:
      "Los resortes de torsión ejercen una fuerza de torsión o rotacional. Están diseñados para trabajar mediante la aplicación de un torque o fuerza de giro, almacenando energía mecánica cuando se tuercen.",
    applications: ["Bisagras", "Pinzas y abrazaderas", "Mecanismos de precisión", "Válvulas rotatorias"],
    fabrication:
      "Almacenan y liberan energía angular o rotacional, o mantienen presión entre dos superficies mediante torque. Cuando los componentes unidos a sus extremos rotan alrededor del eje, el resorte ejerce fuerza para devolverlos a su posición original.",
    materials: STANDARD_SPRING_MATERIALS,
  },
  {
    id: 4,
    name: "Formas de Alambre",
    category: "wire",
    categoryLabel: "Alambre",
    description: "Componentes de alambre doblado y conformado bajo especificaciones exactas.",
    image: "/wire-forms-new.jpg",
    details:
      "Las formas de alambre son componentes personalizados fabricados mediante el doblado y conformado de alambre de acero. Cada pieza se diseña según las especificaciones exactas del cliente para aplicaciones específicas.",
    applications: ["Clips y sujetadores", "Ganchos especiales", "Soportes personalizados", "Elementos decorativos"],
    fabrication:
      "Se fabrican mediante procesos de doblado, conformado y soldadura de alambre de acero. Cada geometría se desarrolla según los requerimientos técnicos del cliente, permitiendo crear piezas únicas para aplicaciones especializadas.",
    materials: STANDARD_SPRING_MATERIALS,
  },
  {
    id: 5,
    name: "Resortes de Troquel",
    category: "die",
    categoryLabel: "Troquel",
    description: "Resortes de alta resistencia para troqueles, prensas y cargas repetitivas intensas.",
    image: "/die-springs-new.jpg",
    details:
      "Los resortes de troquel son componentes de alta resistencia diseñados específicamente para aplicaciones de troquelado y estampado. Fabricados con aceros especiales para soportar cargas pesadas y ciclos repetitivos.",
    applications: [
      "Troqueles de estampado",
      "Prensas industriales",
      "Moldes de inyección",
      "Maquinaria de conformado",
    ],
    fabrication:
      "Diseñados para soportar cargas extremadamente pesadas y ciclos de trabajo intensivos. Se fabrican con aceros especiales de alta resistencia y se someten a tratamientos térmicos específicos para garantizar máxima vida útil.",
    materials:
      "Aceros especiales de alta resistencia y aleaciones premium con tratamientos térmicos especializados. Acabados industriales resistentes a la corrosión y desgaste, disponibles en distintos grados de carga.",
  },
  {
    id: 6,
    name: "Resortes Cónicos",
    category: "compression",
    categoryLabel: "Compresión",
    description: "Resortes de diámetro variable ideales para espacios compactos sin pandeo lateral.",
    image: "/conical-springs-new.jpg",
    details:
      "Los resortes cónicos ofrecen una solución compacta cuando el espacio es limitado. Su diseño permite una mayor compresión en un espacio reducido, manteniendo las características de fuerza requeridas.",
    applications: [
      "Espacios reducidos",
      "Aplicaciones compactas",
      "Mecanismos miniaturizados",
      "Dispositivos portátiles",
    ],
    fabrication:
      "Se fabrican con un diámetro variable que permite una compresión telescópica más eficiente en espacios limitados, evitando el pandeo lateral y brindando una fuerza uniforme.",
    materials: STANDARD_SPRING_MATERIALS,
  },
  {
    id: 7,
    name: "Piezas Troqueladas",
    category: "stamped",
    categoryLabel: "Troquelado",
    description: "Piezas metálicas estampadas con tolerancias precisas para la industria.",
    image: "/piezas-troqueladas.jpg",
    details:
      "Las piezas troqueladas son componentes metálicos fabricados mediante procesos de estampado y troquelado. Diseñadas para aplicaciones que requieren formas precisas y tolerancias exactas.",
    applications: ["Industria automotriz", "Maquinaria industrial", "Construcción", "Equipos eléctricos"],
    fabrication:
      "Se fabrican mediante procesos de estampado en frío utilizando troqueles de precisión, lo que permite producir geometrías complejas con tolerancias estrictas y excelentes acabados superficiales.",
    materials:
      "Aceros al carbón, aceros inoxidables, aleaciones de aluminio y otros metales según especificación. Acabados disponibles: galvanizado, niquelado, cromado, pintura electrostática y más.",
  },
  {
    id: 8,
    name: "Accesorios Agrícolas",
    category: "agricultural",
    categoryLabel: "Agrícola",
    description: "Componentes metálicos de alta durabilidad para maquinaria e implementos agrícolas.",
    image: "/accesorios-agricolas.jpg",
    details:
      "Accesorios y componentes metálicos diseñados específicamente para equipos y maquinaria agrícola. Fabricados para resistir condiciones ambientales adversas y trabajo intensivo en campo.",
    applications: ["Tractores", "Implementos agrícolas", "Sistemas de riego", "Maquinaria de cosecha"],
    fabrication:
      "Fabricados con materiales resistentes a la corrosión, impacto y desgaste. Cada pieza está diseñada para soportar las condiciones exigentes del trabajo agrícola con una larga vida útil.",
    materials:
      "Aceros especiales resistentes a la corrosión y aleaciones tratadas térmicamente, con acabados protectores contra humedad, fertilizantes y condiciones climáticas adversas.",
  },
  {
    id: 9,
    name: "Electrosoldadura con Acabado Decorativo",
    category: "welding",
    categoryLabel: "Electrosoldadura",
    description: "Uniones metálicas de precisión que combinan resistencia estructural y estética.",
    image: "/electrosoldadura-decorativa.jpg",
    details:
      "Servicios de electrosoldadura especializada con acabados decorativos para aplicaciones arquitectónicas e industriales. Combinamos funcionalidad estructural con una presentación estética superior.",
    applications: ["Arquitectura", "Decoración industrial", "Estructuras ornamentales", "Diseño personalizado"],
    fabrication:
      "Combina técnicas de soldadura de precisión con acabados estéticos cuidadosamente trabajados para entregar uniones estructuralmente sólidas y visualmente limpias.",
    materials:
      "Aceros estructurales, aceros inoxidables decorativos y aleaciones especiales. Acabados: pulido espejo, satinado, texturizado, pinturas especiales y recubrimientos anticorrosivos.",
  },
  {
    id: 10,
    name: "Resortes de Brincolín",
    category: "specialty",
    categoryLabel: "Especiales",
    description: "Resortes de alta elasticidad para trampolines y equipos recreativos de uso rudo.",
    image: "/resorte-brincolin.jpg",
    details:
      "Los resortes de brincolín están diseñados específicamente para trampolines y equipos recreativos. Fabricados con aceros de alta resistencia para soportar impactos repetitivos y cargas dinámicas extremas.",
    applications: ["Trampolines comerciales", "Equipos de gimnasia", "Parques infantiles", "Equipos deportivos"],
    fabrication:
      "Fabricados con aceros especiales de alta resistencia y elasticidad, optimizados para absorber impactos y ofrecer el rebote adecuado mediante tratamientos térmicos especializados.",
    materials:
      "Aceros al carbón de alta resistencia con tratamientos térmicos para fatiga dinámica y acabados galvanizados resistentes a la intemperie.",
  },
  {
    id: 11,
    name: "Resortes de Barra",
    category: "specialty",
    categoryLabel: "Especiales",
    description: "Resortes conformados en barras de acero sólido para cargas industriales extremas.",
    image: "/resorte-barra.jpg",
    details:
      "Los resortes de barra están fabricados con barras de acero sólido para aplicaciones que requieren fuerzas extremadamente altas y durabilidad excepcional en condiciones industriales severas.",
    applications: ["Maquinaria pesada", "Equipos mineros", "Prensas industriales", "Sistemas hidráulicos"],
    fabrication:
      "Fabricados a partir de barras de acero sólido mediante procesos de conformado en caliente, diseñados para soportar cargas extremas y operación severa en industria pesada.",
    materials:
      "Barras de acero al carbón y aleaciones especiales con tratamientos térmicos para máxima resistencia y acabados industriales anticorrosivos.",
  },
  {
    id: 12,
    name: "Ganchos y Sujetadores",
    category: "hardware",
    categoryLabel: "Sujetadores",
    description: "Ganchos metálicos y sujetadores a medida para fijación segura y confiable.",
    image: "/ganchos-sujetadores.jpg",
    details:
      "Ganchos y sujetadores metálicos fabricados según especificaciones del cliente. Diseñados para proporcionar sujeción segura y confiable en aplicaciones industriales y comerciales.",
    applications: ["Sistemas de suspensión", "Equipos de carga", "Aplicaciones marinas", "Construcción"],
    fabrication:
      "Fabricados mediante procesos de conformado, forjado y mecanizado de precisión. Cada pieza se diseña según los requerimientos de carga y ensamble de cada cliente.",
    materials:
      "Aceros al carbón, aceros inoxidables y aleaciones especiales según aplicación, con acabados galvanizados, niquelados o recubrimientos especiales.",
  },
]

export const CERTIFICATIONS = [
  { code: "ISO 9001:2015", title: "Gestión de Calidad", description: "Procesos estandarizados orientados a la mejora continua." },
  { code: "ISO 14001", title: "Gestión Ambiental", description: "Compromiso con una manufactura responsable." },
  { code: "IATF 16949", title: "Estándar Automotriz", description: "Exigencia y trazabilidad para la industria automotriz." },
  { code: "30+ Años", title: "Trayectoria desde 1995", description: "Experiencia comprobada en manufactura metalmecánica." },
]

export const SERVICES = [
  {
    title: "Servicios de Fabricación",
    description: "Manufactura integral desde prototipos hasta grandes volúmenes de producción.",
    items: [
      "Diseño y desarrollo de resortes personalizados",
      "Manufactura de alta precisión bajo plano o muestra",
      "Tratamientos térmicos especializados",
      "Control de calidad riguroso en cada lote",
      "Producción en serie y lotes pequeños",
    ],
  },
  {
    title: "Asesoría Técnica",
    description: "Acompañamiento de ingeniería para optimizar el desempeño de tus componentes.",
    items: [
      "Consultoría en diseño y cálculo de resortes",
      "Análisis de aplicaciones y cargas específicas",
      "Optimización de rendimiento y vida útil",
      "Selección de materiales y acabados superficiales",
      "Soporte técnico continuo",
    ],
  },
  {
    title: "Servicio al Cliente",
    description: "Atención ágil y comunicación directa en cada etapa de tu pedido.",
    items: [
      "Atención personalizada y seguimiento cercano",
      "Cotizaciones rápidas y transparentes",
      "Seguimiento puntual de pedidos",
      "Compromiso de entrega en tiempo y forma",
      "Soporte post-venta especializado",
    ],
  },
  {
    title: "Garantías y Calidad",
    description: "Respaldo documental y técnico que asegura la confiabilidad de cada pieza.",
    items: [
      "Garantía de calidad en todos nuestros productos",
      "Certificados de conformidad y especificaciones",
      "Trazabilidad completa de materiales",
      "Respuesta ágil ante reposiciones",
      "Mejora continua en procesos metalmecánicos",
    ],
  },
]
