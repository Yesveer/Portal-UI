"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { FiMoreVertical, FiEdit2, FiTrash2, FiCalendar, FiDollarSign, FiFileText, FiDownload } from "react-icons/fi"
import { TbReload } from "react-icons/tb"
import { FcEmptyTrash } from "react-icons/fc"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { CreateFeeForm } from "./fees-creation-form"
// import { FeeEditDrawer } from "./fees-edit"
import { FeeAlertDelete } from "./fees-alert-delete"
// import { FeePaymentDrawer } from "./fees-payment"
// import { FeeReceiptDialog } from "./fees-receipt"
import { fetchFees } from "./api"
import { IndianRupee } from "lucide-react"
import { FeeReceiptDialog } from "./fees-receipt"

// Types
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

interface User {
  _id: string
  name: string
  role: "admin" | "teacher" | "student"
}



const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    case "partial":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}


const ERPFeesMolecule = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState<Fee | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [currentView, setCurrentView] = useState<"all" | "pending" | "paid">("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all")

  // Mock current user - in a real app, this would come from auth context
  const [currentUser] = useState<User>({
    _id: "user123",
    name: "John Doe",
    role: "admin", // Change this to test different roles: "admin", "student"
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, you would pass the user role to filter data accordingly
        const { success, data, error } = await fetchFees()
        if (success && data) {
          setData(data)
        } else {
          console.error("Failed to fetch fees data:", error)
        }
      } catch (error) {
        console.error("Error fetching fees data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey, currentUser.role, currentUser._id])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleEditClick = (fee: Fee) => {
    setSelectedFee(fee)
    setIsEditOpen(true)
  }

  const handlePaymentClick = (fee: Fee) => {
    setSelectedFee(fee)
    setIsPaymentOpen(true)
  }

  const handleReceiptClick = (fee: Fee) => {
    setSelectedFee(fee)
    setIsReceiptOpen(true)
  }

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return []
    let filtered = data?.filter((fee) => {
      const nameMatch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      const typeMatch = fee.feeType.toLowerCase().includes(searchTerm.toLowerCase())
      const classMatch = fee.class.toLowerCase().includes(searchTerm.toLowerCase())

      return nameMatch || typeMatch || classMatch
    })

    // Filter by status
    if (currentView === "pending") {
      filtered = filtered.filter(
        (fee) => fee.status === "pending" || fee.status === "overdue" || fee.status === "partial",
      )
    } else if (currentView === "paid") {
      filtered = filtered?.filter((fee) => fee.status === "paid")
    }

    // Filter by period
    if (selectedPeriod !== "all") {
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      if (selectedPeriod === "current") {
        filtered = filtered.filter((fee) => {
          const dueDate = new Date(fee.dueDate)
          return dueDate.getMonth() === currentMonth && dueDate.getFullYear() === currentYear
        })
      } else if (selectedPeriod === "previous") {
        filtered = filtered.filter((fee) => {
          const dueDate = new Date(fee.dueDate)
          const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
          const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
          return dueDate.getMonth() === prevMonth && dueDate.getFullYear() === prevYear
        })
      } else if (selectedPeriod === "next") {
        filtered = filtered.filter((fee) => {
          const dueDate = new Date(fee.dueDate)
          const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
          const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
          return dueDate.getMonth() === nextMonth && dueDate.getFullYear() === nextYear
        })
      }
    }

    return filtered
  }, [data, searchTerm, currentView, selectedPeriod])

  const totalFees = useMemo(() => {
    return filteredData.reduce((total, fee) => total + fee.amount, 0)
  }, [filteredData])

  const totalPaid = useMemo(() => {
    return filteredData.reduce((total, fee) => {
      if (fee.status === "paid") {
        return total + fee.amount
      } else if (fee.status === "partial") {
        return total + fee.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)
      }
      return total
    }, 0)
  }, [filteredData])

  const formatCurrency = (amount: number) => {
    return `₹${amount?.toFixed(2)}`
  }
  if (loading) {
    return <div className="p-4">Loading fees information...</div>
  }

  const EmptyState = () => (
    <div className="text-center py-10 border rounded-lg">
      <div className="flex items-center justify-center">
        <FcEmptyTrash size={60} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 pt-5">No Fee Records Available</h3>
      <p className="mt-1 text-sm text-gray-500">
        {currentUser.role === "admin"
          ? "Get started by creating a new fee record."
          : "No fee records have been assigned yet."}
      </p>
    </div>
  )

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <div className="sm:mt-0 flex inline-flex items-center gap-2">
          {currentUser.role === "admin" && (
            <>
              <Button variant="outline" onClick={() => setIsFormOpen(true)}>
                + Add Fee Record
              </Button>
              {isFormOpen && (
                <CreateFeeForm
                  open={isFormOpen}
                  onOpenChange={setIsFormOpen}
                  onSuccess={() => setRefreshKey((prev) => prev + 1)}
                />
              )}
            </>
          )}
          <Button variant="outline" onClick={() => setRefreshKey((prev) => prev + 1)}>
            <TbReload className="mr-1" /> Reload
          </Button>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <Input
            type="text"
            placeholder="Search fees..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-48"
          />
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="previous">Previous Month</SelectItem>
              <SelectItem value="next">Next Month</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as "all" | "pending" | "paid")}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>



      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalFees)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Paid Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Collection Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{((totalPaid / (totalFees || 1)) * 100)?.toFixed(1)}%</span>
                <span>
                  {formatCurrency(totalPaid)} / {formatCurrency(totalFees)}
                </span>
              </div>
              <Progress value={(totalPaid / (totalFees || 1)) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {data?.data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {data?.data.map((fee) => (
            <FeeCard
              key={fee._id}
              fee={fee}
              userRole={currentUser.role}
              onEdit={() => handleEditClick(fee)}
              onDelete={() => setRefreshKey((prev) => prev + 1)}
              onPayment={() => handlePaymentClick(fee)}
              onReceipt={() => handleReceiptClick(fee)}
            />
          ))}
        </div>
      )}

      {isEditOpen && selectedFee && (
        <FeeEditDrawer
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          feeData={selectedFee}
          onSuccess={() => setRefreshKey((prev) => prev + 1)}
        />
      )}

      {isPaymentOpen && selectedFee && (
        <FeePaymentDrawer
          open={isPaymentOpen}
          onOpenChange={setIsPaymentOpen}
          feeData={selectedFee}
          onSuccess={() => setRefreshKey((prev) => prev + 1)}
        />
      )}

      {isReceiptOpen && selectedFee && (
        <FeeReceiptDialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen} feeData={selectedFee} />
      )}
    </div>
  )
}

