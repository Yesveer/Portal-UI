"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table1"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Check, X, Clock, AlertCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import type { UserRole, AttendanceRecord } from "~/types"


interface AttendanceListProps {
  date: Date
  userRole: UserRole
}

export function AttendanceList({ date, userRole }: AttendanceListProps) {
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" /> Present
          </Badge>
        )
      case "absent":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" /> Absent
          </Badge>
        )
      case "late":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> Late
          </Badge>
        )
      case "excused":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <AlertCircle className="h-3 w-3 mr-1" /> Excused
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Marked At</TableHead>
            <TableHead>Marked By</TableHead>
            {(userRole === "teacher" || userRole === "admin") && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.length > 0 ? (
            attendanceData.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.studentId.slice(0, 8)}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell>{record.class}</TableCell>
                <TableCell>{record.section}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell>{formatTime(record.markedAt)}</TableCell>
                <TableCell>{record.markedBy}</TableCell>
                {(userRole === "teacher" || userRole === "admin") && (
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateAttendance(record.studentId, "present")}>
                          Mark as Present
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAttendance(record.studentId, "absent")}>
                          Mark as Absent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAttendance(record.studentId, "late")}>
                          Mark as Late
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateAttendance(record.studentId, "excused")}>
                          Mark as Excused
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={userRole === "teacher" || userRole === "admin" ? 8 : 7} className="text-center py-6">
                No attendance records found for this date
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

