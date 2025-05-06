import Link from "next/link"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg overflow-hidden relative h-80 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="relative h-full flex flex-col justify-center p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Bienvenido a Mi Tienda</h1>
          <p className="text-xl text-white/80 max-w-xl mb-6">
            Descubre nuestra colección de productos exclusivos con los mejores precios.
          </p>
          <Link
            href="/productos"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md w-fit"
          >
            Ver productos
          </Link>
        </div>
      </section>

      <h2 className="text-2xl font-bold mb-4">Productos destacados</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950/50 hover:bg-gray-900/50 transition-colors"
          >
            <div className="relative h-48 bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                Imagen Producto {item}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white">Producto {item}</h3>
              <p className="text-sm text-gray-400">Categoría de ejemplo</p>
              <p className="text-gray-300 my-2">Descripción breve del producto con detalles importantes.</p>
              <p className="text-xl font-bold mt-2 text-purple-400">$99.99</p>
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
