"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useCart } from "@/context/cart-context"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Datos de respaldo para cuando la API no está disponible
const FALLBACK_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"]

const FALLBACK_PRODUCTS = {
  all: [
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
    {
      id: 4,
      title: "Womens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 2.1, count: 430 },
    },
    {
      id: 5,
      title: "John Hardy Women's Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 4.6, count: 400 },
    },
    {
      id: 6,
      title: "SSD Kingston 480GB",
      price: 109,
      description: "Boost your system's performance with this SSD drive.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      rating: { rate: 4.8, count: 319 },
    },
  ],
  "men's clothing": [
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
  ],
  "women's clothing": [
    {
      id: 4,
      title: "Womens Casual Slim Fit",
      price: 15.99,
      description: "The color could be slightly different between on the screen and in practice.",
      category: "women's clothing",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 2.1, count: 430 },
    },
  ],
  jewelery: [
    {
      id: 5,
      title: "John Hardy Women's Chain Bracelet",
      price: 695,
      description: "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
      category: "jewelery",
      image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      rating: { rate: 4.6, count: 400 },
    },
  ],
  electronics: [
    {
      id: 6,
      title: "SSD Kingston 480GB",
      price: 109,
      description: "Boost your system's performance with this SSD drive.",
      category: "electronics",
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      rating: { rate: 4.8, count: 319 },
    },
  ],
}

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

export default function ProductosPage() {
  const [productos, setProductos] = useState<Product[]>([])
  const [categorias, setCategorias] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)
  const { addItem } = useCart()
  const searchParams = useSearchParams()
  const categoriaFiltro = searchParams.get("categoria")
  const { toast } = useToast()

  // Función para cargar datos con manejo de errores mejorado
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(false)

    try {
      // Intentar cargar categorías
      let categoriasData: string[] = []
      try {
        const catResponse = await fetch("https://fakestoreapi.com/products/categories", {
          next: { revalidate: 3600 }, // Revalidar cada hora
          signal: AbortSignal.timeout(5000), // 5 segundos de timeout
        })

        if (catResponse.ok) {
          categoriasData = await catResponse.json()
        } else {
          throw new Error("Error al cargar categorías")
        }
      } catch (catError) {
        console.error("Error fetching categories:", catError)
        // Usar categorías de respaldo
        categoriasData = FALLBACK_CATEGORIES
      }

      setCategorias(categoriasData)

      // Intentar cargar productos
      let productosData: Product[] = []
      try {
        // Determinar la URL basada en el filtro de categoría
        const url = categoriaFiltro
          ? `https://fakestoreapi.com/products/category/${encodeURIComponent(categoriaFiltro)}`
          : "https://fakestoreapi.com/products"

        const prodResponse = await fetch(url, {
          next: { revalidate: 3600 }, // Revalidar cada hora
          signal: AbortSignal.timeout(5000), // 5 segundos de timeout
        })

        if (prodResponse.ok) {
          productosData = await prodResponse.json()
        } else {
          throw new Error("Error al cargar productos")
        }
      } catch (prodError) {
        console.error("Error fetching products:", prodError)
        setError(true)
        // Usar productos de respaldo según la categoría
        if (categoriaFiltro && FALLBACK_PRODUCTS[categoriaFiltro as keyof typeof FALLBACK_PRODUCTS]) {
          productosData = FALLBACK_PRODUCTS[categoriaFiltro as keyof typeof FALLBACK_PRODUCTS]
        } else {
          productosData = FALLBACK_PRODUCTS.all
        }
      }

      setProductos(productosData)
    } catch (error) {
      console.error("Error general:", error)
      setError(true)
      // Asegurar que tenemos datos de respaldo en caso de error general
      setCategorias(FALLBACK_CATEGORIES)
      setProductos(FALLBACK_PRODUCTS.all)
    } finally {
      setLoading(false)
    }
  }, [categoriaFiltro])

  // Cargar datos solo cuando cambia la categoría
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Nuestros Productos</h1>
        <p className="text-gray-500 dark:text-gray-400">Explora nuestra selección de productos de alta calidad</p>
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 rounded-lg">
          Estamos experimentando problemas para conectar con nuestro servidor. Mostrando productos disponibles
          localmente.
        </div>
      )}

      {/* Filtro de categorías */}
      <div className="flex flex-wrap gap-2 pb-4">
        <Link
          href="/productos"
          className={`px-3 py-1 ${
            !categoriaFiltro
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
          } rounded-full text-sm transition-colors`}
        >
          Todos
        </Link>
        {categorias.map((categoria) => (
          <Link
            key={categoria}
            href={`/productos?categoria=${categoria}`}
            className={`px-3 py-1 ${
              categoriaFiltro === categoria
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            } rounded-full text-sm transition-colors`}
          >
            {categoria}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
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
                    loading="lazy"
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
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                      onClick={() => addItem(producto)}
                    >
                      Añadir al carrito
                    </button>
                    <Link
                      href={`/productos/${producto.id}`}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-md transition-colors"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
