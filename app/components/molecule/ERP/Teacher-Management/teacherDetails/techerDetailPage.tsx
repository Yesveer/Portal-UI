"use client"
import { Suspense, useEffect } from "react"
import {
  ChevronLeft, Mail, Phone, MapPin, Calendar,
  GraduationCap, BookOpen
} from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle
} from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  Avatar, AvatarFallback, AvatarImage
} from "~/components/ui/avatar"
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "~/components/ui/tabs"
import { UpdateTeacherDialog } from "../update-teacher-dialog"
import { TeacherDetailsSkeleton } from "./teacherSkeleton"
import { Link, useParams } from "react-router"
import useRequestHook from "~/hooks/requestHook"

export default function TeacherDetailsPage() {
  const { id } = useParams()
  const [fetchTeacher, teacher, isLoading, error] = useRequestHook(`teacher/${id}`, "GET", null)

  useEffect(() => {
    fetchTeacher()
  }, [])

  if (isLoading) return <TeacherDetailsSkeleton />
  if (!teacher) return <p>No teacher found.</p>

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link to="/erp/teachers">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Teachers
          </Link>
        </Button>
      </div>
      <TeacherDetails teacher={teacher} />
    </div>
  )
}

function TeacherDetails({ teacher }) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Teacher Details</h1>
        <UpdateTeacherDialog teacher={teacher}>
          <Button>Edit Teacher</Button>
        </UpdateTeacherDialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={teacher?.profileImage || "/placeholder.svg"} alt={teacher?.name} />
              <AvatarFallback>
                {teacher?.name?.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{teacher?.name}</CardTitle>
            <CardDescription>{teacher?.designation}</CardDescription>
            <Badge
              variant={teacher?.status === "active" ? "outline" : "secondary"}
              className={`mt-2 ${teacher?.status === "active" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
            >
              {teacher?.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{teacher?.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{teacher?.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span> {`${teacher.address?.street}, ${teacher.address?.city}, ${teacher.address?.country}`}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Joined: {teacher?.joiningDate ? new Date(teacher.joiningDate).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{teacher?.qualifications}</span>
            </div>
            {teacher?.subjects?.length > 0 && (
              <div>
                <div className="flex items-center mb-2">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Subjects Taught:</span>
                </div>
                <div className="flex flex-wrap gap-2 pl-6">
                  {teacher.subjects.map((subject: string) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="bio">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="bio">Biography</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="bio">
              <Card>
                <CardHeader>
                  <CardTitle>Biography</CardTitle>
                  <CardDescription>Professional background and expertise</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{teacher?.bio || "No biography available."}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>Current Classes</CardTitle>
                  <CardDescription>Classes currently being taught</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher?.classesAssigned?.length > 0 ? (
                      teacher.classesAssigned.map((cls: any) => (
                        <div key={cls.id} className="border rounded-lg p-4">
                          <h3 className="font-medium">{cls.name}</h3>
                          {/* <p className="text-sm text-muted-foreground">Schedule: {cls.schedule}</p> */}
                          <p className="text-sm text-muted-foreground">Room: {cls.room}</p>
                        </div>
                      ))
                    ) : (
                      <p>No classes assigned.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="publications">
              <Card>
                <CardHeader>
                  <CardTitle>Publications</CardTitle>
                  <CardDescription>Research papers and academic publications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher?.publications?.length > 0 ? (
                      teacher.publications.map((pub: any) => (
                        <div key={pub.id} className="border rounded-lg p-4">
                          <h3 className="font-medium">{pub.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Published in {pub.journal}, {pub.year}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No publications listed.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Awards and recognitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher?.achievements?.length > 0 ? (
                      teacher.achievements.map((ach: any) => (
                        <div key={ach.id} className="border rounded-lg p-4">
                          <h3 className="font-medium">{ach.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {ach.issuer}, {ach.year}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No achievements listed.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
