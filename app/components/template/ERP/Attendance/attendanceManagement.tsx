"use client";

import { useEffect, useState } from "react";
import { AttendanceModule } from "~/components/molecule/ERP/Attendance/attendance-module";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ToastProvider } from "~/components/ui/toast-container";

export default function ERPAttendanceManagement() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <>
      <Tabs defaultValue="class" className="">
        <TabsList className="ml-6">
          <TabsTrigger value="class">Class</TabsTrigger>
        </TabsList>
        <TabsContent value="class">
          <ToastProvider>
            <AttendanceModule userRole={userRole} />
          </ToastProvider>
        </TabsContent>
      </Tabs>
    </>
  );
}
