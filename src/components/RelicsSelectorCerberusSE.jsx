import React, { useEffect, useMemo, useState } from "react";
import RelicsConfig from "./data/RelicsConfig_cerberus_se.json";

const wrap = {
  border: "1px solid #444",
  padding: "12px",
  marginTop: "12px",
};
const row = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  margin: "4px 0",
  justifyContent: "space-between",
};
const list = { maxHeight: 280, overflowY: "auto", paddingRight: 4 };
const smallBtn = { marginRight: 8 };

export default function RelicsSelectorCerberusSE({ onChange }) {
  // плоский список реликвий из JSON
  const relics = useMemo(() => {
    const src = Array.isArray(RelicsConfig?.relicsOptions)
      ? RelicsConfig.relicsOptions.flat()
      : [];
    // страховка от мусора
    return src
      .filter(r => r && typeof r.name === "string" && typeof r.percent === "number")
      .map((r, i) => ({ id: `${i}-${r.name}`, ...r }));
  }, []);

  const [selected, setSelected] = useState(() => new Set());

  const total = useMemo(() => {
    let sum = 0;
    for (const rel of relics) {
      if (selected.has(rel.id)) sum += rel.percent;
    }
    return sum;
  }, [relics, selected]);

  useEffect(() => {
    if (typeof onChange === "function") onChange(total);
  }, [total, onChange]);

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(relics.map(r => r.id)));
  const clearAll = () => setSelected(new Set());
  const invert = () =>
    setSelected(prev => {
      const next = new Set();
      for (const r of relics) {
        if (!prev.has(r.id)) next.add(r.id);
      }
      return next;
    });

  return (
    <div style={wrap}>
      <h3>Реликвии (Cerberus Stage Era)</h3>

      <div className="controls" style={{ marginBottom: 8 }}>
        <button type="button" onClick={selectAll} style={smallBtn}>Выбрать все</button>
        <button type="button" onClick={clearAll} style={smallBtn}>Очистить</button>
        <button type="button" onClick={invert} style={smallBtn}>Инвертировать</button>
      </div>

      <div style={list}>
        {relics.map((r) => (
          <label key={r.id} style={row}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="checkbox"
                checked={selected.has(r.id)}
                onChange={() => toggle(r.id)}
              />
              {r.name}
            </span>
            <span>{r.percent}%</span>
          </label>
        ))}
      </div>

      <div style={{ marginTop: 10, fontWeight: 600 }}>
        Итого атаки по реликвиям: {total}%
      </div>
    </div>
  );
}