

"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Table from "~/components/ui/table";
import { useToast } from "~/components/ui/toast-container";
import {
  fetchClassDetails,
  addStudentToClass,
  removeStudentFromClass,
} from "~/routes/ERP/ClassManagement/api";
import { motion } from "framer-motion";
import { FiTrash2, FiSearch } from "react-icons/fi";
import { ClassDetailsAlertDelete } from "./classDetailsAlertDelete";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  GraduationCap,
  MoreHorizontal,
  Pencil,
  Plus,
  Settings,
  Users,
  XCircle,
} from "lucide-react";
import { StudentCreationForm } from "./studentCreationForm";

import axios from "axios";
import { format } from "date-fns";


interface AttendanceRecord {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  date: string;
  status: "Present" | "Absent";
}

interface User {
  id: string;
  name?: string;
  email?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}
interface teacher {
  _id: string;
  name?: string;
  email?: string;
}

interface ClassDetails {
  id: string;
  name: string;
  section?: string;
  description?: string;
  createdBy?: User;
  classTeacher?: teacher;
  students: Student[];
}
interface AttendanceRecord {
  _id: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  date: string;
  status: "Present" | "Absent";
}

const ClassDetails = () => {
  const { id: classId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classData, setClassData] = useState<ClassDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const ERP_URL = import.meta.env.VITE_ERP_URL;
  const token = localStorage.getItem("token");

  const fetchClassData = async () => {
    try {
      setLoading(true);
      const { success, data, error } = await fetchClassDetails(classId);
      if (success && data) {
        const normalizedData = {
          ...data,
          createdBy: data.createdBy || {
            id: "unknown",
            name: "Unknown",
            email: "Unknown",
          },
          students: Array.isArray(data.students) ? data.students : [],
        };
        setClassData(normalizedData);
      } else {
        console.error("Failed to fetch class details:", error);
        toast({
          message: "Error",
          description: error || "Failed to load class details",
          type: "error",
        });
        setClassData(null);
      }
    } catch (error) {
      console.error("Error fetching class details:", error);
      toast({
        message: "Error",
        description: "Failed to load class details",
        type: "error",
      });
      setClassData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      // const response = await axios.get(
      //   `${ERP_URL}/api/teacher/get-attendance/${classId}`,

      //   {
      //     params: { studentIds: filteredStudents.map((s) => s._id) },
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const response = await axios.get(
        `${ERP_URL}/api/teacher/get-attendance/${classId}`,
        {
          params: {
            studentIds: filteredStudents.map((s) => s._id),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAttendanceRecords(response.data.data);
      } else {
        setError(response.data.error || "Failed to fetch attendance records");
      }
    } catch (error) {
      setError("Failed to connect to server");
      console.error("Error fetching attendance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassData();
    fetchAttendance();
  }, [classId]);

  // console.log(classData?.students._id);

  const filteredStudents = useMemo(() => {
    if (!classData?.students) return [];
    return classData.students.filter((student) => {
      const term = searchTerm.toLowerCase();
      return (
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
      );
    });
  }, [classData?.students, searchTerm]);

  console.log(filteredStudents);

  // useEffect(() => {

  // }, [classId]);

  console.log(attendanceRecords);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div>Loading attendance records...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12 text-red-500">
          <div>{error}</div>
        </CardContent>
      </Card>
    );
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !classData) return;

    setIsAdding(true);
    try {
      const { success, error } = await addStudentToClass(classId, email);
      if (success) {
        // Instead of trying to merge, refetch the entire class data
        await fetchClassData();
        setEmail("");
        toast({
          message: "Success",
          description: "Student added to class",
          type: "success",
        });
      } else {
        toast({
          message: "Error",
          description: error || "Failed to add student",
          type: "error",
        });
      }
    } catch (error) {
      toast({
        message: "Error",
        description: "Failed to add student",
        type: "error",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveStudent = async (studentEmail: string) => {
    if (!classData) return;

    try {
      const { success } = await removeStudentFromClass(classId, studentEmail);
      if (success) {
        // Refetch the entire class data after removal
        await fetchClassData();
        toast({
          message: "Success",
          description: "Student removed from class",
          type: "success",
        });
      } else {
        toast({
          message: "Error",
          description: "Failed to remove student",
          type: "error",
        });
      }
    } catch (error) {
      toast({
        message: "Error",
        description: "Failed to remove student",
        type: "error",
      });
    }
  };

  const formattedDate = new Date(classData?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Actions",
      Cell: ({ row }: { row: { original: Student } }) => (
        <div className="flex justify-end">
          <ClassDetailsAlertDelete
            classId={classId}
            studentEmail={row.original.email}
            onSuccess={() => handleRemoveStudent(row.original.email)}
          >
            <button className="text-red-600 hover:text-red-800 p-1">
              <FiTrash2 className="h-5 w-5" />
            </button>
          </ClassDetailsAlertDelete>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="p-4">Loading class details...</div>;
  }

  if (!classData) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <h3 className="text-lg font-medium text-gray-900">Class not found</h3>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {classData.name}
            </h1>
            <Badge variant="outline" className="ml-2">
              Section {classData.section}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{classData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/erp/class-management/${classId}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <Button size="sm" onClick={() => setIsSheetOpen(true)}>
            + Add Student
          </Button>
          {isSheetOpen && (
            <StudentCreationForm
              open={isSheetOpen}
              onOpenChange={setIsSheetOpen}
              onSuccess={() => setRefreshKey((prev) => prev + 1)} // Add this prop
            />
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Class Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Name:</span>
                  <span className="font-medium">{classData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Section:</span>
                  <span className="font-medium">{classData.section}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created On:</span>
                  <span className="font-medium">{formattedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created By:</span>
                  <span className="font-medium">
                    {classData.createdBy.name}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Class Teacher
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="Teacher"
                    />
                    <AvatarFallback>
                      {classData.classTeacher.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{classData.classTeacher.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {classData.classTeacher.email}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={`/erp/teachers/${classData.classTeacher._id}`}>
                    View Profile
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Students</span>
                  </div>
                  <Badge variant="secondary">
                    {classData?.students?.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Assignments</span>
                  </div>
                  <Badge variant="secondary">
                    {classData?.assignments?.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Upcoming Events</span>
                  </div>
                  <Badge variant="secondary">2</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and activities in this class
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">New Assignment Added</div>
                    <div className="text-sm text-muted-foreground">
                      Math Quiz due on April 15, 2025
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      2 hours ago
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">New Student Added</div>
                    <div className="text-sm text-muted-foreground">
                      Charlie Brown has joined the class
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      1 day ago
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Students</CardTitle>
                <CardDescription>
                  Manage students enrolled in this class
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {classData?.students?.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-5">Email</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  {classData.students.map((student) => (
                    <div
                      key={student._id}
                      className="grid grid-cols-12 p-4 items-center hover:bg-muted/50"
                    >
                      <div className="col-span-5 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{student.name}</span>
                      </div>
                      <div className="col-span-5 text-muted-foreground">
                        {student.email}
                      </div>
                      <div className="col-span-2 text-right flex justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            to={`/erp/class-management/${classId}/students/${student?._id}/edit`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            to={`/erp/class-management/${classId}/students/${student?._id}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No students enrolled</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Add students to this class to get started
                  </p>
                  <Button asChild>
                    <Link to={`/erp/class-management/${classId}/students/new`}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Student
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>
                  Manage class assignments and homework
                </CardDescription>
              </div>
              <Button size="sm" asChild>
                <Link to={`/erp/class-management/${classId}/assignments/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {classData?.assignments?.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-3">Due Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  {classData.assignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="grid grid-cols-12 p-4 items-center hover:bg-muted/50"
                    >
                      <div className="col-span-5 font-medium">
                        {assignment.title}
                      </div>
                      <div className="col-span-3 text-muted-foreground">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                      <div className="col-span-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-right flex justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            to={`/erp/class-management/${classId}/assignments/${assignment._id}/edit`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link
                            to={`/erp/class-management/${classId}/assignments/${assignment._id}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No assignments yet</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Create your first assignment for this class
                  </p>
                  <Button asChild>
                    <Link
                      to={`/erp/class-management/${classId}/assignments/new`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Assignment
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* 
        <TabsContent value="attendance" className="space-y-6">
         

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>
                  Track student attendance records
                </CardDescription>
              </div>
              <Button size="sm" asChild>
                <Link to={`/erp/class-management/${classId}/attendance/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Take Attendance
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {attendanceRecords.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceRecords.map((record) => (
                        <TableRow key={record._id}>
                          <TableCell>{formatDate(record.date)}</TableCell>
                          <TableCell>{record.student.name}</TableCell>
                          <TableCell>{record.student.email}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                record.status === "Present"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {record.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No attendance records</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Start tracking attendance for this class
                  </p>
                  <Button asChild>
                    <Link
                      to={`/erp/class-management/${classId}/attendance/new`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Take First Attendance
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent> */}

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attendance</CardTitle>
                <CardDescription>
                  Daily attendance records with date separation
                </CardDescription>
              </div>
              <Button size="sm" asChild>
                <Link to={`/erp/class-management/${classId}/attendance/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Take Attendance
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {!Array.isArray(attendanceRecords) ||
              attendanceRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No attendance records</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Start tracking attendance for this class
                  </p>
                  <Button asChild>
                    <Link
                      to={`/erp/class-management/${classId}/attendance/new`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Take First Attendance
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 bg-muted/50 p-4 border-b font-medium">
                    <div className="col-span-2">Date</div>
                    <div className="col-span-5">Student</div>
                    <div className="col-span-3">Status</div>
                    <div className="col-span-2 text-right">Time</div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y">
                    {(() => {
                      const groupedRecords = attendanceRecords.reduce(
                        (acc, record) => {
                          if (!record || !record.date) return acc;
                          const dateKey = format(
                            new Date(record.date),
                            "yyyy-MM-dd"
                          );
                          if (!acc[dateKey]) {
                            acc[dateKey] = [];
                          }
                          acc[dateKey].push(record);
                          return acc;
                        },
                        {} as Record<string, AttendanceRecord[]>
                      );

                      return Object.entries(groupedRecords)
                        .sort(
                          ([dateA], [dateB]) =>
                            new Date(dateB).getTime() -
                            new Date(dateA).getTime()
                        )
                        .flatMap(([dateKey, records]) => {
                          const date = new Date(dateKey);
                          const formattedDate = format(date, "MMM dd, yyyy");
                          const dayOfWeek = format(date, "EEE");

                          return [
                            // Date header row
                            <div
                              key={`header-${dateKey}`}
                              className="grid grid-cols-12 bg-muted/25 p-3 border-b"
                            >
                              <div className="col-span-12 font-medium">
                                {formattedDate}
                              </div>
                            </div>,
                            // Attendance records
                            ...records
                              .sort(
                                (a, b) =>
                                  new Date(a.date).getTime() -
                                  new Date(b.date).getTime()
                              )
                              .map((record) => (
                                <div
                                  key={record._id}
                                  className="grid grid-cols-12 p-4 items-center hover:bg-muted/50"
                                >
                                  <div className="col-span-2 text-muted-foreground">
                                    {dayOfWeek}
                                  </div>
                                  <div className="col-span-5 flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>
                                        {record.student?.name?.charAt(0) || "S"}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">
                                        {record.student?.name || "Unknown"}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {record.student?.email || ""}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-3">
                                    <Badge
                                      variant={
                                        record.status === "Present"
                                          ? "default"
                                          : "destructive"
                                      }
                                      className="flex items-center gap-1"
                                    >
                                      {record.status === "Present" ? (
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                      ) : (
                                        <XCircle className="h-3.5 w-3.5" />
                                      )}
                                      {record.status}
                                    </Badge>
                                  </div>
                                  <div className="col-span-2 text-right text-muted-foreground">
                                    {record.date
                                      ? format(new Date(record.date), "h:mm a")
                                      : "N/A"}
                                  </div>
                                </div>
                              )),
                          ];
                        });
                    })()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Grades</CardTitle>
                <CardDescription>
                  Manage student grades and performance
                </CardDescription>
              </div>
              <Button size="sm" asChild>
                <Link to={`/erp/class-management/${classId}/grades/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Grades
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No grades recorded</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Start recording grades for this class
                </p>
                <Button asChild>
                  <Link to={`/erp/class-management/${classId}/grades/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Grade
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetails;
