"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Plus, Trash2, Clock, BookOpen, User } from "lucide-react";
import { useToast } from "~/components/ui/toast-container";
import useRequestHook from "~/hooks/requestHook";
import axios from "axios";

// Define the schema for form validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  forRole: z.enum(["Teacher", "Student"]),
  className: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  forRoleRef: z.enum(["Teacher", "Student"]),
  assignedTo: z.string().min(1, "Assigned To is required"),
  days: z.array(
    z.object({
      day: z.string(),
      periods: z
        .array(
          z
            .object({
              subject: z.string().min(1, "Subject is required"),
              startTime: z.string().min(1, "Start time is required"),
              endTime: z.string().min(1, "End time is required"),
              teacher: z.string().optional(),
            })
            .optional()
        )
        .optional(),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTimetableFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  // These would be fetched from your API in a real application
  teacherOptions?: { id: string; name: string }[];
  studentOptions?: { id: string; name: string }[];
}

const defaultDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function CreateTimetableForm({
  open,
  onOpenChange,
  onSuccess,
  teacherOptions = [],
  studentOptions = [],
}: CreateTimetableFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [handlecreate, data, isLoading, error] = useRequestHook(
    "timetable/create",
    "POST",
    null
  );

  // Initialize the form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      forRole: "Teacher",
      forRoleRef: "Teacher",
      className: 4,
      section: "A",
      assignedTo: "",
      days: defaultDays.map((day) => ({
        day,
        periods: [
          { subject: "", startTime: "08:00", endTime: "09:00", teacher: "" },
        ],
      })),
    },
  });

  // Get the current form values
  const { days } = form.watch();

  // Handle form submission
  // const onSubmit = async (data: FormValues) => {
  //   console.log("asdasd");
  // };

  const ERP_URL = import.meta.env.VITE_ERP_URL;

  const onSubmit = async (data: FormValues) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Form submitted with data:", data);
      setIsSubmitting(true);

      const res = await axios.post(`${ERP_URL}/api/timetable/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const resData = await res;

      console.log(resData.json());

      toast({
        title: "Success",
        description: "Timetable created successfully",
        variant: "default",
      });

      if (onSuccess) onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create timetable",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a new period to a specific day
  const addPeriod = (dayIndex: number) => {
    const currentDays = form.getValues("days");
    const updatedDays = [...currentDays];

    // Get the last period's end time to use as the start time for the new period
    const periods = updatedDays[dayIndex].periods;
    const lastPeriod = periods[periods.length - 1];
    const newStartTime = lastPeriod?.endTime || "08:00";

    // Calculate end time (1 hour after start time)
    const [hours, minutes] = newStartTime.split(":").map(Number);
    const endHours = hours + 1 > 23 ? 0 : hours + 1;
    const newEndTime = `${endHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    updatedDays[dayIndex].periods.push({
      subject: "",
      startTime: newStartTime,
      endTime: newEndTime,
      teacher: "",
    });

    form.setValue("days", updatedDays);
  };

  // Remove a period from a specific day
  const removePeriod = (dayIndex: number, periodIndex: number) => {
    const currentDays = form.getValues("days");
    const updatedDays = [...currentDays];

    // Don't remove if it's the only period
    if (updatedDays[dayIndex].periods.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "Each day must have at least one period.",
        variant: "destructive",
      });
      return;
    }

    updatedDays[dayIndex].periods.splice(periodIndex, 1);
    form.setValue("days", updatedDays);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Create Timetable</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new timetable schedule.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timetable Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter timetable title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* For Role Field */}
              <FormField
                control={form.control}
                name="forRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>For Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* For Role Ref Field */}
              <FormField
                control={form.control}
                name="forRoleRef"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Reference</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role reference" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Teacher">Teacher</SelectItem>
                        <SelectItem value="Student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Assigned To Field */}
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter user ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* For Class */}
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Class" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* For Section */}
              <FormField
                control={form.control}
                name="section"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the section" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Days and Periods Section */}
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>
                  Configure the periods for each day of the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="Monday" className="w-full">
                  <TabsList className="grid grid-cols-5 mb-4">
                    {defaultDays.map((day) => (
                      <TabsTrigger key={day} value={day}>
                        {day}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {days.map((day, dayIndex) => (
                    <TabsContent
                      key={day.day}
                      value={day.day}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">
                          {day.day} Periods
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addPeriod(dayIndex)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Period
                        </Button>
                      </div>

                      {day.periods.map((_, periodIndex) => (
                        <Card key={periodIndex} className="border border-muted">
                          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                            <CardTitle className="text-md">
                              Period {periodIndex + 1}
                            </CardTitle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removePeriod(dayIndex, periodIndex)
                              }
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Subject Field */}
                              <FormField
                                control={form.control}
                                name={`days.${dayIndex}.periods.${periodIndex}.subject`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      <BookOpen className="h-4 w-4 mr-2" />
                                      Subject
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter subject name"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Teacher Field */}
                              <FormField
                                control={form.control}
                                name={`days.${dayIndex}.periods.${periodIndex}.teacher`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      <User className="h-4 w-4 mr-2" />
                                      Teacher ID
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter teacher ID"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Start Time Field */}
                              <FormField
                                control={form.control}
                                name={`days.${dayIndex}.periods.${periodIndex}.startTime`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2" />
                                      Start Time
                                    </FormLabel>
                                    <FormControl>
                                      <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* End Time Field */}
                              <FormField
                                control={form.control}
                                name={`days.${dayIndex}.periods.${periodIndex}.endTime`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2" />
                                      End Time
                                    </FormLabel>
                                    <FormControl>
                                      <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Timetable"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
