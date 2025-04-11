"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/toast-container";
import { EventForm } from "./eventcreationform";
import useRequestHook from "~/hooks/requestHook";

type EventDialogProps = {
  children: React.ReactNode;
  initialData?: any;
  mode?: "create" | "update";
  id: string;
};

export function EventDialog({
  children,
  initialData = null,
  mode = "create",
  id,
}: EventDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handleCreate, res1, IsLoading, error1, reset1] = useRequestHook(
    "event/create-event",
    "POST",
    null
  );
  const [handleUpdate, res2, IsLoading1, error2, reset3] = useRequestHook(
    `event/${id}`,
    "POST",
    null
  );
  const { toast } = useToast();

  const isEdit = mode === "update";

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (isEdit) {
        await handleUpdate(data);
      } else {
        await handleCreate(data);
      }

      setOpen(false);
    } catch (error) {
      toast({
        message: "Error",
        description: `Failed to ${
          isEdit ? "update" : "create"
        } event. Please try again.`,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (res1 || res2) {
      if (isEdit) {
        toast({
          message: "Event Updated",
          description: "Your event has been updated successfully.",
          type: "success",
        });
      } else {
        toast({
          message: "Event created",
          description: "Your event has been created successfully.",
          type: "success",
        });
      }
    }
  }, [res1, res2]);

  useEffect(() => {
    if (error1 || error2) {
      if (isEdit) {
        toast({
          message: "Error in Update",
          description: error2,
          type: "error",
        });
      } else {
        toast({
          message: " creation error",
          description: error2,
          type: "error",
        });
      }
    }
  }, [error1, error2]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Event" : "Create New Event"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modify the details of the event. Click save when you're done."
              : "Fill in the details to create a new event. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <EventForm
          onSubmit={handleSubmit}
          initialData={initialData}
          isSubmitting={IsLoading || IsLoading1}
        />
      </DialogContent>
    </Dialog>
  );
}
