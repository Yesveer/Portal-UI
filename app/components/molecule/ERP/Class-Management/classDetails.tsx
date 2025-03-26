// "use client"
// import React, { useState, useEffect, useMemo } from "react";
// import { useParams, useNavigate } from "react-router";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";
// import Table from "~/components/ui/table";
// import { useToast } from "~/components/ui/toast-container";
// import { 
//   fetchClassDetails, 
//   addStudentToClass, 
//   removeStudentFromClass 
// } from "~/routes/ERP/ClassManagement/api";
// import { motion } from "framer-motion";
// import { FiTrash2, FiSearch } from "react-icons/fi";
// import { ClassDetailsAlertDelete } from "./classDetailsAlertDelete";

// interface User {
//   id: string;
//   name?: string;
//   email?: string;
// }

// interface Student {
//   id: string;
//   name: string;
//   email: string;
// }

// interface ClassDetails {
//   id: string;
//   name: string;
//   section?: string;
//   description?: string;
//   createdBy?: User;
//   students: Student[];
// }

// const ClassDetails = () => {
//   const { id: classId } = useParams();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [classData, setClassData] = useState<ClassDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [email, setEmail] = useState("");
//   const [isAdding, setIsAdding] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const { success, data, error } = await fetchClassDetails(classId);
//         if (success && data) {
//           const normalizedData = {
//             ...data,
//             createdBy: data.createdBy || { id: 'unknown', name: 'Unknown', email: 'Unknown' },
//             students: Array.isArray(data.students) ? data.students : []
//           };
//           setClassData(normalizedData);
//         } else {
//           console.error("Failed to fetch class details:", error);
//           toast({
//             message: "Error",
//             description: error || "Failed to load class details",
//             type: "error"
//           });
//           setClassData(null);
//         }
//       } catch (error) {
//         console.error("Error fetching class details:", error);
//         toast({
//           message: "Error",
//           description: "Failed to load class details",
//           type: "error"
//         });
//         setClassData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [classId]);

//   const filteredStudents = useMemo(() => {
//     if (!classData?.students) return [];
//     return classData.students.filter(student => {
//       const term = searchTerm.toLowerCase();
//       return (
//         student.name.toLowerCase().includes(term) ||
//         student.email.toLowerCase().includes(term)
//       );
//     });
//   }, [classData?.students, searchTerm]);

//   const handleAddStudent = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.trim() || !classData) return;

