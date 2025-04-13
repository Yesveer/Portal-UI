"use client";
import { Suspense } from "react"
import { ChevronLeft, Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { UpdateTeacherDialog } from "../update-teacher-dialog"
import { TeacherDetailsSkeleton } from "./teacherSkeleton"
import { Link, useParams } from "react-router"

// This would come from your database in a real app
const getTeacherById = async (id: string) => {
  // Mock data for demonstration
  return {
    id: id,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson~school.edu",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    designation: "Associate Professor",
    joiningDate: "2018-08-15",
    qualifications: "Ph.D. in Mathematics, Stanford University",
    status: "active",
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    address: "123 University Ave, Academic City, CA 94305",
    bio: "Dr. Sarah Johnson is a distinguished mathematician with over 10 years of teaching experience. Her research focuses on applied mathematics and statistical modeling. She has published numerous papers in prestigious journals and has been recognized for her innovative teaching methods.",
    profileImage: "/placeholder.svg?height=200&width=200",
    classes: [
      { id: "c1", name: "Calculus 101", schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM", room: "Math Building 305" },
      { id: "c2", name: "Advanced Statistics", schedule: "Tue, Thu 2:00 PM - 3:30 PM", room: "Science Hall 210" },
      { id: "c3", name: "Linear Algebra", schedule: "Mon, Wed 1:00 PM - 2:30 PM", room: "Math Building 201" },
    ],
    publications: [
      {
        id: "p1",
        title: "Novel Approaches to Statistical Analysis in Education",
        year: "2021",
        journal: "Journal of Educational Mathematics",
      },
      {
        id: "p2",
        title: "Calculus Teaching Methods for the Digital Age",
        year: "2019",
        journal: "International Mathematics Education Review",
      },
    ],
    achievements: [
      { id: "a1", title: "Excellence in Teaching Award", year: "2022", issuer: "National Education Association" },
      { id: "a2", title: "Best Research Paper", year: "2020", issuer: "International Mathematics Conference" },
    ],
  }
}

export default async function TeacherDetailsPage() {
    const {id}=useParams()
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

      <Suspense fallback={<TeacherDetailsSkeleton />}>
        <TeacherDetails id={id} />
      </Suspense>
    </div>
  )
}

async function TeacherDetails({ id }: { id: string }) {
  const teacher = await getTeacherById(id)

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
              <AvatarImage src={teacher.profileImage || "/placeholder.svg"} alt={teacher.name} />
              <AvatarFallback>
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{teacher.name}</CardTitle>
            <CardDescription>{teacher.designation}</CardDescription>
            <Badge
              variant={teacher.status === "active" ? "outline" : "secondary"}
              className={`mt-2 ${teacher.status === "active" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"}`}
            >
              {teacher.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{teacher.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{teacher.address}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Joined: {new Date(teacher.joiningDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{teacher.qualifications}</span>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Subjects Taught:</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {teacher.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
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
            <TabsContent value="bio" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Biography</CardTitle>
                  <CardDescription>Professional background and expertise</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{teacher.bio}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="classes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Classes</CardTitle>
                  <CardDescription>Classes currently being taught</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.classes.map((cls) => (
                      <div key={cls.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{cls.name}</h3>
                        <p className="text-sm text-muted-foreground">Schedule: {cls.schedule}</p>
                        <p className="text-sm text-muted-foreground">Room: {cls.room}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="publications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Publications</CardTitle>
                  <CardDescription>Research papers and academic publications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.publications.map((pub) => (
                      <div key={pub.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{pub.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Published in {pub.journal}, {pub.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Awards and recognitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.achievements.map((achievement) => (
                      <div key={achievement.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.issuer}, {achievement.year}
                        </p>
                      </div>
                    ))}
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
