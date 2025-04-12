"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, User } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { format } from "date-fns"

// This would be replaced with your actual data fetching logic
interface EventDetail {
  _id: string
  title: string
  description: string
  eventType: "Seminar" | "Workshop" | "Holiday" | "Exam" | "Meeting" | "Festival" | "Other"
  location: string
  startDate: string
  endDate: string
  visibility: ("Admin" | "Teacher" | "Student" | "Accountant")[]
  createdBy: {
    _id: string
    name: string
    email: string
    role: string
  }
  createdAt: string
  updatedAt: string
}

// Mock data for preview
const eventMockData: EventDetail = {
  _id: "6579f1a2c912b830b8a0e123",
  title: "End of Year Faculty Meeting",
  description:
    "Join us for the end of year faculty meeting where we will discuss the achievements of the past year and plans for the upcoming academic term. All teaching staff are required to attend. We'll cover curriculum changes, student performance metrics, and department initiatives.",
  eventType: "Meeting",
  location: "Main Conference Hall, Building B",
  startDate: "2025-12-15T09:00:00Z",
  endDate: "2025-12-15T12:00:00Z",
  visibility: ["Admin", "Teacher"],
  createdBy: {
    _id: "6579f1a2c912b830b8a0e456",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson~example.edu",
    role: "Admin",
  },
  createdAt: "2023-12-15T10:30:00Z",
  updatedAt: "2023-12-15T10:30:00Z",
}

export default function ERPEventDetailsPageTem({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<EventDetail>(eventMockData)

  // In a real implementation, you would fetch the event data based on the ID
  // useEffect(() => {
  //   async function fetchEventData() {
  //     // Replace with your actual API fetch
  //     const response = await fetch(`/api/events/${params.id}`)
  //     const data = await response.json()
  //     setEvent(data)
  //   }
  //   fetchEventData()
  // }, [params.id])

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading event details...</p>
      </div>
    )
  }

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "PPP")
  }

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "p")
  }

  const eventTypeColors = {
    Seminar: "bg-emerald-100 text-emerald-800",
    Workshop: "bg-blue-100 text-blue-800",
    Holiday: "bg-purple-100 text-purple-800",
    Exam: "bg-red-100 text-red-800",
    Meeting: "bg-amber-100 text-amber-800",
    Festival: "bg-teal-100 text-teal-800",
    Other: "bg-gray-100 text-gray-800",
  }

  const visibilityIcons = {
    Admin: (
      <Badge variant="outline" className="bg-slate-100">
        Admin
      </Badge>
    ),
    Teacher: (
      <Badge variant="outline" className="bg-blue-50">
        Teacher
      </Badge>
    ),
    Student: (
      <Badge variant="outline" className="bg-green-50">
        Student
      </Badge>
    ),
    Accountant: (
      <Badge variant="outline" className="bg-amber-50">
        Accountant
      </Badge>
    ),
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center mb-2">
            <Badge className={eventTypeColors[event.eventType]}>{event.eventType}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Back</Button>
          <Button>Edit Event</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Created By</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium">{event.createdBy.name}</div>
                      <div className="text-sm text-gray-500">{event.createdBy.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="participants">
              <Card>
                <CardHeader>
                  <CardTitle>Visible To</CardTitle>
                  <CardDescription>This event is visible to the following user groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {event.visibility.map((role) => (
                      <div key={role}>{visibilityIcons[role]}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">{formatEventDate(event.startDate)}</div>
                  {formatEventDate(event.startDate) !== formatEventDate(event.endDate) && (
                    <div className="text-sm text-gray-500">to {formatEventDate(event.endDate)}</div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <div className="font-medium">
                    {formatEventTime(event.startDate)} - {formatEventTime(event.endDate)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div className="font-medium">{event.location}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                <div className="flex flex-wrap gap-2">
                  {event.visibility.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">{new Date(event.createdAt).toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
