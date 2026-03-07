import React from "react";
import ReportItem from "./ReportItem";
import { FileWarning, Loader2 } from "lucide-react";

const ReportList = ({
  reports,
  loading,
  onResolve,
  onDismiss,
  onDelete,
  onViewDetail,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-gray-500">Đang tải báo cáo...</p>
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FileWarning className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          Không có báo cáo nào
        </h3>
        <p className="text-gray-500 text-center">
          Chưa có báo cáo nào được gửi đến
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {reports.map((report) => (
        <ReportItem
          key={report.id}
          report={report}
          onResolve={onResolve}
          onDismiss={onDismiss}
          onDelete={onDelete}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default ReportList;
