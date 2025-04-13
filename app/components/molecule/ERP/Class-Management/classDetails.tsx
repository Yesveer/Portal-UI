// // "use client"
// // import React, { useState, useEffect, useMemo } from "react";
// // import { useParams, useNavigate } from "react-router";
// // import { Button } from "~/components/ui/button";
// // import { Input } from "~/components/ui/input";
// // import { Label } from "~/components/ui/label";
// // import Table from "~/components/ui/table";
// // import { useToast } from "~/components/ui/toast-container";
// // import {
// //   fetchClassDetails,
// //   addStudentToClass,
// //   removeStudentFromClass
// // } from "~/routes/ERP/ClassManagement/api";
// // import { motion } from "framer-motion";
// // import { FiTrash2, FiSearch } from "react-icons/fi";
// // import { ClassDetailsAlertDelete } from "./classDetailsAlertDelete";

// // interface User {
// //   id: string;
// //   name?: string;
// //   email?: string;
// // }

// // interface Student {
// //   id: string;
// //   name: string;
// //   email: string;
// // }

// // interface ClassDetails {
// //   id: string;
// //   name: string;
// //   section?: string;
// //   description?: string;
// //   createdBy?: User;
// //   students: Student[];
// // }

// // const ClassDetails = () => {
// //   const { id: classId } = useParams();
// //   const navigate = useNavigate();
// //   const { toast } = useToast();
// //   const [classData, setClassData] = useState<ClassDetails | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [email, setEmail] = useState("");
// //   const [isAdding, setIsAdding] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const { success, data, error } = await fetchClassDetails(classId);
// //         if (success && data) {
// //           const normalizedData = {
// //             ...data,
// //             createdBy: data.createdBy || { id: 'unknown', name: 'Unknown', email: 'Unknown' },
// //             students: Array.isArray(data.students) ? data.students : []
// //           };
// //           setClassData(normalizedData);
// //         } else {
// //           console.error("Failed to fetch class details:", error);
// //           toast({
// //             message: "Error",
// //             description: error || "Failed to load class details",
// //             type: "error"
// //           });
// //           setClassData(null);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching class details:", error);
// //         toast({
// //           message: "Error",
// //           description: "Failed to load class details",
// //           type: "error"
// //         });
// //         setClassData(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [classId]);

// //   const filteredStudents = useMemo(() => {
// //     if (!classData?.students) return [];
// //     return classData.students.filter(student => {
// //       const term = searchTerm.toLowerCase();
// //       return (
// //         student.name.toLowerCase().includes(term) ||
// //         student.email.toLowerCase().includes(term)
// //       );
// //     });
// //   }, [classData?.students, searchTerm]);

// //   const handleAddStudent = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!email.trim() || !classData) return;

// //     setIsAdding(true);
// //     try {
// //       const { success, data, error } = await addStudentToClass(classId, email);
// //       if (success && data) {
// //         setClassData(prev => ({
// //           ...prev!,
// //           students: Array.isArray(data.students)
// //             ? [...prev?.students || [], ...data.students]
// //             : prev?.students || []
// //         }));
// //         setEmail("");
// //         toast({
// //           message: "Success",
// //           description: "Student added to class",
// //           type: "success"
// //         });
// //       } else {
// //         toast({
// //           message: "Error",
// //           description: error || "Failed to add student",
// //           type: "error"
// //         });
// //       }
// //     } catch (error) {
// //       toast({
// //         message: "Error",
// //         description: "Failed to add student",
// //         type: "error"
// //       });
// //     } finally {
// //       setIsAdding(false);
// //     }
// //   };

// //   const handleRemoveStudent = async (studentEmail: string) => {
// //     if (!classData) return;

// //     try {
// //       const { success, data, error } = await removeStudentFromClass(classId, studentEmail);
// //       if (success && data) {
// //         setClassData(prev => ({
// //           ...prev!,
// //           students: prev?.students?.filter(student => student.email !== studentEmail) || []
// //         }));
// //         toast({
// //           message: "Success",
// //           description: "Student removed from class",
// //           type: "success"
// //         });
// //       } else {
// //         toast({
// //           message: "Error",
// //           description: error || "Failed to remove student",
// //           type: "error"
// //         });
// //       }
// //     } catch (error) {
// //       toast({
// //         message: "Error",
// //         description: "Failed to remove student",
// //         type: "error"
// //       });
// //     }
// //   };

