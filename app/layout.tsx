import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ResorTech Industrial S.A. de C.V. | Manufactura de Resortes Industriales",
  description:
    "Sitio web demostrativo de manufactura de resortes industriales de compresión, tensión, torsión, troquel, formas de alambre y piezas troqueladas.",
  keywords:
    "resortes industriales, manufactura de resortes, resortes de compresión, resortes de tensión, resortes de torsión, formas de alambre, piezas troqueladas, ResorTech Industrial",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`font-sans ${montserrat.variable} antialiased bg-white text-slate-900`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
