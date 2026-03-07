import React from "react";

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1]?.charAt(0)?.toUpperCase() || "?";
};

export const getUniqueAvatar = (gender, name) => {
  const seed =
    (name || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 70;
  const type = gender?.toLowerCase() === "male" ? "male" : "female";
  return `https://xsgames.co/randomusers/assets/avatars/${type}/${seed}.jpg`;
};

export const getAvatarSrc = (avatarUrl, gender, name) => {
  return avatarUrl || getUniqueAvatar(gender, name);
};

export const AgeAvatar = ({ gender, name, avatarUrl }) => {
  const isMale = gender?.toLowerCase() === "male";
  const hasAvatar = !!avatarUrl;

  return (
    <div
      className={`w-16 h-16 rounded-full border-4 overflow-hidden mb-2
      ${isMale ? "border-blue-400" : "border-rose-400"}`}
    >
      {hasAvatar ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <div
        className={`w-full h-full flex items-center justify-center text-white font-bold text-xl
        ${isMale ? "bg-blue-400" : "bg-rose-400"}`}
        style={{ display: hasAvatar ? "none" : "flex" }}
      >
        {getInitials(name)}
      </div>
    </div>
  );
};
