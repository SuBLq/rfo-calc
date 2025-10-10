import React, { useEffect, useMemo, useState } from "react";
import RelicsConfig from "../data/RelicsConfig_cerberus_se.json";

// стили кратко
const wrap = { border: "1px solid #444", padding: 12, marginTop: 12 };
const header = { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 };
const row = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, margin: "4px 0" };
const list = { maxHeight: 260, overflowY: "auto", paddingRight: 4 };
const btn = { marginLeft: 6 };

export default function RelicsSelector({ onChange, title = "Реликвии:" }) {
  // поддержка и старого плоского формата { relicsOptions: [[...]] }
  const byGrade = useMemo(() => {
    if (RelicsConfig?.relicsByGrade) return RelicsConfig.relicsByGrade;

    if (Array.isArray(RelicsConfig?.relicsOptions)) {
      const flat = RelicsConfig.relicsOptions.flat().filter(Boolean);
      return { "all": flat };
    }
    return { "all": [] };
  }, []);

  // плоский список для подсчёта, + индексы
  const flat = useMemo(() => {
    const arr = [];
    Object.entries(byGrade).forEach(([grade, items]) => {
      items.forEach((r, idx) => {
        if (r && typeof r.name === "string" && typeof r.percent === "number") {
          arr.push({ id: `${grade}:${idx}`, grade, ...r });
        }
      });
    });
    return arr;
  }, [byGrade]);

  const [selected, setSelected] = useState(() => new Set());

  const total = useMemo(() => {
    let s = 0;
    for (const r of flat) if (selected.has(r.id)) s += r.percent;
    return s;
  }, [flat, selected]);

  useEffect(() => {
    if (typeof onChange === "function") onChange(total);
  }, [total, onChange]);

  const toggle = (id) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const selectGrade = (grade) => {
    const ids = flat.filter(r => r.grade === grade).map(r => r.id);
    setSelected(prev => new Set([...prev, ...ids]));
  };

  const clearGrade = (grade) => {
    setSelected(prev => {
      const next = new Set(prev);
      for (const r of flat) if (r.grade === grade) next.delete(r.id);
      return next;
    });
  };

  const invertGrade = (grade) => {
    setSelected(prev => {
      const next = new Set(prev);
      for (const r of flat.filter(x => x.grade === grade)) {
        next.has(r.id) ? next.delete(r.id) : next.add(r.id);
      }
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(flat.map(r => r.id)));
  const clearAll = () => setSelected(new Set());

  // порядок грейдов
  const gradeOrder = Object.keys(byGrade).sort((a, b) => {
    const na = Number(a), nb = Number(b);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    if (!Number.isNaN(na)) return -1;
    if (!Number.isNaN(nb)) return 1;
    return a.localeCompare(b);
  });

  return (
    <div style={wrap}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div>
            <button type="button" onClick={selectAll} style={btn}>Выбрать все</button>
            <button type="button" onClick={clearAll} style={btn}>Очистить</button>
        </div>
        </div>

      <div style={list}>
        {gradeOrder.map((g) => {
          const items = byGrade[g] || [];
          if (!items.length) return null;

          const gradeSum = items.reduce((acc, r) => acc + (r?.percent || 0), 0);
          const gradeSelectedSum = items.reduce((acc, r, idx) => {
            const id = `${g}:${idx}`;
            return acc + (selected.has(id) ? (r?.percent || 0) : 0);
          }, 0);

          return (
            <div key={g} style={{ marginBottom: 10 }}>
              <div style={header}>
                <strong>Грейд {g}</strong>
                <div>
                  <small>Выбрано: {gradeSelectedSum}% / {gradeSum}%</small>
                  <button type="button" onClick={() => selectGrade(g)} style={btn}>Все</button>
                  <button type="button" onClick={() => clearGrade(g)} style={btn}>Снять</button>
                </div>
              </div>

              {items.map((r, idx) => {
                const id = `${g}:${idx}`;
                return (
                  <label key={id} style={row}>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <input
                        type="checkbox"
                        checked={selected.has(id)}
                        onChange={() => toggle(id)}
                      />
                      {r.name}
                    </span>
                    <span>{r.percent}%</span>
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 10, fontWeight: 600 }}>
        Итого атаки по реликвиям: {total}%
      </div>
    </div>
  );
}