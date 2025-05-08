"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ToastVariant = "default" | "destructive" | "success"

interface ToastOptions {
  title: string
  description: string
  variant?: ToastVariant
  duration?: number
}

interface Toast extends ToastOptions {
  id: string
  visible: boolean
}

// Crear un contexto para los toasts
const ToastContext = createContext<{
  toast: (options: ToastOptions) => void
  toasts: Toast[]
}>({
  toast: () => {},
  toasts: [],
})

// Hook para usar el contexto de toast
export function useToast() {
  return useContext(ToastContext)
}

// Proveedor del contexto de toast
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    // Limpia toasts después de que desaparezcan
    const timer = setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.visible))
    }, 1000) // Espera extra para la animación de desaparición

    return () => clearTimeout(timer)
  }, [toasts])

  function toast(options: ToastOptions) {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant || "default",
      duration: options.duration || 5000,
      visible: true,
    }

    setToasts((prev) => [...prev, newToast])

    // Ocultar toast después de duration
    setTimeout(() => {
      setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast)))
    }, newToast.duration)
  }

  return <ToastContext.Provider value={{ toast, toasts }}>{children}</ToastContext.Provider>
}

// Componente Toaster que muestra los toasts
export function Toaster() {
  const { toasts } = useToast()

  if (!toasts.length) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            p-4 rounded-md shadow-md min-w-[300px] max-w-md transform transition-all duration-300 
            ${toast.visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
            ${toast.variant === "destructive" ? "bg-red-600 text-white" : ""}
            ${toast.variant === "success" ? "bg-green-600 text-white" : ""}
            ${toast.variant === "default" ? "bg-gray-800 text-white" : ""}
          `}
        >
          <div className="font-semibold">{toast.title}</div>
          <div className="text-sm opacity-90">{toast.description}</div>
        </div>
      ))}
    </div>
  )
}
