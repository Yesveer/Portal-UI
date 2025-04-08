import { GalleryVerticalEnd } from "lucide-react"
import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import ERPStudentDash from "~/components/template/ERP/Dashboard/student";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// const breadcrumbItems = [
//   { label: "Home", href: "/" },
//   { label: "Dashboard", href: "/dashboard" },
//   { label: "Settings" }, // No href means this is the current page
// ];

const breadcrumbItems = [
  { label: "Dashboard" }, // No href means this is the current page
];

export default function AdminDashboard() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Dashboard">
        <ERPStudentDash/>
    </SideNavBar>
  )
}
