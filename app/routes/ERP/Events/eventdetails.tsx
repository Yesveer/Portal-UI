import type { Route } from "./+types/home";
import  SideNavBar from "~/components/template/sidenavbar"
import ERPEventsTemplete from "~/components/template/ERP/Events/events";
import ERPEventDetailsPageTem from "~/components/template/ERP/Events/EventDetails";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY ERP | Events details" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const breadcrumbItems = [
  { label: "Events" }, // No href means this is the current page
];

export default function ERPEvents() {
  return (
    <SideNavBar items={breadcrumbItems} enableSidebar="Events">
        <ERPEventDetailsPageTem />
    </SideNavBar>
  )
}
