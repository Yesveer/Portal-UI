import RoleBasedFeesLayout from "~/components/template/ERP/Fees/role-based-layout";
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Events" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Payroll" }, // No href means this is the current page
];

export default function ERPPayroll() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Timetable">
        <RoleBasedFeesLayout />
    </SideNavBar>
  )
}
