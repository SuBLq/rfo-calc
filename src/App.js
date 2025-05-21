import React, { useState } from "react";
import './App.css';

import WeaponSelector from "./components/WeaponSelector";
import DamageCalculator from "./components/DamageCalculator";
import WeaponEditor from "./components/WeaponEditor";
import SpriteIcon from "./components/SpriteIcon";
import AccessorySelector from "./components/AccessorySelector";
import LeongradeSelector from './components/LeongradeSelector';
import ArmorSelector from "./components/ArmorSelector";
import BuffSelector from "./components/BuffSelector";

import armorDataStandard from "./data/armorData_hahaclassic.json";
import armorDataCerberus from "./data/armorData_cerberus.json";
import armorDataReuleaux from "./data/armorData_reuleaux.json";

import AnyBuffsConfig_cerberus from './data/AnyBuffsConfig_cerberus.json';
import AnyBuffsConfig_hahaclassic from './data/AnyBuffsConfig_hahaclassic.json';
import AnyBuffsConfig_reuleaux from './data/AnyBuffsConfig_reuleaux.json';

import DopsConfig_cerberus from './data/DopsConfig_cerberus.json';
import DopsConfig_hahaclassic from './data/DopsConfig_hahaclassic.json';
import DopsConfig_reuleaux from './data/DopsConfig_reuleaux.json';

import WeaponsConfig_cerberus from './data/WeaponsConfig_cerberus';
import WeaponsConfig_hahaclassic from './data/WeaponsConfig_hahaclassic';
import WeaponsConfig_reuleaux from './data/WeaponsConfig_reuleaux.json';

import RaceBuffsConfig_cerberus from './data/RaceBuffsConfig_cerberus';
import RaceBuffsConfig_hahaclassic from './data/RaceBuffsConfig_hahaclassic.json';
import RaceBuffsConfig_reuleaux from './data/RaceBuffsConfig_reuleaux.json';

import grade0 from './data/talic/0.png';
import grade1 from './data/talic/1.png';
import grade2 from './data/talic/2.png';
import grade3 from './data/talic/3.png';
import grade4 from './data/talic/4.png';
import grade5 from './data/talic/5.png';
import grade6 from './data/talic/6.png';
import grade7 from './data/talic/7.png';

import frameImg from './data/frame.png';

const gradeImages = [grade0, grade1, grade2, grade3, grade4, grade5, grade6, grade7];

const weaponMods = [0, 5, 13, 25, 50, 80, 135, 200];
const DefWeaponMods = [0, 5, 10, 20, 45, 90, 145, 200];


function ServerSelectorModal({ onSelect }) {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "#34495e",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "300px",
        textAlign: "center",
      }}>
        <h2 style={{ color: "#ffffff" }}>
  Выберите сервер для расчёта (меняется в нижнем блоке калькулятора)
</h2>
        <button onClick={() => onSelect("cerberus")} style={{ margin: "0.5rem" }}>Cerberus Games</button>
        <button onClick={() => onSelect("reuleaux")} style={{ margin: "0.5rem" }}>Reuleaux</button>
        <button onClick={() => onSelect("standard")} style={{ margin: "0.5rem" }}>Стандарт</button>
      </div>
    </div>
  );
}

