"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define schema for attendance marking
const formSchema = z.object({
  students: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      status: z.enum(["present", "absent", "late"]),
    })
  ),
});

// Mock data for demonstration
const students = [
  { id: "1", name: "John Doe", status: "present", date: "2025-04-04" },
  { id: "2", name: "Jane Smith", status: "absent", date: "2025-04-04" },
  // Add more as needed
];

// Columns for DataTable
const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "date", header: "Date" },
  // Actions column can be added for details
];

// Form component for marking
const AttendanceForm = ({ students }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      students: students.map(s => ({ id: s.id, name: s.name, status: "present" })),
    },
  });

  const onSubmit = (data) => {
    console.log(data); // In real app, API call here, e.g., POST to /api/attendance
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {students.map((student) => (
          <FormField
            key={student.id}
            control={form.control}
            name={`students.${students.findIndex(s => s.id === student.id)}.status`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{student.name}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit Attendance</Button>
      </form>
    </Form>
  );
};

// Main component
export default function StudentAttendance() {
  const [date, setDate] = useState(new Date());
  const [filteredStudents, setFilteredStudents] = useState(students);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Input placeholder="Search by name..." />
          <Popover>
            <PopoverTrigger asChild>
              <Button>Pick Date</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class1">Class 1</SelectItem>
              {/* Add more classes as needed */}
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Mark Attendance</Button>
          </DialogTrigger>
          <DialogContent>
            <AttendanceForm students={students} />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Students: {students.length}</p>
          <p>Present: {students.filter(s => s.status === "present").length}</p>
          <p>Absent: {students.filter(s => s.status === "absent").length}</p>
          <p>Late: {students.filter(s => s.status === "late").length}</p>
          <p>Percentage Present: {((students.filter(s => s.status === "present").length / students.length) * 100).toFixed(2)}%</p>
        </CardContent>
      </Card>
     
    </div>
  );
}