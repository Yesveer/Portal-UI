"use client"

import { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Filter,
  Printer,
  RefreshCw,
  Users,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table1"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"

 const ERPReportSection=()=> {
  const [role, setRole] = useState<"admin" | "student" | "teacher" | "accountant">("admin")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports Dashboard</h1>
          <p className="text-muted-foreground">View and analyze reports based on your role</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={role} onValueChange={(value: any) => setRole(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin View</SelectItem>
              <SelectItem value="student">Student View</SelectItem>
              <SelectItem value="teacher">Teacher View</SelectItem>
              <SelectItem value="accountant">Accountant View</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue={role}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="admin" onClick={() => setRole("admin")}>
            Admin
          </TabsTrigger>
          <TabsTrigger value="student" onClick={() => setRole("student")}>
            Student
          </TabsTrigger>
          <TabsTrigger value="teacher" onClick={() => setRole("teacher")}>
            Teacher
          </TabsTrigger>
          <TabsTrigger value="accountant" onClick={() => setRole("accountant")}>
            Accountant
          </TabsTrigger>
        </TabsList>

        {/* Admin Reports */}
        <TabsContent value="admin" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +12% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +2% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$48,352</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +18.2% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.4%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    <ArrowDown className="mr-1 h-4 w-4" /> -1.2% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Enrollment Trends</CardTitle>
                <CardDescription>Student enrollment over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {[40, 30, 45, 50, 60, 75, 65, 75, 85, 90, 100, 85].map((height, i) => (
                    <div key={i} className="bg-primary/90 rounded-t w-full" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Average grades by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Science</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Mathematics</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Languages</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Arts</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Physical Education</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <Progress value={95} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>A list of recent reports generated in the system</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Annual Performance Review</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>2023-04-01</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>
                      <Badge>Completed</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Quarterly Financial Statement</TableCell>
                    <TableCell>Accountant</TableCell>
                    <TableCell>2023-03-15</TableCell>
                    <TableCell>Financial</TableCell>
                    <TableCell>
                      <Badge>Completed</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Student Attendance Report</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>2023-03-10</TableCell>
                    <TableCell>Attendance</TableCell>
                    <TableCell>
                      <Badge variant="outline">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Curriculum Assessment</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>2023-02-28</TableCell>
                    <TableCell>Academic</TableCell>
                    <TableCell>
                      <Badge>Completed</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Teacher Evaluation Summary</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>2023-02-15</TableCell>
                    <TableCell>Evaluation</TableCell>
                    <TableCell>
                      <Badge variant="outline">In Progress</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  4
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  5
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Student Reports */}
        <TabsContent value="student" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GPA</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +0.2 from last semester
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +2% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18/20</div>
                <p className="text-xs text-muted-foreground">2 assignments pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5th</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> Up 2 positions
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Your grades across different subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Mathematics</span>
                  <span className="text-sm font-medium">A (92%)</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Science</span>
                  <span className="text-sm font-medium">A- (88%)</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">English</span>
                  <span className="text-sm font-medium">B+ (85%)</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">History</span>
                  <span className="text-sm font-medium">A (94%)</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Physical Education</span>
                  <span className="text-sm font-medium">A+ (98%)</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>Your recent test and assignment results</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Class Average</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Mid-term Exam</TableCell>
                    <TableCell>Mathematics</TableCell>
                    <TableCell>2023-03-15</TableCell>
                    <TableCell>92/100</TableCell>
                    <TableCell>78/100</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Excellent</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Research Paper</TableCell>
                    <TableCell>History</TableCell>
                    <TableCell>2023-03-10</TableCell>
                    <TableCell>88/100</TableCell>
                    <TableCell>75/100</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Excellent</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lab Report</TableCell>
                    <TableCell>Science</TableCell>
                    <TableCell>2023-03-05</TableCell>
                    <TableCell>85/100</TableCell>
                    <TableCell>80/100</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Good</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Essay</TableCell>
                    <TableCell>English</TableCell>
                    <TableCell>2023-02-28</TableCell>
                    <TableCell>78/100</TableCell>
                    <TableCell>72/100</TableCell>
                    <TableCell>
                      <Badge>Average</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Quiz</TableCell>
                    <TableCell>Mathematics</TableCell>
                    <TableCell>2023-02-20</TableCell>
                    <TableCell>95/100</TableCell>
                    <TableCell>82/100</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Excellent</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teacher Reports */}
        <TabsContent value="teacher" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">Across 5 classes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">B+ (85%)</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +3% from last semester
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">8 pending grading</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    <ArrowDown className="mr-1 h-4 w-4" /> -1% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
                <CardDescription>Average grades by class</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class 10A</span>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class 10B</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class 11A</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class 11B</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Class 12A</span>
                    <span className="text-sm font-medium">79%</span>
                  </div>
                  <Progress value={79} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Assignment Completion</CardTitle>
                <CardDescription>Percentage of students who completed assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {[95, 88, 92, 78, 85, 90, 82, 88, 95, 89, 92, 86].map((height, i) => (
                    <div key={i} className="bg-primary/90 rounded-t w-full" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Asgmt 1</span>
                  <span>Asgmt 2</span>
                  <span>Asgmt 3</span>
                  <span>Asgmt 4</span>
                  <span>Asgmt 5</span>
                  <span>Asgmt 6</span>
                  <span>Asgmt 7</span>
                  <span>Asgmt 8</span>
                  <span>Asgmt 9</span>
                  <span>Asgmt 10</span>
                  <span>Asgmt 11</span>
                  <span>Asgmt 12</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Individual student performance in your classes</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Average Grade</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Assignments</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Emma Johnson</TableCell>
                    <TableCell>10A</TableCell>
                    <TableCell>A (92%)</TableCell>
                    <TableCell>98%</TableCell>
                    <TableCell>12/12</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Excellent</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">James Smith</TableCell>
                    <TableCell>10A</TableCell>
                    <TableCell>B+ (88%)</TableCell>
                    <TableCell>95%</TableCell>
                    <TableCell>11/12</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Good</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sophia Williams</TableCell>
                    <TableCell>11A</TableCell>
                    <TableCell>A- (90%)</TableCell>
                    <TableCell>92%</TableCell>
                    <TableCell>12/12</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Excellent</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Liam Brown</TableCell>
                    <TableCell>11B</TableCell>
                    <TableCell>C+ (78%)</TableCell>
                    <TableCell>85%</TableCell>
                    <TableCell>9/12</TableCell>
                    <TableCell>
                      <Badge variant="outline">Needs Improvement</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Olivia Jones</TableCell>
                    <TableCell>12A</TableCell>
                    <TableCell>B (85%)</TableCell>
                    <TableCell>90%</TableCell>
                    <TableCell>10/12</TableCell>
                    <TableCell>
                      <Badge>Good</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Accountant Reports */}
        <TabsContent value="accountant" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$482,695</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +8.2% from last year
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$356,412</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +5.4% from last year
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$126,283</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +12.5% from last year
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Fees</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42,568</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> +2.3% from last month
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Sources of revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {[60, 15, 10, 8, 7].map((height, i) => (
                    <div key={i} className="bg-primary/90 rounded-t w-full" style={{ height: `${height}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Tuition</span>
                  <span>Donations</span>
                  <span>Grants</span>
                  <span>Events</span>
                  <span>Other</span>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Major expense categories for the current year</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Salaries</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Facilities</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Equipment</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Supplies</span>
                    <span className="text-sm font-medium">7%</span>
                  </div>
                  <Progress value={7} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">5%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Financial Transactions</CardTitle>
                <CardDescription>Recent financial activities</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">TRX-2023-001</TableCell>
                    <TableCell>Tuition Payment - Emma Johnson</TableCell>
                    <TableCell>2023-04-01</TableCell>
                    <TableCell>$1,200.00</TableCell>
                    <TableCell>Income</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Completed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TRX-2023-002</TableCell>
                    <TableCell>Staff Salary Payment</TableCell>
                    <TableCell>2023-03-31</TableCell>
                    <TableCell>$45,000.00</TableCell>
                    <TableCell>Expense</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Completed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TRX-2023-003</TableCell>
                    <TableCell>Lab Equipment Purchase</TableCell>
                    <TableCell>2023-03-25</TableCell>
                    <TableCell>$8,500.00</TableCell>
                    <TableCell>Expense</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Completed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TRX-2023-004</TableCell>
                    <TableCell>Donation - Alumni Association</TableCell>
                    <TableCell>2023-03-20</TableCell>
                    <TableCell>$5,000.00</TableCell>
                    <TableCell>Income</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Completed</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TRX-2023-005</TableCell>
                    <TableCell>Utility Bills Payment</TableCell>
                    <TableCell>2023-03-15</TableCell>
                    <TableCell>$2,800.00</TableCell>
                    <TableCell>Expense</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  4
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ERPReportSection;