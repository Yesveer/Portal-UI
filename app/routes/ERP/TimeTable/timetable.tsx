import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import ERPTimetableTemplete from "~/components/template/ERP/TimeTable/timetable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Events" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Timetable" }, // No href means this is the current page
];

export default function ERPEvents() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Timetable">
        <ERPTimetableTemplete />
    </SideNavBar>
  )
}
