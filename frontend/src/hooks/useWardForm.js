import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const useWardForm = (initialState) => {
  const { user } = useAuth();

  const [form, setForm] = useState(() => ({
    ...initialState,
    ward_no: user?.role === "SUPERADMIN" ? "" : user?.ward || "",
  }));

  // 🔁 Update ward if user changes (logout/login)
  useEffect(() => {
    if (user?.ward) {
      setForm((prev) => ({
        ...prev,
        ward_no: user.ward,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return { form, setForm, handleChange };
};
