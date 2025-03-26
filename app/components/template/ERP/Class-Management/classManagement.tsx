import ERPClassManagementMolecule from "~/components/molecule/ERP/Class-Management/classTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPClassManagementTemplete() {
    return (
        <>
            <Tabs defaultValue="class" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="class">Class</TabsTrigger>
                </TabsList>
                <TabsContent value="class">
                <ToastProvider>
                   <ERPClassManagementMolecule />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