//     setIsAdding(true);
//     try {
//       const { success, data, error } = await addStudentToClass(classId, email);
//       if (success && data) {
//         setClassData(prev => ({
//           ...prev!,
//           students: Array.isArray(data.students) 
//             ? [...prev?.students || [], ...data.students]
//             : prev?.students || []
//         }));
//         setEmail("");
//         toast({
//           message: "Success",
//           description: "Student added to class",
//           type: "success"
//         });
//       } else {
//         toast({
//           message: "Error",
//           description: error || "Failed to add student",
//           type: "error"
//         });
//       }
//     } catch (error) {
//       toast({
//         message: "Error",
//         description: "Failed to add student",
//         type: "error"
//       });
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleRemoveStudent = async (studentEmail: string) => {
//     if (!classData) return;
    
//     try {
//       const { success, data, error } = await removeStudentFromClass(classId, studentEmail);
//       if (success && data) {
//         setClassData(prev => ({
//           ...prev!,
//           students: prev?.students?.filter(student => student.email !== studentEmail) || []
//         }));
//         toast({
//           message: "Success",
//           description: "Student removed from class",
//           type: "success"
//         });
//       } else {
//         toast({
//           message: "Error",
//           description: error || "Failed to remove student",
//           type: "error"
//         });
//       }
//     } catch (error) {
//       toast({
//         message: "Error",
//         description: "Failed to remove student",
//         type: "error"
//       });
//     }
//   };

//   const columns = [
//     {
//       Header: "Name",
//       accessor: "name",
//     },
//     {
//       Header: "Email",
//       accessor: "email",
//     },
//     {
//       Header: "Actions",
//       Cell: ({ row }: { row: { original: Student } }) => (
//         <div className="flex justify-end">
//           <ClassDetailsAlertDelete
//             classId={classId}
//             studentEmail={row.original.email}
//             onSuccess={() => handleRemoveStudent(row.original.email)}
//           >
//             <button className="text-red-600 hover:text-red-800 p-1">
//               <FiTrash2 className="h-5 w-5" />
//             </button>
//           </ClassDetailsAlertDelete>
//         </div>
//       ),
//     },
//   ];

//   if (loading) {
//     return <div className="p-4">Loading class details...</div>;
//   }

//   if (!classData) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="text-center py-10"
//       >
//         <h3 className="text-lg font-medium text-gray-900">Class not found</h3>
//         <Button 
//           variant="outline" 
//           className="mt-4"
//           onClick={() => navigate(-1)}
//         >
//           Go Back
//         </Button>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-lg border ml-6">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold">
//           {classData.name}{classData.section ? ` - ${classData.section}` : ''}
//         </h1>
//         {classData.description && (
//           <p className="text-gray-600 mt-1">{classData.description}</p>
//         )}
//         <p className="text-sm text-gray-500 mt-2">
//           Created by: {classData.createdBy?.name || 'Unknown'} ({classData.createdBy?.email || 'Unknown'})
//         </p>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-4">Add Student</h2>
//         <form onSubmit={handleAddStudent} className="flex gap-2">
//           <Input
//             type="email"
//             placeholder="Student email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="flex-1"
//             required
//           />
//           <Button type="submit" disabled={isAdding}>
//             {isAdding ? "Adding..." : "Add Student"}
//           </Button>
//         </form>
//       </div>

//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">
//             Students ({filteredStudents.length})
//           </h2>
//           <div className="relative w-64">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className="text-gray-400" />
//             </div>
//             <Input
//               type="text"
//               placeholder="Search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </div>
        
//         {filteredStudents.length > 0 ? (
//           <Table
//             columns={columns}
//             data={filteredStudents}
//           />
//         ) : (
//           <div className="text-center py-6 text-gray-500">
//             {searchTerm ? "No matching students found" : "No students in this class yet"}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClassDetails;

"use client"
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Table from "~/components/ui/table";
import { useToast } from "~/components/ui/toast-container";
import { 
  fetchClassDetails, 
  addStudentToClass, 
  removeStudentFromClass 
} from "~/routes/ERP/ClassManagement/api";
import { motion } from "framer-motion";
import { FiTrash2, FiSearch } from "react-icons/fi";
import { ClassDetailsAlertDelete } from "./classDetailsAlertDelete";

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

interface ClassDetails {
  id: string;
  name: string;
  section?: string;
  description?: string;
  createdBy?: User;
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

  const fetchClassData = async () => {
    try {
      setLoading(true);
      const { success, data, error } = await fetchClassDetails(classId);
      if (success && data) {
        const normalizedData = {
          ...data,
          createdBy: data.createdBy || { id: 'unknown', name: 'Unknown', email: 'Unknown' },
          students: Array.isArray(data.students) ? data.students : []
        };
        setClassData(normalizedData);
      } else {
        console.error("Failed to fetch class details:", error);
        toast({
          message: "Error",
          description: error || "Failed to load class details",
          type: "error"
        });
        setClassData(null);
      }
    } catch (error) {
      console.error("Error fetching class details:", error);
      toast({
        message: "Error",
        description: "Failed to load class details",
        type: "error"
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
    return classData.students.filter(student => {
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
          type: "success"
        });
      } else {
        toast({
          message: "Error",
          description: error || "Failed to add student",
          type: "error"
        });
      }
    } catch (error) {
      toast({
        message: "Error",
        description: "Failed to add student",
        type: "error"
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
          type: "success"
        });
      } else {
        toast({
          message: "Error",
          description: "Failed to remove student",
          type: "error"
        });
      }
    } catch (error) {
      toast({
        message: "Error",
        description: "Failed to remove student",
        type: "error"
      });
    }
  };

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
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border ml-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {classData.name}{classData.section ? ` - ${classData.section}` : ''}
        </h1>
        {classData.description && (
          <p className="text-gray-600 mt-1">{classData.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Created by: {classData.createdBy?.name || 'Unknown'} ({classData.createdBy?.email || 'Unknown'})
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Student</h2>
        <form onSubmit={handleAddStudent} className="flex gap-2">
          <Input
            type="email"
            placeholder="Student email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isAdding}>
            {isAdding ? "Adding..." : "Add Student"}
          </Button>
        </form>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Students ({filteredStudents.length})
          </h2>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {filteredStudents.length > 0 ? (
          <Table
            columns={columns}
            data={filteredStudents}
          />
        ) : (
          <div className="text-center py-6 text-gray-500">
            {searchTerm ? "No matching students found" : "No students in this class yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;