export default function DamageCalculator({
  weapon,
  accessoryBonuses,
  setBonus,
  buffs,
  weaponModPercent = 0,
  supportBuff = 0,
  racialBuff = 0,
  armorPropsBonus = 0,
  archonBonus = 0,
  magicArmorBonus = 0,
  leongradeBonus = 0,
  siegeSetBonus = 0,
  dopingBonus = 0,
  generatorBonus = 0,
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
    armorPropsBonus +
    archonBonus +
    magicArmorBonus +
    leongradeBonus +
    siegeSetBonus +
    dopingBonus +   
    generatorBonus;  

  const minDamage = Math.round(baseMin * (1 + totalBonusPercent / 100));
  const maxDamage = Math.round(baseMax * (1 + totalBonusPercent / 100));
  const fminDamage = Math.round(fbaseMin * (1 + totalBonusPercent / 100));
  const fmaxDamage = Math.round(fbaseMax * (1 + totalBonusPercent / 100));


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
        <p style={{ marginTop: '8px' }}>
          Аксессуары <span style={greenIfNotZero(accessorySum)}>{accessorySum}%</span>, 
          сет <span style={greenIfNotZero(setBonusValue)}>{setBonusValue}%</span>, 
          баффы <span style={greenIfNotZero(buffsSum)}>{buffsSum}%</span><br />
  
          Заточка <span style={greenIfNotZero(weaponModPercent)}>{weaponModPercent}%</span>, 
          поддержка <span style={greenIfNotZero(supportBuff)}>{supportBuff}%</span>, 
          расовый <span style={greenIfNotZero(racialBuff)}>{racialBuff}%</span><br />
  
          Свойства брони <span style={greenIfNotZero(armorPropsBonus)}>{armorPropsBonus}%</span>, 
          архонта <span style={greenIfNotZero(archonBonus)}>{archonBonus}%</span>, 
          маг.броня <span style={greenIfNotZero(magicArmorBonus)}>{magicArmorBonus}%</span><br />
  
          Леонгрейд <span style={greenIfNotZero(leongradeBonus)}>{leongradeBonus}%</span>, 
          Осадный набор <span style={greenIfNotZero(siegeSetBonus)}>{siegeSetBonus}%</span><br />
  
          Допинг <span style={greenIfNotZero(dopingBonus)}>{dopingBonus}%</span>, 
          Генератор <span style={greenIfNotZero(generatorBonus)}>{generatorBonus}%</span>
        </p>
      </details>
    </div>
  );
  
  
}

