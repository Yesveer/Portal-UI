"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Button } from "~/components/ui/button"
import { MoreHorizontal, Pencil, Trash, AlertCircle, LoaderCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
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

interface TimetableListProps {
  userRole: UserRole
  timetableData: any[]
  onDataChange: () => void
}

export function TimetableList({ userRole, timetableData, onDataChange }: TimetableListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

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
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Class</TableHead>
              {userRole === "admin" && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timetableData.length > 0 ? (
              timetableData.map((entry) => (
                <TableRow key={entry._id}>
                  <TableCell>{entry.day}</TableCell>
                  <TableCell>
                    {formatTime(entry.startTime)} - {formatTime(entry.endTime)}
                  </TableCell>
                  <TableCell className="font-medium">{entry.subject}</TableCell>
                  <TableCell>{entry.teacher}</TableCell>
                  <TableCell>{entry.room}</TableCell>
                  <TableCell>{entry.class}</TableCell>
                  {canEdit && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedEntryId(entry._id)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={canEdit ? 7 : 6} className="text-center py-6">
                  No timetable entries found
                </TableCell>
              </TableRow>
            )}
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
                  <LoaderCircle className="mr-2 animate-spin" />
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

