"use client"

import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { usePathname } from "next/navigation"
import ThemeToggle from "./theme-toggle"

export default function Sidebar() {
  const { items } = useCart()
  const pathname = usePathname()

  // Calcular cantidad total de items en el carrito
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 h-screen flex flex-col transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          Mi Tienda
        </h1>
        <ThemeToggle />
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                pathname === "/" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : ""
              }`}
            >
              <span className="text-purple-500">🏠</span>
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              href="/productos"
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                pathname.startsWith("/productos") ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : ""
              }`}
            >
              <span className="text-blue-500">🛍️</span>
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link
              href="/carrito"
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                pathname === "/carrito" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : ""
              }`}
            >
              <span className="text-purple-500">🛒</span>
              <span>Carrito</span>
              {cartItemsCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full ml-auto">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                pathname === "/about" ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white" : ""
              }`}
            >
              <span className="text-blue-500">ℹ️</span>
              <span>Acerca de</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Mi Tienda Online</p>
      </div>
    </aside>
  )
}
