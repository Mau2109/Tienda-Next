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

// Función para obtener un producto por ID
async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { next: { revalidate: 3600 } })

    if (!response.ok) {
      throw new Error("Error al cargar el producto")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

// Función para obtener productos relacionados (de la misma categoría)
async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Error al cargar productos relacionados")
    }

    const products: Product[] = await response.json()
    return products.filter((product) => product.id.toString() !== currentId).slice(0, 3)
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export default async function ProductoDetallePage({ params }: { params: { id: string } }) {
  const producto = await getProduct(params.id)

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

  const productosRelacionados = await getRelatedProducts(producto.category, params.id)

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
            <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
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
                  <Link
                    href={`/productos/${producto.id}`}
                    className="block w-full mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-center"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
