// ===============================
// ADMIN CONTROLLER - INDEX
// Export tất cả các controller functions
// ===============================

// Dashboard
export * as dashboardController from "./dashboardController.js";

// Event Management
export * as eventController from "./eventController.js";

// Fund Management
export * as fundController from "./fundController.js";

// Collection Management
export * as collectionController from "./collectionController.js";

// Notification Management
export * as notifiController from "./notifiController.js";

// Post Management
export * as postController from "./postController.js";

// Ancestral House Management
export * as ancestralHouseController from "./ancestralHouseController.js";

// Registration Management
export {
  getPendingMemberRequests,
  approveMemberRegistration,
  rejectMemberRegistration,
  approveSpouseRegistration,
  getAddMemberRequests,
  approveAddMemberRequest,
  rejectAddMemberRequest,
} from "./registrationController.js";

// User/Profile Management
export { getAllUsers, deleteUser, updateUserRole } from "./userController.js";

// Family Member Management
export {
  getAllMembersShort,
  getUnlinkedMembers,
  getAllMembersWithSpouse,
  getAllFamilyMembers,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from "./familyMemberController.js";

// Spouse Management
export {
  getAllSpousesShort,
  getUnlinkedSpouses,
  getAllSpousesFull,
  createSpouse,
  updateSpouse,
  deleteSpouse,
} from "./spouseController.js";

// Report Management
export * as reportController from "./reportController.js";

// Proposal Management
export * as proposalController from "./proposalController.js";
