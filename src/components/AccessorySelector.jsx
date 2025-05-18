import React, { useState } from "react";

const percentageOptions = [3, 5, 7, 10, 12, 15, 20, 25, 30, 35, 40];

const inputSelectStyle = {
  width: "160px",
  minWidth: "160px",
  padding: "4px 8px",
  fontSize: "14px",
  boxSizing: "border-box",
  marginTop: "4px",
  marginBottom: "8px",
  display: "inline-block",
};

export default function AccessorySelector({ bonuses, onChange }) {
  const [manual, setManual] = useState(false);

  const handleChange = (index, value) => {
    const newBonuses = [...bonuses];

    const numeric = parseFloat(value);
    newBonuses[index] = value === "" || isNaN(numeric) ? 0 : numeric;

    onChange(newBonuses);
  };

  return (
    <div className="p-2 border mt-2">
      <h3>Аксессуары:</h3>
      {bonuses.slice(0, 4).map((bonus, idx) => (
        <div key={idx}>
          {manual ? (
            <input
              type="text"
              value={bonus}
              onChange={(e) => handleChange(idx, e.target.value)}
              style={inputSelectStyle}
              placeholder="0"
            />
          ) : (
            <select
              value={bonus}
              onChange={(e) => handleChange(idx, e.target.value)}
              style={inputSelectStyle}
            >
              <option value={0}>--</option>
              {percentageOptions.map((p) => (
                <option key={p} value={p}>
                  {p}%
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      <h4 className="p-2 border mt-4">Сетовый бонус:</h4>
      <div>
        {manual ? (
          <input
            type="text"
            placeholder="Сетовый бонус"
            value={bonuses[4]}
            onChange={(e) => handleChange(4, e.target.value)}
            style={inputSelectStyle}
          />
        ) : (
          <select
            value={bonuses[4]}
            onChange={(e) => handleChange(4, e.target.value)}
            style={inputSelectStyle}
          >
            <option value={0}>--</option>
            {percentageOptions.map((p) => (
              <option key={p} value={p}>
                {p}%
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mt-2">
        <button type="button" onClick={() => setManual(!manual)}>
          {manual ? "Выбрать из списка" : "Ручной ввод"}
        </button>
      </div>
    </div>
  );
}


