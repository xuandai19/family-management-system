// ===============================
// ADMIN SERVICES - Barrel Export
// ===============================

// Dashboard
export * from "./dashboardApi";

// Member management
export * from "./memberApi";

// Events
export * from "./eventApi";

// Funds & Transactions
export * from "./fundApi";

// Collection Rounds & Payments
export * from "./collectionApi";

// Posts
export * from "./postApi";

// Notifications
export * from "./notifiApi";

// Re-export shared services used by admin pages
export {
  getAncestralHouse,
  upsertAncestralHouse,
  getRenovationLogs,
  createRenovationLog,
  updateRenovationLog,
  deleteRenovationLog,
} from "../common/ancestralHouseApi";

export {
  getFamilyTree,
  searchMembers,
  searchAll,
  getAdmins,
} from "../common/familyTreeApi";

export {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
} from "../common/uploadApi";
