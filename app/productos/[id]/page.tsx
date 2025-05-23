"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

// Datos de respaldo para cuando la API no está disponible
const FALLBACK_PRODUCTS = {
  "1": {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  "2": {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  "3": {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
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

export default function ProductoDetallePage() {
  const [producto, setProducto] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean>(false)
  const { id } = useParams() as { id: string }
  const { addItem } = useCart()
  const [cantidad, setCantidad] = useState(1)
  const { toast } = useToast()

  // Función para cargar el producto con manejo de errores mejorado
  const fetchProduct = useCallback(async () => {
    if (!id) return

    setLoading(true)
    setError(false)

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 3600 }, // Revalidar cada hora
        signal: AbortSignal.timeout(5000), // 5 segundos de timeout
      })

      if (response.ok) {
        const data = await response.json()
        setProducto(data)
      } else {
        throw new Error(`Error al cargar el producto: ${response.status}`)
      }
    } catch (err) {
      console.error("Error fetching product:", err)
      setError(true)

      // Usar datos de respaldo si están disponibles para este ID
      if (FALLBACK_PRODUCTS[id as keyof typeof FALLBACK_PRODUCTS]) {
        setProducto(FALLBACK_PRODUCTS[id as keyof typeof FALLBACK_PRODUCTS])
      }
    } finally {
      setLoading(false)
    }
  }, [id])

  // Cargar el producto solo cuando cambia el ID
  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  const handleAddToCart = () => {
    if (producto) {
      try {
        // Añadir el producto con la cantidad seleccionada en una sola operación
        addItem({
          ...producto,
          quantity: cantidad, // Añadimos la cantidad seleccionada
        })

        toast({
          title: "Producto añadido",
          description: `${producto.title} (${cantidad} unidad${cantidad > 1 ? "es" : ""}) añadido al carrito`,
        })
      } catch (err) {
        console.error("Error al añadir al carrito:", err)
        toast({
          title: "Error",
          description: "No se pudo añadir el producto al carrito. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse"></div>

          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">El producto que buscas no existe o no está disponible.</p>
        <Link href="/productos" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Volver a productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {error && (
        <div className="p-4 mb-4 text-sm text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 rounded-lg">
          Estamos experimentando problemas para conectar con nuestro servidor. Mostrando información disponible
          localmente.
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-700 dark:hover:text-gray-300">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-gray-700 dark:hover:text-gray-300">
          Productos
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">{producto.title}</span>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="bg-white dark:bg-gray-200 rounded-lg p-8 flex items-center justify-center shadow-md">
          <div className="relative h-80 w-full">
            <Image
              src={producto.image || "/placeholder.svg"}
              alt={producto.title}
              fill
              className="object-contain"
              loading="eager"
              onError={(e) => {
                // Fallback para imágenes que no cargan
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg"
              }}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Título y categoría */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{producto.title}</h1>
            <div className="mt-2">
              <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">
                {producto.category}
              </span>
            </div>
          </div>

          {/* Valoración */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm ml-1 font-medium">{producto.rating.rate}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">({producto.rating.count} valoraciones)</span>
          </div>

          {/* Precio */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">${producto.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Impuestos incluidos. Envío calculado en el checkout.
            </p>
          </div>

          {/* Descripción */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Descripción</h2>
            <p className="text-gray-700 dark:text-gray-300">{producto.description}</p>
          </div>

          {/* Selector de cantidad */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cantidad</h2>
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              >
                -
              </button>
              <span className="text-gray-900 dark:text-white font-medium">{cantidad}</span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
                onClick={() => setCantidad(cantidad + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Botón de añadir al carrito */}
          <div className="pt-4">
            <button
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
              onClick={handleAddToCart}
            >
              Añadir al carrito
            </button>
          </div>

          {/* Información adicional */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <p className="flex items-center gap-2">
              <span>🚚</span> Envío en 24-48 horas
            </p>
            <p className="flex items-center gap-2">
              <span>🔄</span> Devoluciones gratuitas en 30 días
            </p>
            <p className="flex items-center gap-2">
              <span>🔒</span> Pago seguro garantizado
            </p>
          </div>
        </div>
      </div>

      {/* Especificaciones técnicas */}
      <div className="mt-12 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Especificaciones</h2>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900">
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 text-gray-500 dark:text-gray-400 font-medium">ID del producto</td>
                <td className="py-3 text-gray-900 dark:text-white">{producto.id}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 text-gray-500 dark:text-gray-400 font-medium">Categoría</td>
                <td className="py-3 text-gray-900 dark:text-white capitalize">{producto.category}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 text-gray-500 dark:text-gray-400 font-medium">Valoración</td>
                <td className="py-3 text-gray-900 dark:text-white">
                  {producto.rating.rate} de 5 ({producto.rating.count} valoraciones)
                </td>
              </tr>
              <tr>
                <td className="py-3 text-gray-500 dark:text-gray-400 font-medium">Precio</td>
                <td className="py-3 text-gray-900 dark:text-white">${producto.price.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
