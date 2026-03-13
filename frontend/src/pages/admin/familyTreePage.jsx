import React, { useState, useEffect, useCallback, useRef } from "react";
import { Home, GitBranch, X, Loader2 } from "lucide-react";
import QuickPinchZoom, {
  make3dTransformValue,
} from "react-quick-pinch-zoom";
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
  const [highlightedId, setHighlightedId] = useState(null);

  // State cho modal thông tin
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSelectedSpouse, setIsSelectedSpouse] = useState(false);
  const [spouseOfName, setSpouseOfName] = useState(null); // Thêm state mới

  const treeContainerRef = useRef(null);
  const treeContentRef = useRef(null);

  const applyTransform = useCallback(({ x, y, scale: nextScale }) => {
    if (!treeContentRef.current) return;

    treeContentRef.current.style.transform = make3dTransformValue({
      x,
      y,
      scale: nextScale,
    });
    setScale(nextScale);
  }, []);

  const onUpdate = useCallback(
    ({ x, y, scale: nextScale }) => {
      applyTransform({ x, y, scale: nextScale });
    },
    [applyTransform],
  );

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

  // Handlers
  const handleZoomIn = () => {
    const nextScale = Math.min(MAX_SCALE, scale + 0.2);
    applyTransform({ x: 0, y: 0, scale: nextScale });
  };

  const handleZoomOut = () => {
    const nextScale = Math.max(MIN_SCALE, scale - 0.2);
    applyTransform({ x: 0, y: 0, scale: nextScale });
  };

  const handleResetZoom = () => {
    applyTransform({ x: 0, y: 0, scale: 1 });
  };

  const handleHighlight = (id, name) => {
    setHighlightedId(id);
    setTimeout(() => setHighlightedId(null), 3000);
  };

  const handleViewTreeFrom = (memberId) => {
    setRootId(memberId);
    handleResetZoom();
    setHighlightedId(null);
  };

  const handleBackToRoot = () => {
    setRootId(DEFAULT_ROOT_ID);
    handleResetZoom();
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
      >
        {/* Tree */}
        <QuickPinchZoom
          onUpdate={onUpdate}
          wheelScaleFactor={220}
          tapZoomFactor={1}
          draggableUnzoomed={true}
          className="h-full w-full"
        >
          <div ref={treeContentRef} className="p-12 inline-block min-w-full">
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
        </QuickPinchZoom>
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
