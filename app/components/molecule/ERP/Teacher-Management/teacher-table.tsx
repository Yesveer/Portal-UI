"use client";

import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  Mail,
  Phone,
  Eye,
  Edit,
  Trash,
  CheckCircle,
  XCircle,
  Download,
  Table2Icon,
  Grid,
  Table2,
  Grid2X2,
  Grid2X2Icon,
  TableOfContents,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table1";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { UpdateTeacherDialog } from "./update-teacher-dialog";
import { useToast } from "~/components/ui/toast-container";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import useRequestHook from "~/hooks/requestHook";
import { TeachersTableSkeleton } from "./teacher-table-skeleton";

// Mock data for teachers
const mockTeachers = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson~school.edu",
    phone: "+1 (555) 123-4567",
    department: "Mathematics",
    designation: "Associate Professor",
    joiningDate: "2018-08-15",
    qualifications: "Ph.D. in Mathematics, Stanford University",
    status: "active",
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    email: "michael.chen~school.edu",
    phone: "+1 (555) 987-6543",
    department: "Computer Science",
    designation: "Professor",
    joiningDate: "2015-05-20",
    qualifications: "Ph.D. in Computer Science, MIT",
    status: "active",
    subjects: ["Data Structures", "Algorithms", "Machine Learning"],
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez~school.edu",
    phone: "+1 (555) 456-7890",
    department: "Biology",
    designation: "Assistant Professor",
    joiningDate: "2020-01-10",
    qualifications: "Ph.D. in Molecular Biology, Harvard University",
    status: "inactive",
    subjects: ["Cell Biology", "Genetics", "Biochemistry"],
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Prof. David Wilson",
    email: "david.wilson~school.edu",
    phone: "+1 (555) 789-0123",
    department: "Physics",
    designation: "Professor",
    joiningDate: "2010-09-01",
    qualifications: "Ph.D. in Theoretical Physics, Caltech",
    status: "active",
    subjects: ["Quantum Mechanics", "Electromagnetism", "Thermodynamics"],
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Dr. Aisha Patel",
    email: "aisha.patel~school.edu",
    phone: "+1 (555) 234-5678",
    department: "Chemistry",
    designation: "Associate Professor",
    joiningDate: "2017-07-15",
    qualifications: "Ph.D. in Organic Chemistry, UC Berkeley",
    status: "active",
    subjects: [
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Analytical Chemistry",
    ],
    profileImage: "/placeholder.svg?height=100&width=100",
  },
];

export function TeachersTable() {
  const [fetchTeacherData, teachersData, isLoading, error, reset]=useRequestHook('teacher/all', "GET", null)
  const [teachers, setTeachers] = useState(null);
  const { toast } = useToast();
  const router = useNavigate();

  const handleStatusChange = (id: string, newStatus: string) => {
    // In a real app, this would call your API
    setTeachers(
      teachers?.map((teacher) =>
        teacher.id === id ? { ...teacher, status: newStatus } : teacher
      )
    );

    toast({
      title: "Status updated",
      description: `Teacher status has been ${
        newStatus === "active" ? "activated" : "deactivated"
      }.`,
    });
  };

  const handleDeleteTeacher = (id: string) => {
    // In a real app, this would call your API
    setTeachers(teachers?.filter((teacher) => teacher._id !== id));

    toast({
      title: "Teacher removed",
      description: "Teacher has been successfully removed from the system.",
    });
  };

  const handleViewDetails = (id: string) => {
    router(`/erp/teachers/${id}`);
  };

  const handleExportData = () => {
    toast({
      title: "Export initiated",
      description: "Teacher data is being exported to CSV.",
    });
  };

  useEffect(()=>{
    fetchTeacherData()
  },[])

  useEffect(()=>{
    if(teachersData){
      setTeachers(teachersData)
    }

  },[teachersData])

  if(isLoading){
    return <TeachersTableSkeleton/>
  }
  // For mobile view
  const TeacherCard = ({ teacher }: { teacher: (typeof teachers)[0] }) => (
    <Card >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={teacher?.profileImage || "/placeholder.svg"}
                alt={teacher?.name}
              />
              <AvatarFallback>
                {teacher?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{teacher?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {teacher?.designation}
              </p>
              <Badge
                variant={teacher?.status === "active" ? "outline" : "secondary"}
                className={`mt-1 ${
                  teacher.status === "active"
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {teacher?.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleViewDetails(teacher.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <UpdateTeacherDialog teacher={teacher}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              </UpdateTeacherDialog>
              {teacher.status === "active" ? (
                <DropdownMenuItem
                  onClick={() => handleStatusChange(teacher.id, "inactive")}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => handleStatusChange(teacher.id, "active")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Activate
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleDeleteTeacher(teacher.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{teacher?.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{teacher?.phone}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Department:</span>{" "}
            {teacher?.department}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={handleExportData}>
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <>
        <Tabs defaultValue="table" className="w-full ">
          <TabsList className=" flex justify-end">
            <TabsTrigger value="table">
              <TableOfContents/>
            </TabsTrigger>
            <TabsTrigger value="grid">
              <Grid2X2Icon/>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="table">
            <div className="hidden md:block rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers?.map((teacher) => (
                    <TableRow key={teacher._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            {/* <AvatarImage
                              src={teacher?.profileImage || "/placeholder.svg"}
                              alt={teacher?.name}
                            /> */}
                            <AvatarFallback>
                              {teacher?.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{teacher?.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {teacher?.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{teacher?.salary?.total}</TableCell>
                      <TableCell>{teacher?.designation}</TableCell>
                      <TableCell>{teacher?.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            teacher?.status === "active"
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            teacher?.status === "active"
                              ? "text-green-600 bg-green-50"
                              : "text-red-600 bg-red-50"
                          }
                        >
                          {teacher?.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(teacher?._id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <UpdateTeacherDialog teacher={teacher}>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                            </UpdateTeacherDialog>
                            {teacher.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(teacher._id, "inactive")
                                }
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(teacher._id, "active")
                                }
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteTeacher(teacher._id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="grid">
            {/* <div className="  grid md:grid-cols-3 gap-3">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher._id} teacher={teacher} />
              ))}
            </div>  */}
          </TabsContent>
        </Tabs>
      </>

      {/* Mobile view */}

      {/* Desktop view */}
    </>
  );
}
