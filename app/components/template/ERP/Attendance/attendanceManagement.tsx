import { AttendanceModule } from "~/components/molecule/ERP/Attendance/attendance-module"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPAttendanceManagement() {
    return (
        <>
            <Tabs defaultValue="class" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="class">Class</TabsTrigger>
                </TabsList>
                <TabsContent value="class">
                <ToastProvider>
                   <AttendanceModule userRole="admin" />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
