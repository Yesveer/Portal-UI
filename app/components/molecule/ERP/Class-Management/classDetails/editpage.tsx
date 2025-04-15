"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useNavigate, useParams } from "react-router";
import { useToast } from "~/components/ui/toast-container";
import { ClassAlertDelete } from "../AlertDelete";
import useRequestHook from "~/hooks/requestHook";

export default function EditClassPage() {
  const params = useParams();
  const router = useNavigate();
  const { toast } = useToast();
  const [fetchdata, data, isLoading, error, reset] = useRequestHook(
    `classes/${params.id}`
  );
  const [fetchAll, allList, isLoading2, error2, reset1] = useRequestHook(
    "common",
    "GET",
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    description: "",
    classTeacher: "",
  });

  useEffect(() => {
    // In a real app, this would be an API call to fetch the class data
    // Simulating data fetch

    fetchdata();
    fetchAll();
  }, [params.id]);


  useEffect(()=>{
    if(data){
      setFormData({
        name:data.name,
        section:data?.section,
        description:data?.description,
        classTeacher:data?.classTeacher?._id
      })

    }

  },[data])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
  };


  if (isLoading && Object.values(formData).every((val) => val === "")) {
    return (
      <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Edit Class</h2>
          </div>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading class data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Edit Class</h2>
          <ClassAlertDelete
            classId={params.id}
            onSuccess={() => router("/erp/class-management")}
          >
            <Button variant="destructive">Delete Class</Button>
          </ClassAlertDelete>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Class Information</CardTitle>
              <CardDescription>
                Update the details for this class
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Class Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Class 6"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    name="section"
                    placeholder="e.g. A"
                    value={formData.section}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter class description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classTeacher">Class Teacher</Label>
                <Select
                  value={formData.classTeacher}
                  onValueChange={(value) =>
                    handleSelectChange("classTeacher", value)
                  }
                >
               
             <SelectTrigger id="teacher"  className="col-span-3" >
               <SelectValue placeholder="Select Teacher" />
             </SelectTrigger>
             <SelectContent>
               <SelectGroup>
                 <SelectLabel>Teacher Name</SelectLabel>
                 {allList?.teachers.map((item: any) => (
                   <SelectItem key={item?._id} value={item?._id}>
                     {item?.name}
                   </SelectItem>
                 ))}
               </SelectGroup>
             </SelectContent>
                     </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router(-1)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
