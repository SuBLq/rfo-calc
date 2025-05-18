import React from "react";
import weaponSprite from "../data/weaponlist.jpg";

const ICON_SIZE = 64;
const SPRITE_WIDTH = 2048;
const COLUMNS = SPRITE_WIDTH / ICON_SIZE;

export default function SpriteIcon({ index, size = 64 }) {
  const x = (index % COLUMNS) * ICON_SIZE;
  const y = Math.floor(index / COLUMNS) * ICON_SIZE;

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${weaponSprite})`,
        backgroundPosition: `-${x * (size / ICON_SIZE)}px -${y * (size / ICON_SIZE)}px`,
        backgroundSize: `${SPRITE_WIDTH * (size / ICON_SIZE)}px auto`,
        imageRendering: "pixelated"
      }}
    />
  );
}