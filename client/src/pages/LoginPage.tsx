import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { loginService } from "@/services/authService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/common/PasswordInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Loader2 } from "lucide-react";

// Types
import type { User } from "@/types/index";

interface FormData {
  username: string;
  password: string;
}

// Constants
const REDIRECT_DELAY = 1500;
const USER_TYPES = {
  PETUGAS: "petugas",
  ADMIN: "admin",
} as const;

const ROUTES = {
  ADMIN_DASHBOARD: "/admin/dashboard",
  PETUGAS_DASHBOARD: "/petugas/dashboard",
  USER_DASHBOARD: "/dashboard",
  REGISTER: "/register",
} as const;

// Custom hooks for better separation of concerns
const useLoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const updateField =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error when user starts typing
      if (error) setError(null);
    };

  const resetForm = () => {
    setFormData({ username: "", password: "" });
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Username dan password tidak boleh kosong");
      return false;
    }
    return true;
  };

  return {
    formData,
    error,
    setError,
    updateField,
    resetForm,
    validateForm,
  };
};

const useLoginRedirect = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getRedirectRoute = (user: User): string => {
    if (user.userType === USER_TYPES.PETUGAS) {
      return user.level === USER_TYPES.ADMIN
        ? ROUTES.ADMIN_DASHBOARD
        : ROUTES.PETUGAS_DASHBOARD;
    }
    return ROUTES.USER_DASHBOARD;
  };

  useEffect(() => {
    if (!showSuccessDialog || !user) return;

    const timer = setTimeout(() => {
      const route = getRedirectRoute(user);
      navigate(route);
    }, REDIRECT_DELAY);

    return () => clearTimeout(timer);
  }, [showSuccessDialog, user, navigate]);

  return {
    showSuccessDialog,
    setShowSuccessDialog,
  };
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const { formData, error, setError, updateField, validateForm } =
    useLoginForm();

  const { showSuccessDialog, setShowSuccessDialog } = useLoginRedirect();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const userData = await loginService(formData.username, formData.password);
      login(userData);
      setShowSuccessDialog(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan saat login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-md shadow-lg">
          <CardHeader className="text-center p-6 sm:p-8">
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold">
              Selamat Datang Kembali!
            </CardTitle>
            <CardDescription className="text-sm sm:text-base md:text-lg lg:text-base mt-2">
              Masukkan data diri anda untuk melanjutkan
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin} noValidate>
            <CardContent className="-mt-8 p-6 sm:p-8 space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm sm:text-base font-medium"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username anda"
                  required
                  value={formData.username}
                  onChange={updateField("username")}
                  disabled={isLoading}
                  className="h-10 sm:h-12 text-sm sm:text-base"
                  autoComplete="username"
                  aria-describedby={error ? "error-message" : undefined}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm sm:text-base font-medium"
                >
                  Password
                </Label>
                <PasswordInput
                  id="password"
                  placeholder="Masukkan password anda"
                  required
                  value={formData.password}
                  onChange={updateField("password")}
                  disabled={isLoading}
                  className="h-10 sm:h-12 text-sm sm:text-base"
                  autoComplete="current-password"
                  aria-describedby={error ? "error-message" : undefined}
                />
              </div>

              {error && (
                <div
                  id="error-message"
                  role="alert"
                  className="p-3 sm:p-4 text-sm sm:text-base font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md"
                >
                  {error}
                </div>
              )}
            </CardContent>

            <CardFooter className="p-6 sm:p-8 flex flex-col gap-4 sm:gap-6">
              <Button
                type="submit"
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                disabled={isLoading}
                aria-describedby="login-status"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>

              <p className="text-xs sm:text-sm text-center text-muted-foreground">
                Belum punya akun?{" "}
                <Link
                  to={ROUTES.REGISTER}
                  className="underline font-medium hover:text-primary focus:text-primary focus:outline-none transition-colors"
                  tabIndex={isLoading ? -1 : 0}
                >
                  Daftar di sini
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md mx-4">
          <DialogHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-lg sm:text-xl mt-4">
              Login Berhasil!
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base mt-2">
              Anda akan diarahkan dalam sesaat...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
