import { useState, useEffect, type FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { loginService } from "@/services/authService";
import { getErrorMessage } from "@/lib/pengaduanUtils";

const REDIRECT_DELAY = 1500;

export function useLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showSuccessDialog) return;

    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, REDIRECT_DELAY);


    return () => clearTimeout(timer);
  }, [showSuccessDialog, navigate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
      if (error) setError(null);
    },
    [error]
  );

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Username dan password tidak boleh kosong.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userData = await loginService(formData.username, formData.password);
      login(userData);
      setShowSuccessDialog(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    isLoading,
    showSuccessDialog,
    setShowSuccessDialog,
    handleChange,
    handleLogin,
  };
}
