"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { recordFeePayment } from "./api"

const formSchema = z.object({
  amount: z.coerce.number().positive({ message: "Amount must be a positive number" }),
  method: z.string().min(1, { message: "Payment method is required" }),
  reference: z.string().optional(),
  date: z.string().min(1, { message: "Payment date is required" }),
})

interface Fee {
  _id: string
  studentId: string
  studentName: string
  class: string
  feeType: string
  amount: number
  dueDate: string
  status: "paid" | "pending" | "overdue" | "partial"
  paymentHistory: {
    _id: string
    amount: number
    date: string
    method: string
    reference: string
  }[]
  createdBy: {
    _id: string
    name: string
    role: string
  }
}

interface FeePaymentDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feeData: Fee
  onSuccess: () => void
}

export function FeePaymentDrawer({ open, onOpenChange, feeData, onSuccess }: FeePaymentDrawerProps) {
  // Calculate remaining amount to be paid
  const totalPaid = feeData.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
  const remainingAmount = feeData.amount - totalPaid

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: remainingAmount,
      method: "",
      reference: "",
      date: new Date().toISOString().split("T")[0],
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { success, error } = await recordFeePayment(feeData._id, values)
      if (success) {
        onOpenChange(false)
        onSuccess()
      } else {
        console.error("Failed to record payment:", error)
      }
    } catch (error) {
      console.error("Error recording payment:", error)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Record Fee Payment</DrawerTitle>
          <DrawerDescription>
            Record a payment for {feeData.feeType} fee of {feeData.studentName}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="mb-4 p-4 bg-muted rounded-md">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Fee Type:</span> {feeData.feeType}
              </div>
              <div>
                <span className="font-medium">Student:</span> {feeData.studentName}
              </div>
              <div>
                <span className="font-medium">Total Amount:</span> ${feeData.amount.toFixed(2)}
              </div>
              <div>
                <span className="font-medium">Already Paid:</span> ${totalPaid.toFixed(2)}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Remaining Balance:</span>{" "}
                <span className="text-primary font-bold">${remainingAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" max={remainingAmount} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="method"
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
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Debit Card">Debit Card</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="Online Payment">Online Payment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Transaction ID, Check Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DrawerFooter className="flex justify-between">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Record Payment"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

