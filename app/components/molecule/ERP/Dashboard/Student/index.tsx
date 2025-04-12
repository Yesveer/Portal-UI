import React from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table1"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { ArrowUp, BarChart3, Calendar, Download, FileText, Users } from 'lucide-react'
import { Button } from '~/components/ui/button'
function StudentMolecule() {
  return (
    <>
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
        </>
  )
}

export default StudentMolecule