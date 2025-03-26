// "use client"

// import { useEffect, useState } from "react";
// import { Button } from "~/components/ui/button"
// import { Input } from "~/components/ui/input"
// import { Label } from "~/components/ui/label"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "~/components/ui/sheet"
// import { updateUser } from "~/routes/ERP/UserManagement/api";
// import { useToast } from "~/components/ui/toast-container"
// import { CalendarIcon } from "lucide-react"
// import { cn } from "~/lib/utils"
// import { Calendar } from "~/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "~/components/ui/popover"
// import { Textarea } from "~/components/ui/textarea"

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

// export function EventsEditDrawer({ open, userData, onOpenChange, onSuccess }: SheetDemoProps) {
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
//           <SheetTitle>Edit Event</SheetTitle>
//           <SheetDescription>
//             Make changes to the user profile here. Click save when you're done.
//           </SheetDescription>
//         </SheetHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4 px-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="title" className="text-right">
//                 Title
//               </Label>
//               <Input
//                 id="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="date" className="text-right">
//                 Date
//               </Label>
//               <Popover>
//                               <PopoverTrigger asChild>
//                                 <Button
//                                   variant={"outline"}
//                                   className={cn(
//                                     "w-[260px] justify-start text-left font-normal",
//                                     !date && "text-muted-foreground"
//                                   )}
//                                 >
//                                   <CalendarIcon className="mr-2 h-4 w-4" />
//                                   {date ? format(date, "PPP") : <span>Pick a date</span>}
//                                 </Button>
//                               </PopoverTrigger>
//                               <PopoverContent className="w-auto p-0" align="start">
//                                 <Calendar
//                                   mode="single"
//                                   selected={date}
//                                   onSelect={setDate}
//                                   initialFocus
//                                 />
//                               </PopoverContent>
//                             </Popover>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="role" className="text-right">
//                 Location
//               </Label>
//               <Input
//                 id="location"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="description" className="text-right">
//               Description
//               </Label>
//               <Textarea
//                 id="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
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
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet"
import { updateEvent } from "~/routes/ERP/Events/api";
import { useToast } from "~/components/ui/toast-container"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "~/lib/utils"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Textarea } from "~/components/ui/textarea"

interface SheetDemoProps {
  open: boolean;
  eventData: {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: string;
  };
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EventsEditDrawer({ open, eventData, onOpenChange, onSuccess }: SheetDemoProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(eventData.date ? new Date(eventData.date) : undefined);
  const [formData, setFormData] = useState({
    title: eventData.title,
    description: eventData.description,
    date: eventData.date,
    location: eventData.location,
    domainName: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedDomain = localStorage.getItem("domainName");
    if (storedDomain) {
      setFormData(prev => ({ ...prev, domainName: storedDomain }));
    }
  }, []);

  useEffect(() => {
    if (date) {
      setFormData(prev => ({ 
        ...prev, 
        date: format(date, 'yyyy-MM-dd') 
      }));
    }
  }, [date]);

  useEffect(() => {
    // Reset form when eventData changes
    setFormData({
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      location: eventData.location,
      domainName: formData.domainName
    });
    setDate(eventData.date ? new Date(eventData.date) : undefined);
  }, [eventData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        message: "Please select a date",
        type: "error",
        duration: 3000
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await updateEvent(eventData._id, formData);
      
      if (response.success) {
        toast({
          message: "Event updated successfully",
          description: new Date().toLocaleString(),
          type: "success",
          duration: 3000
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      } else {
        toast({
          message: "Failed to update event",
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
          <SheetTitle>Edit Event</SheetTitle>
          <SheetDescription>
            Make changes to the event here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 px-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[260px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
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
                required
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
  )
}