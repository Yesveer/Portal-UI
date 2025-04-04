"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import ERPFeesMolecule from "./fees-molecule"

export default function RoleBasedFeesLayout() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "student">("admin")

  return (
    <div className="container mx-auto py-6">
      {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>Role-Based Fees Management View</CardTitle>
          <CardDescription>
            Select a role to see how the fees management system appears for different users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Select value={selectedRole} onValueChange={(value: "admin" | "student") => setSelectedRole(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-sm text-muted-foreground">
              {selectedRole === "admin" && "Admins can create, edit, view, and delete fee records for all students."}
              {selectedRole === "student" && "Students can view their own fee records and make payments."}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Viewing as:{" "}
          <span className="text-primary">{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
        </h2>
      </div> */}

      <ERPFeesMolecule />
    </div>
  )
}

