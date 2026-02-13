import React, { useState, useEffect, useCallback, useRef } from "react";
import { Home, GitBranch, X, Loader2 } from "lucide-react";
import { getFamilyTree } from "../../services/common/familyTreeApi";
import {
  FamilyNode,
  SearchBox,
  ZoomControls,
  Legend,
  PersonInfoModal,
} from "../../components/member/FamilyTree";

const DEFAULT_ROOT_ID = 1;
const MIN_SCALE = 0.3;
const MAX_SCALE = 2;

const FamilyTreePage = () => {
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
  const [spouseOfName, setSpouseOfName] = useState(null); // Thêm state mới

  const treeContainerRef = useRef(null);

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
        Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta)),
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

  const handleBackToRoot = () => {
    setRootId(DEFAULT_ROOT_ID);
    setScale(1);
  };

  // Handler cho click vào person card
  const handlePersonClick = (person, isSpouse = false, spouseOfName = null) => {
    setSelectedPerson(person);
    setIsSelectedSpouse(isSpouse);
    setSpouseOfName(spouseOfName);
  };

  const handleCloseModal = () => {
    setSelectedPerson(null);
    setIsSelectedSpouse(false);
    setSpouseOfName(null);
  };

  const isNotDefaultRoot = rootId !== DEFAULT_ROOT_ID;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold">Phả đồ trực tuyến</h2>

          {/* Badge hiển thị đang xem từ ai */}
          {isNotDefaultRoot && rootName && (
            <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm">
              <GitBranch size={14} />
              <span>
                Đang xem từ: <strong>{rootName}</strong>
              </span>
              <button
                onClick={handleBackToRoot}
                className="ml-1 p-0.5 hover:bg-amber-200 rounded-full transition-colors"
                title="Quay về gốc"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Nút quay về gốc */}
          {isNotDefaultRoot && (
            <button
              onClick={handleBackToRoot}
              className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
            >
              <Home size={16} />
              <span>Về gốc</span>
            </button>
          )}

          {/* Search */}
          <SearchBox
            onHighlight={handleHighlight}
            onViewTreeFrom={handleViewTreeFrom}
          />

          {/* Zoom */}
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

      {/* Tree Container */}
      <div
        ref={treeContainerRef}
        className="bg-white rounded-3xl shadow-xl overflow-auto relative"
        style={{ maxHeight: "calc(100vh - 160px)" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hover hint */}
        {isHovering && (
          <div className="absolute top-3 left-3 bg-slate-800/70 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
            Cuộn chuột để thu phóng • Click vào người để xem chi tiết
          </div>
        )}

        {/* Tree */}
        <div
          className="p-12 inline-block min-w-full"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 0.1s ease-out",
          }}
        >
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            treeData && (
              <FamilyNode
                member={treeData}
                highlightedId={highlightedId}
                onPersonClick={handlePersonClick}
              />
            )
          )}
        </div>
      </div>

      {/* Modal thông tin chi tiết */}
      {selectedPerson && (
        <PersonInfoModal
          person={selectedPerson}
          isSpouse={isSelectedSpouse}
          spouseOf={spouseOfName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FamilyTreePage;
