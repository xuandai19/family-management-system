import React from "react";

export const getUniqueAvatar = (gender, name) => {
  const seed =
    (name || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 70;
  const type = gender?.toLowerCase() === "male" ? "male" : "female";
  return `https://xsgames.co/randomusers/assets/avatars/${type}/${seed}.jpg`;
};

export const AgeAvatar = ({ gender, name }) => {
  const isMale = gender?.toLowerCase() === "male";
  return (
    <div
      className={`w-16 h-16 rounded-full border-4 overflow-hidden mb-2
      ${isMale ? "border-blue-400" : "border-rose-400"}`}
    >
      <img
        src={getUniqueAvatar(gender, name)}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
