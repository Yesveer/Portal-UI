import ERPEventsMolecule from "~/components/molecule/ERP/Events/eventsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPEventsTemplete() {
    return (
        <>
            <Tabs defaultValue="events" className="">
                <TabsList className="ml-6">
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="events">
                <ToastProvider>
                   <ERPEventsMolecule />
                </ToastProvider>
                </TabsContent>
            </Tabs>
        </>
    )
}
