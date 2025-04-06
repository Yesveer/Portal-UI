import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import ERPExamManagementTemplete from "~/components/template/ERP/Exam/ExamManagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Exam" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Exam" }, // No href means this is the current page
];

export default function ERPPayroll() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Exam">
        <ERPExamManagementTemplete />
    </SideNavBar>
  )
}
