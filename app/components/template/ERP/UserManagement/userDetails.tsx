import UserDetails from "~/components/molecule/ERP/UserManagement/userDetail"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPUserDetailsTemplete() {
    return (
        <>
            <ToastProvider>
                <UserDetails />
            </ToastProvider>
        </>
    )
}
