// Application Constants

export const ROUTES = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Admin
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    FAMILY_TREE: "/admin/family-tree",
    PENDING_MEMBERS: "/admin/pending-members",
    EVENTS: "/admin/events",
    MEMBERS: "/admin/members",
    FUNDS: "/admin/funds",
    ANCESTRAL_HOUSE: "/admin/ancestral-house",
    POSTS: "/admin/posts",
    NOTIFICATIONS: "/admin/notifications",
    SETTINGS: "/admin/settings",
  },

  // Member
  MEMBER: {
    DASHBOARD: "/member/dashboard",
    FAMILY_TREE: "/member/family-tree",
    FUND_NOTIFICATIONS: "/member/fund-notifications",
    PAYMENT_HISTORY: "/member/payment-history",
    FUND_REPORT: "/member/fund-report",
    ANCESTRAL_HOUSE: "/member/ancestral-house",
    PROFILE: "/member/profile",
    ADD_CHILD_REQUEST: "/member/add-child-request",
  },
};

export const ROLES = {
  ADMIN: 1,
  MEMBER: 2,
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
