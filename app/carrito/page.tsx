import Link from "next/link"

export default function CarritoPage() {
  // Datos de ejemplo para el carrito
  const itemsCarrito = [
    { id: 1, nombre: "Auriculares Bluetooth", precio: 89.99, cantidad: 1 },
    { id: 2, nombre: "Camiseta Premium", precio: 29.99, cantidad: 2 },
  ]

  const subtotal = itemsCarrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
  const envio = 4.99
  const total = subtotal + envio

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tu Carrito</h1>
        <p className="text-gray-400">Revisa y finaliza tu compra</p>
      </div>

      {itemsCarrito.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {itemsCarrito.map((item) => (
              <div key={item.id} className="border border-gray-800 rounded-lg bg-gray-950/50 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 bg-gray-800 rounded-md overflow-hidden flex items-center justify-center text-gray-500">
                    {item.nombre}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.nombre}</h3>
                    <p className="text-sm text-gray-400 mb-2">Cantidad: {item.cantidad}</p>
                    <p className="font-bold text-purple-400">${item.precio}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-400 self-start">
                    🗑️
                    <span className="sr-only">Eliminar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="border border-gray-800 rounded-lg bg-gray-950/50 sticky top-6">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-semibold text-lg">Resumen del pedido</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Envío</span>
                  <span>${envio.toFixed(2)}</span>
                </div>
                <hr className="border-gray-800" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-purple-400">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="p-4">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md">
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-400 mb-6">Parece que aún no has añadido productos a tu carrito</p>
          <Link href="/productos" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            Ver productos
          </Link>
        </div>
      )}
    </div>
  )
}
