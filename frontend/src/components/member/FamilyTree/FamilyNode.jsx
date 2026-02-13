import React, { useRef, useEffect } from "react";
import PersonCard from "./PersonCard";

/* ================= COUPLE COMPONENT ================= */
const CoupleNode = ({ member, highlightedId, mainRef, onPersonClick }) => {
  return (
    <div className="flex items-center relative">
      {/* NGƯỜI CÙNG HUYẾT THỐNG */}
      <div ref={mainRef}>
        <PersonCard
          person={member}
          isHighlighted={highlightedId === member.id}
          onClick={onPersonClick}
        />
      </div>

      {/* VỢ / CHỒNG (KHÔNG HUYẾT THỐNG) */}
      {member.spouse && (
        <>
          <div className="w-6 h-0.5 bg-pink-300 mx-1"></div>
          <div className="w-3 h-3 bg-pink-400 rounded-full -mx-1.5 z-10"></div>
          <div className="w-6 h-0.5 bg-pink-300 mx-1"></div>

          <PersonCard
            person={{ ...member.spouse, marriage_date: member.marriage_date }}
            isHighlighted={highlightedId === `spouse-${member.spouse.id}`}
            isSpouse
            spouseOfName={member.full_name || member.name}
            onClick={onPersonClick}
          />
        </>
      )}
    </div>
  );
};

/* ================= FAMILY NODE (ĐỆ QUY) ================= */
const FamilyNode = ({ member, highlightedId, onPersonClick }) => {
  const containerRef = useRef(null);
  const childRefs = useRef([]);
  const mainMemberRef = useRef(null);

  /* TỰ CĂN CHỈNH ĐƯỜNG NGANG NỐI CÁC CON */
  useEffect(() => {
    if (!containerRef.current || childRefs.current.length < 2) return;

    const first = childRefs.current[0];
    const last = childRefs.current[childRefs.current.length - 1];
    const line = containerRef.current.querySelector(".sibling-line");

    if (!first || !last || !line) return;

    const start = first.offsetLeft + first.offsetWidth / 2;
    const end = last.offsetLeft + last.offsetWidth / 2;

    line.style.left = `${start}px`;
    line.style.width = `${end - start}px`;
  }, [member.children]);

  return (
    <div className="flex flex-col items-center">
      {/* ================= CHA / MẸ (CÙNG HUYẾT THỐNG) ================= */}
      <div className="relative flex flex-col items-center">
        <CoupleNode
          member={member}
          highlightedId={highlightedId}
          mainRef={mainMemberRef}
          onPersonClick={onPersonClick}
        />

        {/* DÂY DỌC → CHỈ TỪ NGƯỜI CÙNG HUYẾT THỐNG */}
        {member.children?.length > 0 && (
          <div className="w-0.5 h-6 bg-slate-300"></div>
        )}
      </div>

      {/* ================= CON (CÙNG HUYẾT THỐNG) ================= */}
      {member.children?.length > 0 && (
        <div className="relative flex flex-col items-center">
          {/* Trục dọc từ cha/mẹ xuống đường ngang */}
          <div className="w-0.5 h-6 bg-slate-300"></div>

          <div ref={containerRef} className="relative flex gap-14 items-start">
            {/* ĐƯỜNG NGANG NỐI ANH EM RUỘT */}
            {member.children.length > 1 && (
              <div className="sibling-line absolute top-0 h-0.5 bg-slate-300"></div>
            )}

            {member.children.map((child, index) => (
              <div
                key={child.id}
                ref={(el) => (childRefs.current[index] = el)}
                className="flex flex-col items-center"
              >
                {/* DÂY DỌC TỪ ĐƯỜNG NGANG XUỐNG MỖI CON */}
                <div className="w-0.5 h-6 bg-slate-300"></div>

                {/* ĐỆ QUY */}
                <FamilyNode
                  member={child}
                  highlightedId={highlightedId}
                  onPersonClick={onPersonClick}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyNode;
