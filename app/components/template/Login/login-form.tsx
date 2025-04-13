import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "~/routes/Login/api"; // Adjust the import path as necessary
import { LoadingButton } from "~/components/ui/loadingbutton";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [domainName, setDomainName] = useState("");
  const [loading, setLoading]=useState(false)
  const navigate = useNavigate();

  //   useEffect(() => {
  //   const storedDomain = localStorage.getItem("selectedDomain");
  //   if (storedDomain) {
  //     setDomain(storedDomain);
  //   } else {
  //     navigate("/select-org"); // Redirect if no domain is set
  //   }
  // }, [navigate]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedDomain = localStorage.getItem("domainName");
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name");

    if (storedToken && storedRole && storedDomain && storedEmail && storedName) {
      redirectUser(storedRole);
    } else {
      const selectedDomain = localStorage.getItem("selectedDomain");
      if (selectedDomain) {
        setDomainName(selectedDomain);
      } else {
        navigate("/select-org"); // Redirect to select organization if no domain is selected
      }
    }
  }, [navigate]);

    // ✅ Function to Redirect User Based on Role
  const redirectUser = (role: string) => {
    switch (role) {
      case "Admin":
        navigate("/erp/admin-dashboard");
        break;
      case "Teacher":
        navigate("/erp/teacher-dashboard");
        break;
      case "Student":
        navigate("/erp/student-dashboard");
        break;
      case "Accountant":
        navigate("/erp/accountant-dashboard");
        break;
      default:
        setError("Unknown role. Please contact support.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
     setLoading(true)
    try {
      const response = await loginUser({ email, password, domainName });
      console.log("Login successful:", response);

      // ✅ Store login details in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("domainName", response.domainName);
      localStorage.setItem("email", response.email);
      localStorage.setItem("name", response.name);
      
      // ✅ Redirect user based on role
      redirectUser(response.role);
    } catch (err) {
      setLoading(false)
      setError("Failed to login. Please check your credentials.");
      console.error("Login error:", err);
    }
  };


  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setError("");

  //   try {
  //     const response = await loginUser({ email, password, domainName });
  //     console.log("Login successful:", response);

  //     // Redirect based on role
  //     switch (response.role) {
  //       case "Admin":
  //         navigate("/erp/admin-dashboard"); // Redirect to Admin Dashboard
  //         break;
  //       case "Teacher":
  //         navigate("/erp/teacher-dashboard"); // Redirect to Teacher Dashboard
  //         break;
  //       case "Student":
  //         navigate("/erp/student-dashboard"); // Redirect to Student Dashboard
  //         break;
  //       case "Accountant":
  //         navigate("/erp/accountant-dashboard"); // Redirect to Accountant Dashboard
  //         break;
  //       default:
  //         setError("Unknown role. Please contact support.");
  //     }
  //   } catch (err) {
  //     setError("Failed to login. Please check your credentials.");
  //     console.error("Login error:", err);
  //   }
  // };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
      <div className="grid gap-3">
           {/* <Label htmlFor="domain">Organization Name</Label> */}
           <div className="flex items-center">
           <Label htmlFor="domain">Organization Name</Label>
           <a
              href="/select-org"
              onClick={() => {localStorage.removeItem("selectedDomain")}}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Change Organization?
            </a>
            </div>
           <Input id="domainName" type="text" value={domainName} disabled />
         </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="text"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <LoadingButton loading={loading} type="submit" className="w-full">
          Login
        </LoadingButton>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg> */}
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Contact Admin
        </a>
      </div>
    </form>
  );
}


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { loginUser } from "~/routes/Login/api"; // Import login API function
// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [domainName, setDomainName] = useState("");
//   const navigate = useNavigate();

//   // ✅ Auto-login if token is stored
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedRole = localStorage.getItem("role");
//     const storedDomain = localStorage.getItem("domainName");

//     if (storedToken && storedRole && storedDomain) {
//       redirectUser(storedRole);
//     } else {
//       const selectedDomain = localStorage.getItem("selectedDomain");
//       if (selectedDomain) {
//         setDomainName(selectedDomain);
//       } else {
//         navigate("/select-org"); // Redirect to select organization if no domain is selected
//       }
//     }
//   }, [navigate]);

//   // ✅ Function to Redirect User Based on Role
//   const redirectUser = (role: string) => {
//     switch (role) {
//       case "Admin":
//         navigate("/erp/admin-dashboard");
//         break;
//       case "Teacher":
//         navigate("/erp/teacher-dashboard");
//         break;
//       case "Student":
//         navigate("/erp/student-dashboard");
//         break;
//       case "Accountant":
//         navigate("/erp/accountant-dashboard");
//         break;
//       default:
//         setError("Unknown role. Please contact support.");
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError("");

//     try {
//       const response = await loginUser({ email, password, domainName });
//       console.log("Login successful:", response);

//       // ✅ Store login details in localStorage
//       localStorage.setItem("token", response.token);
//       localStorage.setItem("role", response.role);
//       localStorage.setItem("domainName", response.domainName);
//       localStorage.setItem("email", response.email);

//       // ✅ Redirect user based on role
//       redirectUser(response.role);
//     } catch (err) {
//       setError("Failed to login. Please check your credentials.");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Login to your account</h1>
//         <p className="text-muted-foreground text-sm">
//           Enter your email below to login to your account
//         </p>
//       </div>
//       <div className="grid gap-6">
//         <div className="grid gap-3">
//           <Label htmlFor="domain">Organization Name</Label>
//           <Input id="domainName" type="text" value={domainName} disabled />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="text"
//             placeholder="m@example.com"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="grid gap-3">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         {error && <div className="text-red-500 text-sm">{error}</div>}
//         <Button type="submit" className="w-full">Login</Button>
//       </div>
//     </form>
//   );
// }
