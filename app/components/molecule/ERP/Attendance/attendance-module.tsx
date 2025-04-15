"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Button } from "~/components/ui/button"
import { List, Grid3X3, Filter } from "lucide-react"
import { Calendar } from "~/components/ui/calendar"
import { AttendanceGrid } from "./attendance-grid"
import { AttendanceList } from "./attendance-list"
import { AttendanceForm } from "./attendance-form"
import { AttendanceReport } from "./attendance-report"
import type { UserRole, ViewMode } from "~/types"
import useRequestHook from "~/hooks/requestHook"

interface AttendanceModuleProps {
  userRole: UserRole
}

export function AttendanceModule({ userRole }: AttendanceModuleProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>({ mode: "grid" })
  const [showForm, setShowForm] = useState(false)
 const [fetchAttendance, attendance, isLoading, error ]= useRequestHook('attendance/all')

  const canMarkAttendance = userRole === "Teacher" || userRole === "Admin"

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="w-full md:w-auto">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="flex flex-col space-y-4 w-full">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode.mode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode({ mode: "grid" })}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid View
              </Button>
              <Button
                variant={viewMode.mode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode({ mode: "list" })}
              >
                <List className="h-4 w-4 mr-2" />
                List View
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              {canMarkAttendance && <Button onClick={() => setShowForm(true)}>Mark Attendance</Button>}
            </div>
          </div>

          {userRole === "Teacher" || userRole === "Admin" ? (
            <Tabs defaultValue="class">
              <TabsList>
                <TabsTrigger value="class">Class Attendance</TabsTrigger>
                <TabsTrigger value="report">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="class" className="space-y-4">
                {viewMode.mode === "grid" ? (
                  <AttendanceGrid date={date} userRole={userRole} />
                ) : (
                  <AttendanceList date={date} userRole={userRole} />
                )}
              </TabsContent>
              <TabsContent value="report">
                <AttendanceReport />
              </TabsContent>
            </Tabs>
          ) : userRole === "Student" ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <AttendanceList date={date} userRole={userRole} />
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="department">
              <TabsList>
                <TabsTrigger value="department">Department Attendance</TabsTrigger>
                <TabsTrigger value="report">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="department">
                {viewMode.mode === "grid" ? (
                  <AttendanceGrid date={date} userRole={userRole} />
                ) : (
                  <AttendanceList date={date} userRole={userRole} />
                )}
              </TabsContent>
              <TabsContent value="report">
                <AttendanceReport />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {showForm && (
        <AttendanceForm date={date} onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />
      )}
    </div>
  )
}

