"use client"

import { useTheme } from "@/context/theme-context"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? (
        <span className="text-yellow-400 text-xl">☀️</span>
      ) : (
        <span className="text-blue-600 text-xl">🌙</span>
      )}
    </button>
  )
}
