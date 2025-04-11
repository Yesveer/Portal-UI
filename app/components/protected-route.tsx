// components/protected-route.tsx
"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


export function ProtectedRoute({ children, allowedRoles }: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const role = localStorage.getItem("role") || "";
        const isAllowed = allowedRoles.includes(role);
        
        if (!isAllowed) {
          navigate("/", { replace: true });
          return false;
        }
        
        setIsAuthorized(true);
        return true;
      } catch (error) {
        navigate("/", { replace: true });
        return false;
      }
    };

    checkAuth();
  }, [location, allowedRoles, navigate]);

  return isAuthorized ? <>{children}</> : null;
}
