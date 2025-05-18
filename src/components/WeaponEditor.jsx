import React, { useState } from "react";
import SpritePicker from "./SpritePicker";
import SpriteIcon from "./SpriteIcon";

export default function WeaponEditor({ onAdd }) {
  const [name, setName] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [fmin, setFmin] = useState("");
  const [fmax, setFmax] = useState("");
  const [rare, setRare] = useState("");
  const [iconIndex, setIconIndex] = useState(0);

  const [slot, setSlot] = useState("");
  const [level, setLevel] = useState("");
  const [eff, setEff] = useState("");
  const [leongrade, setLeongrade] = useState("");
  const [leongrade1, setLeongrade1] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // Словарь: слот -> тип оружия (type)
  const slotToType = {
    10: 1, // Одноручное оружие — ближний бой
    11: 1, // Двуручный меч — ближний бой
    12: 1, // Топор — ближний бой (пример)
    13: 1, // Булава — ближний бой
    14: 1, // Копьё — ближний бой
    15: 2, // Лук — дальний бой
    16: 2, // Пулемёт — дальний бой
    17: 2, // Металка — дальний бой
    18: 4, // ПУ (пусковая установка)
    19: 3, // Посох — магия
    20: 5, // Гранатомёт — Ничего
  };

  // Список слотов с подписями
  const slotLabels = {
    10: "Одноручный меч",
    11: "Двуручный меч",
    12: "Булава",
    13: "Топор",
    14: "Копьё",
    15: "Лук",
    16: "Пулемёт",
    17: "Металка",
    18: "ПУ",
    19: "Посох",
    20: "Гранатомёт",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!slot || !level || !name) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    if (parseInt(leongrade) === 1 && leongrade1 === "") {
      alert("Укажите % атаки Леона");
      return;
    }

    const weaponType = slotToType[parseInt(slot)];
    if (!weaponType) {
      alert("Выбран некорректный слот оружия.");
      return;
    }

    const weapon = {
      id: name.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now(),
      name,
      type: weaponType,
      slot: parseInt(slot),
      level,
      min: parseInt(min) || 0,
      max: parseInt(max) || 0,
      eff: eff !== "" ? parseInt(eff) : 0,
      leongrade: leongrade !== "" ? parseInt(leongrade) : 0,
      iconIndex: parseInt(iconIndex),
      rare: rare !== "" ? rare : "0",
    };

    if (weapon.leongrade === 1 && leongrade1 === "") {
      alert("Укажите % атаки Леона");
      return;
    }

    if (weapon.leongrade === 1) {
      weapon.leongrade1 = parseInt(leongrade1);
    }

    if (fmin !== "") weapon.fmin = parseInt(fmin);
    if (fmax !== "") weapon.fmax = parseInt(fmax);

    onAdd(weapon);

    // очистка формы
    setName("");
    setMin("");
    setMax("");
    setFmin("");
    setFmax("");
    setRare("");
    setIconIndex(0);
    setSlot("");
    setLevel("");
    setEff("");
    setLeongrade("");
    setLeongrade1("");
    setShowPicker(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border mt-2 space-y-2">
      <h4>Добавить своё оружие:</h4>

      <input
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Мин. урон"
        type="number"
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <input
        placeholder="Макс. урон"
        type="number"
        value={max}
        onChange={(e) => setMax(e.target.value)}
      />

      {/* Селектор слота вместо свободного ввода */}
      <select
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
        required
      >
        <option value="">-- выбрать слот оружия --</option>
        {Object.entries(slotLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <input
        placeholder="Уровень"
        type="number"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        required
      />
      <input
        placeholder="Эффект"
        type="number"
        value={eff}
        onChange={(e) => setEff(e.target.value)}
      />

      <input
        placeholder="Леон-грейд (0 или 1)"
        type="number"
        value={leongrade}
        onChange={(e) => setLeongrade(e.target.value)}
      />

      {parseInt(leongrade) === 1 && (
        <input
          placeholder="% атаки Леона"
          type="number"
          value={leongrade1}
          onChange={(e) => setLeongrade1(e.target.value)}
          required
        />
      )}
      

      <input
        placeholder="fmin"
        type="number"
        value={fmin}
        onChange={(e) => setFmin(e.target.value)}
      />
      <input
        placeholder="fmax"
        type="number"
        value={fmax}
        onChange={(e) => setFmax(e.target.value)}
      />
      <input
        placeholder="Редкость (rare)"
        value={rare}
        onChange={(e) => setRare(e.target.value)}
      />

      <div
        style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0" }}
      >
        <button type="button" onClick={() => setShowPicker(!showPicker)}>
          Выбрать иконку
        </button>
        <span>№ {iconIndex}</span>
        <SpriteIcon index={iconIndex} />
      </div>

      {showPicker && (
        <SpritePicker
          onSelect={(index) => {
            setIconIndex(index);
            setShowPicker(false);
          }}
        />
      )}

      <button type="submit">Добавить</button>
    </form>
  );
}





