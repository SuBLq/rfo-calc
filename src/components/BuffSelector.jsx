import React, { useEffect, useState } from "react";

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
  selectedBuffs,
  toggleBuff,
  supportBuff,
  setSupportBuff,
  racialBuff,
  setRacialBuff,
  antigravBuff,
  setAntigravBuff,
  relicsetBuff,
  setRelicsetBuff,
  siegeSetBuff,
  setSiegeSetBuff,
  activeDoping,
  setActiveDoping,
  attackGeneratorCount,
  setAttackGeneratorCount,
  AnyBuffsConfig,
  DopsConfig,
  RaceBuffsConfig,
  relicsetBuff1,
  setRelicsetBuff1,
  relicsetBuff2,
  setRelicsetBuff2,
  mode,
}) {
  const [dopingOptions, setDopingOptions] = useState([]);

  useEffect(() => {
    setDopingOptions(DopsConfig);
  }, []);

  const allBuffs = React.useMemo(() => {
    if (!RaceBuffsConfig.classBuffsByRace?.[race]) return [];
    return RaceBuffsConfig.classBuffsByRace[race][String(weaponType)] || [];
  }, [race, weaponType, RaceBuffsConfig]);

  const positiveBuffs = allBuffs.filter((b) => b.percent > 0);

  const handleMouseEnter = (e, isSelected) => {
    e.currentTarget.style.backgroundColor = isSelected ? "#2a517a" : "#3a4f6a";
    e.currentTarget.style.color = "#ffffff";
  };

  const handleMouseLeave = (e, isSelected) => {
    e.currentTarget.style.backgroundColor = isSelected ? "#1a3a5a" : "#2a4365";
    e.currentTarget.style.color = "#ffffff";
  };

  //---------------------------------------------------------//---------------------------------------------------------

const relicsetOptionsMap = {
  1: {
    base: AnyBuffsConfig.relicsetBuffOptionsMelee,
    Акретия: AnyBuffsConfig.relicsetBuffOptionsMeleeA,
    Беллато: AnyBuffsConfig.relicsetBuffOptionsMeleeB,
    Кора: AnyBuffsConfig.relicsetBuffOptionsMeleeC,
  },
  2: {
    base: AnyBuffsConfig.relicsetBuffOptionsRange,
    Акретия: AnyBuffsConfig.relicsetBuffOptionsRangeA,
    Беллато: AnyBuffsConfig.relicsetBuffOptionsRangeB,
    Кора: AnyBuffsConfig.relicsetBuffOptionsRangeC,
  },
  3: {
    base: AnyBuffsConfig.relicsetBuffOptionsMage,
    Беллато: AnyBuffsConfig.relicsetBuffOptionsMageB,
    Кора: AnyBuffsConfig.relicsetBuffOptionsMageC,
  },
  4: {
    base: AnyBuffsConfig.relicsetBuffOptionsLauncher,
    Акретия: AnyBuffsConfig.relicsetBuffOptionsLauncherA,
  },
};

const RelicSetSelect = ({
  label,
  value,
  disabled,
  onChange,
  options,
  prefix,
}) => (
  <div style={rowStyle}>
    <label>{label}</label>
    <select
      style={selectStyle}
      value={value}
      disabled={disabled}
      onChange={(e) => {
        const val = parseInt(e.target.value);
        setRelicsetBuff(val);
        onChange(val);
      }}
    >
      {options.map(({ label, value }, i) => (
        <option key={`${prefix}-${value}-${i}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

//---------------------------------------------------------//---------------------------------------------------------

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
            {allowedRaces.map((r, i) => (
              <option key={`race-${r}-${i}`} value={r}>
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
                key={`buff-${buff.name}`}
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
            {AnyBuffsConfig.siegeBuffOptions.map(({ label, value }, i) => (
              <option key={`siege-${value}-${i}`} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      )}
  
  <div style={containerStyle}>
  {/* Бафф поддержки */}
  <div style={rowStyle}>
    <label>Бафф поддержки: </label>
    <select
      style={selectStyle}
      value={supportBuff}
      onChange={(e) => setSupportBuff(parseInt(e.target.value))}
    >
      {AnyBuffsConfig.supportBuffOptions.map(({ label, value }, i) => (
        <option key={`support-${value}-${i}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>

  {/* Расовый бафф/дебаф */}
  <div style={rowStyle}>
    <label>Расовый бафф/дебаф: </label>
    <select
      style={selectStyle}
      value={racialBuff}
      onChange={(e) => setRacialBuff(parseInt(e.target.value))}
    >
      {AnyBuffsConfig.racialBuffOptions.map(({ label, value }, i) => (
        <option key={`racial-${value}-${i}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>

  {/* Активный допинг */}
  <div style={rowStyle}>
    <label>Активный допинг: </label>
    <select
      style={selectStyle}
      value={activeDoping}
      onChange={(e) => setActiveDoping(parseInt(e.target.value))}
    >
      <option value={0}>Без допинга</option>
      {DopsConfig.dopingOptions.map(({ label, value }, i) => (
        <option key={`doping-${value}-${i}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>

  {/* Генераторы атаки */}
  <div style={rowStyle}>
    <label>Генераторы атаки: </label>
    <select
      style={selectStyle}
      value={attackGeneratorCount}
      onChange={(e) => setAttackGeneratorCount(parseInt(e.target.value, 10))}
    >
      {AnyBuffsConfig.attackGeneratorOptions.map(({ label, value }, i) => (
        <option key={`attack-gen-${value}-${i}`} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>

  {/* Сет (церб онли)*/}


  {mode === "cerberus" && relicsetOptionsMap[weaponType] && (
  <>
  <h3>Сета для {race}, тип оружия {weaponType}:</h3>
    <RelicSetSelect
      label="Палмас.сет: "
      value={relicsetBuff1}
      disabled={relicsetBuff2 !== 0}
      prefix="relicset1"
      options={relicsetOptionsMap[weaponType].base}
      onChange={(val) => {
        setRelicsetBuff1(val);
        if (val !== 0) setRelicsetBuff2(0);
      }}
    />

    {relicsetOptionsMap[weaponType][race] && (
      <RelicSetSelect
        label="Рел.сет: "
        value={relicsetBuff2}
        disabled={relicsetBuff1 !== 0}
        prefix="relicset2"
        options={relicsetOptionsMap[weaponType][race]}
        onChange={(val) => {
          setRelicsetBuff2(val);
          if (val !== 0) setRelicsetBuff1(0);
        }}
      />
    )}
  </>
)}


{/*Сета палмасы для рело*/}

{mode === "reuleaux" && relicsetOptionsMap[weaponType] && (
  <>
  <h3>Сета для {race}, тип оружия {weaponType}:</h3>
    <RelicSetSelect
      label="Палмас.сет: "
      value={relicsetBuff1}
      disabled={relicsetBuff2 !== 0}
      prefix="relicset1"
      options={relicsetOptionsMap[weaponType].base}
      onChange={(val) => {
        setRelicsetBuff1(val);
        if (val !== 0) setRelicsetBuff2(0);
      }}
    />
  </>
)}










  {/* Антиграв (только для reuleaux) */}
  {mode === "reuleaux" && (
    <div style={rowStyle}>
      <label>Антиграв (Урон): </label>
      <select
        style={selectStyle}
        value={antigravBuff}
        onChange={(e) => setAntigravBuff(parseInt(e.target.value))}
      >
        {AnyBuffsConfig.antigravBuffOptions.map(({ label, value }, i) => (
          <option key={`antigrav-${value}-${i}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )}

  
</div>

    </div>
  );
  
}
