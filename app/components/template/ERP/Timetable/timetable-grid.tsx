"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { Pencil, Trash, AlertCircle, LoaderCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import type { UserRole } from "~/types"
import { deleteTimetableEntry } from "./timetable-api"
import { formatTime } from "~/lib/utils"
import { useToast } from "~/components/ui/toast-container"

interface TimetableGridProps {
  userRole: UserRole
  timetableData: any[]
  onDataChange: () => void
}

export function TimetableGrid({ userRole, timetableData, onDataChange }: TimetableGridProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const periods = [1, 2, 3, 4, 5, 6, 7, 8]

  // Group timetable entries by day and period
  const groupedData: Record<string, any> = {}

  timetableData.forEach((entry) => {
    // Extract period from time
    const hour = Number.parseInt(entry.startTime.split(":")[0])
    const period = Math.floor((hour - 8) / 2) + 1

    const key = `${entry.day}-${period}`
    groupedData[key] = entry
  })

  const getEntryForDayAndPeriod = (day: string, period: number) => {
    return groupedData[`${day}-${period}`]
  }

  const handleDelete = async () => {
    if (!selectedEntryId) return

    setIsDeleting(true)

    try {
      const response = await deleteTimetableEntry(selectedEntryId)

      if (response.success) {
        toast({
          title: "Success",
          description: "Timetable entry has been deleted",
          variant: "success",
        })
        onDataChange()
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete timetable entry",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setSelectedEntryId(null)
    }
  }

  const canEdit = userRole === "admin"

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Period</TableHead>
              {days.map((day) => (
                <TableHead key={day}>{day}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {periods.map((period) => (
              <TableRow key={period}>
                <TableCell className="font-medium">{period}</TableCell>
                {days.map((day) => {
                  const entry = getEntryForDayAndPeriod(day, period)

                  return (
                    <TableCell key={day} className="min-w-[150px]">
                      {entry ? (
                        <div className="p-2 bg-muted rounded-md">
                          <div className="font-medium">{entry.subject}</div>
                          <div className="text-xs text-muted-foreground">
                            {entry.teacher} • {entry.room}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatTime(entry.startTime)} - {formatTime(entry.endTime)}
                          </div>
                          {canEdit && (
                            <div className="flex gap-1 mt-2">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-500"
                                onClick={() => {
                                  setSelectedEntryId(entry._id)
                                  setDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-[80px] flex items-center justify-center">
                          {canEdit && (
                            <Button variant="ghost" size="sm" className="text-xs">
                              + Add Class
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the timetable entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? (
                <>
                  <LoaderCircle  className="mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

