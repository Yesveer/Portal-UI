"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import useRequestHook from "~/hooks/requestHook"

export function CreateTeacherDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [handleCreate, teacherRes, isLoading, error, reset]=useRequestHook('teacher/add', "POST", null)

  const handleSubmit = async (data: any) => {
    handleCreate(data);
  }

useEffect(()=>{
  if(teacherRes){
    toast({
      message:"Teacher Create",
      type:"success",
      description:teacherRes?.message

    })
    setOpen(false);
  }

},[teacherRes])



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Teacher</DialogTitle>
          <DialogDescription>Fill in the details to add a new teacher to the system.</DialogDescription>
        </DialogHeader>
        <TeacherForm onSubmit={handleSubmit} isSubmitting={isLoading} />
      </DialogContent>
    </Dialog>
  )
}
