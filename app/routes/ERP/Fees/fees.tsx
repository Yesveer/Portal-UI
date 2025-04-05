import RoleBasedFeesLayout from "~/components/template/ERP/Fees/role-based-layout";
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Fees" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Fees" }, // No href means this is the current page
];

export default function ERPFees() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Fees">
        <RoleBasedFeesLayout />
    </SideNavBar>
  )
}
