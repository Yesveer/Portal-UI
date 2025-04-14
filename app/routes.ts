import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Login/login.tsx"),
  route("select-org", "routes/Login/select-org.tsx"),
  //ERP routes
  route("erp/admin-dashboard", "routes/ERP/Dashboard/admin-dashboard.tsx"),
  route("erp/student-dashboard", "routes/ERP/Dashboard/student-dashboard.tsx"),
  route("erp/teacher-dashboard", "routes/ERP/Dashboard/teacher-dashboard.tsx"),
  route(
    "erp/accountant-dashboard",
    "routes/ERP/Dashboard/accuntant-dashboard.tsx"
  ),
  route("erp/user-management", "routes/ERP/UserManagement/usermanagement.tsx"),
  route(
    "erp/user-management/:id",
    "routes/ERP/UserManagement/userdetailspage.tsx"
  ),
  route("erp/events", "routes/ERP/Events/events.tsx"),
  route("erp/events/:eventId", "routes/ERP/Events/eventdetails.tsx"),
  route("erp/attendance", "routes/ERP/Attendance/attendance.tsx"),
  route("erp/timetable", "routes/ERP/Timetable/timeTable.tsx"),
  // route("erp/timetable/:id", "routes/ERP/Timetable/timetable-details.tsx"),
  route("erp/payroll", "routes/ERP/Payroll/payroll.tsx"),
  route("erp/fees", "routes/ERP/Fees/fees.tsx"),
  route("erp/exam", "routes/ERP/Exam/exam.tsx"),
  route("erp/report", "routes/ERP/Report/report.tsx"),
  route(
    "erp/class-management",
    "routes/ERP/ClassManagement/classmanagement.tsx"
  ),
  route(
    "erp/class-management/:id",
    "routes/ERP/ClassManagement/classDetails.tsx"
  ),
  route(
    "erp/class-management/:id/assignments/new",
    "routes/ERP/ClassManagement/assignment.tsx"
  ),
  route(
    "erp/class-management/:id/attendance/new",
    "routes/ERP/ClassManagement/attendance.tsx"
  ),
  route(
    "erp/class-management/:id/grades/new",
    "routes/ERP/ClassManagement/marks.tsx"
  ), route(
    "erp/class-management/:id/students/new",
    "routes/ERP/ClassManagement/student.tsx"
  ),
  route("erp/teachers", "routes/ERP/TeacherManagement/teachers.tsx"),
  route("erp/teachers/:id", "routes/ERP/TeacherManagement/TeacherDetails.tsx"),

] satisfies RouteConfig;
