import AddStudentPage from "~/components/molecule/ERP/Class-Management/classDetails/student"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPClassStudentTemplete() {
    return (
        <>
            <ToastProvider>
                <AddStudentPage />
            </ToastProvider>
        </>
    )
}
