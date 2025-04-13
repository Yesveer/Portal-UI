import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import TeacherDetailsPage from "~/components/molecule/ERP/Teacher-Management/teacherDetails/techerDetailPage";
import { ToastProvider } from "~/components/ui/toast-container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Teachers" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Teacher Management" }, // No href means this is the current page
];

export default function ERPTeacher() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Teacher Management">
        <ToastProvider>
        <TeacherDetailsPage />
        </ToastProvider>
    </SideNavBar>
  )
}
