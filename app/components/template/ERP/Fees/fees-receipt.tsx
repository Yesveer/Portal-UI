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

interface FeeReceiptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feeData: Fee
}

export function FeeReceiptDialog({ open, onOpenChange, feeData }: any) {
  const totalPaid =  feeData?.paidamount
  const remainingAmount = feeData?.amount - totalPaid
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
    alert("In a real application, this would download a PDF receipt")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Fee Receipt</DialogTitle>
          <DialogDescription>Fee payment receipt for {feeData?.studentName}</DialogDescription>
        </DialogHeader>

        <div className="p-4 border rounded-md" id="receipt">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">School Name</h2>
            <p className="text-sm text-muted-foreground">123 Education Street, City, State 12345</p>
            <p className="text-sm text-muted-foreground">Phone: (123) 456-7890 | Email: info~school.com</p>
            <div className="mt-3 inline-block px-6 py-1 bg-primary/10 text-primary font-medium rounded-full">
              Fee Receipt
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p>
                <span className="font-medium">Receipt No:</span> {feeData?._id?.slice(-6).toUpperCase()}
              </p>
              <p>
                <span className="font-medium">Student ID:</span> {feeData?.studentId}
              </p>
              <p>
                <span className="font-medium">Student Name:</span> {feeData?.studentName}
              </p>
              <p>
                <span className="font-medium">Class:</span> {feeData?.class}
              </p>
            </div>
            <div className="text-right">
              <p>
                <span className="font-medium">Date:</span> {new Date().toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Academic Year:</span> 2023-2024
              </p>
              <p>
                <span className="font-medium">Fee Type:</span> {feeData?.feeType}
              </p>
              <p>
                <span className="font-medium">Due Date:</span> {formatDate(feeData?.dueDate)}
              </p>
            </div>
          </div>

          <div className="border-t border-b py-3 mb-4">
            <div className="grid grid-cols-5 font-medium text-sm">
              <div>Payment Date</div>
              <div className="col-span-2">Method</div>
              <div>Reference</div>
              <div className="text-right">Amount</div>
            </div>
          </div>

          {feeData?.paymentHistory?.length > 0 ? (
            <div className="space-y-2 mb-4">
              {feeData?.paymentHistory.map((payment, index) => (
                <div key={payment?._id || index} className="grid grid-cols-5 text-sm">
                  <div>{formatDate(payment.date)}</div>
                  <div className="col-span-2">{payment.method}</div>
                  <div>{payment.reference || "-"}</div>
                  <div className="text-right">₹{payment.amount?.toFixed(2)}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground italic">No payments recorded yet</div>
          )}

          <div className="border-t pt-3">
            <div className="grid grid-cols-2 text-sm">
              <div className="font-medium">Total Fee Amount:</div>
              <div className="text-right">₹{feeData?.amount?.toFixed(2)}</div>

              <div className="font-medium">Total Paid:</div>
              <div className="text-right">₹{totalPaid?.toFixed(2)}</div>

              <div className="font-medium">Balance Due:</div>
              <div className="text-right font-bold">₹{remainingAmount?.toFixed(2)}</div>

              <div className="font-medium">Status:</div>
              <div className="text-right">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    feeData?.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : feeData?.status === "partial"
                        ? "bg-blue-100 text-blue-800"
                        : feeData?.status === "overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {feeData?.status?.charAt(0).toUpperCase() + feeData.status?.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-center text-muted-foreground">
            <p>This is a computer generated receipt and does not require a signature.</p>
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

