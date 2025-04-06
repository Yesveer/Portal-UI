import { ExamManagement } from "~/components/molecule/ERP/Exam/ExamTab"
import ERPUserManagementMolecule from "~/components/molecule/ERP/UserManagement/UsersTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ToastProvider } from "~/components/ui/toast-container"


export default function ERPExamManagementTemplete() {
    return (
        <>
           
                <ToastProvider>
                   <ExamManagement />
                </ToastProvider>
               
        </>
    )
}
