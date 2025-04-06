import * as React from "react"
import { AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, SquareTerminal } from "lucide-react"
import { NavMain } from "~/components/molecule/nav-main"
import { NavProjects } from "~/components/molecule/nav-projects"
import { NavUser } from "~/components/molecule/nav-user"
import { TeamSwitcher } from "~/components/molecule/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "~/components/ui/sidebar"

// Function to get role-based data
const getRoleBasedData = () => {
  if (typeof window === "undefined") return { navMain: [], projects: [], teams: [], user: {} }
  const role = localStorage.getItem("role") || "Admin" // Default to Admin if role is not found

  let data = {
    user: {
      name: "kaal",
      email: "kaal@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      { name: "VSAY ERP", logo: GalleryVerticalEnd, plan: "Enterprise" },
      { name: "VSAY LMS.", logo: AudioWaveform, plan: "Startup" },
      { name: "VSAY Inventory", logo: Command, plan: "Free" },
    ],
    navMain: [],
    projects: [],
  }

  switch (role) {
    case "Admin":
      data.navMain = [
        { title: "Dashboard", url: "/erp/admin-dashboard", icon: SquareTerminal, isActive: true },
        { title: "Events", url: "/erp/events", icon: Bot },
        { title: "Timetable", url: "/erp/timetable", icon: Bot },
        { title: "Payroll", url: "/erp/payroll", icon: Bot },
        { title: "Report", url: "/erp/report", icon: Bot },
      ]
      data.projects = [
        { name: "User Management", url: "/erp/user-management", icon: Frame },
        { name: "Class Management", url: "/erp/class-management", icon: PieChart },
        { name: "Security", url: "/erp/security", icon: Map },
        { name: "Settings", url: "/erp/settings", icon: Map },
        { name: "Licence", url: "/erp/licence", icon: Map },
      ]
      break

    case "Teacher":
      data.navMain = [
        { title: "Dashboard", url: "/erp/dashboard", icon: SquareTerminal, isActive: true },
        { title: "Class Management", url: "/erp/class-management", icon: PieChart },
        { title: "Attendance Management", url: "/erp/attendance", icon: Bot },
        { title: "Payroll", url: "/erp/payroll", icon: Bot },
        { title: "Exam", url: "/erp/exam", icon: Bot },
        { title: "Student Management", url: "/erp/student-management", icon: Bot },
        { title: "Timetable", url: "/erp/timetable", icon: Bot },
      ]
      break

    case "Student":
      data.navMain = [
        { title: "Dashboard", url: "/erp/admin-dashboard", icon: SquareTerminal, isActive: true },
        { title: "Timetable", url: "/erp/timetable", icon: Bot },
        { title: "Attendance", url: "/erp/attendance", icon: Bot },
        { title: "Fees", url: "/erp/fees", icon: Bot },
        { title: "Events", url: "/erp/events", icon: Bot },
        { title: "Exam", url: "/erp/exam", icon: Bot },
      ]
      break

    case "Accountant":
      data.navMain = [
        { title: "Dashboard", url: "/erp/admin-dashboard", icon: SquareTerminal, isActive: true },
        { title: "Fee Structure", url: "/erp/fee-structure", icon: Bot },
        { title: "Teacher Payroll", url: "/erp/teacher-payroll", icon: Bot },
        { title: "Tax Details", url: "/erp/tax-details", icon: Bot },
      ]
      break

    default:
      break
  }

  return data
}

export function AppSidebar({ enableSidebar="Dashboard",...props }: React.ComponentProps<typeof Sidebar>) {
  const [data, setData] = React.useState(getRoleBasedData())

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setData(getRoleBasedData()); // Fetch data only in the browser
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} enableSidebar={enableSidebar}/>
        {data.projects.length > 0 && <NavProjects projects={data.projects} enableSidebar={enableSidebar}/>}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


