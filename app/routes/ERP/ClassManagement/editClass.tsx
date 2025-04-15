import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import ERPClassEditTemplete from "~/components/template/ERP/Class-Management/EditClass";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Class Management" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Class Management", href: "/erp/class-management" }, // No href means this is the current page
  {label: "Class Details"}
];

export default function ERPClassManagementDetails() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Class Management">
        <ERPClassEditTemplete />
    </SideNavBar>
  )
}
