"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "dark" | "light"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Inicializamos con 'dark' y luego verificamos localStorage
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  // Efecto para cargar el tema desde localStorage y configurar el tema inicial
  useEffect(() => {
    setMounted(true)
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null

    // Si hay un tema guardado, usarlo
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Si no hay tema guardado, verificar preferencia del sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  // Efecto para aplicar la clase 'dark' al elemento HTML cuando cambia el tema
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Guardar el tema en localStorage
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  // Valor a proporcionar al contexto
  const contextValue = {
    theme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

// Hook personalizado para usar el contexto del tema
export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider")
  }

  return context
}
