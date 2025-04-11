"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { useNavigate } from "react-router"
import { useToast } from "~/components/ui/toast-container"

export default function EditClassPage({ params }: { params: { id: string } }) {
  const router = useNavigate()
 const {toast}= useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    description: "",
    classTeacher: "",
  })

  useEffect(() => {
    // In a real app, this would be an API call to fetch the class data
    // Simulating data fetch
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock data
        setFormData({
          name: `Class ${6 + Number.parseInt(params.id)}`,
          section: "A",
          description: "Environmental Science and Math",
          classTeacher: "1", // ID of the teacher
        })
      } catch (error) {
        toast({
          message: "Error fetching class data",
          description: "Something went wrong. Please try again.",
          type: "error",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/classes/${params.id}`, { method: 'PUT', body: JSON.stringify(formData) })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        message: "Class updated successfully",
        description: `${formData.name} Section ${formData.section} has been updated.`,
      })

      router(`/classes/${params.id}`)
    } catch (error) {
      toast({
        title: "Error updating class",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/classes/${params.id}`, { method: 'DELETE' })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Class deleted successfully",
        description: `${formData.name} has been deleted.`,
      })

      router.push("/classes")
    } catch (error) {
      toast({
        title: "Error deleting class",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading && Object.values(formData).every((val) => val === "")) {
    return (
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Edit Class</h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading class data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Edit Class</h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Class</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the class and remove all associated data
                  including students, assignments, and grades.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
              <CardDescription>Update the details for this class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Class Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Class 6"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    name="section"
                    placeholder="e.g. A"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter class description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classTeacher">Class Teacher</Label>
                <Select
                  value={formData.classTeacher}
                  onValueChange={(value) => handleSelectChange("classTeacher", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">John Smith</SelectItem>
                    <SelectItem value="2">Sarah Johnson</SelectItem>
                    <SelectItem value="3">Michael Brown</SelectItem>
                    <SelectItem value="4">Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
