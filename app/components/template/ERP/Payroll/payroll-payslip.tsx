"use client"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { FiDownload, FiPrinter } from "react-icons/fi"

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

interface PayslipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payrollData: Payroll
}

export function PayslipDialog({ open, onOpenChange, payrollData }: PayslipDialogProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF and download it
    alert("In a real application, this would download a PDF payslip")
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const monthName = months[Number.parseInt(payrollData.month) - 1]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Payslip</DialogTitle>
          <DialogDescription>
            Payslip for {payrollData.teacherName} - {monthName} {payrollData.year}
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 border rounded-md" id="payslip">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">School Name</h2>
            <p className="text-sm text-muted-foreground">123 Education Street, City, State 12345</p>
            <p className="text-sm text-muted-foreground">Phone: (123) 456-7890 | Email: info@school.com</p>
            <div className="mt-3 inline-block px-6 py-1 bg-primary/10 text-primary font-medium rounded-full">
              Payslip
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <span className="font-medium">Payroll ID:</span> {payrollData._id.slice(-6).toUpperCase()}
              </p>
              <p>
                <span className="font-medium">Employee ID:</span> {payrollData.teacherId}
              </p>
              <p>
                <span className="font-medium">Employee Name:</span> {payrollData.teacherName}
              </p>
              <p>
                <span className="font-medium">Department:</span> {payrollData.department}
              </p>
              <p>
                <span className="font-medium">Position:</span> {payrollData.position}
              </p>
            </div>
            <div className="text-right">
              <p>
                <span className="font-medium">Pay Period:</span> {monthName} {payrollData.year}
              </p>
              <p>
                <span className="font-medium">Process Date:</span> {formatDate(payrollData.processedDate)}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span> {payrollData.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Account:</span> {payrollData.accountDetails}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {payrollData.status.charAt(0).toUpperCase() + payrollData.status.slice(1)}
              </p>
            </div>
          </div>

          <div className="border-t border-b py-3 mb-4">
            <div className="grid grid-cols-3 font-medium text-sm">
              <div>Earnings</div>
              <div className="text-right">Amount</div>
              <div></div>
            </div>
          </div>

          <div className="grid grid-cols-3 text-sm mb-2">
            <div>Basic Salary</div>
            <div className="text-right">₹{payrollData.salary.toFixed(2)}</div>
            <div></div>
          </div>
          <div className="grid grid-cols-3 text-sm mb-4">
            <div>Benefits</div>
            <div className="text-right">₹{payrollData.benefits.toFixed(2)}</div>
            <div></div>
          </div>

          <div className="border-t border-b py-3 mb-4">
            <div className="grid grid-cols-3 font-medium text-sm">
              <div>Deductions</div>
              <div className="text-right">Amount</div>
              <div></div>
            </div>
          </div>

          <div className="grid grid-cols-3 text-sm mb-4">
            <div>Total Deductions</div>
            <div className="text-right text-red-500">₹{payrollData.deductions.toFixed(2)}</div>
            <div></div>
          </div>

          <div className="border-t pt-4 pb-2">
            <div className="grid grid-cols-3 font-semibold">
              <div>Total Earnings</div>
              <div className="text-right">₹{(payrollData.salary + payrollData.benefits).toFixed(2)}</div>
              <div></div>
            </div>
            <div className="grid grid-cols-3 font-semibold">
              <div>Total Deductions</div>
              <div className="text-right text-red-500">₹{payrollData.deductions.toFixed(2)}</div>
              <div></div>
            </div>
            <div className="grid grid-cols-3 font-bold text-lg mt-2">
              <div>Net Pay</div>
              <div className="text-right text-green-600">₹{payrollData.netAmount.toFixed(2)}</div>
              <div></div>
            </div>
          </div>

          <div className="mt-8 text-xs text-center text-muted-foreground">
            <p>This is a computer generated payslip and does not require a signature.</p>
          </div>
        </div>

        <DialogFooter>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint} disabled={isPrinting}>
              <FiPrinter className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button onClick={handleDownload}>
              <FiDownload className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

