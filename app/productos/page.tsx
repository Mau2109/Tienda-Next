import Image from "next/image"
import Link from "next/link"

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

// Función para obtener todos los productos
async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products", { next: { revalidate: 3600 } })

    if (!response.ok) {
      throw new Error("Error al cargar los productos")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return [] // Devolvemos array vacío en caso de error
  }
}

// Función para obtener categorías
async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories", { next: { revalidate: 3600 } })

    if (!response.ok) {
      throw new Error("Error al cargar las categorías")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return [] // Devolvemos array vacío en caso de error
  }
}

export default async function ProductosPage() {
  const [productos, categorias] = await Promise.all([getProducts(), getCategories()])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Nuestros Productos</h1>
        <p className="text-gray-400">Explora nuestra selección de productos de alta calidad</p>
      </div>

      {/* Filtro de categorías */}
      <div className="flex flex-wrap gap-2 pb-4">
        {categorias.map((categoria) => (
          <Link
            key={categoria}
            href={`/productos?categoria=${categoria}`}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-gray-200"
          >
            {categoria}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.length > 0
          ? productos.map((producto) => (
              <div
                key={producto.id}
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="relative h-48 bg-white">
                  <Image
                    src={producto.image || "/placeholder.svg"}
                    alt={producto.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white line-clamp-1">{producto.title}</h3>
                  <p className="text-sm text-gray-400">{producto.category}</p>
                  <p className="text-gray-300 my-2 line-clamp-2">{producto.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-gray-300 text-sm ml-1">{producto.rating.rate}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({producto.rating.count} reseñas)</span>
                  </div>
                  <p className="text-xl font-bold mt-2 text-purple-400">${producto.price}</p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                      Añadir al carrito
                    </button>
                    <Link
                      href={`/productos/${producto.id}`}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : // Fallback en caso de error o mientras carga
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950/50 animate-pulse"
              >
                <div className="h-48 bg-gray-800"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-6 bg-gray-800 rounded w-1/4 mt-2"></div>
                  <div className="h-10 bg-gray-800 rounded mt-4"></div>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
