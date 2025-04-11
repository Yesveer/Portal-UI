import NewAssignmentPage from "~/components/molecule/ERP/Class-Management/classDetails/Assignment"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPClassAssignTemplete() {
    return (
        <>
            <ToastProvider>
                <NewAssignmentPage />
            </ToastProvider>
        </>
    )
}
