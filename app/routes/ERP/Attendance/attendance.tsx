import ERPAttendanceManagement from "~/components/template/ERP/Attendance/attendanceManagement";
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Attendance" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Attendance" }, // No href means this is the current page
];

export default function ERPAttendance() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Attendance">
        <ERPAttendanceManagement />
    </SideNavBar>
  )
}
