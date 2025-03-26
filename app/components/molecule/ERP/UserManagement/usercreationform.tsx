"use client"
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { registerUser } from "~/routes/ERP/UserManagement/api";
import { useToast } from "~/components/ui/toast-container"


interface SheetDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void; // Add this prop
}

export function CreateUserForm({ open, onOpenChange, onSuccess }: SheetDemoProps) {
    useEffect(() => {
        const storedDomain = localStorage.getItem("domainName"); // Assuming domain is stored with key "domain"
        if (storedDomain) {
            setFormData(prev => ({ ...prev, domainName: storedDomain }));
        }
    }, []);
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        domainName: "",
        name: "",
        email: "",
        password: "",
        role: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleRoleChange = (value: string) => {
        setFormData(prev => ({ ...prev, role: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await registerUser(formData);

            if (response.success) {
                toast({
                    message: "User created successfully",
                    description: new Date().toLocaleString(),
                    type: "success",
                    duration: 3000
                });
                onOpenChange(false);
                if (onSuccess) onSuccess(); // Trigger the success callback
            } else {
                toast({
                    message: "Failed to create user",
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
                    <SheetTitle>Create Users</SheetTitle>
                    <SheetDescription>
                        Create new user accounts here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 px-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="domainName" className="text-right">
                                Domain
                            </Label>
                            <Input
                                id="domainName"
                                value={formData.domainName}
                                readOnly
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                placeholder="Name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="user@example.com"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                id="password"
                                placeholder="*****"
                                className="col-span-3"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Role
                            </Label>
                            <Select onValueChange={handleRoleChange} required>
                                <SelectTrigger className="w-[260px]">
                                    <SelectValue placeholder="Select a Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Teacher">Teacher</SelectItem>
                                        <SelectItem value="Accountant">Accountant</SelectItem>
                                        <SelectItem value="Student">Student</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <SheetFooter className="flex absolute w-full bottom-0">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}