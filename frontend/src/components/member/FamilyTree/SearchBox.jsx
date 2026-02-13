import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Loader2,
  X,
  Users,
  Heart,
  MapPin,
  GitBranch,
} from "lucide-react";
import { searchAll } from "../../../services/common/familyTreeApi";
import { getUniqueAvatar } from "./Avatar";

const SearchBox = ({ onHighlight }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    members: [],
    spouses: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults({ members: [], spouses: [] });
      setShowDropdown(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await searchAll(searchQuery);
        if (res.success) {
          setSearchResults(res.data || { members: [], spouses: [] });
          setShowDropdown(true);
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults({ members: [], spouses: [] });
      }
      setIsSearching(false);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHighlightMember = (person, isSpouse = false) => {
    const id = isSpouse ? `spouse-${person.id}` : person.id;
    onHighlight(id, person.full_name || person.name);
    setShowDropdown(false);
    setSearchQuery(person.full_name || person.name);
  };

  const handleViewTreeFrom = (member) => {
    onViewTreeFrom(member.id);
    setShowDropdown(false);
    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults({ members: [], spouses: [] });
    setShowDropdown(false);
  };

  const hasResults =
    searchResults.members?.length > 0 || searchResults.spouses?.length > 0;

  return (
    <div className="relative" ref={searchInputRef}>
      <div className="flex items-center bg-white rounded-lg shadow px-3 py-2">
        <Search size={18} className="text-slate-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm tất cả..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => hasResults && setShowDropdown(true)}
          className="outline-none text-sm w-48"
        />
        {isSearching && (
          <Loader2 size={16} className="animate-spin text-slate-400 ml-2" />
        )}
        {searchQuery && !isSearching && (
          <button
            onClick={handleClearSearch}
            className="ml-2 p-1 hover:bg-slate-100 rounded"
          >
            <X size={16} className="text-slate-400" />
          </button>
        )}
      </div>

      {/* Search dropdown */}
      {showDropdown && hasResults && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border max-h-96 overflow-auto z-50 w-80">
          {/* Thành viên dòng họ */}
          {searchResults.members?.length > 0 && (
            <div>
              <div className="px-3 py-2 bg-blue-50 border-b flex items-center gap-2 sticky top-0">
                <Users size={14} className="text-blue-500" />
                <span className="text-xs font-semibold text-blue-700">
                  Thành viên dòng họ ({searchResults.members.length})
                </span>
              </div>
              {searchResults.members.map((member) => (
                <div
                  key={`member-${member.id}`}
                  className="px-3 py-2 flex items-center gap-3 hover:bg-slate-50 transition-colors border-b last:border-b-0"
                >
                  <img
                    src={getUniqueAvatar(
                      member.gender,
                      member.full_name || member.name,
                    )}
                    alt={member.full_name || member.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-300 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-slate-700 truncate">
                      {member.full_name || member.name}
                    </div>
                    {member.generation_level && (
                      <div className="text-xs text-slate-400">
                        Đời thứ {member.generation_level}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleHighlightMember(member, false)}
                      className="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Tìm trên cây"
                    >
                      <MapPin size={16} />
                    </button>
                    <button
                      onClick={() => handleViewTreeFrom(member)}
                      className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Xem cây từ người này"
                    >
                      <GitBranch size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vợ/Chồng */}
          {searchResults.spouses?.length > 0 && (
            <div>
              <div className="px-3 py-2 bg-pink-50 border-b flex items-center gap-2 sticky top-0">
                <Heart size={14} className="text-pink-500" />
                <span className="text-xs font-semibold text-pink-700">
                  Vợ/Chồng ({searchResults.spouses.length})
                </span>
              </div>
              {searchResults.spouses.map((spouse) => (
                <div
                  key={`spouse-${spouse.id}`}
                  className="px-3 py-2 flex items-center gap-3 hover:bg-slate-50 transition-colors border-b last:border-b-0"
                >
                  <img
                    src={getUniqueAvatar(
                      spouse.gender,
                      spouse.full_name || spouse.name,
                    )}
                    alt={spouse.full_name || spouse.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-pink-300 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-slate-700 truncate">
                      {spouse.full_name || spouse.name}
                    </div>
                    <div className="text-xs text-pink-400">
                      Vợ/Chồng của {spouse.member_name || "thành viên trong họ"}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleHighlightMember(spouse, true)}
                      className="p-1.5 text-pink-500 hover:bg-pink-100 rounded-lg transition-colors"
                      title="Tìm trên cây"
                    >
                      <MapPin size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No results */}
      {showDropdown && searchQuery && !hasResults && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border p-4 z-50">
          <p className="text-sm text-slate-500 text-center">
            Không tìm thấy kết quả
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
