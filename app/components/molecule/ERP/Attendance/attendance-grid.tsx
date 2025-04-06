"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Check, X, Clock, AlertCircle } from "lucide-react"
import type { UserRole, AttendanceRecord } from "~/types"

interface AttendanceGridProps {
  date: Date
  userRole: UserRole
}

export function AttendanceGrid({ date, userRole }: AttendanceGridProps) {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([])

  // Group students by class and section
  const groupedData: Record<string, AttendanceRecord[]> = {}

  attendanceData.forEach((record) => {
    const key = `${record.class}-${record.section}`
    if (!groupedData[key]) {
      groupedData[key] = []
    }
    groupedData[key].push(record)
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "absent":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "late":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "excused":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="h-4 w-4" />
      case "absent":
        return <X className="h-4 w-4" />
      case "late":
        return <Clock className="h-4 w-4" />
      case "excused":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const updateAttendance = (studentId: string, newStatus: "present" | "absent" | "late" | "excused") => {
    if (userRole !== "teacher" && userRole !== "admin") return

    setAttendanceData((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, status: newStatus, markedAt: new Date().toISOString() } : record,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {Object.keys(groupedData).length > 0 ? (
        Object.entries(groupedData).map(([classSection, students]) => {
          const [className, sectionName] = classSection.split("-")

          return (
            <Card key={classSection}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Class {className} - Section {sectionName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {students.map((student) => (
                    <div key={student.id} className="border rounded-lg p-3 flex flex-col space-y-2">
                      <div className="font-medium truncate">{student.studentName}</div>
                      <div className="text-sm text-muted-foreground">ID: {student.studentId.slice(0, 8)}</div>

                      {userRole === "teacher" || userRole === "admin" ? (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {["present", "absent", "late", "excused"].map((status) => (
                            <Button
                              key={status}
                              variant="ghost"
                              size="sm"
                              className={`px-2 py-1 rounded-full text-xs ${
                                student.status === status ? getStatusColor(status) : ""
                              }`}
                              onClick={() =>
                                updateAttendance(student.studentId, status as "present" | "absent" | "late" | "excused")
                              }
                            >
                              {getStatusIcon(status)}
                              <span className="ml-1 capitalize">{status}</span>
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <Badge variant="outline" className={`mt-auto ${getStatusColor(student.status)}`}>
                          {getStatusIcon(student.status)}
                          <span className="ml-1 capitalize">{student.status}</span>
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground">No attendance records found for this date</p>
            {(userRole === "teacher" || userRole === "admin") && <Button className="mt-4">Mark Attendance</Button>}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

