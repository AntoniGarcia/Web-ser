# ResorTech Industrial — Sitio Web Corporativo (Demo)

Aplicación web responsiva para una empresa ficticia de manufactura de resortes industriales y componentes metalmecánicos (**ResorTech Industrial S.A. de C.V.**).

> **Nota:** La marca, el logotipo, los teléfonos, correos y direcciones utilizados en este repositorio son completamente ficticios y se emplean únicamente con fines de demostración y portafolio.

## Características

- **Inicio**: Carrusel industrial de alto contraste, franja de métricas clave, propuesta de valor y carrusel interactivo de productos destacados.
- **Nosotros**: Historia corporativa, Visión, Misión, Política de Calidad, certificaciones (`ISO 9001:2015`, `ISO 14001`, `IATF 16949`) y ubicación.
- **Catálogo de Productos**: Buscador en tiempo real, filtro por 10 categorías, tarjetas responsivas y modal detallado con especificaciones de fabricación, materiales, acabados y aplicaciones.
- **Servicios**: Detalle de fabricación personalizada, asesoría técnica, atención al cliente y garantías de calidad.
- **Contacto**: Canales de contacto interactivos y formulario con validación en cliente y opción de envío directo por WhatsApp.

## Tecnologías

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) / componentes `shadcn/ui`
- [Lucide React](https://lucide.dev/)

## Estructura del Proyecto

```text
.
├── app/
│   ├── globals.css       # Estilos globales y tokens de color
│   ├── layout.tsx        # Layout raíz, fuente Montserrat y metadatos SEO
│   ├── loading.tsx       # Estado de carga
│   └── page.tsx          # Aplicación principal y vistas del sitio
├── components/
│   └── ui/               # Componentes de interfaz reutilizables
├── lib/
│   ├── data.ts           # Catálogo tipado de productos, servicios y datos demo
│   └── utils.ts          # Utilidades de clases CSS
├── public/
│   ├── brand-logo.svg    # Logotipo SVG personalizado
│   └── *.jpg             # Imágenes de productos e instalaciones
├── next.config.mjs
├── package.json
└── tsconfig.json
```

## Instalación y Desarrollo Local

### Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [pnpm](https://pnpm.io/) (recomendado)

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/AntoniGarcia/G-Spring.git
   cd G-Spring
   ```

2. Instalar dependencias:
   ```bash
   pnpm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo local |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm start` | Ejecuta la aplicación compilada en producción |
| `pnpm lint` | Ejecuta el linter de Next.js |
