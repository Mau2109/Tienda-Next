import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import { CartProvider } from "@/context/cart-context"
import { ToastProvider, Toaster } from "@/components/ui/use-toast"
import { ThemeProvider } from "@/context/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mi Tienda Online",
  description: "Tienda online creada con Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 overflow-auto p-6">{children}</main>
              </div>
              <Toaster />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
