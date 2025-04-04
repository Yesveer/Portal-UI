"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router"
import { FiMoreVertical, FiEdit2, FiTrash2, FiCalendar, FiClock } from "react-icons/fi"
import { TbReload } from "react-icons/tb"
import { FcEmptyTrash } from "react-icons/fc"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Input } from "~/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { CreateTimetableForm } from "./timetable-creation-form"
import { TimetableEditDrawer } from "./timetable-edit"
import { TimetableAlertDelete } from "./timetable-alert-delete"
import { fetchTimetableData } from "./api"

// Types
interface TimeSlot {
  _id: string
  day: string
  startTime: string
  endTime: string
  subject: string
  teacher: string
  room: string
  class: string
  createdBy: {
    _id: string
    name: string
    role: string
  }
}

interface User {
  _id: string
  name: string
  role: "admin" | "teacher" | "student"
}

const ERPTimetableMolecule = () => {
  const [data, setData] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [currentView, setCurrentView] = useState<"day" | "week">("week")
  const [selectedDay, setSelectedDay] = useState<string>("Monday")
  const navigate = useNavigate()

  // Mock current user - in a real app, this would come from auth context
  const [currentUser] = useState<User>({
    _id: "user123",
    name: "John Doe",
    role: "admin", // Change this to test different roles: "admin", "teacher", "student"
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // In a real app, you would pass the user role to filter data accordingly
        const { success, data, error } = await fetchTimetableData(currentUser.role)
        if (success && data) {
          setData(data)
        } else {
          console.error("Failed to fetch timetable data:", error)
        }
      } catch (error) {
        console.error("Error fetching timetable data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshKey, currentUser.role])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleEditClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setIsEditOpen(true)
  }

  const filteredData = useMemo(() => {
    return data.filter((slot) => {
      const subjectMatch = slot.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || false
      const teacherMatch = slot.teacher?.toLowerCase().includes(searchTerm.toLowerCase()) || false
      const roomMatch = slot.room?.toLowerCase().includes(searchTerm.toLowerCase()) || false
      const classMatch = slot.class?.toLowerCase().includes(searchTerm.toLowerCase()) || false

      return subjectMatch || teacherMatch || roomMatch || classMatch
    })
  }, [data, searchTerm])

  const dayFilteredData = useMemo(() => {
    if (currentView === "day") {
      return filteredData.filter((slot) => slot.day === selectedDay)
    }
    return filteredData
  }, [filteredData, currentView, selectedDay])

  // Group data by day for week view
  const groupedByDay = useMemo(() => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const grouped: Record<string, TimeSlot[]> = {}

    days.forEach((day) => {
      grouped[day] = dayFilteredData
        .filter((slot) => slot.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
    })

    return grouped
  }, [dayFilteredData])

  // Format time for display
  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":")
      const hour = Number.parseInt(hours)
      const ampm = hour >= 12 ? "PM" : "AM"
      const formattedHour = hour % 12 || 12
      return `${formattedHour}:${minutes} ${ampm}`
    } catch (e) {
      return time
    }
  }

  if (loading) {
    return <div className="p-4">Loading timetable...</div>
  }

  const EmptyState = () => (
    <div className="text-center py-10 border rounded-lg">
      <div className="flex items-center justify-center">
        <FcEmptyTrash size={60} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 pt-5">No Timetable Entries Available</h3>
      <p className="mt-1 text-sm text-gray-500">
        {currentUser.role === "admin"
          ? "Get started by creating a new timetable entry."
          : "No timetable entries have been assigned yet."}
      </p>
    </div>
  )

  const DayView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Select value={selectedDay} onValueChange={(value) => setSelectedDay(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monday">Monday</SelectItem>
            <SelectItem value="Tuesday">Tuesday</SelectItem>
            <SelectItem value="Wednesday">Wednesday</SelectItem>
            <SelectItem value="Thursday">Thursday</SelectItem>
            <SelectItem value="Friday">Friday</SelectItem>
            <SelectItem value="Saturday">Saturday</SelectItem>
            <SelectItem value="Sunday">Sunday</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {groupedByDay[selectedDay].length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {groupedByDay[selectedDay].map((slot, index) => (
            <TimeSlotCard
              key={slot._id || index}
              slot={slot}
              userRole={currentUser.role}
              onEdit={() => handleEditClick(slot)}
              onDelete={() => setRefreshKey((prev) => prev + 1)}
            />
          ))}
        </div>
      )}
    </div>
  )

  const WeekView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            {Object.keys(groupedByDay).map((day) => (
              <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {generateTimeSlots().map((time, timeIndex) => (
            <tr key={timeIndex} className={timeIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{time}</td>
              {Object.keys(groupedByDay).map((day) => {
                const slotsAtTime = groupedByDay[day].filter((slot) => formatTime(slot.startTime) === time)

                return (
                  <td key={`${day}-${time}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {slotsAtTime.length > 0 ? (
                      <div className="space-y-2">
                        {slotsAtTime.map((slot, i) => (
                          <div key={i} className="p-2 bg-blue-50 rounded border border-blue-200">
                            <div className="font-medium">{slot.subject}</div>
                            <div className="text-xs">Room: {slot.room}</div>
                            <div className="text-xs">Teacher: {slot.teacher}</div>
                            {currentUser.role === "admin" && (
                              <div className="mt-1 flex space-x-1">
                                <button
                                  onClick={() => handleEditClick(slot)}
                                  className="text-xs text-blue-600 hover:text-blue-800"
                                >
                                  Edit
                                </button>
                                <TimetableAlertDelete
                                  timetableId={slot._id}
                                  timetableTitle={`${slot.subject} (${slot.day} ${slot.startTime})`}
                                  onSuccess={() => setRefreshKey((prev) => prev + 1)}
                                >
                                  <button className="text-xs text-red-600 hover:text-red-800">Delete</button>
                                </TimetableAlertDelete>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Generate time slots for the week view
  function generateTimeSlots() {
    const times = []
    for (let hour = 8; hour <= 17; hour++) {
      const ampm = hour >= 12 ? "PM" : "AM"
      const formattedHour = hour % 12 || 12
      times.push(`${formattedHour}:00 ${ampm}`)
    }
    return times
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border">
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <div className="sm:mt-0 flex inline-flex items-center gap-2">
          {currentUser.role === "admin" && (
            <>
              <Button variant="outline" onClick={() => setIsFormOpen(true)}>
                + Add Timetable Entry
              </Button>
              {isFormOpen && (
                <CreateTimetableForm
                  open={isFormOpen}
                  onOpenChange={setIsFormOpen}
                  onSuccess={() => setRefreshKey((prev) => prev + 1)}
                />
              )}
            </>
          )}
          <Button variant="outline" onClick={() => setRefreshKey((prev) => prev + 1)}>
            <TbReload className="mr-1" /> Reload
          </Button>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search timetable..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-48"
          />
          <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as "day" | "week")}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {dayFilteredData.length === 0 ? <EmptyState /> : currentView === "day" ? <DayView /> : <WeekView />}

      {isEditOpen && selectedTimeSlot && (
        <TimetableEditDrawer
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          timetableData={selectedTimeSlot}
          onSuccess={() => setRefreshKey((prev) => prev + 1)}
        />
      )}
    </div>
  )
}

// TimeSlotCard component for day view
const TimeSlotCard = ({
  slot,
  userRole,
  onEdit,
  onDelete,
}: {
  slot: TimeSlot
  userRole: string
  onEdit: () => void
  onDelete: () => void
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{slot.subject}</CardTitle>
          {userRole === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <FiMoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <FiEdit2 className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <TimetableAlertDelete
                  timetableId={slot._id}
                  timetableTitle={`${slot.subject} (${slot.day} ${slot.startTime})`}
                  onSuccess={onDelete}
                >
                  <DropdownMenuItem className="text-red-600">
                    <FiTrash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </TimetableAlertDelete>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <FiClock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{`${slot.startTime} - ${slot.endTime}`}</span>
          </div>
          <div className="flex items-center">
            <FiCalendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{slot.day}</span>
          </div>
          <div className="col-span-2">
            <span className="font-medium">Teacher:</span> {slot.teacher}
          </div>
          <div className="col-span-2">
            <span className="font-medium">Room:</span> {slot.room}
          </div>
          {userRole === "admin" && (
            <div className="col-span-2">
              <span className="font-medium">Class:</span> {slot.class}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ERPTimetableMolecule

