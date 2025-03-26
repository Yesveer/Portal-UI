import ERPEventsMolecule from "~/components/molecule/ERP/Events/eventsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPTimetableTemplete() {
    return (
        <>
            <Tabs defaultValue="teacher" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="teacher">Teachers</TabsTrigger>
                    <TabsTrigger value="class">Classes</TabsTrigger>
                </TabsList>
                <TabsContent value="teacher">
                <ToastProvider>
                   <ERPEventsMolecule />
                </ToastProvider>
                </TabsContent>
                <TabsContent value="class">
                <ToastProvider>
                   <ERPEventsMolecule />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
