import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import ERPEventsTemplete from "~/components/template/ERP/Events/events";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Events" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Events" }, // No href means this is the current page
];

export default function ERPEvents() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Events">
        <ERPEventsTemplete />
    </SideNavBar>
  )
}
