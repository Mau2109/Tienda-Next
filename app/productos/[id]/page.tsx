"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/context/cart-context"

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
  const [productosRelacionados, setProductosRelacionados] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams() as { id: string }
  const { addItem } = useCart()

  useEffect(() => {
    async function loadProduct() {
      setLoading(true)
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)

        if (!response.ok) {
          throw new Error("Error al cargar el producto")
        }

        const data = await response.json()
        setProducto(data)

        // Cargar productos relacionados
        if (data.category) {
          const relatedResponse = await fetch(
            `https://fakestoreapi.com/products/category/${encodeURIComponent(data.category)}`,
          )
          const relatedData = await relatedResponse.json()
          // Filtrar el producto actual y limitar a 3
          setProductosRelacionados(relatedData.filter((p: Product) => p.id.toString() !== id).slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-4 bg-gray-800 rounded w-1/3"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg h-80 animate-pulse"></div>

          <div className="space-y-4">
            <div className="h-8 bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-800 rounded w-1/5"></div>
            <div className="h-6 bg-gray-800 rounded w-1/6"></div>
            <div className="h-24 bg-gray-800 rounded"></div>
            <div className="h-12 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-gray-400 mb-6">El producto que buscas no existe o no está disponible.</p>
        <Link href="/productos" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          Volver a productos
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-white">
          Productos
        </Link>
        <span>/</span>
        <span className="text-gray-300">{producto.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg p-8 flex items-center justify-center">
          <div className="relative h-80 w-full">
            <Image src={producto.image || "/placeholder.svg"} alt={producto.title} fill className="object-contain" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{producto.title}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="text-gray-300 text-sm ml-1">{producto.rating.rate}</span>
            </div>
            <span className="text-gray-400 text-sm">({producto.rating.count} reseñas)</span>
          </div>

          <p className="text-3xl font-bold text-purple-400">${producto.price}</p>

          <div className="py-2">
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-200">{producto.category}</span>
          </div>

          <p className="text-gray-300">{producto.description}</p>

          <div className="pt-4">
            <button
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              onClick={() => addItem(producto)}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      {productosRelacionados.length > 0 && (
        <div className="pt-8">
          <h2 className="text-xl font-bold mb-4">Productos relacionados</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productosRelacionados.map((producto) => (
              <div
                key={producto.id}
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="relative h-40 bg-white">
                  <Image
                    src={producto.image || "/placeholder.svg"}
                    alt={producto.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white line-clamp-1">{producto.title}</h3>
                  <p className="text-xl font-bold mt-2 text-purple-400">${producto.price}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                      onClick={() => addItem(producto)}
                    >
                      Añadir
                    </button>
                    <Link
                      href={`/productos/${producto.id}`}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
