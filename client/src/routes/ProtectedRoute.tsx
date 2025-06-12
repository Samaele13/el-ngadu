import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

interface ProtectedRouteProps {
  allowedRoles?: Array<User["userType"]>;
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
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

  // Debug: Log user data to console
  console.log('Current user:', user);
  console.log('User type:', user.userType);
  console.log('Allowed roles:', allowedRoles);

  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    // Add more specific error handling
    console.error(`Access denied. User type: ${user.userType}, Required: ${allowedRoles.join(', ')}`);
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <p className="text-red-500 mb-4">
          Akses ditolak. Anda login sebagai {user.userType}, tetapi halaman ini memerlukan akses sebagai {allowedRoles.join(' atau ')}.
        </p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return <Outlet />;
}