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
// // import { createEvent } from "~/routes/ERP/Events/api";
// import { useToast } from "~/components/ui/toast-container"
// import * as React from "react"
// import { format } from "date-fns"
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
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     onSuccess?: () => void; // Add this prop
// }

// export function CreateEventsForm({ open, onOpenChange, onSuccess }: SheetDemoProps) {
//     useEffect(() => {
//         const storedDomain = localStorage.getItem("domainName"); // Assuming domain is stored with key "domain"
//         if (storedDomain) {
//             setFormData(prev => ({ ...prev, domainName: storedDomain }));
//         }
//     }, []);
//     const { toast } = useToast()
//     const [date, setDate] = React.useState<Date>()
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
//                     <SheetTitle>Create Events</SheetTitle>
//                     <SheetDescription>
//                         Create new events here. Click save when you're done.
//                     </SheetDescription>
//                 </SheetHeader>
//                 <form onSubmit={handleSubmit}>
//                     <div className="grid gap-4 py-4 px-4">
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="title" className="text-right">
//                                 Title
//                             </Label>
//                             <Input
//                                 id="name"
//                                 placeholder="Event Title"
//                                 type="text"
//                                 value={formData.name}
//                                 onChange={handleInputChange}
//                                 className="col-span-3"
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="date" className="text-right">
//                                 Date
//                             </Label>
//                             <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[260px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="location" className="text-right">
//                                 Location
//                             </Label>
//                             <Input
//                                 id="password"
//                                 placeholder="Event Location"
//                                 className="col-span-3"
//                                 type="text"
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 required
//                             />
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="description" className="text-right">
//                             Description
//                             </Label>
//                             <Textarea placeholder="Type your message here." className="w-[260px]"/>
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
import { createEvent } from "~/routes/ERP/Events/api";
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
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreateEventsForm({ open, onOpenChange, onSuccess }: SheetDemoProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
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
      const response = await createEvent(formData);
      
      if (response.success) {
        toast({
          message: "Event created successfully",
          description: new Date().toLocaleString(),
          type: "success",
          duration: 3000
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      } else {
        toast({
          message: "Failed to create event",
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
          <SheetTitle>Create Event</SheetTitle>
          <SheetDescription>
            Create new events here. Click save when you're done.
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
                placeholder="Event Title"
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
                placeholder="Event Location"
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
                placeholder="Event description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <div className="absolute bottom-0 w-full p-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}