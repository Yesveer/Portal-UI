// import { cn } from "~/lib/utils";
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";
// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { verifyDomain } from "~/routes/Login/api";

// export function SelectOrgForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   const [domain, setDomain] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError("");

//     try {
//       const response = await verifyDomain({ domain });
//       console.log("Login successful:", response);

//       // Redirect based on role
      
//       }
//     } catch (err) {
//       setError("Failed to login. Please check your credentials.");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <form
//       className={cn("flex flex-col gap-6", className)}
//       onSubmit={handleSubmit}
//       {...props}
//     >
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Organisation to your account</h1>
//         <p className="text-muted-foreground text-sm text-balance">
//           Enter your organisation below for login to your account
//         </p>
//       </div>
//       <div className="grid gap-6">
//         <div className="grid gap-3">
//           <Label htmlFor="email">Organisation Name</Label>
//           <Input
//             id="domain"
//             type="text"
//             placeholder="vsay"
//             required
//             value={domain}
//             onChange={(e) => setDomain(e.target.value)}
//           />
//         </div>
//         {error && <div className="text-red-500 text-sm">{error}</div>}
//         <Button type="submit" className="w-full">
//           Select Organisation
//         </Button>
//       </div>
//       <div className="text-center text-sm">
//         Don&apos;t have an account?{" "}
//         <a href="#" className="underline underline-offset-4">
//           Contact Admin
//         </a>
//       </div>
//     </form>
//   );
// }

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { verifyDomain } from "~/routes/Login/api";

export function SelectOrgForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [domainName, setDomain] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Check if domain is already stored in browser, redirect to login page
  useEffect(() => {
    const storedDomain = localStorage.getItem("selectedDomain");
    if (storedDomain) {
      navigate("/"); // Redirect to login page
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await verifyDomain({ domainName });
      if (response && response.domainName) {
        localStorage.setItem("selectedDomain", response.domainName); // Store in browser
        navigate("/"); // Redirect to Login page
      } else {
        setError("Domain does not exist.");
      }
    } catch (err) {
      setError("Failed to verify domain.");
      console.error("Domain verification error:", err);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Select Your Organization</h1>
        <p className="text-muted-foreground text-sm">
          Enter your organization name to proceed.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="domain">Organization Name</Label>
          <Input
            id="domainName"
            type="text"
            placeholder="vsay"
            required
            value={domainName}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  );
}
