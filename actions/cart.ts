"use server"
import { v4 as uuidv4 } from "uuid"
import prisma from "@/lib/db"
import { getSessionId } from "@/lib/session"

// Tipo para un nuevo item del carrito
type CartItemInput = {
  productId: number
  title: string
  price: number
  image: string
  quantity: number
}

// Obtener el carrito actual
export async function getCart() {
  try {
    const sessionId = await getSessionId()

    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          id: uuidv4(),
          sessionId,
        },
        include: { items: true },
      })
    }

    return cart.items
  } catch (error) {
    console.error("Error al obtener el carrito:", error)
    throw new Error("No se pudo obtener el carrito")
  }
}

// Añadir un producto al carrito
export async function addToCart(item: CartItemInput) {
  try {
    const sessionId = await getSessionId()

    let cart = await prisma.cart.findUnique({
      where: { sessionId },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          id: uuidv4(),
          sessionId,
        },
      })
    }

    // Verificar si el producto ya existe en el carrito
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: item.productId,
      },
    })

    if (existingItem) {
      // Actualizar cantidad si ya existe
      return await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      })
    }

    // Crear nuevo item si no existe
    return await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: item.productId,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      },
    })
  } catch (error) {
    console.error("Error al añadir al carrito:", error)
    throw new Error("No se pudo añadir el producto al carrito")
  }
}

// Actualizar cantidad de un producto
export async function updateCartItem(productId: number, quantity: number) {
  try {
    const sessionId = await getSessionId()

    const cart = await prisma.cart.findUnique({
      where: { sessionId },
    })

    if (!cart) {
      throw new Error("Carrito no encontrado")
    }

    return await prisma.cartItem.updateMany({
      where: {
        cartId: cart.id,
        productId,
      },
      data: { quantity },
    })
  } catch (error) {
    console.error("Error al actualizar el carrito:", error)
    throw new Error("No se pudo actualizar el producto en el carrito")
  }
}

// Eliminar un producto del carrito
export async function removeFromCart(productId: number) {
  try {
    const sessionId = await getSessionId()

    const cart = await prisma.cart.findUnique({
      where: { sessionId },
    })

    if (!cart) {
      throw new Error("Carrito no encontrado")
    }

    return await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    })
  } catch (error) {
    console.error("Error al eliminar del carrito:", error)
    throw new Error("No se pudo eliminar el producto del carrito")
  }
}

// Vaciar el carrito
export async function clearCart() {
  try {
    const sessionId = await getSessionId()

    const cart = await prisma.cart.findUnique({
      where: { sessionId },
    })

    if (!cart) {
      return null
    }

    return await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })
  } catch (error) {
    console.error("Error al vaciar el carrito:", error)
    throw new Error("No se pudo vaciar el carrito")
  }
}
