"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useCart } from "@/context/cart-context"

// Datos de respaldo para cuando la API no está disponible
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
]

// Tipo para los productos de la API
type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function Home() {
  const [productos, setProductos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)
  const { addItem } = useCart()

  // Usar useCallback para evitar recreaciones innecesarias de la función
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      const response = await fetch("https://fakestoreapi.com/products?limit=3", {
        // Usar stale-while-revalidate para mejorar el rendimiento
        next: { revalidate: 3600 }, // Revalidar cada hora
        // Establecer un timeout para la solicitud
        signal: AbortSignal.timeout(5000), // 5 segundos de timeout
      })

      if (!response.ok) {
        throw new Error("Error al cargar los productos")
      }

      const data = await response.json()
      setProductos(data)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError(true)
      // Usar datos de respaldo cuando la API falla
      setProductos(FALLBACK_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }, [])

  // Usar useEffect con dependencias mínimas
  useEffect(() => {
    fetchProducts()
    // No incluir fetchProducts en las dependencias ya que está envuelta en useCallback
  }, [])

  return (
    <div className="space-y-8">
      <section className="rounded-lg overflow-hidden relative h-80 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700">
        <div className="relative h-full flex flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Bienvenido a Mi Tienda</h1>
          <p className="text-xl text-white/80 max-w-xl mb-6">
            Descubre nuestra colección de productos exclusivos con los mejores precios.
          </p>
          <Link
            href="/productos"
            className="px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 rounded-md w-fit transition-colors"
          >
            Ver productos
          </Link>
        </div>
      </section>

      <h2 className="text-2xl font-bold mb-4">Productos destacados</h2>

      {error && (
        <div className="p-4 mb-4 text-sm text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 rounded-lg">
          Estamos experimentando problemas para conectar con nuestro servidor. Mostrando productos disponibles
          localmente.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-800 animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-2"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
                </div>
              </div>
            ))
          : productos.map((producto) => (
              <div
                key={producto.id}
                className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="relative h-48 bg-white dark:bg-gray-200">
                  <Image
                    src={producto.image || "/placeholder.svg"}
                    alt={producto.title}
                    fill
                    className="object-contain p-4"
                    loading="eager"
                    onError={(e) => {
                      // Fallback para imágenes que no cargan
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{producto.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{producto.category}</p>
                  <p className="text-gray-700 dark:text-gray-300 my-2 line-clamp-2">{producto.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm ml-1">{producto.rating.rate}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">({producto.rating.count} reseñas)</span>
                  </div>
                  <p className="text-xl font-bold mt-2 text-purple-600 dark:text-purple-400">${producto.price}</p>
                  <button
                    className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    onClick={() => addItem(producto)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
