"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { updatePayrollRecord } from "./api"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog"

const formSchema = z.object({
  teacherId: z.string().min(1, { message: "Teacher ID is required" }),
  teacherName: z.string().min(1, { message: "Teacher name is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  month: z.string().min(1, { message: "Month is required" }),
  year: z.string().min(1, { message: "Year is required" }),
  salary: z.coerce.number().positive({ message: "Salary must be a positive number" }),
  benefits: z.coerce.number().min(0, { message: "Benefits cannot be negative" }),
  deductions: z.coerce.number().min(0, { message: "Deductions cannot be negative" }),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
  accountDetails: z.string().min(1, { message: "Account details are required" }),
  status: z.enum(["processed", "pending", "cancelled"], {
    required_error: "Status is required",
  }),
})

interface Payroll {
  _id: string
  teacherId: string
  teacherName: string
  department: string
  position: string
  month: string
  year: string
  salary: number
  benefits: number
  deductions: number
  netAmount: number
  status: "processed" | "pending" | "cancelled"
  processedDate: string
  paymentMethod: string
  accountDetails: string
  createdBy: {
    _id: string
    name: string
    role: string
  }
}

interface PayrollEditDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payrollData: Payroll
  onSuccess: () => void
}

export function PayrollEditDrawer({ open, onOpenChange, payrollData, onSuccess }: PayrollEditDrawerProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherId: payrollData.teacherId || "",
      teacherName: payrollData.teacherName || "",
      department: payrollData.department || "",
      position: payrollData.position || "",
      month: payrollData.month || "",
      year: payrollData.year || "",
      salary: payrollData.salary || 0,
      benefits: payrollData.benefits || 0,
      deductions: payrollData.deductions || 0,
      paymentMethod: payrollData.paymentMethod || "",
      accountDetails: payrollData.accountDetails || "",
      status: payrollData.status || "pending",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  // Calculate net amount when salary, benefits or deductions change
  const salary = form.watch("salary") || 0
  const benefits = form.watch("benefits") || 0
  const deductions = form.watch("deductions") || 0
  const netAmount = salary + benefits - deductions

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Add net amount to values
      let processedDate = payrollData.processedDate
      // If changing from pending to processed, update the processed date
      if (payrollData.status !== "processed" && values.status === "processed") {
        processedDate = new Date().toISOString()
      }
      // If changing from processed to pending, clear the processed date
      if (payrollData.status === "processed" && values.status !== "processed") {
        processedDate = ""
      }

      const payrollUpdateData = {
        ...values,
        netAmount,
        processedDate,
      }

      const { success, error } = await updatePayrollRecord(payrollData._id, payrollUpdateData)
      if (success) {
        onOpenChange(false)
        onSuccess()
      } else {
        console.error("Failed to update payroll record:", error)
      }
    } catch (error) {
      console.error("Error updating payroll record:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Edit Payroll Record</DialogTitle>
          <DialogDescription>Make changes to the payroll record. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="teacherId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. TCH001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="teacherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Languages">Languages</SelectItem>
                          <SelectItem value="Social Studies">Social Studies</SelectItem>
                          <SelectItem value="Physical Education">Physical Education</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Junior Teacher">Junior Teacher</SelectItem>
                          <SelectItem value="Senior Teacher">Senior Teacher</SelectItem>
                          <SelectItem value="Head of Department">Head of Department</SelectItem>
                          <SelectItem value="Assistant Principal">Assistant Principal</SelectItem>
                          <SelectItem value="Principal">Principal</SelectItem>
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
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Month</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">January</SelectItem>
                          <SelectItem value="2">February</SelectItem>
                          <SelectItem value="3">March</SelectItem>
                          <SelectItem value="4">April</SelectItem>
                          <SelectItem value="5">May</SelectItem>
                          <SelectItem value="6">June</SelectItem>
                          <SelectItem value="7">July</SelectItem>
                          <SelectItem value="8">August</SelectItem>
                          <SelectItem value="9">September</SelectItem>
                          <SelectItem value="10">October</SelectItem>
                          <SelectItem value="11">November</SelectItem>
                          <SelectItem value="12">December</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2022">2022</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Basic Salary ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deductions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deductions ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="bg-muted p-3 rounded-md">
                <div className="flex justify-between font-medium">
                  <span>Net Amount:</span>
                  <span className="text-green-600">${netAmount.toFixed(2)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Check">Check</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Details</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Bank account number" {...field} />
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
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

