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
import { useToast } from "~/components/ui/toast-container"
import { EventForm } from "./eventcreationform"

type EventDialogProps = {
  children: React.ReactNode
  initialData?: any
  mode?: "create" | "update"
}

export function EventDialog({
  children,
  initialData = null,
  mode = "create",
}: EventDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const isEdit = mode === "update"

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (isEdit) {
        // await updateEvent(data)
        toast({
          message: "Event updated",
          description: "Your event has been updated successfully.",
          type: "success",
        })
      } else {
        // await createEvent(data)
        toast({
          message: "Event created",
          description: "Your event has been created successfully.",
          type: "success",
        })
      }

      setOpen(false)
    } catch (error) {
      toast({
        message: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} event. Please try again.`,
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modify the details of the event. Click save when you're done."
              : "Fill in the details to create a new event. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <EventForm
          onSubmit={handleSubmit}
          initialData={initialData}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  )
}
