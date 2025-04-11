import TakeAttendancePage from "~/components/molecule/ERP/Class-Management/classDetails/Attendance"
import AddGradesPage from "~/components/molecule/ERP/Class-Management/classDetails/gradles"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPClassAttendanceTemplete() {
    return (
        <>
            <ToastProvider>
                <TakeAttendancePage />
            </ToastProvider>
        </>
    )
}
