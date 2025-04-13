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
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useNavigate, useParams } from "react-router";
import { DatePicker } from "~/components/ui/date-picker";
import { useToast } from "~/components/ui/toast-container";
import axios from "axios";
import { fetchClassDetails } from "~/routes/ERP/ClassManagement/api";

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

export default function TakeAttendancePage() {
  const { id: classId } = useParams();

  const { id } = useParams();
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const { toast } = useToast();

  const [students, setStudents] = useState<
    Array<{
      _id: string;
      name: string;
      email: string;
      present: boolean;
    }>
  >([]);

  const ERP_URL = import.meta.env.VITE_ERP_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    // In a real app, this would be an API call to fetch students
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const { success, data, error } = await fetchClassDetails(classId);

        if (success && data) {
          const normalizedData = {
            students: Array.isArray(data.students) ? data.students : [],
          };

          setStudents(normalizedData.students);
        } else {
          console.error("Failed to fetch class details:", error);
          toast({
            message: "Error",
            description: error || "Failed to load class details",
            type: "error",
          });
          setStudents(null);
        }
        // Simulate API delay
        // Mock data
        // setStudents([
        //   {
        //     _id: "67f5861bd4f3906dc4566c28",
        //     name: "Alice Smith",
        //     email: "alice~example.com",
        //     present: true,
        //   },
        //   {
        //     _id: "67f5861bd4f3906dc4566c29",
        //     name: "Bob Johnson",
        //     email: "bob~example.com",
        //     present: true,
        //   },
        //   {
        //     _id: "67f5861bd4f3906dc4566c30",
        //     name: "Charlie Brown",
        //     email: "charlie~example.com",
        //     present: true,
        //   },
        // ])
      } catch (error) {
        toast({
          title: "Error fetching students",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleToggleAttendance = (id: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     // In a real app, this would be an API call
  //     // await fetch(`/api/classes/${params.id}/attendance`, {
  //     //   method: 'POST',
  //     //   body: JSON.stringify({ date, students: students.map(s => ({ id: s._id, present: s.present })) })
  //     // })

  //     toast({
  //       message: "Attendance recorded successfully",
  //       description: `Attendance for ${date.toLocaleDateString()} has been recorded.`,
  //       type: "success",
  //     });

  //     router(`/classes/${params.id}?tab=attendance`);
  //   } catch (error) {
  //     toast({
  //       message: "Error recording attendance",
  //       description: "Something went wrong. Please try again.",
  //       type: "error",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const attendanceRecords = students.map((student) => ({
        studentEmail: student.email,
        date,
        status: student.present ? "Present" : "Absent",
      }));

      const response = await axios.post(
        `${ERP_URL}/api/teacher/mark-attendance`,
        {
          batchRecords: attendanceRecords,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.results?.some((r) => r.error)) {
        const errors = response.data.results.filter((r) => r.error);
        toast({
          message: "Partial success",
          description: `Processed ${response.data.results.length} records with ${errors.length} errors`,
          type: "warning",
        });
      } else {
        toast({
          message: "Attendance recorded successfully",
          description: `Attendance for ${date.toLocaleDateString()} has been recorded.`,
          type: "success",
        });
      }

      router("/erp/class-management");
    } catch (error) {
      console.error(error);
      toast({
        message: "Error recording attendance",
        description:
          error.response?.data?.error ||
          "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Take Attendance</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Record</CardTitle>
              <CardDescription>
                Mark attendance for students in this class
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Date</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>

              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 font-medium border-b">
                    <div className="col-span-1">Present</div>
                    <div className="col-span-11">Student</div>
                  </div>
                  {students.map((student) => (
                    <div
                      key={student._id}
                      className="grid grid-cols-12 p-4 items-center hover:bg-muted/50"
                    >
                      <div className="col-span-1 flex justify-center">
                        <Checkbox
                          checked={student.present}
                          onCheckedChange={() =>
                            handleToggleAttendance(student._id)
                          }
                        />
                      </div>
                      <div className="col-span-11 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setStudents((prev) =>
                        prev.map((s) => ({ ...s, present: true }))
                      )
                    }
                  >
                    Mark All Present
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setStudents((prev) =>
                        prev.map((s) => ({ ...s, present: false }))
                      )
                    }
                  >
                    Mark All Absent
                  </Button>
                </div>
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
                {isLoading ? "Saving..." : "Save Attendance"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
