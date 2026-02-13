// Helper Functions

/**
 * Format currency to VND
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

/**
 * Format date to Vietnamese format
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return "Chưa cập nhật";
  return new Date(dateStr).toLocaleDateString("vi-VN");
};

/**
 * Format datetime to Vietnamese format
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return "Chưa cập nhật";
  return new Date(dateStr).toLocaleString("vi-VN");
};

/**
 * Get gender text in Vietnamese
 */
export const getGenderText = (gender) => {
  switch (gender?.toLowerCase()) {
    case "male":
    case "m":
      return "Nam";
    case "female":
    case "f":
      return "Nữ";
    default:
      return "Khác";
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Check if user is admin
 */
export const isAdmin = (user) => {
  return user?.profile?.role_id === 1;
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};
