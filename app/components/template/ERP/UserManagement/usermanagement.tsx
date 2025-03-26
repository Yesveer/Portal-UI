import ERPUserManagementMolecule from "~/components/molecule/ERP/UserManagement/UsersTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPUserManagementTemplete() {
    return (
        <>
            <Tabs defaultValue="users" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                <ToastProvider>
                   <ERPUserManagementMolecule />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
