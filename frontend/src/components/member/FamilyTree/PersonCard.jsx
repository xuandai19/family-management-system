import React, { forwardRef } from "react";
import { AgeAvatar } from "./Avatar";

const PersonCard = forwardRef(
  ({ person, isHighlighted, isSpouse, spouseOfName, onClick }, ref) => {
    if (!person) return null;

    return (
      <div
        ref={ref}
        onClick={() => onClick?.(person, isSpouse, spouseOfName)}
        className={`min-w-[140px] p-4 flex flex-col items-center rounded-2xl
        border-2 bg-white shadow-lg cursor-pointer
        transition-all duration-300 ease-out
        ${isSpouse ? "border-pink-400" : "border-blue-400"}
        ${isHighlighted ? "ring-4 ring-yellow-400 scale-110 z-10" : ""}
        hover:scale-105 hover:shadow-xl hover:-translate-y-1
        ${
          isSpouse
            ? "hover:border-pink-500 hover:bg-pink-50"
            : "hover:border-blue-500 hover:bg-blue-50"
        }
        active:scale-100 active:shadow-lg
      `}
      >
        <AgeAvatar
          gender={person.gender}
          name={person.full_name || person.name}
          avatarUrl={person.avatar_url}
        />
        <span className="text-xs font-bold text-slate-700 text-center mt-2">
          {person.full_name || person.name}
        </span>
        {isSpouse && <span className="text-[10px] text-slate-400 mt-1"></span>}

        {/* Hover indicator */}
        <div className="mt-2 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Click để xem chi tiết
        </div>
      </div>
    );
  },
);

export default PersonCard;