// //   const columns = [
// //     {
// //       Header: "Name",
// //       accessor: "name",
// //     },
// //     {
// //       Header: "Email",
// //       accessor: "email",
// //     },
// //     {
// //       Header: "Actions",
// //       Cell: ({ row }: { row: { original: Student } }) => (
// //         <div className="flex justify-end">
// //           <ClassDetailsAlertDelete
// //             classId={classId}
// //             studentEmail={row.original.email}
// //             onSuccess={() => handleRemoveStudent(row.original.email)}
// //           >
// //             <button className="text-red-600 hover:text-red-800 p-1">
// //               <FiTrash2 className="h-5 w-5" />
// //             </button>
// //           </ClassDetailsAlertDelete>
// //         </div>
// //       ),
// //     },
// //   ];

// //   if (loading) {
// //     return <div className="p-4">Loading class details...</div>;
// //   }

// //   if (!classData) {
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         className="text-center py-10"
// //       >
// //         <h3 className="text-lg font-medium text-gray-900">Class not found</h3>
// //         <Button
// //           variant="outline"
// //           className="mt-4"
// //           onClick={() => navigate(-1)}
// //         >
// //           Go Back
// //         </Button>
// //       </motion.div>
// //     );
// //   }

// //   return (
// //     <div className="p-4 bg-white rounded-lg shadow-lg border ml-6">
// //       <div className="mb-6">
// //         <h1 className="text-2xl font-bold">
// //           {classData.name}{classData.section ? ` - ${classData.section}` : ''}
// //         </h1>
// //         {classData.description && (
// //           <p className="text-gray-600 mt-1">{classData.description}</p>
// //         )}
// //         <p className="text-sm text-gray-500 mt-2">
// //           Created by: {classData.createdBy?.name || 'Unknown'} ({classData.createdBy?.email || 'Unknown'})
// //         </p>
// //       </div>

// //       <div className="mb-6">
// //         <h2 className="text-xl font-semibold mb-4">Add Student</h2>
// //         <form onSubmit={handleAddStudent} className="flex gap-2">
// //           <Input
// //             type="email"
// //             placeholder="Student email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="flex-1"
// //             required
// //           />
// //           <Button type="submit" disabled={isAdding}>
// //             {isAdding ? "Adding..." : "Add Student"}
// //           </Button>
// //         </form>
// //       </div>

// //       <div>
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">
// //             Students ({filteredStudents.length})
// //           </h2>
// //           <div className="relative w-64">
// //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //               <FiSearch className="text-gray-400" />
// //             </div>
// //             <Input
// //               type="text"
// //               placeholder="Search students..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="pl-10"
// //             />
// //           </div>
// //         </div>

// //         {filteredStudents.length > 0 ? (
// //           <Table
// //             columns={columns}
// //             data={filteredStudents}
// //           />
// //         ) : (
// //           <div className="text-center py-6 text-gray-500">
// //             {searchTerm ? "No matching students found" : "No students in this class yet"}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClassDetails;

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
  FileText,
  GraduationCap,
  MoreHorizontal,
  Pencil,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { StudentCreationForm } from "./studentCreationForm";

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

const ClassDetails = () => {
  const { id: classId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [classData, setClassData] = useState<ClassDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  useEffect(() => {
    fetchClassData();
  }, [classId]);

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
                  <Link to={`/teachers/${classData.classTeacher._id}`}>
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
              <Button size="sm" asChild>
                <Link to={`/erp/class-management/${classId}/students/new`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Link>
              </Button>
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
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No attendance records</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Start tracking attendance for this class
                </p>
                <Button asChild>
                  <Link to={`/erp/class-management/${classId}/attendance/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Take First Attendance
                  </Link>
                </Button>
              </div>
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
