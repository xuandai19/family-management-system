import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Home, GitBranch, Loader2, Landmark, UserPlus } from "lucide-react";
import { getFamilyTree } from "../../Api/familyTreeApi";
import {
  FamilyNode,
  SearchBox,
  ZoomControls,
  Legend,
  PersonInfoModal,
} from "../../components/FamilyTree";
import PageHeader from "./components/PageHeader";
import QuickNavigation from "./components/QuickNavigation";

const DEFAULT_ROOT_ID = 1;
const MIN_SCALE = 0.3;
const MAX_SCALE = 2;

const UserFamilyTreePage = () => {
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rootId, setRootId] = useState(DEFAULT_ROOT_ID);
  const [rootName, setRootName] = useState("");
  const [scale, setScale] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);

  // State cho modal thông tin
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSelectedSpouse, setIsSelectedSpouse] = useState(false);
  const [spouseOfName, setSpouseOfName] = useState(null);

  const treeContainerRef = useRef(null);

  // Các link liên quan
  const relatedLinks = [
    {
      icon: Landmark,
      label: "Từ đường",
      description: "Xem thông tin nhà thờ tổ",
      path: "/user/ancestral-house",
    },
    {
      icon: UserPlus,
      label: "Đề xuất thêm con",
      description: "Thêm thành viên mới",
      path: "/user/add-child-request",
    },
  ];

  // Fetch tree data
  const fetchFamilyTree = useCallback(async (id) => {
    setLoading(true);
    try {
      const res = await getFamilyTree(id);
      if (res.success) {
        setTreeData(res.data);
        setRootName(res.data?.full_name || "");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFamilyTree(rootId);
  }, [rootId, fetchFamilyTree]);

  // Handle wheel zoom
  useEffect(() => {
    const container = treeContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (!isHovering) return;
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale((prev) =>
        Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta))
      );
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isHovering]);

  // Prevent page scroll when hovering tree
  useEffect(() => {
    if (!isHovering) return;

    const preventScroll = (e) => {
      if (treeContainerRef.current?.contains(e.target)) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventScroll, { passive: false });
    return () => document.removeEventListener("wheel", preventScroll);
  }, [isHovering]);

  // Handlers
  const handleZoomIn = () =>
    setScale((prev) => Math.min(MAX_SCALE, prev + 0.2));
  const handleZoomOut = () =>
    setScale((prev) => Math.max(MIN_SCALE, prev - 0.2));
  const handleResetZoom = () => setScale(1);

  const handleHighlight = (id, name) => {
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(null), 3000);
  };

  const handleViewTreeFrom = (memberId) => {
    setRootId(memberId);
    setScale(1);
    setHighlightedId(null);
  };

  const handleGoHome = () => {
    setRootId(DEFAULT_ROOT_ID);
    setScale(1);
    setHighlightedId(null);
  };

  const handleNodeClick = (person, isSpouse = false, spouseOfName = null) => {
    setSelectedPerson(person);
    setIsSelectedSpouse(isSpouse);
    setSpouseOfName(spouseOfName);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
    setIsSelectedSpouse(false);
    setSpouseOfName(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe2a1]/30 via-white to-amber-50 p-4 sm:p-6 lg:p-8">
      {/* Header với Breadcrumb */}
      <PageHeader
        icon={GitBranch}
        title="Cây Gia Phả"
        description="Xem thông tin gia phả dòng họ"
        breadcrumbs={[{ label: "Cây gia phả" }]}
        actions={
          <div className="w-full sm:w-80">
            <SearchBox onHighlight={handleHighlight} />
          </div>
        }
      />

      {/* Breadcrumb khi xem từ vị trí khác */}
      {rootId !== DEFAULT_ROOT_ID && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-1 text-[#8B6914] hover:text-[#6B5210] font-medium"
          >
            <Home size={16} />
            Về gốc
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600">
            Đang xem từ: <strong>{rootName}</strong>
          </span>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Tree Container */}
        <div
          ref={treeContainerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative h-[calc(100vh-280px)] min-h-[500px] overflow-auto bg-gradient-to-b from-amber-50/50 to-white"
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2
                  size={48}
                  className="animate-spin text-[#8B6914] mx-auto mb-4"
                />
                <p className="text-slate-600">Đang tải cây gia phả...</p>
              </div>
            </div>
          ) : treeData ? (
            <div
              className="p-8 inline-block min-w-full"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
                transition: "transform 0.2s ease",
              }}
            >
              <div className="flex flex-col items-center">
                <FamilyNode
                  member={treeData}
                  highlightedId={highlightedId}
                  onPersonClick={handleNodeClick}
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <GitBranch size={64} className="text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Không có dữ liệu cây gia phả</p>
              </div>
            </div>
          )}

          {/* Zoom Controls */}
          <ZoomControls
            scale={scale}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleResetZoom}
          />

          {/* Legend */}
          <Legend />
        </div>
      </div>

      {/* Person Info Modal */}
      {selectedPerson && (
        <PersonInfoModal
          person={selectedPerson}
          onClose={handleCloseModal}
          isSpouse={isSelectedSpouse}
          spouseOf={spouseOfName}
        />
      )}

      {/* Quick Navigation */}
      <QuickNavigation
        title="Khám phá thêm"
        items={relatedLinks}
        className="mt-8"
      />
    </div>
  );
};

export default UserFamilyTreePage;
