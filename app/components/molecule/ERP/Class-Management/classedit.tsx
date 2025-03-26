// // import { Button } from "~/components/ui/button"
// // import { Input } from "~/components/ui/input"
// // import { Label } from "~/components/ui/label"
// // import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
// // import {
// //   Sheet,
// //   SheetClose,
// //   SheetContent,
// //   SheetDescription,
// //   SheetFooter,
// //   SheetHeader,
// //   SheetTitle,
// // } from "~/components/ui/sheet"

// // interface SheetDemoProps {
// //   open: boolean;
// //   userData: any;
// //   onOpenChange: (open: boolean) => void;
// // }

// // export function UserEditDrawer({ open, userData, onOpenChange }: SheetDemoProps) {
// //   return (
// //     <Sheet open={open} onOpenChange={onOpenChange}>
// //       <SheetContent>
// //         <SheetHeader>
// //           <SheetTitle>Edit profile</SheetTitle>
// //           <SheetDescription>
// //             Make changes to your profile here. Click save when you're done.
// //           </SheetDescription>
// //         </SheetHeader>
// //         <div className="grid gap-4 py-4 px-4">
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="name" className="text-right">
// //               Name
// //             </Label>
// //             <Input id="name" value={userData.name} className="col-span-3" />
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="email" className="text-right">
// //               Email
// //             </Label>
// //             <Input id="email" value={userData.email} className="col-span-3" />
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <Label htmlFor="role" className="text-right">
// //               Role
// //             </Label>
// //             <Select  required>
// //                                 <SelectTrigger className="w-[260px]">
// //                                     <SelectValue placeholder={userData.role} />
// //                                 </SelectTrigger>
// //                                 <SelectContent>
// //                                     <SelectGroup>
// //                                         <SelectLabel>Roles</SelectLabel>
// //                                         <SelectItem value="Admin">Admin</SelectItem>
// //                                         <SelectItem value="Teacher">Teacher</SelectItem>
// //                                         <SelectItem value="Accountant">Accountant</SelectItem>
// //                                         <SelectItem value="Student">Student</SelectItem>
// //                                     </SelectGroup>
// //                                 </SelectContent>
// //                             </Select>
// //           </div>
// //         </div>
// //         <SheetFooter>
// //           <SheetClose asChild>
// //             <Button type="submit">Save changes</Button>
// //           </SheetClose>
// //         </SheetFooter>
// //       </SheetContent>
// //     </Sheet>
// //   )
// // }


// "use client"

// import { useEffect, useState } from "react";
// import { Button } from "~/components/ui/button"
// import { Input } from "~/components/ui/input"
// import { Label } from "~/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "~/components/ui/select"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "~/components/ui/sheet"
// import { updateUser } from "~/routes/ERP/UserManagement/api";
// import { useToast } from "~/components/ui/toast-container"

// interface SheetDemoProps {
//   open: boolean;
//   userData: {
//     _id: string;
//     name: string;
//     email: string;
//     role: string;
//   };
//   onOpenChange: (open: boolean) => void;
//   onSuccess?: () => void;
// }

// export function ClassEditDrawer({ open, userData, onOpenChange, onSuccess }: SheetDemoProps) {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: userData.name,
//     email: userData.email,
//     role: userData.role
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     // Reset form when userData changes
//     setFormData({
//       name: userData.name,
//       email: userData.email,
//       role: userData.role
//     });
//   }, [userData]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//   };

//   const handleRoleChange = (value: string) => {
//     setFormData(prev => ({ ...prev, role: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await updateUser(userData._id, formData);
      
//       if (response.success) {
//         toast({
//           message: "User updated successfully",
//           description: new Date().toLocaleString(),
//           type: "success",
//           duration: 3000
//         });
//         onOpenChange(false);
//         if (onSuccess) onSuccess();
//       } else {
//         toast({
//           message: "Failed to update user",
//           description: response.error || "Please try again",
//           type: "error"
//         });
//       }
//     } catch (error) {
//       toast({
//         message: "An error occurred",
//         description: error instanceof Error ? error.message : "Please try again",
//         type: "error"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Edit User</SheetTitle>
//           <SheetDescription>
//             Make changes to the user profile here. Click save when you're done.
//           </SheetDescription>
//         </SheetHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4 px-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="role" className="text-right">
//                 Role
//               </Label>
//               <Select 
//                 value={formData.role}
//                 onValueChange={handleRoleChange}
//                 required
//               >
//                 <SelectTrigger className="w-[260px]">
//                   <SelectValue placeholder="Select a role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Roles</SelectLabel>
//                     <SelectItem value="Admin">Admin</SelectItem>
//                     <SelectItem value="Teacher">Teacher</SelectItem>
//                     <SelectItem value="Accountant">Accountant</SelectItem>
//                     <SelectItem value="Student">Student</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="absolute bottom-0 w-full p-4">
//             <Button type="submit" disabled={isSubmitting} className="w-full">
//               {isSubmitting ? "Saving..." : "Save changes"}
//             </Button>
//           </div>
//         </form>
//       </SheetContent>
//     </Sheet>
//   )
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
import { updateClass } from "~/routes/ERP/ClassManagement/api";
import { useToast } from "~/components/ui/toast-container";
import { Textarea } from "~/components/ui/textarea";

interface SheetDemoProps {
  open: boolean;
  classData: {
    _id: string;
    name: string;
    section: string;
    description: string;
  };
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ClassEditDrawer({ open, classData, onOpenChange, onSuccess }: SheetDemoProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: classData.name,
    section: classData.section,
    description: classData.description
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      name: classData.name,
      section: classData.section,
      description: classData.description
    });
  }, [classData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateClass(classData._id, formData);
      
      if (response.success) {
        toast({
          message: "Class updated successfully",
          description: new Date().toLocaleString(),
          type: "success",
          duration: 3000
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      } else {
        toast({
          message: "Failed to update class",
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
          <SheetTitle>Edit Class</SheetTitle>
          <SheetDescription>
            Make changes to the class here. Click save when you're done.
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
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full p-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}