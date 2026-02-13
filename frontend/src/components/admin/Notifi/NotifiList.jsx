import React from "react";
import NotifiItem from "./NotifiItem";
import { Bell, Loader2 } from "lucide-react";

const NotifiList = ({
  notifications,
  loading,
  onMarkRead,
  onDelete,
  onViewDetail,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-gray-500">Đang tải thông báo...</p>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          Không có thông báo nào
        </h3>
        <p className="text-gray-500 text-center">
          Chưa có thông báo nào được gửi đến
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {notifications.map((notification) => (
        <NotifiItem
          key={notification.id}
          notification={notification}
          onMarkRead={onMarkRead}
          onDelete={onDelete}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default NotifiList;
