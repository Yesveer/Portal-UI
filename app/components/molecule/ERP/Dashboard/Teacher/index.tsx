"use client";
import { ArrowDown, ArrowUp, BarChart3, Calendar, Download, FileText, Filter, Users } from 'lucide-react';
import React from 'react'
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Progress } from '~/components/ui/progress';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table1"

function TeacherMolecules(data:any) {

  console.log(data)
  return (
    <div>
          <div className=' space-y-3' >
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
        </div>
    </div>
  )
}

export default TeacherMolecules