

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

const ERPClassManagementMolecule = () => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isAlertDialogClick =
        event.target instanceof Element &&
        event.target.closest('[role="alertdialog"]');

      if (
        activeDropdown !== null &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown].contains(event.target as Node) &&
        !isAlertDialogClick
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

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

      {filteredData.length === 0 ? (
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
