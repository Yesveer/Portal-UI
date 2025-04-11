"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { useNavigate, useParams } from "react-router"
import { useToast } from "~/components/ui/toast-container"

export default function AddGradesPage() {
    const { id } = useParams();
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState("")
  const {toast}=useToast()
  const [assignments, setAssignments] = useState<
    Array<{
      _id: string
      title: string
      totalMarks: number
    }>
  >([])
  const [students, setStudents] = useState<
    Array<{
      _id: string
      name: string
      email: string
      marks: string
    }>
  >([])

  useEffect(() => {
    // In a real app, this would be API calls to fetch assignments and students
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock assignments data
        setAssignments([
          {
            _id: "assignment1",
            title: "Math Quiz",
            totalMarks: 100,
          },
          {
            _id: "assignment2",
            title: "Science Project",
            totalMarks: 50,
          },
        ])

        // Mock students data
        setStudents([
          {
            _id: "67f5861bd4f3906dc4566c28",
            name: "Alice Smith",
            email: "alice~example.com",
            marks: "",
          },
          {
            _id: "67f5861bd4f3906dc4566c29",
            name: "Bob Johnson",
            email: "bob~example.com",
            marks: "",
          },
          {
            _id: "67f5861bd4f3906dc4566c30",
            name: "Charlie Brown",
            email: "charlie~example.com",
            marks: "",
          },
        ])
      } catch (error) {
        toast({
          title: "Error fetching data",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleMarksChange = (id: string, value: string) => {
    setStudents((prev) => prev.map((student) => (student._id === id ? { ...student, marks: value } : student)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/classes/${params.id}/grades`, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     assignmentId: selectedAssignment,
      //     grades: students.map(s => ({ studentId: s._id, marks: s.marks }))
      //   })
      // })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Grades recorded successfully",
        description: `Grades for the selected assignment have been recorded.`,
      })

      router(`/classes/${params.id}?tab=grades`)
    } catch (error) {
      toast({
        message: "Error recording grades",
        description: "Something went wrong. Please try again.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedAssignmentData = assignments.find((a) => a._id === selectedAssignment)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Add Grades</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Grade Assignment</CardTitle>
              <CardDescription>Record grades for an assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="assignment">Select Assignment</Label>
                <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an assignment" />
                  </SelectTrigger>
                  <SelectContent>
                    {assignments.map((assignment) => (
                      <SelectItem key={assignment._id} value={assignment._id}>
                        {assignment.title} (Total: {assignment.totalMarks} marks)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedAssignment && (
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 font-medium border-b">
                      <div className="col-span-6">Student</div>
                      <div className="col-span-6">Marks (out of {selectedAssignmentData?.totalMarks})</div>
                    </div>
                    {students.map((student) => (
                      <div key={student._id} className="grid grid-cols-12 p-4 items-center hover:bg-muted/50">
                        <div className="col-span-6 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <div className="col-span-6">
                          <Input
                            type="number"
                            min="0"
                            max={selectedAssignmentData?.totalMarks.toString()}
                            value={student.marks}
                            onChange={(e) => handleMarksChange(student._id, e.target.value)}
                            placeholder={`Enter marks (0-${selectedAssignmentData?.totalMarks})`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router(-1)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || !selectedAssignment}>
                {isLoading ? "Saving..." : "Save Grades"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