function App() {
  
  const [mode, setMode] = useState(null);
  // ----------------------
  let armorData, AnyBuffsConfig, DopsConfig, WeaponConfig, RaceBuffsConfig;

  switch (mode) {
    case "cerberus":
      armorData = armorDataCerberus;
      AnyBuffsConfig = AnyBuffsConfig_cerberus;
      DopsConfig = DopsConfig_cerberus;
      WeaponConfig = WeaponsConfig_cerberus;
      RaceBuffsConfig = RaceBuffsConfig_cerberus;
      break;
    case "reuleaux":
      armorData = armorDataReuleaux;
      AnyBuffsConfig = AnyBuffsConfig_reuleaux;
      DopsConfig = DopsConfig_reuleaux;
      WeaponConfig = WeaponsConfig_reuleaux;
      RaceBuffsConfig = RaceBuffsConfig_reuleaux;
      break;
    default: // "standard" или любой неизвестный
      armorData = armorDataStandard;
      AnyBuffsConfig = AnyBuffsConfig_hahaclassic;
      DopsConfig = DopsConfig_hahaclassic;
      WeaponConfig = WeaponsConfig_hahaclassic;
      RaceBuffsConfig = RaceBuffsConfig_hahaclassic;
      break;
  }
  // ----------------------


  const [isDefWeapon, setIsDefWeapon] = React.useState(false);
  const activeWeaponMods = isDefWeapon ? DefWeaponMods : weaponMods;

  const handleServerSelect = (selectedMode) => {
    setMode(selectedMode);
    setIsDefWeapon(selectedMode === "cerberus");
  };
  
  {mode === "" && <ServerSelectorModal onSelect={handleServerSelect} />}

  const [customWeapons, setCustomWeapons] = React.useState(() => {
    const saved = localStorage.getItem("customWeapons");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedId, setSelectedId] = React.useState(null);
  const [selectedWeaponId, setSelectedWeaponId] = React.useState(null);

  const [upgrade, setUpgrade] = React.useState(0);
  const [weaponModIndex, setWeaponModIndex] = React.useState(0);

  const [supportBuff, setSupportBuff] = React.useState(0);
  const [racialBuff, setRacialBuff] = React.useState(0);
  const [antigravBuff, setAntigravBuff] = React.useState(0);
  const [selectedBuffs, setSelectedBuffs] = React.useState([]);
  const [accessoryBonuses, setAccessoryBonuses] = React.useState([0, 0, 0, 0]);
  const [setBonus, setSetBonus] = React.useState(0);

  const [race, setRace] = React.useState("Акретия");
  const [isTypeB, setIsTypeB] = React.useState(false);

  const handleRaceChange = (newRace) => {
    setRace(newRace);
    setSelectedBuffs([]);
  };

  const [armorProperties, setArmorProperties] = React.useState([0, 0, 0, 0, 0]);
  const [archonArmor, setArchonArmor] = React.useState(false);
  const [magicArmor, setMagicArmor] = React.useState([false, false, false, false, false]);

  const [leonGrade, setLeonGrade] = React.useState(null);
  const [leongradeLevel, setLeongradeLevel] = React.useState(0);
  const [selectedLeongrade, setSelectedLeongrade] = React.useState(null);

  const weapons = [...(WeaponConfig.cerb || []), ...customWeapons];
  
  const selectedWeapon = weapons.find(w => w.id === selectedId);

  const weaponType = selectedWeapon?.type || 1;

  const buffsForSelection = RaceBuffsConfig.classBuffsByRace?.[race]?.[weaponType] || [];

  const [activeDoping, setActiveDoping] = React.useState(0);

  const isMagicWeapon = weaponType === 3;

  const getAllowedRaces = (type) => {
    if (type === 3) return ["Беллато", "Кора"];
    if (type === 4) return ["Акретия"];
    if (type === 5) return ["Акретия"];
    return ["Акретия", "Беллато", "Кора"];
  };
  const allowedRaces = getAllowedRaces(weaponType);

  const armorPropsSum = armorProperties.reduce((a, b) => a + b, 0);

  const archonBonus = archonArmor ? 35 : 0;

  const magicArmorBonus = isMagicWeapon
    ? magicArmor.reduce((sum, checked, i) => sum + (checked ? [6, 8, 8, 6, 6][i] : 0), 0)
    : 0;

  const rarityClass = selectedWeapon ? `rarity-${selectedWeapon.rare}` : "rarity-default";

  const leongradePercent =
    selectedWeapon?.leongrade === 1 && selectedLeongrade
      ? selectedWeapon[`leongrade${selectedLeongrade}`] || 0
      : 0;

  const toggleBuff = (buffName) => {
    setSelectedBuffs(prev =>
      prev.includes(buffName) ? prev.filter(b => b !== buffName) : [...prev, buffName]
    );
  };

  const handleAddWeapon = (weapon) => {
    const updated = [...customWeapons, weapon];
    setCustomWeapons(updated);
    localStorage.setItem("customWeapons", JSON.stringify(updated));
  };

  const [siegeSetBuff, setSiegeSetBuff] = React.useState(0);

  const clearCustomWeapons = () => {
    setCustomWeapons([]);
    localStorage.removeItem("customWeapons");
  };

  const [attackGeneratorCount, setAttackGeneratorCount] = React.useState(0);
  const [generatorBonus, setGeneratorBonus] = React.useState(0);

  const [damageBoostMultiplier, setDamageBoostMultiplier] = useState(1);
  const damageSuffix = damageBoostMultiplier === 1.025 ? "+" : damageBoostMultiplier === 1.05 ? "++" : "";

  React.useEffect(() => {
    setGeneratorBonus(attackGeneratorCount);
  }, [attackGeneratorCount]);

  React.useEffect(() => {
    // При смене режима или ключевых параметров сбрасываем селекторы в дефолт
    setSiegeSetBuff(0);
    setSupportBuff(0);
    setAntigravBuff(0);
    setRacialBuff(0);
    setActiveDoping(0);
    setAttackGeneratorCount(0);
    setSelectedBuffs([]);
  }, [mode, race, weaponType]);
  
  React.useEffect(() => {
    if (!selectedWeapon) return;

    const type = selectedWeapon.type;

    if (type === 3 && (race === "Акретия")) {
      setRace("Беллато");
      setSelectedBuffs([]);
    } else if (type === 4 && (race === "Беллато" || race === "Кора")) {
      setRace("Акретия");
      setSelectedBuffs([]);
    }
  }, [selectedWeapon]);





  //  ОТРИСОВКА ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




// ОТРИСОВКА СНОВА БЛ ----------------------------------------------------------

if (!mode) {
  return <ServerSelectorModal onSelect={handleServerSelect} />;
}

  return (
    <div className="app-container">
      <div className="grid-2x2">
        <div className="top-left">
      
          {}
          <div>
        
      </div>
      <WeaponSelector 
  weapons={weapons}
  onSelect={setSelectedId} 
  selectedWeaponId={selectedId} 
  WeaponConfig={WeaponConfig}
/>


      <div className="vertical-list">
  <label>Заточка оружия: </label>
    <select
      value={weaponModIndex}
      onChange={e => setWeaponModIndex(parseInt(e.target.value))}
    >
      {activeWeaponMods.map((_, i) => (
        <option key={i} value={i}>
          +{i}
        </option>
      ))}
    </select>

  <LeongradeSelector
  weapon={selectedWeapon}
  onChange={setSelectedLeongrade}
/>

</div>


        </div>
            
        <div className="top-right">
          {}
          
          <div className="weapon-details" style={{ position: 'relative', paddingRight: '80px', marginTop: '30px' }}>
            
  {}
  <div
    className="weapon-icon"
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '64px',
      height: '64px',
    }}
  >
    <SpriteIcon index={selectedWeapon?.iconIndex || 0} />
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundImage: `url(${frameImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        zIndex: 10,
      }}
    />
  </div>

  {}
  <div className="weapon-text">
    <div
  className="weapon-title"
  style={{
    minHeight: "3.4em", 
  }}
>
  <strong className={rarityClass}>
  [{(selectedWeapon?.name || "Выберите оружие") + damageSuffix}]
</strong>
</div>

    {selectedWeapon && (
  <div className="weapon-stats-list">
    <div>
      <span className="stat-label">Необходимый уровень:</span> {selectedWeapon.level ?? "—"}
    </div>
    <div>
  <span className="stat-label">Атака:</span>{" "}
  {isTypeB ? (
    <>
      {selectedWeapon.imin ?? "?"} - {selectedWeapon.imax ?? "?"}
    </>
  ) : (
    <>
      <span style={activeWeaponMods[weaponModIndex] > 0 ? { color: "#0AFF17" } : undefined}>
        {selectedWeapon.min != null
          ? Math.round(
              selectedWeapon.min *
              (1 + activeWeaponMods[weaponModIndex] / 100) *
              damageBoostMultiplier  // <-- добавляем сюда
            )
          : "?"}
        {" - "}
        {selectedWeapon.max != null
          ? Math.round(
              selectedWeapon.max *
              (1 + activeWeaponMods[weaponModIndex] / 100) *
              damageBoostMultiplier  // <-- и сюда
            )
          : "?"}
      </span>
    </>
  )}
</div>
    <div>
      <span className="stat-label">Силовая атака:</span>{" "}
      {(selectedWeapon.fmin != null && selectedWeapon.fmax != null) ? (
        <>
          <span style={activeWeaponMods[weaponModIndex] > 0 ? { color: "#0AFF17" } : undefined}>
            {Math.round(selectedWeapon.fmin * (1 + activeWeaponMods[weaponModIndex] / 100))} - {Math.round(selectedWeapon.fmax * (1 + activeWeaponMods[weaponModIndex] / 100))}
          </span>
        </>
      ) : (
        "—"
      )}
    </div>
    <div>
      <span className="stat-label">Собственный эффект:</span>{" "}
      {selectedWeapon.eff != null ? `+${selectedWeapon.eff}%` : "—"}
    </div>
    <div className="stat-line">
      <span className="stat-label">Улучшение: </span>
      <img
        src={gradeImages[weaponModIndex]}
        width={105}
        height={24}
        alt={`+${weaponModIndex}`}
        style={{ verticalAlign: "middle" }}
      />
    </div>
  </div>
)}


<DamageCalculator
        weapon={selectedWeapon}
        accessoryBonuses={accessoryBonuses}
        setBonus={setBonus}
        buffs={buffsForSelection.filter(b => selectedBuffs.includes(b.name))}
        weaponModPercent={activeWeaponMods[weaponModIndex]}
        supportBuff={supportBuff}
        racialBuff={racialBuff}
        antigravBuff={antigravBuff}
        armorPropsBonus={armorPropsSum}
        archonBonus={archonBonus}
        magicArmorBonus={magicArmorBonus}
        upgrade={weaponModIndex}
        leongradeBonus={leongradePercent}
        siegeSetBonus={siegeSetBuff}
        dopingBonus={activeDoping}
        generatorBonus={generatorBonus}
        damageBoostMultiplier={damageBoostMultiplier} 
        mode={mode}
      />

  </div>
</div>
        </div>

        <div className="bottom-left">
          {}
          <h2>Раса/Баффы/Дебаффы/Допы</h2>
          <div>
          <BuffSelector
            race={race}
            setRace={setRace}
            allowedRaces={allowedRaces}
            weaponType={weaponType}
            selectedBuffs={selectedBuffs}
            toggleBuff={toggleBuff}
            supportBuff={supportBuff}
            setSupportBuff={setSupportBuff}
            racialBuff={racialBuff}
            setRacialBuff={setRacialBuff}
            setAntigravBuff={setAntigravBuff}
            siegeSetBuff={siegeSetBuff}
            setSiegeSetBuff={setSiegeSetBuff}
            activeDoping={activeDoping}
            setActiveDoping={setActiveDoping}
            attackGeneratorCount={attackGeneratorCount}
            setAttackGeneratorCount={setAttackGeneratorCount}  
            AnyBuffsConfig={AnyBuffsConfig}
            DopsConfig={DopsConfig}
            RaceBuffsConfig={RaceBuffsConfig}
            mode={mode}
          />
          {mode === "reuleaux" && (
  <div style={{ marginBottom: '16px' }}>
  <label>Качество оружия: </label><br />
  <label>
    <input
      type="radio"
      name="damageBoost"
      checked={damageBoostMultiplier === 1}
      onChange={() => setDamageBoostMultiplier(1)}
    />
    (+0% к базе)
  </label>
  {' '}
  <label>
    <input
      type="radio"
      name="damageBoost"
      checked={damageBoostMultiplier === 1.025}
      onChange={() => setDamageBoostMultiplier(1.025)}
    />
    (+2.5% к базе)
  </label>
  {' '}
  <label>
    <input
      type="radio"
      name="damageBoost"
      checked={damageBoostMultiplier === 1.05}
      onChange={() => setDamageBoostMultiplier(1.05)}
    />
    (+5% к базе)
  </label>
</div>
)}
    </div>



        </div>

        <div className="bottom-right">
          {}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
  
  <AccessorySelector 
    bonuses={accessoryBonuses} 
    onChange={setAccessoryBonuses}
    setBonus={setSetBonus}
    onSetBonusChange={setSetBonus}
  />

<ArmorSelector
        armorProperties={armorProperties}
        setArmorProperties={setArmorProperties}
        archonArmor={archonArmor}
        setArchonArmor={setArchonArmor}
        magicArmor={magicArmor}
        setMagicArmor={setMagicArmor}
        isMagicWeapon={isMagicWeapon}
        armorData={armorData}
      />
</div>

        </div>
      </div>
      <div className="extra-section">
      <div className="bottom-left">
      <div style={{ 
  backgroundColor: '#34495e', 
  padding: '12px 16px',  
  margin: '16px 0'
}}>
  <label>
  Выбор, для какого сервера расчёт (баффы, талики и т.д.):{' '}   
  <select
  value={mode}
  onChange={(e) => {
    const selectedMode = e.target.value;
    setMode(selectedMode);

    // Включаем дефолтное оружие только для cerberus
    setIsDefWeapon(selectedMode === "cerberus");

    // Сброс уровня заточки на +0 (или по-другому, если нужно)
    setWeaponModIndex(0);
  }}
>
  <option value="cerberus">Cerberus Games</option>
  <option value="standard">Стандарт</option>
  <option value="reuleaux">Reuleaux</option>
</select>
</label>
      
    </div>
      </div>
        </div>
      <div className="extra-section">
    {}
    <div className="bottom-left">
          {}
          <h2>Добавление кастомного оружия + Справка/Настройки</h2>
          <div>
          <div>

      <WeaponEditor onAdd={handleAddWeapon} race="Акретия" />
    </div>
    <button
  onClick={clearCustomWeapons}
  className="clear-button"
>
  Очистить добавленное кастомное оружие (необратимо)
</button>
    </div>
    
    <div>
      
    <h2>Справка и доп.настройки</h2>
    <p>Редкость (rare) оружия - его класс. 0 - инта, 1 - кримс, 2 - леон, 3 - пвп, 4 - нуборел, 5 - рел</p>
    <p>fmin и fmax - Атака Силой, минимум и максимум соответственно.</p>
    <p>От слота зависят доступные баффы и прочее.</p>
    




    </div>

    <h2>Оружие ({weapons.length})</h2>
<details>
  <summary>Показать список оружия</summary>
  <ul>
    {weapons.map(w => (
      <li key={w.id}>
        {w.name} (урон: {w.min}-{w.max}, тип: {w.type})
      </li>
    ))}
  </ul>
</details>
<h4>Создано специально для коммьюнити RFOnline. © Zekkinq (Чикибамбони).</h4>
<h4>Первоисточник на форуме Cerberus Games.</h4>

        </div>


  </div>
    </div>
  );






// (с) Чикибамбони, 2025, бета версия

}

export default App;