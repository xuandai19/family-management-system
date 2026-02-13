import { useState, useEffect } from "react";

/**
 * Hook để fetch dữ liệu với loading, error state
 * @param {Function} fetchFn - Hàm async để gọi API
 * @param {Array} deps - Dependencies cho useEffect
 * @param {boolean} immediate - Có gọi ngay khi mount không
 */
const useFetchData = (fetchFn, deps = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFn(...args);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || "Có lỗi xảy ra");
      }
      return response;
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Không thể kết nối đến server");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, setData, loading, error, refetch: execute };
};

export default useFetchData;
