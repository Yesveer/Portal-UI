"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

import { useToast } from "~/components/ui/toast-container";

import { motion } from "framer-motion";
import { FiTrash2, FiSearch } from "react-icons/fi";
import { deleteUser, fetchUserDetails } from "~/routes/ERP/UserManagement/api";
import { AlertDelete } from "./AlertDelete";

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

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  role: string;
  domainName: string;
}

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setuserData] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchuserData = async () => {
    try {
      setLoading(true);
      const { success, data, error } = await fetchUserDetails(id);
      if (success && data) {
        console.log(data);

        setuserData(data);
      } else {
        console.error("Failed to fetch class details:", error);
        toast({
          message: "Error",
          description: error || "Failed to load class details",
          type: "error",
        });
        setuserData(null);
      }
    } catch (error) {
      console.error("Error fetching class details:", error);
      toast({
        message: "Error",
        description: "Failed to load class details",
        type: "error",
      });
      setuserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchuserData();
  }, [id]);



  const handleRemoveUser = async () => {
    if (!userData) return;

    try {
      const { success } = await deleteUser(id);
      if (success) {
        // Refetch the entire class data after removal
        await fetchuserData();
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

  
  if (loading) {
    return <div className="p-4">Loading class details...</div>;
  }

  if (!userData) {
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
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className=" border rounded-sm max-w-4xl mx-auto p-6"
      >
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{userData.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg">{userData.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Domain Name</p>
            <p className="text-lg">{userData.domainName}</p>
          </div>
        </div>

        <div className="mt-6 gap-3.5 flex  items-center ">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <AlertDelete id={id} email={userData.email} onSuccess={()=>handleRemoveUser()}>
            <Button size="icon" variant="destructive" >
              <FiTrash2 className="h-5 w-5" />
            </Button>
          </AlertDelete>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetails;
