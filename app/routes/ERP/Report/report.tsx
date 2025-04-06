import ERPTimeTable from "~/components/template/ERP/Timetable/timetable-module";
import type { Route } from "./+types/home";
import SideNavBar from "~/components/template/sidenavbar";
import ERPReportSection from "~/components/molecule/ERP/Report/ReportTab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Report" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Report" }, // No href means this is the current page
];

export default function ERPReport() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Report">
      <ERPReportSection/>
    </SideNavBar>
  );
}
