import { useToast } from "~/components/ui/toast-container"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "~/components/ui/alert-dialog";
  import { deleteUser } from "~/routes/ERP/UserManagement/api";
import { useState } from "react";

  interface AlertDialogChildProps {
    email: string;
    id: string;
    children: React.ReactNode;
    onSuccess?: () => void; 
  }
  
  export function AlertDelete({ email, children, id, onSuccess }: AlertDialogChildProps) {
    const { toast } = useToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsDeleting(true)
        
        try {
          const { success, message } = await deleteUser(id)
          
          if (success) {
            toast({
              message: "User deleted successfully",
              description: new Date().toLocaleString(),
              type: "success",
              duration: 3000
            })
            if (onSuccess) onSuccess() // Trigger success callback
          } else {
            toast({
              message: "Failed to delete user",
              description: message || "Please try again",
              type: "error"
            })
          }
        } catch (error) {
          toast({
            message: "Error",
            description: error instanceof Error ? error.message : "Failed to delete user",
            type: "error"
          })
        } finally {
          setIsDeleting(false)
        }
      }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account ({email}) and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
