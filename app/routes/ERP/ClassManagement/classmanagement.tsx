import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import ERPClassManagementTemplete from "~/components/template/ERP/Class-Management/classManagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Class Management" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Class Management" }, // No href means this is the current page
];

export default function ERPClassManagement() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Class Management">
        <ERPClassManagementTemplete />
    </SideNavBar>
  )
}
