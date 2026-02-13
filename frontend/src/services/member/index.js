// ================================
// MEMBER SERVICES - BARREL EXPORT
// Tập trung tất cả API calls cho member
// ================================

// Dashboard
export { getDashboardStats } from "./dashboardApi";

// Events
export {
  getMemberEvents,
  getUpcomingEvents,
  getMemberEventById,
  proposeEvent,
  getMyEventProposals,
  registerForEvent,
  cancelEventRegistration,
} from "./eventApi";

// Posts
export {
  getMemberPosts,
  getMemberPostById,
  proposePost,
  getMyPosts,
  toggleLikePost,
} from "./postApi";

// Funds
export {
  getFundReport,
  getCollectionNotifications,
  getMyPaymentHistory,
  getCollectionRoundDetail,
} from "./fundApi";

// Expenses
export {
  proposeExpense,
  getMyExpenseProposals,
  cancelExpenseProposal,
} from "./expenseApi";

// Profile
export {
  getMyProfile,
  updateMyProfile,
  changePassword,
  getMyFamilyInfo,
  getMyActivities,
} from "./profileApi";

// Family (Child Requests)
export {
  submitChildRequest,
  getMyChildRequests,
  cancelChildRequest,
} from "./familyApi";

// Re-export shared services used by member pages
export {
  getFamilyTree,
  searchMembers,
  searchAll,
} from "../common/familyTreeApi";
export {
  getAncestralHouse,
  getRenovationLogs,
} from "../common/ancestralHouseApi";
