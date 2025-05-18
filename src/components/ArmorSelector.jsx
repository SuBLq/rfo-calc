import React, { useEffect } from "react";

const selectStyle = {
  width: "160px",
  minWidth: "160px",
  padding: "4px 8px",
  fontSize: "14px",
  boxSizing: "border-box",
  marginTop: "4px",
  marginBottom: "8px",
  display: "inline-block",
};

const columnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

export default function ArmorSelector({
  armorProperties,
  setArmorProperties,
  archonArmor,
  setArchonArmor,
  magicArmor,
  setMagicArmor,
  isMagicWeapon,
}) {
  const onChangeProperty = (idx, value) => {
    const updated = [...armorProperties];
    updated[idx] = value;
    setArmorProperties(updated);
  };

  useEffect(() => {
    if (archonArmor) {
      const updated = [...armorProperties];
      let changed = false;
      [1, 2, 3].forEach((i) => {
        if (updated[i] !== 0) {
          updated[i] = 0;
          changed = true;
        }
      });
      if (changed) setArmorProperties(updated);
    }
  }, [archonArmor]); 

  return (
    <div>
      <h3>Свойства брони</h3>
      <div style={columnStyle}>
        {armorProperties.map((val, idx) => {
          const isBlocked = archonArmor && idx >= 0 && idx <= 2;
          return (
            <select
              key={idx}
              style={selectStyle}
              value={val}
              onChange={(e) => onChangeProperty(idx, parseInt(e.target.value, 10))}
              disabled={isBlocked}
            >
              <option value={0}>0%</option>
              <option value={2}>2% SP</option>
              <option value={5}>5% С-Урон</option>
              <option value={8}>8% SP-Урон</option>
            </select>
          );
        })}

        <label>
          <input
            type="checkbox"
            checked={archonArmor}
            onChange={() => setArchonArmor(!archonArmor)}
          />
          Броня Архонта (+35%)
        </label>

        <h4 style={{ marginTop: "16px", marginBottom: "8px" }}>Магическая броня</h4>
        {[6, 8, 8, 6, 6].map((percent, idx) => {
          const isDisabled = !isMagicWeapon;
          return (
            <label
              key={idx}
              style={{ color: isDisabled ? "gray" : "inherit" }}
            >
              <input
                type="checkbox"
                checked={magicArmor[idx]}
                disabled={isDisabled}
                onChange={() => {
                  const updated = [...magicArmor];
                  updated[idx] = !updated[idx];
                  setMagicArmor(updated);
                }}
              />
              Часть {idx + 1} (+{percent}%)
            </label>
          );
        })}
      </div>
    </div>
  );
}



