// src/components/ui/custom-toast.tsx
"use client"

import { useEffect } from "react"
import { CheckCircle2, XCircle, X } from "lucide-react"

type ToastProps = {
  id: string
  message: string
  description?: string
  type: "success" | "error"
  duration?: number
  onClose: (id: string) => void
}

export function CustomToast({
  id,
  message,
  description,
  type,
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <div className="absolute top-4 right-4 z-100 animate-in fade-in slide-in-from-bottom-2 w-100">
      <div
        className={`rounded-md border p-4 shadow-lg ${
          type === "success"
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-red-400" />
            )}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p
              className={`text-sm font-medium ${
                type === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {message}
            </p>
            {description && (
              <p
                className={`mt-1 text-sm ${
                  type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {description}
              </p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={() => onClose(id)}
              className={`inline-flex rounded-md ${
                type === "success"
                  ? "bg-green-50 text-green-400 hover:bg-green-100"
                  : "bg-red-50 text-red-400 hover:bg-red-100"
              } focus:outline-none`}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}