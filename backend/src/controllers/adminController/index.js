// ===============================
// ADMIN CONTROLLER - INDEX
// Export tất cả các controller functions
// ===============================

// Registration Management
export {
  getPendingMemberRequests,
  approveMemberRegistration,
  rejectMemberRegistration,
  approveSpouseRegistration,
} from "./registrationController.js";

// User/Profile Management
export { getAllUsers, deleteUser, updateUserRole } from "./userController.js";

// Family Member Management
export {
  getAllMembersShort,
  getAllMembersWithSpouse,
  getAllFamilyMembers,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from "./familyMemberController.js";

// Spouse Management
export {
  getAllSpousesShort,
  getAllSpousesFull,
  createSpouse,
  updateSpouse,
  deleteSpouse,
} from "./spouseController.js";
