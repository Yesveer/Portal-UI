import ERPTimetableMolecule from "~/components/molecule/ERP/TimeTable/eventsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPTimeTable() {
    return (
        <>
            <Tabs defaultValue="student" className="">
                <TabsList className="ml-6">
                    {/* <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="teacher">Teacher</TabsTrigger> */}
                </TabsList>
                <TabsContent value="student">
                <ToastProvider>
                   <ERPTimetableMolecule />
                </ToastProvider>
                </TabsContent>
                <TabsContent value="teacher">
                <ToastProvider>
                   <ERPTimetableMolecule />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
