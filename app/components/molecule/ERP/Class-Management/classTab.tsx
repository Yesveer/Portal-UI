"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FcEmptyTrash } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Table from "~/components/ui/table";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { CreateClassForm } from "./classcreationform";
import { ClassEditDrawer } from "./classedit";
import { ClassAlertDelete } from "./AlertDelete";
import { fetchAllClasses } from "~/routes/ERP/ClassManagement/api";
import { useToast } from "~/components/ui/toast-container";
import { uploadExcelFile } from "~/routes/ERP/api";
import useRequestHook from "~/hooks/requestHook";
import {
  Card,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  LayoutGrid,
  LayoutList,
  MoreHorizontal,
  Trash,
  Users,
  XCircle,
} from "lucide-react";

function getSubjectBadge(subject: string) {
  const colors: Record<string, string> = {
    Mathematics: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    "Computer Science": "bg-purple-100 text-purple-800 hover:bg-purple-100",
    Biology: "bg-green-100 text-green-800 hover:bg-green-100",
    Physics: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    Chemistry: "bg-pink-100 text-pink-800 hover:bg-pink-100",
    English: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100",
    History: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    Geography: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
    Art: "bg-rose-100 text-rose-800 hover:bg-rose-100",
    Music: "bg-violet-100 text-violet-800 hover:bg-violet-100",
  };

  return colors[subject] || "bg-gray-100 text-gray-800 hover:bg-gray-100";
}

const ERPClassManagementMolecule = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const [data, setData] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLElement }>({});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fetchAll, allList, isLoading, error] = useRequestHook(
    "common",
    "GET",
    null
  );

  const { toast } = useToast();

  const handleBulkUpload = async (file: File) => {
    const result = await uploadExcelFile("classes/bulk-create-class", file);

    if (result.success) {
      toast({
        message: "Bulk user registration successful",
        type: "success",
      });
      setRefreshKey((prev) => prev + 1);
    } else {
      toast({ message: `Upload failed: ${result.error}`, type: "error" });
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await fetchAllClasses();
        if (success && data) {
          setData(data);
        } else {
          console.error("Failed to fetch classes:", error);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    fetchClasses();
  }, [refreshKey]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const isAlertDialogClick =
  //       event.target instanceof Element &&
  //       event.target.closest('[role="alertdialog"]');

  //     if (
  //       activeDropdown !== null &&
  //       dropdownRefs.current[activeDropdown] &&
  //       !dropdownRefs.current[activeDropdown].contains(event.target as Node) &&
  //       !isAlertDialogClick
  //     ) {
  //       setActiveDropdown(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [activeDropdown]);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleEditClick = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsEditOpen(true);
    setActiveDropdown(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (classItem) =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.createdBy.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }: { row: { original: Class } }) => (
          <Link to={`/erp/class-management/${row.original._id}`}>
            {row.original.name}
          </Link>
        ),
      },
      { Header: "Section", accessor: "section" },
      {
        Header: "Created By",
        accessor: "createdBy",
        Cell: ({ row }: { row: { original: Class } }) =>
          row.original.createdBy.name,
      },
      {
        Header: "Actions",
        Cell: ({ row }: { row: { index: number; original: Class } }) => (
          <td className="px-6 py-0 whitespace-nowrap text-sm text-gray-500">
            <div
              className="absolute"
              ref={(el) => {
                if (el) dropdownRefs.current[row.index] = el;
              }}
            >
              <button
                onClick={() => handleDropdownToggle(row.index)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiMoreVertical className="h-5 w-5" />
              </button>
              {activeDropdown === row.index && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleEditClick(row.original)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <FiEdit2 className="mr-2" /> Edit Class
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/erp/class-management/${row.original._id}`)
                      }
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <FiEye className="mr-2" /> View Details
                    </button>
                    <ClassAlertDelete
                      classId={row.original._id}
                      className={row.original.name}
                      onSuccess={() => setRefreshKey((prev) => prev + 1)}
                    >
                      <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                        <FiTrash2 className="mr-2" /> Delete
                      </button>
                    </ClassAlertDelete>
                  </div>
                </div>
              )}
            </div>
          </td>
        ),
      },
    ],
    [activeDropdown, navigate]
  );

  if (loading) {
    return <div className="p-4">Loading classes...</div>;
  }

  const ClassCard = ({ cls }: { cls: any }) => (
    <Card className="overflow-hidden p-0">
      <div
        className={`h-2 ${
          cls.status === "active" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-1">{cls.name}</h3>
            <Badge className={getSubjectBadge(cls.subject)}>
              {cls.subject}
            </Badge>
            {/* <p className="text-sm text-muted-foreground mt-2">{cls.name}</p> */}
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
              <DropdownMenuItem
                onClick={() => navigate(`/erp/class-management/${cls._id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              {/* <UpdateClassDialog classData={cls}> */}
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {/* </UpdateClassDialog> */}
              {cls.status === "active" ? (
                <DropdownMenuItem>
                  <XCircle className="mr-2 h-4 w-4" />
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Activate
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <ClassAlertDelete
                  classId={cls._id}
                  className={cls.name}
                  onSuccess={() => setRefreshKey((prev) => prev + 1)}
                >
                  <Button variant="outline" className=" m-0 p-0 border-none">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </ClassAlertDelete>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{cls.classTeacher?.name}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{cls.schedule}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Room {cls.room}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3">
        <div className="text-sm w-full flex justify-between">
          <span>
            Enrolled: {cls?.students?.length}/{cls.capacity}
          </span>
          <Badge
            variant={cls.status === "active" ? "outline" : "secondary"}
            className={
              cls.status === "active"
                ? "text-green-600 bg-green-50"
                : "text-red-600 bg-red-50"
            }
          >
            {cls.status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-10 border rounded-lg"
    >
      <div className="flex items-center justify-center">
        <FcEmptyTrash size={60} />
      </div>
      <h3 className="text-lg font-medium text-gray-900 pt-5">
        No Classes Available
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new class.
      </p>
    </motion.div>
  );

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <div className="sm:mt-0 flex inline-flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsClassFormOpen(true)}>
            + Add Class
          </Button>
          {isClassFormOpen && (
            <CreateClassForm
              data={allList}
              open={isClassFormOpen}
              onOpenChange={setIsClassFormOpen}
              onSuccess={() => setRefreshKey((prev) => prev + 1)}
            />
          )}
          <Button
            variant="outline"
            onClick={() => setRefreshKey((prev) => prev + 1)}
          >
            <TbReload /> Reload
          </Button>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            📤 Bulk Upload
          </Button>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleBulkUpload(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <a
            className=" underline italic text-blue-300"
            href="/Book2.xlsx"
            download={"sampleClass.xlsx"}
          >
            Sample File
          </a>
        </div>
        <div className="mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-2 py-1 border border-gray-200 rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid View</span>
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="h-8 w-8 p-0"
          >
            <LayoutList className="h-4 w-4" />
            <span className="sr-only">Table View</span>
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((cls) => (
            <ClassCard key={cls.id} cls={cls} />
          ))}
        </div>
      ) : filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <Table
          columns={columns}
          data={filteredData}
          onViewClick={(id) => navigate(`/erp/class/${id}`)}
        />
      )}

      {isEditOpen && selectedClass && (
        <ClassEditDrawer
          data={allList}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          classData={selectedClass}
          onSuccess={() => setRefreshKey((prev) => prev + 1)}
        />
      )}
    </div>
  );
};

export default ERPClassManagementMolecule;
