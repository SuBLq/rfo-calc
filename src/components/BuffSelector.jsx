import React, { useEffect, useState } from "react";
import dopingData from '../data/dops.json';

const selectStyle = {
  width: "160px",
  minWidth: "160px",
  padding: "4px 8px",
  fontSize: "14px",
  boxSizing: "border-box",
  marginTop: "4px",
  marginBottom: "0",
  display: "inline-block",
};

const containerStyle = {
  marginBottom: "20px",
};

const siegeBuffOptions = [
  { label: "[40lvl] +35%", value: 35 },
  { label: "[40lvl 2 skill] +10%", value: 10 },
  { label: "[50lvl] +40%", value: 40 },
  { label: "[50lvl] +10%", value: 10 },
  { label: "[55lvl] +60%", value: 60 },
  { label: "[60lvl] +45%", value: 45 },
  { label: "[65lvl] +50%", value: 50 },
];

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  minWidth: "220px",
};

const buffLabelStyle = (isSelected) => ({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "6px",
  backgroundColor: isSelected ? "#1a3a5a" : "#2a4365",
  color: "#ffffff",
  transition: "background-color 0.2s ease, color 0.2s ease",
  userSelect: "none",
});

export default function BuffSelector({
  race,
  setRace,
  allowedRaces,
  weaponType,
  buffsByRace,
  selectedBuffs,
  toggleBuff,
  supportBuff,
  setSupportBuff,
  racialBuff,
  setRacialBuff,
  siegeSetBuff,
  setSiegeSetBuff,
  activeDoping,
  setActiveDoping,
  attackGeneratorCount,
  setAttackGeneratorCount,
}) {
  const [dopingOptions, setDopingOptions] = useState([]);

  useEffect(() => {
    setDopingOptions(dopingData);
  }, []);

  const allBuffs = React.useMemo(() => {
    if (!buffsByRace[race]) return [];
    return buffsByRace[race][String(weaponType)] || [];
  }, [race, weaponType, buffsByRace]);

  const positiveBuffs = allBuffs.filter((b) => b.percent > 0);

  const handleMouseEnter = (e, isSelected) => {
    e.currentTarget.style.backgroundColor = isSelected ? "#2a517a" : "#3a4f6a";
    e.currentTarget.style.color = "#ffffff";
  };

  const handleMouseLeave = (e, isSelected) => {
    e.currentTarget.style.backgroundColor = isSelected ? "#1a3a5a" : "#2a4365";
    e.currentTarget.style.color = "#ffffff";
  };

  return (
    <div>
      {/* Выбор расы */}
      <div style={containerStyle}>
        <div style={rowStyle}>
          <label>Выберите расу: </label>
          <select
            style={selectStyle}
            value={race}
            onChange={(e) => setRace(e.target.value)}
          >
            {allowedRaces.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Положительные баффы */}
      <div style={containerStyle}>
        <h3>Баффы для {race}, тип оружия {weaponType}:</h3>
        {positiveBuffs.length === 0 && <p>Нет доступных баффов</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {positiveBuffs.map((buff) => {
            const isSelected = selectedBuffs.includes(buff.name);
            return (
              <label
                key={buff.name}
                style={buffLabelStyle(isSelected)}
                onMouseEnter={(e) => handleMouseEnter(e, isSelected)}
                onMouseLeave={(e) => handleMouseLeave(e, isSelected)}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleBuff(buff.name)}
                  style={{
                    marginRight: "12px",
                    filter: isSelected ? "invert(0.8)" : "invert(0.5)",
                  }}
                />
                {buff.name} (+{buff.percent}%)
              </label>
            );
          })}
        </div>
      </div>

      {/* Осадный набор */}
      {race === "Акретия" && weaponType === 4 && (
        <div style={{ ...containerStyle, marginTop: "12px" }}>
          <label style={{ marginRight: "8px" }}>Осадный Набор: </label>
          <select
            style={selectStyle}
            value={siegeSetBuff}
            onChange={(e) => setSiegeSetBuff(parseInt(e.target.value))}
          >
            <option value={0}>Нет</option>
            {siegeBuffOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Поддержка и расовый бафф */}
      <div style={containerStyle}>
        <div style={rowStyle}>
          <label>Бафф поддержки: </label>
          <select
            style={selectStyle}
            value={supportBuff}
            onChange={(e) => setSupportBuff(parseInt(e.target.value))}
          >
            <option value={0}>0%</option>
            <option value={20}>20%</option>
            <option value={40}>40%</option>
          </select>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={rowStyle}>
          <label>Расовый бафф/дебаф: </label>
          <select
            style={selectStyle}
            value={racialBuff}
            onChange={(e) => setRacialBuff(parseInt(e.target.value))}
          >
            {[-15, -10, -5, 0, 5, 10, 15].map((val) => (
              <option key={val} value={val}>
                {val > 0 ? "+" : ""}
                {val}%
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Активный допинг */}
      <div style={containerStyle}>
        <div style={rowStyle}>
          <label>Активный допинг: </label>
          <select
            style={selectStyle}
            value={activeDoping}
            onChange={(e) => setActiveDoping(parseInt(e.target.value))}
          >
            <option value={0}>Без допинга</option>
            {dopingOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Генераторы атаки */}
      <div style={containerStyle}>
        <div style={rowStyle}>
          <label>Генераторы атаки: </label>
          <select
    style={selectStyle}
    value={attackGeneratorCount}
    onChange={(e) => setAttackGeneratorCount(parseInt(e.target.value))}
  >
    {[0, 1, 2, 3, 4, 5].map((count) => (
      <option key={count} value={count}>
        {count} шт. (+{count * 4}%)
      </option>
    ))}
  </select>
        </div>
      </div>
    </div>
  );
}
