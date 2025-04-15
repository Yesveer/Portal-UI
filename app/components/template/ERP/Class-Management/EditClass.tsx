import EditClassPage from "~/components/molecule/ERP/Class-Management/classDetails/editpage"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPClassEditTemplete() {
    return (
        <>
            <ToastProvider>
                <EditClassPage />
            </ToastProvider>
        </>
    )
}
