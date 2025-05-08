"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/cart-context"

export default function CarritoPage() {
  const { items, updateItem, removeItem, clearItems, total } = useCart()
  const envio = items.length > 0 ? 4.99 : 0
  const totalFinal = total + envio

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tu Carrito</h1>
        <p className="text-gray-500 dark:text-gray-400">Revisa y finaliza tu compra</p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0 bg-white dark:bg-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
                        onClick={() => updateItem(item.productId, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white transition-colors"
                        onClick={() => updateItem(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-purple-600 dark:text-purple-400 mt-2">${item.price} c/u</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600 dark:hover:text-red-400 self-start transition-colors"
                    onClick={() => removeItem(item.productId)}
                  >
                    🗑️
                    <span className="sr-only">Eliminar</span>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800">
              <button
                className="text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-2 transition-colors"
                onClick={clearItems}
              >
                🗑️ Vaciar carrito
              </button>
              <Link
                href="/productos"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 transition-colors"
              >
                🛍️ Seguir comprando
              </Link>
            </div>
          </div>

          <div>
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-800 sticky top-6">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="font-semibold text-lg">Resumen del pedido</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Envío</span>
                  <span>${envio.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-800" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-purple-600 dark:text-purple-400">${totalFinal.toFixed(2)}</span>
                </div>
              </div>
              <div className="p-4">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md transition-colors">
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-medium mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Parece que aún no has añadido productos a tu carrito</p>
          <Link
            href="/productos"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Ver productos
          </Link>
        </div>
      )}
    </div>
  )
}
