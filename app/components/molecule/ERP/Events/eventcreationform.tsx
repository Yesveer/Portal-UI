"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import * as z from "zod"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import { Checkbox } from "~/components/ui/checkbox"

// Define the form schema with Zod
const eventFormSchema = z
  .object({
    title: z.string().min(3, {
      message: "Title must be at least 3 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    eventType: z.enum(["Seminar", "Workshop", "Holiday", "Exam", "Meeting", "Festival", "Other"]),
    location: z.string().min(3, {
      message: "Location must be at least 3 characters.",
    }),
    startDate: z.date({
      required_error: "Start date is required.",
    }),
    endDate: z.date({
      required_error: "End date is required.",
    }),
    visibility: z.array(z.enum(["Admin", "Teacher", "Student", "Accountant"])).min(1, {
      message: "Select at least one visibility option.",
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  })

type EventFormValues = z.infer<typeof eventFormSchema>

// Define the visibility options
const visibilityOptions = [
  { id: "Admin", label: "Admin" },
  { id: "Teacher", label: "Teacher" },
  { id: "Student", label: "Student" },
  { id: "Accountant", label: "Accountant" },
]

interface EventFormProps {
  initialData?: any
  onSubmit: (data: EventFormValues) => void
  isSubmitting: boolean
}



export function EventForm({ initialData, onSubmit, isSubmitting }: EventFormProps) {
  // Initialize the form with default values or existing event data
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          startDate: initialData?.startDate?new Date(initialData?.startDate):"",
          endDate: initialData?.endDate?new Date(initialData?.endDate):"",
          visibility: Array.isArray(initialData?.visibility) ? initialData?.visibility : [initialData?.visibility],
        }
      : {
          title: "",
          description: "",
          eventType: "Other",
          location: "",
          startDate: new Date(),
          endDate: new Date(),
          visibility: ["Student"],
        },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormDescription>The name of your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the event details" className="resize-none min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>Provide details about the event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Holiday">Holiday</SelectItem>
                    <SelectItem value="Exam">Exam</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Festival">Festival</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The category of your event.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Event location" {...field} />
                </FormControl>
                <FormDescription>Where the event will take place.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormDescription>When the event starts.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormDescription>When the event ends.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="visibility"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Visibility</FormLabel>
                <FormDescription>Select who can see this event.</FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {visibilityOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={form.control}
                    name="visibility"
                    render={({ field }) => {
                      return (
                        <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id as any)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, option.id])
                                  : field.onChange(field.value?.filter((value) => value !== option.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{option.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
