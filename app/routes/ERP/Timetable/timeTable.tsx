import ERPTimeTable from "~/components/template/ERP/Timetable/timetable-module";
import type { Route } from "./+types/home";
import SideNavBar from "~/components/template/sidenavbar";
import { ToastProvider } from "~/components/ui/toast-container";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Timetable" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Timetable" }, // No href means this is the current page
];

export default function ERPPayroll() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Timetable">
      <ERPTimeTable/>
    </SideNavBar>
  );
}
