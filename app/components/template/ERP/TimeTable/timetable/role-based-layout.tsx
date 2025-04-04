"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import ERPTimetableMolecule from "./timetable-molecule"

export default function RoleBasedLayout() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "teacher" | "student">("admin")

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Role-Based Timetable View</CardTitle>
          <CardDescription>Select a role to see how the timetable appears for different users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select
              value={selectedRole}
              onValueChange={(value: "admin" | "teacher" | "student") => setSelectedRole(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground">
              {selectedRole === "admin" && "Admins can create, edit, and delete timetable entries for all classes."}
              {selectedRole === "teacher" && "Teachers can view their assigned classes and schedules."}
              {selectedRole === "student" && "Students can view their class timetable."}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Viewing as:{" "}
          <span className="text-primary">{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
        </h2>
      </div>

      {/* The actual timetable component would need to accept a role prop */}
      <ERPTimetableMolecule />
    </div>
  )
}

