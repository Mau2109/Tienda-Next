"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "@/actions/cart"

// Definir tipos
export type CartItem = {
  id: number
  productId: number
  title: string
  price: number
  image: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: any) => Promise<void>
  updateItem: (productId: number, quantity: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
  clearItems: () => Promise<void>
  isLoading: boolean
  total: number
}

// Crear contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hook para usar el contexto
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}

// Proveedor del contexto
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Calcular el total del carrito
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Cargar el carrito al inicio
  useEffect(() => {
    async function loadCart() {
      try {
        setIsLoading(true)
        const cartData = await getCart()
        setItems(cartData || [])
      } catch (error) {
        console.error("Error al cargar el carrito:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar el carrito",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [])

  // Añadir un item al carrito
  async function addItem(product: any) {
    try {
      setIsLoading(true)
      const existingItem = items.find((item) => item.productId === product.id)

      if (existingItem) {
        await updateItem(product.id, existingItem.quantity + 1)
        return
      }

      const newItem = await addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })

      if (newItem) {
        setItems((prev) => [...prev, newItem])
        toast({
          title: "Producto añadido",
          description: `${product.title} ha sido añadido al carrito`,
        })
      }
    } catch (error) {
      console.error("Error al añadir al carrito:", error)
      toast({
        title: "Error",
        description: "No se pudo añadir el producto al carrito",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Actualizar cantidad de un item
  async function updateItem(productId: number, quantity: number) {
    try {
      setIsLoading(true)

      if (quantity <= 0) {
        await removeItem(productId)
        return
      }

      const updatedItem = await updateCartItem(productId, quantity)

      if (updatedItem) {
        setItems((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
      }
    } catch (error) {
      console.error("Error al actualizar el carrito:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Eliminar un item del carrito
  async function removeItem(productId: number) {
    try {
      setIsLoading(true)
      await removeFromCart(productId)
      setItems((prev) => prev.filter((item) => item.productId !== productId))
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado del carrito",
      })
    } catch (error) {
      console.error("Error al eliminar del carrito:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Vaciar el carrito
  async function clearItems() {
    try {
      setIsLoading(true)
      await clearCart()
      setItems([])
      toast({
        title: "Carrito vacío",
        description: "Se han eliminado todos los productos del carrito",
      })
    } catch (error) {
      console.error("Error al vaciar el carrito:", error)
      toast({
        title: "Error",
        description: "No se pudo vaciar el carrito",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearItems,
        isLoading,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
