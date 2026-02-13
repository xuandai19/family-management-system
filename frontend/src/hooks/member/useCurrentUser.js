import { useState, useEffect } from "react";

/**
 * Hook để lấy và quản lý thông tin user từ localStorage
 */
const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
  }, []);

  const isAdmin = user?.profile?.role_id === 1;
  const isMember = user?.profile?.role_id === 2;
  const fullName = user?.profile?.full_name || "Thành viên";
  const generation = user?.profile?.generation || 0;
  const avatarUrl = user?.profile?.avatar_url || "";

  return {
    user,
    isAdmin,
    isMember,
    fullName,
    generation,
    avatarUrl,
  };
};

export default useCurrentUser;
