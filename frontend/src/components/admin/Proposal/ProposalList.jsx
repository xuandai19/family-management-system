import React from "react";
import ProposalItem from "./ProposalItem";
import { Inbox, Loader2 } from "lucide-react";

const ProposalList = ({
  proposals,
  type,
  loading,
  onApprove,
  onReject,
  onDelete,
  onViewDetail,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-gray-500">Đang tải đề xuất...</p>
      </div>
    );
  }

  if (!proposals || proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          Không có đề xuất nào
        </h3>
        <p className="text-gray-500 text-center">
          Chưa có đề xuất nào được gửi đến
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {proposals.map((proposal) => (
        <ProposalItem
          key={proposal.id}
          proposal={proposal}
          type={type}
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};

export default ProposalList;
