import { useState, useCallback } from "react";

/**
 * Hook quản lý toast notification cho admin
 * Thay thế pattern lặp lại trong nhiều trang admin
 *
 * @param {number} duration - Thời gian hiển thị toast (ms), mặc định 3000
 * @returns {{ toast, showToast, hideToast }}
 *
 * @example
 * const { toast, showToast } = useToast();
 * showToast("Thành công!", "success");
 * showToast("Có lỗi xảy ra", "error");
 */
export const useToast = (duration = 3000) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), duration);
    },
    [duration]
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
};

export default useToast;
