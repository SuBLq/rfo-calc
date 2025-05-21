import React, { useState, useEffect } from 'react';
import SpriteIcon from './SpriteIcon';

const WeaponSelector = ({ weapons, onSelect, selectedWeaponId }) => {
  const [selectedSlot, setSelectedSlot] = useState(-1);
  const [selectedRare, setSelectedRare] = useState(-1); // -1 означает "все редкости"

  const slotLabels = {
    "-1": "Все типы",
    10: 'Одноручное оружие',
    11: 'Двуручный меч',
    12: 'Топор',
    13: 'Булава',
    14: 'Копьё',
    15: 'Лук',
    16: 'Пулемёт',
    17: 'Металка',
    18: 'ПУ',
    19: 'Посох',
    20: 'Гранатомёт',
  };

  const rareLabels = {
    "-1": "Все",
    0: "Инта",
    1: "Кримса",
    2: "Леон",
    3: "ПВП",
    4: "Нуборел",
    5: "Реликт",
  };

  const slotOptions = [-1, ...Array.from(new Set(weapons.map(w => w.slot))).sort((a, b) => a - b)];

  
  const filteredWeapons = weapons.filter(w => {
    const matchesSlot = selectedSlot === -1 || w.slot === selectedSlot;
    const matchesRare = selectedRare === -1 || Number(w.rare) === selectedRare;
    return matchesSlot && matchesRare;
  });

 
  const groupedByRare = filteredWeapons.reduce((groups, weapon) => {
    const rareKey = weapon.rare ?? -1; 
    if (!groups[rareKey]) groups[rareKey] = [];
    groups[rareKey].push(weapon);
    return groups;
  }, {});


  const sortedRareKeys = Object.keys(groupedByRare)
    .map(key => Number(key))
    .sort((a, b) => a - b);

    useEffect(() => {
      if (!selectedWeaponId && weapons.length > 0) {
        onSelect(weapons[0].id);
      }
    }, [selectedWeaponId, weapons, onSelect]);

  useEffect(() => {
    if (!selectedWeaponId) return;
    const selected = weapons.find(w => w.id === selectedWeaponId);
    if (selected && selectedSlot !== -1) {
      setSelectedSlot(selected.slot);
    }
  }, [selectedWeaponId, weapons]);

  return (
    <div className="weapon-selector">
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label htmlFor="weapon-slot">Тип:</label>
        <select
          id="weapon-slot"
          value={selectedSlot}
          onChange={e => setSelectedSlot(Number(e.target.value))}
        >
          {slotOptions.map(slot => (
            <option key={slot} value={slot}>
              {slotLabels[slot] || `Тип ${slot}`}
            </option>
          ))}
        </select>

        <label htmlFor="weapon-rare">Редкость:</label>
        <select
          id="weapon-rare"
          value={selectedRare}
          onChange={e => setSelectedRare(Number(e.target.value))}
        >
          {Object.entries(rareLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="weapon-list">
        {filteredWeapons.length === 0 && <p>Нет оружия для выбранного фильтра.</p>}

        {sortedRareKeys.map(rareKey => {
          const weaponsInGroup = groupedByRare[rareKey].sort((a, b) => a.level - b.level);

          
          if (selectedRare !== -1 && Number(rareKey) !== selectedRare) return null;

          return (
            <div key={rareKey} className="weapon-group">
              <h4 style={{ paddingLeft: '10px' }}>
  {rareLabels[rareKey] || `Редкость ${rareKey}`}
</h4>
              {weaponsInGroup.map(w => (
                <div
                  key={w.id}
                  className={`weapon-entry ${selectedWeaponId === w.id ? 'selected' : ''}`}
                  onClick={() => onSelect(w.id)}
                >
                  <span className={`weapon-name rarity-${w.rare}`}>
                    [{w.level}] {w.name}
                  </span>
                  <SpriteIcon index={w.iconIndex} size={32} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeaponSelector;





