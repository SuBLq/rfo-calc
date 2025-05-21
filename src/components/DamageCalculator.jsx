export default function DamageCalculator({
  weapon,
  accessoryBonuses,
  setBonus,
  buffs,
  weaponModPercent = 0,
  supportBuff = 0,
  racialBuff = 0,
  antigravBuff = 0,
  armorPropsBonus = 0,
  archonBonus = 0,
  magicArmorBonus = 0,
  leongradeBonus = 0,
  siegeSetBonus = 0,
  dopingBonus = 0,
  generatorBonus = 0,
  damageBoostMultiplier = 1,
  mode,
}) {
  if (!weapon) return <div>Выберите оружие</div>;

  const greenIfNotZero = (value) => ({
    color: value !== 0 ? "limegreen" : "inherit"
  });

  const baseMin = weapon.min;
  const baseMax = weapon.max;
  const fbaseMin = weapon.fmin;
  const fbaseMax = weapon.fmax;
  
  const accessorySum = accessoryBonuses.reduce((a, b) => a + b, 0);
  const setBonusValue = setBonus || 0;
  const buffsSum = buffs ? buffs.reduce((sum, b) => sum + b.percent, 0) : 0;

  const totalBonusPercent =
    accessorySum +
    setBonusValue +
    buffsSum +
    weaponModPercent +
    supportBuff +
    racialBuff +
    antigravBuff +
    armorPropsBonus +
    archonBonus +
    magicArmorBonus +
    leongradeBonus +
    siegeSetBonus +
    dopingBonus +   
    generatorBonus +
    (weapon.eff || 0);

  const minDamage = Math.round(baseMin * (1 + totalBonusPercent / 100) * damageBoostMultiplier);
  const maxDamage = Math.round(baseMax * (1 + totalBonusPercent / 100) * damageBoostMultiplier);
  const fminDamage = Math.round(fbaseMin * (1 + totalBonusPercent / 100) * damageBoostMultiplier);
  const fmaxDamage = Math.round(fbaseMax * (1 + totalBonusPercent / 100) * damageBoostMultiplier);


  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h2 style={{ margin: 0 }}>Атака:</h2>
        <p style={{
          fontSize: '24px',
          color: '#ffcc00',
          fontWeight: 'bold',
          textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
          margin: 0
        }}>
          {minDamage} - {maxDamage}
        </p>
      </div>
  
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
        <h2 style={{ margin: 0 }}>Атака Силой:</h2>
        <p style={{
          fontSize: '24px',
          color: '#ffcc00',
          fontWeight: 'bold',
          textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
          margin: 0
        }}>
          {fminDamage} - {fmaxDamage}
        </p>
      </div>
  
      <details style={{ marginTop: '24px' }}>
  <summary style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
    Детали
  </summary>
  <div style={{ marginTop: '8px' }}>
    <div>
      Аксессуары <span style={greenIfNotZero(accessorySum)}>{accessorySum}%</span>
    </div>
    <div>
      Собственный эффект <span style={greenIfNotZero(weapon.eff)}>{weapon.eff}%</span>
    </div>
    <div>
      Баффы <span style={greenIfNotZero(buffsSum)}>{buffsSum}%</span>
    </div>

    <div>
      Заточка <span style={greenIfNotZero(weaponModPercent)}>{weaponModPercent}%</span>
    </div>
    <div>
      Поддержка <span style={greenIfNotZero(supportBuff)}>{supportBuff}%</span>
    </div>
    <div>
      Расовый <span style={greenIfNotZero(racialBuff)}>{racialBuff}%</span>
    </div>

    <div>
      Свойства брони <span style={greenIfNotZero(armorPropsBonus)}>{armorPropsBonus}%</span>
    </div>
    <div>
      Архонта <span style={greenIfNotZero(archonBonus)}>{archonBonus}%</span>
    </div>
    <div>
      Маг.броня <span style={greenIfNotZero(magicArmorBonus)}>{magicArmorBonus}%</span>
    </div>

    <div>
      Леонгрейд <span style={greenIfNotZero(leongradeBonus)}>{leongradeBonus}%</span>
    </div>
    <div>
      Осадный набор <span style={greenIfNotZero(siegeSetBonus)}>{siegeSetBonus}%</span>
    </div>

    <div>
      Допинг <span style={greenIfNotZero(dopingBonus)}>{dopingBonus}%</span>
    </div>
    <div>
      Генератор <span style={greenIfNotZero(generatorBonus)}>{generatorBonus}%</span>
    </div>
    <div>
    {mode === "reuleaux" && (
  <div style={{ marginTop: '0px' }}>
    Антиграв <span style={greenIfNotZero(antigravBuff)}>{antigravBuff}%</span>
  </div>
)}
    </div>
  </div>
</details>
    </div>
  );
  
  
}

