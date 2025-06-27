import { useState, type FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import { registerService } from "@/services/authService";
import { RegisterSchema } from "@/lib/validators";
import { getErrorMessage } from "@/lib/pengaduanUtils";

type FormErrors = {
  [key: string]: string | undefined;
};

export function useRegisterForm() {
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    username: "",
    password: "",
    telp: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      let filteredValue = value;

      switch (id) {
        case "nik":
          filteredValue = value.replace(/[^0-9]/g, "").slice(0, 16);
          break;
        case "telp":
          filteredValue = value.replace(/[^0-9]/g, "").slice(0, 13);
          break;
        case "nama":
          filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
          break;
      }

      setFormData((prev) => ({ ...prev, [id]: filteredValue }));
      if (errors[id]) {
        setErrors((prev) => ({ ...prev, [id]: undefined }));
      }
    },
    [errors]
  );

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const validatedData = RegisterSchema.parse(formData);
      await registerService(validatedData);
      setShowSuccessDialog(true);
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: FormErrors = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            newErrors[error.path[0]] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ form: getErrorMessage(err) });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogRedirect = () => {
    setShowSuccessDialog(false);
    navigate("/login");
  };

  return {
    formData,
    errors,
    isLoading,
    showSuccessDialog,
    handleChange,
    handleRegister,
    setShowSuccessDialog,
    handleDialogRedirect,
  };
}
