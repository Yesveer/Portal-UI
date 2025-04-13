import ERPTeacherManage from "~/components/template/ERP/TeacherManagement";
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"

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
        <ERPTeacherManage />
    </SideNavBar>
  )
}