// Fee Card component for displaying each fee record
const FeeCard = ({
  fee,
  userRole,
  onEdit,
  onDelete,
  onPayment,
  onReceipt,
}: {
  fee: Fee
  userRole: string
  onEdit: () => void
  onDelete: () => void
  onPayment: () => void
  onReceipt: () => void
}) => {
  // Calculate total paid amount
  const totalPaid = fee?.paymentStatus
  const isPaid = fee.status === "paid"
  const isPartial = fee.status === "partial"
  const isOverdue = fee.status === "overdue"

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "partial":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{fee.feeType}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {fee?.students?.name} - {fee?.class?.name}
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <Badge className={getStatusColor(fee.status)}>
              {fee.paymentStatus.charAt(0).toUpperCase() + fee.paymentStatus.slice(1)}
            </Badge>
            {userRole === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <FiMoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit}>
                    <FiEdit2 className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  {!isPaid && (
                    <DropdownMenuItem onClick={onPayment}>
                      <FiDollarSign className="mr-2 h-4 w-4" /> Record Payment
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={onReceipt}>
                    <FiFileText className="mr-2 h-4 w-4" /> View Receipt
                  </DropdownMenuItem>
                  <FeeAlertDelete
                    feeId={fee._id}
                    feeTitle={`${fee.feeType} for ${fee.studentName}`}
                    onSuccess={onDelete}
                  >
                    <DropdownMenuItem className="text-red-600">
                      <FiTrash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </FeeAlertDelete>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <IndianRupee className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              Amount: <span className="font-semibold">{fee.amount?.toFixed(2)}</span>
            </span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Due Date: {new Date(fee.dueDate).toLocaleDateString()}</span>
          </div>

          {(isPartial || isPaid) && (
            <div className="col-span-2 mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Payment Progress:</span>
                <span>
                  {totalPaid?.toFixed(2)} / {fee.amount?.toFixed(2)}
                </span>
              </div>
              <Progress value={(totalPaid / fee.amount) * 100} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        {!isPaid && userRole === "student" && (
          <Button onClick={onPayment} variant="outline" className="w-full">
            <FiDollarSign className="mr-2 h-4 w-4" /> Make Payment
          </Button>
        )}
        {(isPaid || isPartial) && (
          <Button onClick={onReceipt} variant="outline" className="w-full">
            <FiDownload className="mr-2 h-4 w-4" /> Download Receipt
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ERPFeesMolecule

