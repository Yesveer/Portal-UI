"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useToast } from "~/components/ui/toast-container";
import axios from "axios";
import { useParams } from "react-router";

interface SheetDemoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function StudentCreationForm({
  open,
  onOpenChange,
  onSuccess,
}: SheetDemoProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedDomain = localStorage.getItem("domainName");
    if (storedDomain) {
      setFormData((prev) => ({ ...prev, domainName: storedDomain }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const API_URL = import.meta.env.VITE_ERP_URL;

  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/teacher/add-student`,
        {
          ...formData,
          classId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 Bearer token
          },
        }
      );

      if (response.data.success) {
        // Changed to response.data
        toast({
          message: "Student created successfully",
          description: new Date().toLocaleString(),
          type: "success",
          duration: 3000,
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      } else {
        toast({
          message: "Failed to create student",
          description: response.data.error || "Please try again",
          type: "error",
        });
      }
    } catch (error) {
      toast({
        message: "An error occurred",
        description:
          error instanceof Error ? error.message : "Please try again",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Student</SheetTitle>
          <SheetDescription>
            Create new student accounts here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 px-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="student@example.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
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
  );
}
