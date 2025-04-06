"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Label } from "~/components/ui/label"
import { Check, X, Clock, AlertCircle } from "lucide-react"

import type { UserRole, Student } from "~/types"
import { fetchAllAttendance } from "~/routes/ERP/Attendance/api"

interface AttendanceFormProps {
  date: Date
  onClose: () => void
  onSubmit: () => void
}

export function AttendanceForm({ date, onClose, onSubmit }: AttendanceFormProps) {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSection, setSelectedSection] = useState("")
  const [attendanceData, setAttendanceData] = useState([])

  const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  const sections = ["A", "B", "C", "D"]


  useEffect(()=>{
const fetchAttendance=async()=>{
  try {
    const response = await fetchAllAttendance()
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    setAttendanceData(data)
  } catch (error) {
    console.error("Error fetching attendance data:", error)
    // Handle error appropriately, for example, show an error message to the user
  }
}
  },[])
  const filteredStudents = attendanceData.filter(
    (student) =>
      (!selectedClass || student?.class === selectedClass) && (!selectedSection || student.section === selectedSection),
  )

  const updateStatus = (studentId: string, status: "present" | "absent" | "late" | "excused") => {
    setAttendanceData((prev) => prev.map((student) => (student.id === studentId ? { ...student, status } : student)))
  }

  const handleSubmit = () => {
    // In a real app, this would save the attendance data to the server
    console.log("Submitting attendance for", date.toDateString(), attendanceData)
    onSubmit()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="h-4 w-4 text-green-600" />
      case "absent":
        return <X className="h-4 w-4 text-red-600" />
      case "late":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "excused":
        return <AlertCircle className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Mark Attendance for {date.toLocaleDateString()}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger id="class">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    Class {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger id="section">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    Section {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto border rounded-md">
         
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Attendance</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

