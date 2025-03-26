// "use client"
// import { useEffect, useState } from "react";
// import { Button } from "~/components/ui/button"
// import { Input } from "~/components/ui/input"
// import { Label } from "~/components/ui/label"
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
// } from "~/components/ui/sheet"
// import { registerUser } from "~/routes/ERP/UserManagement/api";
// import { useToast } from "~/components/ui/toast-container"
// import { Textarea } from "~/components/ui/textarea";


// interface SheetDemoProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     onSuccess?: () => void; // Add this prop
// }

// export function CreateClassForm({ open, onOpenChange, onSuccess }: SheetDemoProps) {
//     useEffect(() => {
//         const storedDomain = localStorage.getItem("domainName"); // Assuming domain is stored with key "domain"
//         if (storedDomain) {
//             setFormData(prev => ({ ...prev, domainName: storedDomain }));
//         }
//     }, []);
//     const { toast } = useToast()
//     const [formData, setFormData] = useState({
//         domainName: "",
//         name: "",
//         email: "",
//         password: "",
//         role: ""
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { id, value } = e.target;
//         setFormData(prev => ({ ...prev, [id]: value }));
//     };

//     const handleRoleChange = (value: string) => {
//         setFormData(prev => ({ ...prev, role: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             const response = await registerUser(formData);

//             if (response.success) {
//                 toast({
//                     message: "User created successfully",
//                     description: new Date().toLocaleString(),
//                     type: "success",
//                     duration: 3000
//                 });
//                 onOpenChange(false);
//                 if (onSuccess) onSuccess(); // Trigger the success callback
//             } else {
//                 toast({
//                     message: "Failed to create user",
//                     description: response.error || "Please try again",
//                     type: "error"
//                 });
//             }
//         } catch (error) {
//             toast({
//                 message: "An error occurred",
//                 description: error instanceof Error ? error.message : "Please try again",
//                 type: "error"
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };


//     return (
//         <Sheet open={open} onOpenChange={onOpenChange}>
//             <SheetContent>
//                 <SheetHeader>
//                     <SheetTitle>Create Class</SheetTitle>
//                     <SheetDescription>
//                         Create new class here. Click save when you're done.
//                     </SheetDescription>
//                 </SheetHeader>
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid gap-4 py-4 px-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="name" className="text-right">
//                                 Name
//                             </Label>
//                             <Input
//                                 id="name"
//                                 placeholder="Name"
//                                 type="text"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 className="col-span-3"
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="section" className="text-right">
//                                 Section
//                             </Label>
//                             <Input
//                                 id="section"
//                                 placeholder="user@example.com"
//                                 type="text"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 className="col-span-3"
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="description" className="text-right">
//                                 Description
//                             </Label>
//                             <Textarea placeholder="Please write about this class."/>
//                         </div>
//                     </div>
//                     <SheetFooter className="flex absolute w-full bottom-0">
//                         <Button type="submit" disabled={isSubmitting}>
//                             {isSubmitting ? "Creating..." : "Create"}
//                         </Button>
//                     </SheetFooter>
//                 </form>
//             </SheetContent>
//         </Sheet>
//     )
// }


"use client"
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { createClass } from "~/routes/ERP/ClassManagement/api";
import { useToast } from "~/components/ui/toast-container";
import { Textarea } from "~/components/ui/textarea";

interface SheetDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateClassForm({ open, onOpenChange, onSuccess }: SheetDemoProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    description: "",
    domainName: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedDomain = localStorage.getItem("domainName");
    if (storedDomain) {
      setFormData(prev => ({ ...prev, domainName: storedDomain }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createClass({
        name: formData.name,
        section: formData.section,
        description: formData.description
      });

      if (response.success) {
        toast({
          message: "Class created successfully",
          description: new Date().toLocaleString(),
          type: "success",
          duration: 3000
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      } else {
        toast({
          message: "Failed to create class",
          description: response.error || "Please try again",
          type: "error"
        });
      }
    } catch (error) {
      toast({
        message: "An error occurred",
        description: error instanceof Error ? error.message : "Please try again",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Class</SheetTitle>
          <SheetDescription>
            Create new class here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 px-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Class Name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="section" className="text-right">
                Section
              </Label>
              <Input
                id="section"
                placeholder="Section"
                value={formData.section}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Class description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full p-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}