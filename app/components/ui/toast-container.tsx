// src/components/ui/toast-container.tsx
"use client"

import { useState } from "react"
import { CustomToast } from "./custom-toast"

export type ToastType = {
  id: string
  message: string
  description?: string
  type: "success" | "error"
  duration?: number
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const addToast = (toast: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <>
      {toasts.map((toast) => (
        <CustomToast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </>
  )
}

// Create a context for toast functions
import { createContext, useContext } from "react"

type ToastContextType = {
  toast: (options: Omit<ToastType, "id">) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const toast = (options: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...options, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.map((toast) => (
        <CustomToast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}