"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { createTimetableEntry } from "./timetable-api"
import { LoaderCircle } from "lucide-react"

interface TimetableFormProps {
  onClose: () => void
  onSubmit: () => void
}

export function TimetableForm({ onClose, onSubmit }: TimetableFormProps) {
  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
    subject: "",
    teacher: "",
    room: "",
    class: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const subjects = ["Mathematics", "Science", "English", "History", "Geography", "Physics", "Chemistry", "Biology"]
  const teachers = ["Mr. Johnson", "Mrs. Smith", "Dr. Williams", "Ms. Davis", "Mr. Brown", "Mrs. Miller"]
  const classes = ["Class 10A", "Class 10B", "Class 11A", "Class 11B", "Class 12A", "Class 12B"]

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await createTimetableEntry(formData)

      if (response.success) {
        onSubmit()
      } else {
        console.error("Failed to create timetable entry:", response.error)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error creating timetable entry:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Timetable Entry</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="day">Day</Label>
            <Select value={formData.day} onValueChange={(value) => handleChange("day", value)}>
              <SelectTrigger id="day">
                <SelectValue placeholder="Select Day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Select value={formData.teacher} onValueChange={(value) => handleChange("teacher", value)}>
              <SelectTrigger id="teacher">
                <SelectValue placeholder="Select Teacher" />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher} value={teacher}>
                    {teacher}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Select value={formData.class} onValueChange={(value) => handleChange("class", value)}>
              <SelectTrigger id="class">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="room">Room</Label>
            <Input id="room" value={formData.room} onChange={(e) => handleChange("room", e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2  animate-spin " />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

