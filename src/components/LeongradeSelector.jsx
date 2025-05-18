// components/LeongradeSelector.jsx
import React, { useState, useEffect } from 'react';

const LeongradeSelector = ({ weapon, onChange }) => {
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    // Сброс или установка грейда по умолчанию при смене оружия
    if (weapon?.leongrade === 1) {
      setSelectedGrade(3); 
      onChange?.(3);       
    } else {
      setSelectedGrade(null);
      onChange?.(null);
    }
  }, [weapon?.id]);

  const handleChange = (e) => {
    const grade = Number(e.target.value);
    setSelectedGrade(grade);
    onChange?.(grade);
  };

  const isDisabled = !weapon || weapon.leongrade === 0;

  const gradeOptions = weapon?.leongrade === 1 ? [
    { id: 1, value: weapon.leongrade1 },
    { id: 2, value: weapon.leongrade2 },
    { id: 3, value: weapon.leongrade3 },
  ] : [];

  return (
    <div className="leongrade-selector">
      <label>Грейд Леона: </label>
      <select
        disabled={isDisabled}
        value={selectedGrade ?? ''}
        onChange={handleChange}
        className={isDisabled ? 'gray-select' : ''}
      >
        <option value="" disabled>
          {isDisabled ? 'Недоступно' : '-- Выберите грейд --'}
        </option>
        {gradeOptions.map(opt => (
          <option key={opt.id} value={opt.id}>
            Грейд {opt.id} (+{opt.value}%)
          </option>
        ))}
      </select>
    </div>
  );
};

export default LeongradeSelector;
