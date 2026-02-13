import { useState, useCallback } from "react";

/**
 * Hook quản lý form state, validation và submit
 * @param {Object} initialValues - Giá trị khởi tạo cho form
 * @param {Function} validateFn - Hàm validate, trả về object errors
 * @param {Function} onSubmit - Hàm xử lý khi submit
 */
const useForm = (initialValues = {}, validateFn = null, onSubmit = null) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error khi user nhập
    setErrors((prev) => ({ ...prev, [field]: null }));
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  }, []);

  const validate = useCallback(() => {
    if (!validateFn) return true;
    const newErrors = validateFn(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateFn]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      if (!validate()) return false;
      if (!onSubmit) return true;

      setLoading(true);
      try {
        await onSubmit(formData);
        return true;
      } catch (err) {
        console.error("Submit error:", err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [formData, validate, onSubmit],
  );

  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    handleChange,
    handleInputChange,
    handleSubmit,
    validate,
    resetForm,
  };
};

export default useForm;
