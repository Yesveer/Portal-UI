"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import ERPPayrollMolecule from "./payroll-molecule"

export default function RoleBasedPayrollLayout() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "teacher">("admin")

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Role-Based Payroll Management View</CardTitle>
          <CardDescription>
            Select a role to see how the payroll management system appears for different users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedRole} onValueChange={(value: "admin" | "teacher") => setSelectedRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground">
              {selectedRole === "admin" &&
                "Admins can create, edit, view, and delete payroll records for all teachers."}
              {selectedRole === "teacher" && "Teachers can view their own payroll records and payslips."}
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

      <ERPPayrollMolecule />
    </div>
  )
}

