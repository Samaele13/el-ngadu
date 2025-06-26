import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: ReactNode;
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Memeriksa sesi...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const checkRole = (user: User): boolean => {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    let userRole: string = user.userType;

    if (user.userType === "petugas" && user.level === "admin") {
      userRole = "admin";
    }

    return allowedRoles.includes(userRole);
  };

  if (!checkRole(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
