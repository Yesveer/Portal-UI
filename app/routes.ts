import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Login/login.tsx"),
    route("select-org", "routes/Login/select-org.tsx"),
    //ERP routes
    route("erp/admin-dashboard", "routes/ERP/Dashboard/admin-dashboard.tsx"),
    route("erp/student-dashboard", "routes/ERP/Dashboard/student-dashboard.tsx"),
    route("erp/teacher-dashboard", "routes/ERP/Dashboard/teacher-dashboard.tsx"),
    route("erp/accountant-dashboard", "routes/ERP/Dashboard/accuntant-dashboard.tsx"),
    route("erp/user-management", "routes/ERP/UserManagement/usermanagement.tsx"),
    // route("erp/user-management/:id", "routes/ERP/UserManagement/userdetailspage.tsx"),
    route("erp/events", "routes/ERP/Events/events.tsx"),
] satisfies RouteConfig;
