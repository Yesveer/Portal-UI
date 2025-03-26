// src/components/AlertDelete.tsx (updated version)
"use client"

import { useToast } from "~/components/ui/toast-container"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { useState } from "react"

interface AlertDialogChildProps {
  classId: string;
  studentEmail: string;
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function ClassDetailsAlertDelete({ classId, studentEmail, children, onSuccess }: AlertDialogChildProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleting(true)
    
    try {
      // The actual deletion is handled by the parent component
      if (onSuccess) onSuccess()
    } catch (error) {
      toast({
        message: "Error",
        description: error instanceof Error ? error.message : "Failed to remove student",
        type: "error"
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Student?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove {studentEmail} from the class. The student can be added back later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
