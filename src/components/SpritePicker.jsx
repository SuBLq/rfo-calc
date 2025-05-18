import React from "react";
import spriteSheet from "../data/weaponlist.jpg";; // путь к спрайту

const ICON_SIZE = 64;
const COLUMNS = 32;

export default function SpritePicker({ onSelect }) {
  const totalIcons = 448; // 2048/64 * 896/64

  const handleClick = (index) => {
    onSelect(index);
  };

  return (
    <div style={{ maxHeight: 512, overflowY: "scroll", border: "1px solid #ccc", margin: "10px 0" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLUMNS}, ${ICON_SIZE}px)` }}>
        {Array.from({ length: totalIcons }).map((_, index) => {
          const x = (index % COLUMNS) * -ICON_SIZE;
          const y = Math.floor(index / COLUMNS) * -ICON_SIZE;
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                backgroundImage: `url(${spriteSheet})`,
                backgroundPosition: `${x}px ${y}px`,
                backgroundSize: `2048px 896px`,
                cursor: "pointer",
                border: "1px solid transparent",
                transition: "border 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.border = "1px solid #aaa"}
              onMouseLeave={e => e.currentTarget.style.border = "1px solid transparent"}
            />
          );
        })}
      </div>
    </div>
  );
}