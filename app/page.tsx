"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Search,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Award,
  Users,
  Target,
  Eye,
  MessageCircle,
  Facebook,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Wrench,
  Compass,
  Headphones,
  ArrowRight,
  Send,
  RotateCcw,
} from "lucide-react"
import {
  COMPANY_INFO,
  NAV_ITEMS,
  HERO_SLIDES,
  PRODUCT_CATEGORIES,
  PRODUCTS,
  CERTIFICATIONS,
  SERVICES,
  buildWhatsAppUrl,
  type PageId,
  type Product,
  type ProductCategory,
} from "@/lib/data"

const SERVICE_ICONS = [Wrench, Compass, Headphones, ShieldCheck]

interface ContactFormState {
  name: string
  company: string
  email: string
  phone: string
  inquiryType: string
  message: string
}

const INITIAL_CONTACT_FORM: ContactFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  inquiryType: "Cotización de productos",
  message: "",
}

export default function ResorTechWebsite() {
  const [currentPage, setCurrentPage] = useState<PageId>("inicio")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentProductSlide, setCurrentProductSlide] = useState(0)

  const [contactForm, setContactForm] = useState<ContactFormState>(INITIAL_CONTACT_FORM)
  const [contactError, setContactError] = useState<string | null>(null)
  const [contactSubmitted, setContactSubmitted] = useState(false)

  const totalProductSlides = Math.ceil(PRODUCTS.length / 4)
  const generalWhatsAppUrl = buildWhatsAppUrl("Hola, me interesa cotizar productos de ResorTech Industrial.")

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query)
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  useEffect(() => {
    if (currentPage !== "inicio") return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [currentPage])

  useEffect(() => {
    if (currentPage !== "inicio") return
    const timer = setInterval(() => {
      setCurrentProductSlide((prev) => (prev + 1) % totalProductSlides)
    }, 5000)
    return () => clearInterval(timer)
  }, [currentPage, totalProductSlides])

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const navigateTo = (page: PageId, category?: ProductCategory) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    if (category) {
      setSelectedCategory(category)
      setSearchQuery("")
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)

  const nextProductSlide = () => setCurrentProductSlide((prev) => (prev + 1) % totalProductSlides)
  const prevProductSlide = () =>
    setCurrentProductSlide((prev) => (prev - 1 + totalProductSlides) % totalProductSlides)

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactError("Por favor completa tu nombre, correo electrónico y mensaje.")
      return
    }
    setContactError(null)
    setContactSubmitted(true)
  }

  const sendContactViaWhatsApp = () => {
    const lines = [
      "Hola ResorTech Industrial, envío una consulta desde su sitio web:",
      `Nombre: ${contactForm.name || "No especificado"}`,
      contactForm.company ? `Empresa: ${contactForm.company}` : null,
      contactForm.email ? `Email: ${contactForm.email}` : null,
      contactForm.phone ? `Teléfono: ${contactForm.phone}` : null,
      `Tipo de consulta: ${contactForm.inquiryType}`,
      `Mensaje: ${contactForm.message}`,
    ].filter(Boolean)
    openExternal(buildWhatsAppUrl(lines.join("\n")))
  }

  const renderPageHeader = (eyebrow: string, title: string, subtitle: string) => (
    <section className="relative bg-gradient-to-r from-[#001a3a] via-[#002b5c] to-[#003d82] text-white py-14 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,#f5b800,transparent_55%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#f5b800] mb-3">
          {eyebrow}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">{title}</h1>
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
      </div>
    </section>
  )

  const renderNavigation = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="h-1 bg-gradient-to-r from-[#001a3a] via-[#003d82] to-[#f5b800]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          <button
            type="button"
            onClick={() => navigateTo("inicio")}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Ir al inicio de ResorTech Industrial"
          >
            <img
              src={COMPANY_INFO.logo}
              alt="Logotipo de ResorTech Industrial"
              className="h-11 w-11 rounded-md object-contain bg-white p-0.5 ring-1 ring-slate-200 transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <div className="text-lg sm:text-xl font-extrabold tracking-tight text-[#003d82]">
                {COMPANY_INFO.shortName}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Industrial · Desde {COMPANY_INFO.foundedYear}
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "text-[#003d82] bg-[#003d82]/8"
                      : "text-slate-700 hover:text-[#003d82] hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#003d82] rounded-full" />
                  )}
                </button>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center">
            <Button
              type="button"
              onClick={() => openExternal(generalWhatsAppUrl)}
              className="bg-[#128C7E] hover:bg-[#0e7266] text-white h-10 px-5 font-semibold shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Cotizar
            </Button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:text-[#003d82] hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 pt-3 pb-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                    isActive
                      ? "text-[#003d82] bg-[#003d82]/10"
                      : "text-slate-700 hover:text-[#003d82] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
            <div className="pt-2">
              <Button
                type="button"
                onClick={() => openExternal(generalWhatsAppUrl)}
                className="w-full h-11 bg-[#128C7E] hover:bg-[#0e7266] text-white font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )

  const renderInicio = () => (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden bg-[#001a3a]">
        <div className="absolute inset-0">
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide, index) => (
              <div key={slide.src} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#001530]/95 via-[#00234d]/82 to-[#001530]/55" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#f5b800] mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Empresa Mexicana Fundada en {COMPANY_INFO.foundedYear} · ISO 9001:2015</span>
            </div>

            <h1 className="animate-fade-in-up animation-delay-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              <span className="text-[#f5b800]">ResorTech</span> Industrial
            </h1>

            <p className="animate-fade-in-up animation-delay-200 text-lg sm:text-xl text-slate-100 leading-relaxed mb-4">
              Fabricantes de resortes industriales, formas de alambre, accesorios agrícolas y piezas troqueladas con
              acabados en galvanizado, niquelado, tropicalizado, cromo y pintura electrostática.
            </p>

            <p className="animate-fade-in-up animation-delay-300 text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Especialistas en resortes de compresión, tensión, torsión, troquel, formas de alambre, resorte de
              brincolín y de barra bajo especificaciones exactas.
            </p>

            <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-3.5">
              <Button
                type="button"
                onClick={() => navigateTo("productos")}
                className="h-12 px-7 bg-[#f5b800] hover:bg-[#e0a800] text-[#001a3a] text-base font-bold shadow-lg cursor-pointer"
              >
                Explorar Productos
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                onClick={() => openExternal(generalWhatsAppUrl)}
                className="h-12 px-7 bg-[#128C7E] hover:bg-[#0e7266] text-white text-base font-bold shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Cotizar Ahora
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Carousel Controls (z-30 above content overlay) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Imagen anterior"
          className="hidden sm:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/25 backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Imagen siguiente"
          className="hidden sm:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 text-white border border-white/25 backdrop-blur-sm transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Ver imagen ${index + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === index ? "w-8 bg-[#f5b800]" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Key Metrics Bar */}
      <section className="bg-[#003d82] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f5b800]">+30 Años</div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1">Experiencia desde {COMPANY_INFO.foundedYear}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f5b800]">12 Líneas</div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1">Soluciones metalmecánicas</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f5b800]">0.20 – 50.8 mm</div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1">Rango de diámetro de alambre</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#f5b800]">ISO 9001</div>
              <div className="text-xs sm:text-sm text-slate-200 mt-1">Calidad y trazabilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#003d82]">
              Propuesta de Valor
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
              ¿Por qué elegir ResorTech Industrial?
            </h2>
            <p className="text-slate-600">
              Combinamos experiencia metalmecánica, maquinaria especializada y atención directa para cada industria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                icon: Award,
                title: "Calidad Garantizada",
                text: "Más de 30 años de experiencia fabricando resortes y componentes bajo estrictos estándares de calidad.",
              },
              {
                icon: Target,
                title: "Precisión Industrial",
                text: "Tecnología de conformado y tratamientos térmicos especializados para tolerancias exactas.",
              },
              {
                icon: Users,
                title: "Servicio Personalizado",
                text: "Asesoría técnica directa y fabricación a la medida según los requerimientos de tu proyecto.",
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  className="bg-white border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 py-0"
                >
                  <CardContent className="p-7 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-[#003d82]/10 text-[#003d82] flex items-center justify-center mb-5 ring-1 ring-[#003d82]/15">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2.5">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{item.text}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#003d82]">Catálogo</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Nuestros Productos</h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevProductSlide}
                  aria-label="Productos anteriores"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 text-slate-700 hover:bg-[#003d82] hover:text-white hover:border-[#003d82] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextProductSlide}
                  aria-label="Productos siguientes"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-300 text-slate-700 hover:bg-[#003d82] hover:text-white hover:border-[#003d82] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigateTo("productos")}
                className="border-[#003d82] text-[#003d82] hover:bg-[#003d82] hover:text-white font-semibold cursor-pointer"
              >
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentProductSlide * 100}%)` }}
            >
              {Array.from({ length: totalProductSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCTS.slice(slideIndex * 4, (slideIndex + 1) * 4).map((product) => (
                      <Card
                        key={product.id}
                        className="group overflow-hidden border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 py-0 flex flex-col h-full"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <Badge className="absolute top-3 left-3 bg-[#001a3a]/85 text-white border-0 backdrop-blur-xs">
                            {product.categoryLabel}
                          </Badge>
                        </div>
                        <CardContent className="p-5 flex flex-col flex-1">
                          <h3 className="font-bold text-slate-900 text-lg mb-2 leading-snug">{product.name}</h3>
                          <p className="text-sm text-slate-600 mb-5 line-clamp-2 flex-1">{product.description}</p>
                          <Button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className="w-full h-10 bg-[#003d82] hover:bg-[#002756] text-white font-semibold mt-auto cursor-pointer"
                          >
                            Ver Detalles
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Slide Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalProductSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentProductSlide(index)}
                aria-label={`Ver grupo de productos ${index + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentProductSlide === index ? "w-8 bg-[#003d82]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#001a3a] via-[#003d82] to-[#004a99] text-white p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                ¿Necesitas fabricar resortes a la medida de tu operación?
              </h2>
              <p className="text-slate-200 text-base sm:text-lg">
                Envíanos tus planos, muestra o especificaciones técnicas y recibe una cotización rápida y precisa.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <Button
                type="button"
                onClick={() => openExternal(generalWhatsAppUrl)}
                className="h-12 px-6 bg-[#128C7E] hover:bg-[#0e7266] text-white font-bold cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Cotizar por WhatsApp
              </Button>
              <Button
                type="button"
                onClick={() => navigateTo("contacto")}
                className="h-12 px-6 bg-white text-[#003d82] hover:bg-slate-100 font-bold cursor-pointer"
              >
                Ir a Contacto
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderNosotros = () => (
    <div className="bg-white">
      {renderPageHeader(
        "Quiénes Somos",
        "Nosotros",
        "Más de tres décadas fabricando resortes industriales y soluciones metalmecánicas de alta precisión en México.",
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Historia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#003d82]">Nuestra Historia</span>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Trayectoria sólida e innovación continua desde {COMPANY_INFO.foundedYear}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              ResorTech Industrial S.A. de C.V. nació en {COMPANY_INFO.foundedYear} con el compromiso de fortalecer la
              industria metalmecánica en México mediante la manufactura de resortes industriales confiables y precisos.
              Con más de 30 años de experiencia, nos hemos consolidado como un aliado estratégico para diversos sectores
              productivos.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Nuestra dedicación a la excelencia técnica, la mejora continua y el servicio personalizado nos ha
              permitido construir relaciones duraderas con clientes en la industria automotriz, agrícola, manufacturera
              y de construcción.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="/industrial-facility.jpg"
              alt="Planta industrial de ResorTech Industrial"
              className="w-full h-80 object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-[#001a3a]/90 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl border border-white/15">
              <div className="text-xs uppercase tracking-wider text-[#f5b800] font-bold">Fundada en</div>
              <div className="text-2xl font-extrabold leading-none mt-0.5">{COMPANY_INFO.foundedYear}</div>
            </div>
          </div>
        </div>

        {/* Visión, Misión, Política de Calidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <Card className="border-t-4 border-t-[#003d82] border-slate-200 shadow-xs py-0">
            <CardContent className="p-7 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#003d82]/10 text-[#003d82] flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Visión</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Mantener en constante mejora e innovación la línea de productos, aumentando nuestra participación en el
                mercado.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#f5b800] border-slate-200 shadow-xs py-0">
            <CardContent className="p-7 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#f5b800]/15 text-[#b38600] flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Misión</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Consolidar un equipo de trabajo que propicie el desarrollo humano y tenga por cultura la mejora
                continua en nuestros procesos de fabricación para ofrecer productos metalmecánicos de calidad que
                satisfagan las exigencias de nuestros clientes.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-[#003d82] border-slate-200 shadow-xs py-0">
            <CardContent className="p-7 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-[#003d82]/10 text-[#003d82] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Política de Calidad</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                En ResorTech Industrial fabricamos y comercializamos componentes metalmecánicos bajo los más altos
                estándares de precisión, impulsando la gestión de riesgos, la comunicación eficiente y la mejora
                continua para garantizar la satisfacción de cada cliente.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Certificaciones */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#003d82]">Respaldo Industrial</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Certificaciones y Reconocimientos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.code}
                className="bg-white rounded-xl border border-slate-200/80 p-5 text-center shadow-2xs"
              >
                <Badge className="bg-[#003d82] text-white px-3 py-1 text-xs font-bold mb-3">{cert.code}</Badge>
                <h3 className="font-bold text-slate-900 mb-1.5">{cert.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contacto y Ubicación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <Card className="border-slate-200 shadow-xs py-0">
            <CardContent className="p-7">
              <h3 className="text-xl font-bold text-[#003d82] mb-5 flex items-center gap-2.5">
                <Phone className="w-5 h-5" />
                Teléfonos y Horarios
              </h3>
              <div className="space-y-4 text-slate-600">
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-2">Teléfonos directos:</p>
                  <div className="flex flex-col gap-1.5">
                    {COMPANY_INFO.phones.map((phone) => (
                      <a
                        key={phone.raw}
                        href={`tel:${phone.raw}`}
                        className="text-[#003d82] hover:underline font-medium w-fit"
                      >
                        {phone.display}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-sm font-semibold text-slate-900 mb-1.5 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#003d82]" />
                    Horarios de Atención:
                  </p>
                  <p className="text-sm">{COMPANY_INFO.hours.weekdays}</p>
                  <p className="text-sm">{COMPANY_INFO.hours.saturday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-xs py-0">
            <CardContent className="p-7 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold text-[#003d82] mb-4 flex items-center gap-2.5">
                  <MapPin className="w-5 h-5" />
                  Ubicación
                </h3>
                <p className="text-slate-700 font-medium mb-2">{COMPANY_INFO.location}</p>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Atendemos pedidos y envíos a toda la República Mexicana con soporte técnico directo desde nuestra
                  planta.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => openExternal(COMPANY_INFO.mapsUrl)}
                className="w-fit h-10 px-5 bg-[#003d82] hover:bg-[#002756] text-white font-semibold cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                Ver en Google Maps
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderProductos = () => {
    const hasActiveFilters = searchQuery.trim() !== "" || selectedCategory !== "all"

    return (
      <div className="bg-slate-50/60 min-h-screen">
        {renderPageHeader(
          "Catálogo Industrial",
          "Nuestros Productos",
          "Resortes, formas de alambre, troquelados y accesorios fabricados con materiales certificados y acabados industriales.",
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search & Category Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs mb-10">
            <div className="flex flex-col md:flex-row gap-3.5">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, tipo o aplicación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-11 border-slate-300 focus-visible:border-[#003d82]"
                  aria-label="Buscar productos"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory)}
                aria-label="Filtrar por categoría"
                className="h-11 px-4 border border-slate-300 rounded-md bg-white text-slate-800 text-sm font-medium focus:border-[#003d82] focus:outline-none focus:ring-2 focus:ring-[#003d82]/20"
              >
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="h-11 px-4 border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Limpiar
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-slate-500">
              <span>
                Mostrando <strong className="text-slate-900">{filteredProducts.length}</strong> de{" "}
                <strong className="text-slate-900">{PRODUCTS.length}</strong> productos
              </span>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="bg-[#003d82]/10 text-[#003d82]">
                  {PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory)?.label}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group bg-white overflow-hidden border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 py-0 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#001a3a]/85 text-white border-0 backdrop-blur-xs">
                      {product.categoryLabel}
                    </Badge>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">{product.description}</p>
                    <Button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="w-full h-10 bg-[#003d82] hover:bg-[#002756] text-white font-semibold mt-auto cursor-pointer"
                    >
                      Ver Detalles y Especificaciones
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-800 font-semibold text-lg">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
              <p className="text-slate-500 text-sm mt-1 mb-5">
                Prueba con otro término o restablece los filtros para ver todo el catálogo.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="bg-[#003d82] hover:bg-[#002756] text-white cursor-pointer"
              >
                Ver todos los productos
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderServicios = () => (
    <div className="bg-white">
      {renderPageHeader(
        "Soluciones Integrales",
        "Servicios",
        "Acompañamiento técnico y manufactura especializada desde el diseño hasta la entrega en planta.",
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length]
            return (
              <Card
                key={service.title}
                className="border-slate-200 shadow-xs hover:shadow-md transition-shadow py-0"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#003d82]/10 text-[#003d82] flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
                      <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-slate-700 text-sm sm:text-base">
                        <CheckCircle2 className="w-5 h-5 text-[#003d82] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#001a3a] via-[#003d82] to-[#004a99] text-white p-8 sm:p-12 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">¿Necesitas una Cotización?</h2>
          <p className="text-slate-200 text-base sm:text-lg max-w-xl mx-auto mb-7">
            Nuestro equipo técnico está listo para asesorarte y cotizar tus piezas con tiempos de respuesta ágiles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3.5">
            <Button
              type="button"
              onClick={() => openExternal(generalWhatsAppUrl)}
              className="h-12 px-7 bg-[#128C7E] hover:bg-[#0e7266] text-white text-base font-bold cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar Cotización por WhatsApp
            </Button>
            <Button
              type="button"
              onClick={() => navigateTo("contacto")}
              className="h-12 px-7 bg-white text-[#003d82] hover:bg-slate-100 text-base font-bold cursor-pointer"
            >
              Enviar Formulario
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContacto = () => (
    <div className="bg-slate-50/60 min-h-screen">
      {renderPageHeader(
        "Atención Directa",
        "Contacto",
        "Comunícate con nuestro equipo de ventas e ingeniería para cotizaciones, asesoría técnica o seguimiento de pedidos.",
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-slate-200 shadow-xs py-0 bg-white">
              <CardContent className="p-7 space-y-6">
                <h2 className="text-2xl font-bold text-[#003d82]">Información de Contacto</h2>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#003d82]/10 text-[#003d82] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Teléfonos</h3>
                    <div className="flex flex-col gap-1">
                      {COMPANY_INFO.phones.map((phone) => (
                        <a
                          key={phone.raw}
                          href={`tel:${phone.raw}`}
                          className="text-slate-600 hover:text-[#003d82] hover:underline text-sm sm:text-base"
                        >
                          {phone.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#003d82]/10 text-[#003d82] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Correo Electrónico</h3>
                    <div className="flex flex-col gap-1">
                      {COMPANY_INFO.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="text-slate-600 hover:text-[#003d82] hover:underline text-sm sm:text-base"
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#003d82]/10 text-[#003d82] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Ubicación</h3>
                    <p className="text-slate-600 text-sm sm:text-base mb-2">{COMPANY_INFO.location}</p>
                    <button
                      type="button"
                      onClick={() => openExternal(COMPANY_INFO.mapsUrl)}
                      className="text-sm font-semibold text-[#003d82] hover:underline cursor-pointer"
                    >
                      Abrir en Google Maps →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-xs py-0 bg-white">
              <CardContent className="p-7">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#003d82]" />
                  Horarios de Atención
                </h3>
                <div className="space-y-1.5 text-sm text-slate-600">
                  <p>{COMPANY_INFO.hours.weekdays}</p>
                  <p>{COMPANY_INFO.hours.saturday}</p>
                  <p>{COMPANY_INFO.hours.sunday}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Canales Directos</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => openExternal(COMPANY_INFO.facebookUrl)}
                      className="bg-[#1877F2] hover:bg-[#166FE5] text-white h-10 px-4 cursor-pointer"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button
                      type="button"
                      onClick={() => openExternal(generalWhatsAppUrl)}
                      className="bg-[#128C7E] hover:bg-[#0e7266] text-white h-10 px-4 font-semibold cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Column */}
          <Card className="lg:col-span-7 border-slate-200 shadow-xs py-0 bg-white">
            <CardContent className="p-7 sm:p-9">
              <h2 className="text-2xl font-bold text-[#003d82] mb-2">Formulario de Contacto</h2>
              <p className="text-sm text-slate-600 mb-6">
                Compártenos los detalles de tu requerimiento y te responderemos a la brevedad.
              </p>

              {contactSubmitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">¡Mensaje listo para enviarse!</h3>
                    <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                      Gracias, <strong>{contactForm.name}</strong>. Para una atención inmediata, puedes enviar esta
                      misma solicitud directo a nuestro WhatsApp de ventas.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <Button
                      type="button"
                      onClick={sendContactViaWhatsApp}
                      className="h-11 px-6 bg-[#128C7E] hover:bg-[#0e7266] text-white font-semibold cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Enviar por WhatsApp ahora
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setContactForm(INITIAL_CONTACT_FORM)
                        setContactSubmitted(false)
                      }}
                      className="h-11 px-5 cursor-pointer"
                    >
                      Enviar otra consulta
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5" noValidate>
                  {contactError && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-medium">
                      {contactError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-800 mb-1.5">
                        Nombre <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="contact-name"
                        required
                        placeholder="Tu nombre completo"
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="h-11 border-slate-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-company" className="block text-sm font-semibold text-slate-800 mb-1.5">
                        Empresa
                      </label>
                      <Input
                        id="contact-company"
                        placeholder="Nombre de tu empresa"
                        value={contactForm.company}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, company: e.target.value }))}
                        className="h-11 border-slate-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-800 mb-1.5">
                        Correo Electrónico <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="tu@empresa.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="h-11 border-slate-300"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-800 mb-1.5">
                        Teléfono
                      </label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder="(55) 1234-5678"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="h-11 border-slate-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Tipo de Consulta
                    </label>
                    <select
                      id="contact-type"
                      value={contactForm.inquiryType}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, inquiryType: e.target.value }))}
                      className="w-full h-11 px-3.5 border border-slate-300 rounded-md bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#003d82]/25 focus:border-[#003d82]"
                    >
                      <option>Cotización de productos</option>
                      <option>Asesoría técnica</option>
                      <option>Información general</option>
                      <option>Soporte post-venta</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Mensaje <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Describe las medidas, material, cantidad o tipo de resorte que necesitas..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#003d82]/25 focus:border-[#003d82]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#003d82] hover:bg-[#002756] text-white text-base font-bold cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Solicitud
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "inicio":
        return renderInicio()
      case "nosotros":
        return renderNosotros()
      case "productos":
        return renderProductos()
      case "servicios":
        return renderServicios()
      case "contacto":
        return renderContacto()
      default:
        return renderInicio()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {renderNavigation()}

      <main className="flex-1">{renderCurrentPage()}</main>

      {/* Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <DialogHeader>
              <div className="flex items-center gap-2.5 mb-1">
                <Badge className="bg-[#003d82]/10 text-[#003d82] border-0 font-semibold">
                  {selectedProduct.categoryLabel}
                </Badge>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-[#003d82]">
                {selectedProduct.name}
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-sm sm:text-base">
                {selectedProduct.description}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 mt-2">
              <div className="lg:col-span-7 space-y-5">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#003d82] mb-1.5 border-b-2 border-[#f5b800] pb-1 w-fit">
                      Descripción
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedProduct.details}</p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#003d82] mb-1.5 border-b-2 border-[#f5b800] pb-1 w-fit">
                      Fabricación
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedProduct.fabrication}</p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#003d82] mb-1.5 border-b-2 border-[#f5b800] pb-1 w-fit">
                      Materiales y Acabados
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedProduct.materials}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-base font-bold text-[#003d82] mb-3">Aplicaciones Comunes</h3>
                  <ul className="space-y-2.5">
                    {selectedProduct.applications.map((app) => (
                      <li key={app} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#003d82] shrink-0" />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-[#001a3a] text-white p-5 space-y-3">
                  <h4 className="font-bold text-lg">¿Necesitas una cotización?</h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Cotiza {selectedProduct.name.toLowerCase()} según tus medidas, calibre y acabado requerido.
                  </p>
                  <Button
                    type="button"
                    onClick={() =>
                      openExternal(
                        buildWhatsAppUrl(
                          `Hola, me interesa obtener una cotización para ${selectedProduct.name}.`,
                        ),
                      )
                    }
                    className="w-full h-11 bg-[#128C7E] hover:bg-[#0e7266] text-white font-bold cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Cotizar por WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={COMPANY_INFO.logo}
                  alt="Logotipo de ResorTech Industrial"
                  className="h-11 w-11 rounded-md bg-white p-0.5 object-contain"
                />
                <div>
                  <h3 className="text-lg font-extrabold text-white leading-none">{COMPANY_INFO.shortName}</h3>
                  <span className="text-xs text-[#f5b800] font-semibold">Industrial S.A. de C.V.</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Líderes en manufactura de resortes industriales y soluciones metalmecánicas con más de 30 años de
                experiencia en México.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Productos</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: "Resortes de Compresión", category: "compression" as ProductCategory },
                  { label: "Resortes de Tensión", category: "tension" as ProductCategory },
                  { label: "Resortes de Torsión", category: "torsion" as ProductCategory },
                  { label: "Formas de Alambre", category: "wire" as ProductCategory },
                  { label: "Piezas Troqueladas", category: "stamped" as ProductCategory },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => navigateTo("productos", link.category)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Navegación</h4>
              <ul className="space-y-2.5 text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => navigateTo(item.id)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Contacto</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <a href={`tel:${COMPANY_INFO.phones[0].raw}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.phones[0].display}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${COMPANY_INFO.emails[0]}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.emails[0]}
                  </a>
                </li>
                <li>{COMPANY_INFO.location}</li>
              </ul>
              <div className="flex items-center gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={() => openExternal(COMPANY_INFO.facebookUrl)}
                  aria-label="Visitar Facebook de ResorTech Industrial"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white transition-colors cursor-pointer"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openExternal(generalWhatsAppUrl)}
                  aria-label="Contactar por WhatsApp"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#128C7E] hover:bg-[#0e7266] text-white transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name} — Proyecto de demostración.</p>
            <p>{COMPANY_INFO.location}</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        type="button"
        onClick={() => openExternal(generalWhatsAppUrl)}
        aria-label="Cotizar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#128C7E] hover:bg-[#0e7266] text-white shadow-xl transition-transform hover:scale-105 whatsapp-pulse cursor-pointer"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  )
}
