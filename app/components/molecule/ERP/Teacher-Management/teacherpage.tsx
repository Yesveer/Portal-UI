
"use client"
import { Plus } from "lucide-react"
import { Button } from "~/components/ui/button"
import { TeachersTable } from "./teacher-table"
import { TeachersTableSkeleton } from "./teacher-table-skeleton"
import { CreateTeacherDialog } from "./create-teacher-Dialog"

export default function TeachersPage() {
  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
          <p className="text-muted-foreground">Manage faculty members and their information.</p>
        </div>
        <CreateTeacherDialog>
          <Button size="sm" className="md:w-auto w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Teacher
          </Button>
        </CreateTeacherDialog>
      </div>


     
        <TeachersTable />
      
    </div>
  )
}
