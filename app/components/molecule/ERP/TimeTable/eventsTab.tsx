"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Printer,
  RefreshCw,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import useRequestHook from "~/hooks/requestHook";
import { CreateTimetableForm } from "./eventcreationform";
import { uploadExcelFile } from "~/routes/ERP/api";
import { useToast } from "~/components/ui/toast-container";

const ERPTimetableMolecule = () => {
  const [fetchTimeTable, timetables, isLoading, error] = useRequestHook(
    "timetable/get",
    "GET",
    null
  );
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add this state

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    fetchTimeTable();
  }, [refreshKey]);

  const handleBulkUpload = async (file: File) => {
    const result = await uploadExcelFile("timetable/bulk", file);

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

  const getTimetableData = () => {
    if (!timetables?.success || !timetables.data?.[0]) {
      return {
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
      };
    }

    const apiData = timetables.data[0];
    const transformedData: Record<string, any> = {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
    };

    const getPeriodSlot = (startTime: string) => {
      const hour = parseInt(startTime.split(":")[0]);
      return `${hour}:00 - ${hour + 1}:00`;
    };

    apiData.days.forEach((day: any) => {
      day.periods.forEach((period: any) => {
        const periodSlot = getPeriodSlot(period.startTime);
        transformedData[day.day][periodSlot] = {
          subject: period.subject,
          teacher: period.teacher.name || `Teacher ID: ${period.teacher}`,
          room: period.room || "Not Assigned",
        };
      });
    });

    return transformedData;
  };

  const timetableData = getTimetableData();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const periods = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 1:00",
    "1:00 - 2:00",
    "2:00 - 3:00",
    "3:00 - 4:00",
  ];

  // const timetableData = {
  //   Monday: {
  //     "8:00 - 9:00": {
  //       subject: "Mathematics",
  //       teacher: "Mr. Johnson",
  //       room: "101",
  //     },
  //     "9:00 - 10:00": {
  //       subject: "Physics",
  //       teacher: "Mrs. Smith",
  //       room: "102",
  //     },
  //     "10:00 - 11:00": {
  //       subject: "Chemistry",
  //       teacher: "Dr. Brown",
  //       room: "103",
  //     },
  //     "11:00 - 12:00": {
  //       subject: "English",
  //       teacher: "Ms. Davis",
  //       room: "104",
  //     },
  //     "12:00 - 1:00": {
  //       subject: "Lunch Break",
  //       teacher: "",
  //       room: "Cafeteria",
  //     },
  //     "1:00 - 2:00": { subject: "History", teacher: "Mr. Wilson", room: "105" },
  //     "2:00 - 3:00": {
  //       subject: "Computer Science",
  //       teacher: "Mrs. Taylor",
  //       room: "106",
  //     },
  //     "3:00 - 4:00": {
  //       subject: "Physical Education",
  //       teacher: "Mr. Anderson",
  //       room: "Gym",
  //     },
  //   },
  //   Tuesday: {
  //     "8:00 - 9:00": {
  //       subject: "Biology",
  //       teacher: "Dr. Martinez",
  //       room: "107",
  //     },
  //     "9:00 - 10:00": {
  //       subject: "Mathematics",
  //       teacher: "Mr. Johnson",
  //       room: "101",
  //     },
  //     "10:00 - 11:00": { subject: "Art", teacher: "Ms. Garcia", room: "108" },
  //     "11:00 - 12:00": {
  //       subject: "English",
  //       teacher: "Ms. Davis",
  //       room: "104",
  //     },
  //     "12:00 - 1:00": {
  //       subject: "Lunch Break",
  //       teacher: "",
  //       room: "Cafeteria",
  //     },
  //     "1:00 - 2:00": {
  //       subject: "Geography",
  //       teacher: "Mrs. Rodriguez",
  //       room: "109",
  //     },
  //     "2:00 - 3:00": { subject: "Music", teacher: "Mr. Lee", room: "110" },
  //     "3:00 - 4:00": {
  //       subject: "Study Hall",
  //       teacher: "Mrs. White",
  //       room: "111",
  //     },
  //   },
  //   Wednesday: {
  //     "8:00 - 9:00": {
  //       subject: "Mathematics",
  //       teacher: "Mr. Johnson",
  //       room: "101",
  //     },
  //     "9:00 - 10:00": {
  //       subject: "Physics",
  //       teacher: "Mrs. Smith",
  //       room: "102",
  //     },
  //     "10:00 - 11:00": {
  //       subject: "Chemistry",
  //       teacher: "Dr. Brown",
  //       room: "103",
  //     },
  //     "11:00 - 12:00": {
  //       subject: "English",
  //       teacher: "Ms. Davis",
  //       room: "104",
  //     },
  //     "12:00 - 1:00": {
  //       subject: "Lunch Break",
  //       teacher: "",
  //       room: "Cafeteria",
  //     },
  //     "1:00 - 2:00": { subject: "History", teacher: "Mr. Wilson", room: "105" },
  //     "2:00 - 3:00": {
  //       subject: "Computer Science",
  //       teacher: "Mrs. Taylor",
  //       room: "106",
  //     },
  //     "3:00 - 4:00": {
  //       subject: "Physical Education",
  //       teacher: "Mr. Anderson",
  //       room: "Gym",
  //     },
  //   },
  //   Thursday: {
  //     "8:00 - 9:00": {
  //       subject: "Biology",
  //       teacher: "Dr. Martinez",
  //       room: "107",
  //     },
  //     "9:00 - 10:00": {
  //       subject: "Mathematics",
  //       teacher: "Mr. Johnson",
  //       room: "101",
  //     },
  //     "10:00 - 11:00": { subject: "Art", teacher: "Ms. Garcia", room: "108" },
  //     "11:00 - 12:00": {
  //       subject: "English",
  //       teacher: "Ms. Davis",
  //       room: "104",
  //     },
  //     "12:00 - 1:00": {
  //       subject: "Lunch Break",
  //       teacher: "",
  //       room: "Cafeteria",
  //     },
  //     "1:00 - 2:00": {
  //       subject: "Geography",
  //       teacher: "Mrs. Rodriguez",
  //       room: "109",
  //     },
  //     "2:00 - 3:00": { subject: "Music", teacher: "Mr. Lee", room: "110" },
  //     "3:00 - 4:00": {
  //       subject: "Study Hall",
  //       teacher: "Mrs. White",
  //       room: "111",
  //     },
  //   },
  //   Friday: {
  //     "8:00 - 9:00": {
  //       subject: "Mathematics",
  //       teacher: "Mr. Johnson",
  //       room: "101",
  //     },
  //     "9:00 - 10:00": {
  //       subject: "Physics",
  //       teacher: "Mrs. Smith",
  //       room: "102",
  //     },
  //     "10:00 - 11:00": {
  //       subject: "Chemistry",
  //       teacher: "Dr. Brown",
  //       room: "103",
  //     },
  //     "11:00 - 12:00": {
  //       subject: "English",
  //       teacher: "Ms. Davis",
  //       room: "104",
  //     },
  //     "12:00 - 1:00": {
  //       subject: "Lunch Break",
  //       teacher: "",
  //       room: "Cafeteria",
  //     },
  //     "1:00 - 2:00": {
  //       subject: "Club Activities",
  //       teacher: "Various",
  //       room: "Various",
  //     },
  //     "2:00 - 3:00": {
  //       subject: "Club Activities",
  //       teacher: "Various",
  //       room: "Various",
  //     },
  //     "3:00 - 4:00": { subject: "Free Time", teacher: "", room: "" },
  //   },
  // };

  const getSubjectColor = (subject: string) => {
    const subjects: Record<string, string> = {
      Mathematics: "bg-blue-100 border-blue-300 text-blue-800",
      Physics: "bg-purple-100 border-purple-300 text-purple-800",
      Chemistry: "bg-green-100 border-green-300 text-green-800",
      Biology: "bg-teal-100 border-teal-300 text-teal-800",
      English: "bg-red-100 border-red-300 text-red-800",
      History: "bg-amber-100 border-amber-300 text-amber-800",
      Geography: "bg-lime-100 border-lime-300 text-lime-800",
      "Computer Science": "bg-cyan-100 border-cyan-300 text-cyan-800",
      Art: "bg-pink-100 border-pink-300 text-pink-800",
      Music: "bg-indigo-100 border-indigo-300 text-indigo-800",
      "Physical Education": "bg-orange-100 border-orange-300 text-orange-800",
      "Lunch Break": "bg-gray-100 border-gray-300 text-gray-800",
      "Study Hall": "bg-slate-100 border-slate-300 text-slate-800",
      "Club Activities": "bg-violet-100 border-violet-300 text-violet-800",
      "Free Time": "bg-gray-100 border-gray-300 text-gray-800",
    };

    return subjects[subject] || "bg-gray-100 border-gray-300 text-gray-800";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getWeekDates = () => {
    const currentDay = currentDate.getDay();
    const diff = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Monday as first day
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - diff);

    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(formatDate(date));
    }

    return dates;
  };

  const weekDates = getWeekDates();

  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (view === "month") {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(currentDate.getDate() + 1);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + 7);
    } else if (view === "month") {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  console.log(JSON.stringify(timetables));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Timetable</h1>
          <p className="text-muted-foreground">
            View and manage your class schedule
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>Create Timetable</Button>
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
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

        {open && <CreateTimetableForm open={open} onOpenChange={setOpen} />}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Select value={view} onValueChange={(value: any) => setView(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>
              {view === "day"
                ? formatDate(currentDate)
                : view === "week"
                ? `Week of ${weekDates[0]}`
                : `${currentDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}`}
            </CardTitle>
            <CardDescription>
              {view === "day"
                ? "Daily schedule"
                : view === "week"
                ? "Weekly schedule"
                : "Monthly schedule"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="class" className="mb-4">
            <TabsList>
              <TabsTrigger value="class">Class View</TabsTrigger>
              <TabsTrigger value="teacher">Teacher View</TabsTrigger>
              <TabsTrigger value="room">Room View</TabsTrigger>
            </TabsList>
          </Tabs>

          {view === "week" && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-50 min-w-[100px]">
                      Time
                    </th>
                    {days.map((day, index) => (
                      <th
                        key={day}
                        className="border p-2 bg-gray-50 min-w-[180px]"
                      >
                        <div className="font-medium">{day}</div>
                        <div className="text-xs text-muted-foreground">
                          {weekDates[index]}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period) => (
                    <tr key={period}>
                      <td className="border p-2 font-medium text-sm">
                        {period}
                      </td>
                      {days.map((day) => {
                        const cell = timetableData[day][period];
                        return (
                          <td key={`${day}-${period}`} className="border p-1">
                            {cell && (
                              <div
                                className={`p-1 rounded border text-sm ${getSubjectColor(
                                  cell.subject
                                )}`}
                              >
                                <div className="font-medium">
                                  {cell.subject}
                                </div>
                                {cell.teacher && (
                                  <div className="text-xs">{cell.teacher}</div>
                                )}
                                {cell.room && (
                                  <div className="text-xs">
                                    Room: {cell.room}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "day" && (
            <div className="space-y-2">
              {periods.map((period) => {
                const dayName = [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ][currentDate.getDay()];
                const cell =
                  dayName && timetableData[dayName]
                    ? timetableData[dayName][period]
                    : null;

                return (
                  <div
                    key={period}
                    className="flex border rounded-lg overflow-hidden"
                  >
                    <div className="w-32 p-3 bg-gray-50 flex items-center justify-center font-medium">
                      {period}
                    </div>
                    <div className="flex-1 p-3">
                      {cell ? (
                        <div
                          className={`p-2 rounded border ${getSubjectColor(
                            cell.subject
                          )}`}
                        >
                          <div className="font-medium">{cell.subject}</div>
                          {cell.teacher && (
                            <div className="text-sm">{cell.teacher}</div>
                          )}
                          {cell.room && (
                            <div className="text-sm">Room: {cell.room}</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-muted-foreground italic">
                          No class scheduled
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {view === "month" && (
            <div className="grid grid-cols-7 gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="p-2 text-center font-medium bg-gray-50"
                >
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="border p-2 h-24 overflow-hidden">
                  <div className="text-sm font-medium mb-1">{i + 1}</div>
                  <div className="space-y-1">
                    {i % 7 < 5 &&
                      i < 28 && ( // Only show classes on weekdays
                        <>
                          <div className="text-xs p-1 rounded bg-blue-100 truncate">
                            Math - 8:00
                          </div>
                          <div className="text-xs p-1 rounded bg-red-100 truncate">
                            English - 11:00
                          </div>
                          <div className="text-xs p-1 rounded bg-green-100 truncate">
                            Science - 2:00
                          </div>
                        </>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            <Calendar className="inline-block w-4 h-4 mr-1" />
            Last updated: April 1, 2023
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Academic
            </Badge>
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Extracurricular
            </Badge>
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500"></div>
              Break
            </Badge>
          </div>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Special events and schedule changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 text-red-800 rounded-md p-2 text-center min-w-[60px]">
                  <div className="text-sm font-bold">APR</div>
                  <div className="text-xl font-bold">15</div>
                </div>
                <div>
                  <h4 className="font-medium">Parent-Teacher Conference</h4>
                  <p className="text-sm text-muted-foreground">
                    2:00 PM - 6:00 PM
                  </p>
                  <p className="text-sm mt-1">
                    All regular classes after 1:00 PM are cancelled.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-800 rounded-md p-2 text-center min-w-[60px]">
                  <div className="text-sm font-bold">APR</div>
                  <div className="text-xl font-bold">20</div>
                </div>
                <div>
                  <h4 className="font-medium">Science Fair</h4>
                  <p className="text-sm text-muted-foreground">
                    9:00 AM - 3:00 PM
                  </p>
                  <p className="text-sm mt-1">
                    All science classes will participate in the fair.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-green-100 text-green-800 rounded-md p-2 text-center min-w-[60px]">
                  <div className="text-sm font-bold">APR</div>
                  <div className="text-xl font-bold">25</div>
                </div>
                <div>
                  <h4 className="font-medium">
                    Field Trip - Museum of Natural History
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    8:00 AM - 4:00 PM
                  </p>
                  <p className="text-sm mt-1">
                    For all 10th grade students. Regular classes cancelled.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Changes</CardTitle>
            <CardDescription>
              Recent modifications to the timetable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-amber-500 pl-4 py-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Mathematics - Room Change</h4>
                  <span className="text-xs text-muted-foreground">
                    2 days ago
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Mathematics class on Mondays has been moved from Room 101 to
                  Room 105 due to renovations.
                </p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 py-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Physics - Cancelled</h4>
                  <span className="text-xs text-muted-foreground">
                    3 days ago
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Physics class on April 18th is cancelled due to teacher
                  absence. A substitute assignment will be provided.
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    Computer Science - Added Session
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    1 week ago
                  </span>
                </div>
                <p className="text-sm mt-1">
                  An additional Computer Science session has been added on
                  Fridays from 2:00 PM to 3:00 PM for project work.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Teacher Substitution</h4>
                  <span className="text-xs text-muted-foreground">
                    1 week ago
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Mrs. Rodriguez will be substituting for Mr. Wilson's History
                  classes from April 10-15.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ERPTimetableMolecule;
