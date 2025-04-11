import AddGradesPage from "~/components/molecule/ERP/Class-Management/classDetails/gradles"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPClassExamTemplete() {
    return (
        <>
            <ToastProvider>
                <AddGradesPage />
            </ToastProvider>
        </>
    )
}
