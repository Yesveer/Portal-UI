import RoleBasedPayrollLayout from "~/components/template/ERP/Payroll/role-based-layout";
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Payroll" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Payroll" }, // No href means this is the current page
];

export default function ERPPayroll() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Payroll">
        <RoleBasedPayrollLayout />
    </SideNavBar>
  )
}
