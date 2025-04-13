"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { TeacherForm } from "./teacher-form"
import { useToast } from "~/components/ui/toast-container"

interface UpdateTeacherDialogProps {
  children: React.ReactNode
  teacher: any
}

export function UpdateTeacherDialog({ children, teacher }: UpdateTeacherDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      // In a real app, this would call your API
      // await updateTeacher(teacher.id, data)
      console.log("Updating teacher:", data)

      toast({
        message: "Teacher updated",
        description: "The teacher information has been successfully updated.",
      })
      setOpen(false)
    } catch (error) {
      toast({
        message: "Error",
        description: "Failed to update teacher information. Please try again.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
          <DialogDescription>Make changes to the teacher's information.</DialogDescription>
        </DialogHeader>
        <TeacherForm initialData={teacher} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  )
}
