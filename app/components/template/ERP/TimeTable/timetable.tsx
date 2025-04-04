import ERPEventsMolecule from "~/components/molecule/ERP/Events/eventsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"
import ERPTimetableMolecule from "./timetable/timetable-molecule"


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
                   <ERPTimetableMolecule />
                </ToastProvider>
                </TabsContent>
                <TabsContent value="class">
                <ToastProvider>
                   <ERPTimetableMolecule />
                </ToastProvider>
                </TabsContent>
            </Tabs>

            
        </>
    )
}
