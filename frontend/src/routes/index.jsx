import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />, // Tất cả các trang bên dưới sẽ có Sidebar
    children: [
      {
        path: "dashboard", // Đường dẫn: /admin/dashboard
        element: <Dashboard />,
      },
      {
        path: "members", // Đường dẫn: /admin/members
        element: <Members />,
      },
      // Thêm các trang khác của bạn vào đây...
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
