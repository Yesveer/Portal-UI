import React, { useState, useMemo, useRef, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { TbReload } from "react-icons/tb";
import { FcEmptyTrash } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Table from "~/components/ui/table";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { CreateUserForm } from "./usercreationform";
import { UserEditDrawer } from "./useredit";
import { AlertDelete } from "./AlertDelete";
import { fetchAllUsers } from "~/routes/ERP/UserManagement/api";

const ERPUserManagementMolecule = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRefs = useRef({});
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0); // Add this state

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const domain = localStorage.getItem("domainName");
                const users = await fetchAllUsers(domain);
                setData(users);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [refreshKey]);

    // Click outside handler (unchanged)
    useEffect(() => {
        const handleClickOutside = (event) => {
            const isAlertDialogClick = event.target.closest('[role="alertdialog"]');

            if (activeDropdown !== null &&
                dropdownRefs.current[activeDropdown] &&
                !dropdownRefs.current[activeDropdown].contains(event.target) &&
                !isAlertDialogClick) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeDropdown]);

    // Rest of your handlers remain the same...
    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditOpen(true);
        setActiveDropdown(null); // Close the dropdown
    };
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const filteredData = useMemo(() => {
        return data.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const columns = useMemo(() => [
        {
            Header: "Name",
            accessor: "name",
            Cell: ({ row }) => (
                <Link to={`/erp/user-management/${row.original._id}`}>
                    {row.original.name}
                </Link>
            )
        },
        { Header: "Email", accessor: "email" },
        { Header: "Role", accessor: "role" },
        {
            Header: "Actions",
            Cell: ({ row }) => (
                <td className="px-6 py-0 whitespace-nowrap text-sm text-gray-500">
                    <div className="absolute" ref={(el) => (dropdownRefs.current[row.index] = el)}>
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
                                        <FiEdit2 className="mr-2" /> Edit User
                                    </button>
                                    <button
                                        onClick={() => navigate(`/erp/user-management/${row.original._id}`)}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                    >
                                        <FiEye className="mr-2" /> View Details
                                    </button>
                                    <AlertDelete email={row.original.email} id={row.original._id} onSuccess={() => setRefreshKey(prev => prev + 1)}>
                                        <button
                                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                                            <FiTrash2 className="mr-2" /> Delete
                                        </button>
                                    </AlertDelete>
                                </div>
                            </div>
                        )}
                    </div>
                </td>
            )
        }
    ], [activeDropdown, navigate]);

    if (loading) {
        return <div className="p-4">Loading users...</div>;
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
            <h3 className="text-lg font-medium text-gray-900 pt-5">No Data Available</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating new Data.</p>
        </motion.div>
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg border ml-6">
            <div className="sm:flex sm:items-center sm:justify-between mb-4">
                <div className=" sm:mt-0 flex inline-flex items-center gap-2">
                    <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
                        + Add User
                    </Button>
                    {isSheetOpen && (
                        <CreateUserForm
                            open={isSheetOpen}
                            onOpenChange={setIsSheetOpen}
                            onSuccess={() => setRefreshKey(prev => prev + 1)} // Add this prop
                        />
                    )}
                    <Button variant="outline"
                        onClick={() => setRefreshKey(prev => prev + 1)}>
                        <TbReload />Reload
                    </Button>
                </div>
                <div className="mt-4 sm:mt-0">
                    <input
                        type="text"
                        placeholder="Search..."
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
                    onViewClick={(id) => navigate(`/erp/user-management/${id}`)}
                    onDeleteClick={(id) => {
                        // Handle delete logic here
                    }}
                />
            )}

            {isEditOpen && (
                <UserEditDrawer
                    open={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    userData={selectedUser}
                    onSuccess={() => setRefreshKey(prev => prev + 1)} 
                />
            )}
        </div>
    );
};

export default ERPUserManagementMolecule;