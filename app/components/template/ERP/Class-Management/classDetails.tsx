import ClassDetails from "~/components/molecule/ERP/Class-Management/classDetails"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPClassDetailsTemplete() {
    return (
        <>
            <ToastProvider>
                <ClassDetails />
            </ToastProvider>
        </>
    )
}
