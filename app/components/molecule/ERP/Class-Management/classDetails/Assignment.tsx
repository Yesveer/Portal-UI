"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { DatePicker } from "~/components/ui/date-picker"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { useToast } from "~/components/ui/toast-container"

export default function NewAssignmentPage() {
    const { id } = useParams();
  const router = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {toast}=useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    totalMarks: "100",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, dueDate: date }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      // await fetch(`/api/classes/${params.id}/assignments`, { method: 'POST', body: JSON.stringify(formData) })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        message: "Assignment created successfully",
        description: `${formData.title} has been created.`,
        type:"success"
      })

      router(`/classes/${params.id}?tab=assignments`)
    } catch (error) {
      toast({
        message: "Error creating assignment",
        description: "Something went wrong. Please try again.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Create New Assignment</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>Create a new assignment for this class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Math Quiz"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter assignment description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <DatePicker date={formData.dueDate} setDate={handleDateChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    placeholder="e.g. 100"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router(-1)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Assignment"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
