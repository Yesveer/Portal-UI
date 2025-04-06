"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { FiMoreVertical, FiEdit2, FiTrash2, FiCalendar, FiDollarSign, FiFileText, FiClock } from "react-icons/fi"
import { TbReload } from "react-icons/tb"
import { FcEmptyTrash } from "react-icons/fc"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Badge } from "~/components/ui/badge"
import { CreatePayrollForm } from "./payroll-creation-form"
import { PayrollEditDrawer } from "./payroll-edit"
import { PayrollAlertDelete } from "./payroll-alert-delete"
import { PayslipDialog } from "./payroll-payslip"
import { fetchPayrollData } from "./api"
import { IndianRupee } from "lucide-react"

// Types
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

interface User {
  _id: string
  name: string
  role: "admin" | "teacher" | "student"
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "processed":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}


const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}


const ERPPayrollMolecule = () => {
  const [data, setData] = useState<Payroll[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isPayslipOpen, setIsPayslipOpen] = useState(false)
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [currentView, setCurrentView] = useState<"all" | "processed" | "pending">("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all")

  // Mock current user - in a real app, this would come from auth context
  const [currentUser] = useState<User>({
    _id: "user123",
    name: "John Doe",
    role: "admin", // Change this to test different roles: "admin", "teacher"
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, you would pass the user role to filter data accordingly
        const { success, data, error } = await fetchPayrollData(currentUser.role, currentUser._id)
        if (success && data) {
          setData(data)
        } else {
          console.error("Failed to fetch payroll data:", error)
        }
      } catch (error) {
        console.error("Error fetching payroll data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey, currentUser.role, currentUser._id])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleEditClick = (payroll: Payroll) => {
    setSelectedPayroll(payroll)
    setIsEditOpen(true)
  }

  const handlePayslipClick = (payroll: Payroll) => {
    setSelectedPayroll(payroll)
    setIsPayslipOpen(true)
  }

  const filteredData = useMemo(() => {
    let filtered = data.filter((payroll) => {
      const nameMatch = payroll.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
      const departmentMatch = payroll.department.toLowerCase().includes(searchTerm.toLowerCase())
      const positionMatch = payroll.position.toLowerCase().includes(searchTerm.toLowerCase())

      return nameMatch || departmentMatch || positionMatch
    })

    // Filter by status
    if (currentView === "processed") {
      filtered = filtered.filter((payroll) => payroll.status === "processed")
    } else if (currentView === "pending") {
      filtered = filtered.filter((payroll) => payroll.status === "pending")
    }

    // Filter by period
    if (selectedPeriod !== "all") {
      if (selectedPeriod === "current") {
        const now = new Date()
        const currentMonth = now.getMonth() + 1
        const currentYear = now.getFullYear()

        filtered = filtered.filter((payroll) => {
          return Number.parseInt(payroll.month) === currentMonth && Number.parseInt(payroll.year) === currentYear
        })
      } else if (selectedPeriod === "previous") {
        const now = new Date()
        let prevMonth = now.getMonth() // 0-indexed
        let prevYear = now.getFullYear()

        if (prevMonth === 0) {
          prevMonth = 12
          prevYear -= 1
        }

        filtered = filtered.filter((payroll) => {
          return Number.parseInt(payroll.month) === prevMonth && Number.parseInt(payroll.year) === prevYear
        })
      }
    }

    return filtered
  }, [data, searchTerm, currentView, selectedPeriod])

  const totalSalary = useMemo(() => {
    return filteredData.reduce((total, payroll) => total + payroll.salary, 0)
  }, [filteredData])

  const totalDeductions = useMemo(() => {
    return filteredData.reduce((total, payroll) => total + payroll.deductions, 0)
  }, [filteredData])

  const totalNetPay = useMemo(() => {
    return filteredData.reduce((total, payroll) => total + payroll.netAmount, 0)
  }, [filteredData])

  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`
  }


  if (loading) {
    return <div className="p-4">Loading payroll information...</div>
  }

  const EmptyState = () => (
    <div className="text-center py-10 border rounded-lg">
      <div className="flex items-center justify-center">
        <FcEmptyTrash size={60} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 pt-5">No Payroll Records Available</h3>
      <p className="mt-1 text-sm text-gray-500">
        {currentUser.role === "admin"
          ? "Get started by creating a new payroll record."
          : "No payroll records have been processed yet."}
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
                + Add Payroll Record
              </Button>
              {isFormOpen && (
                <CreatePayrollForm
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
            placeholder="Search payroll..."
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
            </SelectContent>
          </Select>
          <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as "all" | "processed" | "pending")}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="processed">Processed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSalary)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Deductions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalDeductions)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Net Pay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalNetPay)}</div>
          </CardContent>
        </Card>
      </div>

      {filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {filteredData.map((payroll) => (
            <PayrollCard
              key={payroll._id}
              payroll={payroll}
              userRole={currentUser.role}
              onEdit={() => handleEditClick(payroll)}
              onDelete={() => setRefreshKey((prev) => prev + 1)}
              onPayslip={() => handlePayslipClick(payroll)}
            />
          ))}
        </div>
      )}

      {isEditOpen && selectedPayroll && (
        <PayrollEditDrawer
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          payrollData={selectedPayroll}
          onSuccess={() => setRefreshKey((prev) => prev + 1)}
        />
      )}

      {isPayslipOpen && selectedPayroll && (
        <PayslipDialog open={isPayslipOpen} onOpenChange={setIsPayslipOpen} payrollData={selectedPayroll} />
      )}
    </div>
  )
}

// Payroll Card component for displaying each payroll record
const PayrollCard = ({
  payroll,
  userRole,
  onEdit,
  onDelete,
  onPayslip,
}: {
  payroll: Payroll
  userRole: string
  onEdit: () => void
  onDelete: () => void
  onPayslip: () => void
}) => {
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

  const monthName = months[Number.parseInt(payroll.month) - 1]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{payroll.teacherName}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {payroll.position} - {payroll.department}
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <Badge className={getStatusColor(payroll.status)}>
              {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
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
                  <DropdownMenuItem onClick={onPayslip}>
                    <FiFileText className="mr-2 h-4 w-4" /> View Payslip
                  </DropdownMenuItem>
                  <PayrollAlertDelete
                    payrollId={payroll._id}
                    payrollTitle={`${payroll.teacherName}'s payroll for ${monthName} ${payroll.year}`}
                    onSuccess={onDelete}
                  >
                    <DropdownMenuItem className="text-red-600">
                      <FiTrash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </PayrollAlertDelete>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <FiCalendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              Period: {monthName} {payroll.year}
            </span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {payroll.status === "processed" ? `Processed: ${formatDate(payroll.processedDate)}` : "Not processed yet"}
            </span>
          </div>

          <div className="flex items-center mt-2">
            <IndianRupee className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              Salary: <span className="font-semibold">₹{payroll.salary.toFixed(2)}</span>
            </span>
          </div>
          <div className="flex items-center mt-2">
            <IndianRupee className="mr-2 h-4 w-4 text-red-500" />
            <span>
              Deductions: <span className="font-semibold text-red-500">₹{payroll.deductions.toFixed(2)}</span>
            </span>
          </div>

          <div className="col-span-2 mt-2">
            <div className="flex justify-between">
              <span className="font-medium">Net Pay:</span>
              <span className="font-bold text-green-600">₹{payroll.netAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button onClick={onPayslip} variant="outline" className="w-full">
          <FiFileText className="mr-2 h-4 w-4" /> View Payslip
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ERPPayrollMolecule

