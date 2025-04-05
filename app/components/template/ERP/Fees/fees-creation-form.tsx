"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { createFee } from "./api"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
  studentId: z.string().min(1, { message: "Student ID is required" }),
  studentName: z.string().min(1, { message: "Student name is required" }),
  class: z.string().min(1, { message: "Class is required" }),
  feeType: z.string().min(1, { message: "Fee type is required" }),
  amount: z.coerce.number().positive({ message: "Amount must be a positive number" }),
  dueDate: z.string().min(1, { message: "Due date is required" }),
  status: z.enum(["paid", "pending", "overdue", "partial"], {
    required_error: "Status is required",
  }),
})

interface CreateFeeFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateFeeForm({ open, onOpenChange, onSuccess }: CreateFeeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
      studentName: "",
      class: "",
      feeType: "",
      amount: 0,
      dueDate: new Date().toISOString().split("T")[0],
      status: "pending",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { success, error } = await createFee(values)
      if (success) {
        form.reset()
        onOpenChange(false)
        onSuccess()
      } else {
        console.error("Failed to create fee record:", error)
      }
    } catch (error) {
      console.error("Error creating fee record:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Fee Record</DialogTitle>
          <DialogDescription>Create a new fee record for a student. Fill in all the required fields.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. STU001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Class 10A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feeType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                        <SelectItem value="Exam Fee">Exam Fee</SelectItem>
                        <SelectItem value="Library Fee">Library Fee</SelectItem>
                        <SelectItem value="Transport Fee">Transport Fee</SelectItem>
                        <SelectItem value="Lab Fee">Lab Fee</SelectItem>
                        <SelectItem value="Annual Fee">Annual Fee</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="partial">Partially Paid</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Fee Record"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

