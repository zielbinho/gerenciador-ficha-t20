import React from 'react';
import { type CharacterSheet, type Attack, type ArmorOrShield, AttackSkill, CalculatedAttack, CalculatedSkills, AttributeName } from '../types';
import { DAMAGE_TYPES } from '../constants';
import Section from './Section';

interface CombatProps {
  data: CharacterSheet;
  calculatedAttacks: CalculatedAttack[];
  calculatedSkills: CalculatedSkills;
  onUpdate: (field: string, value: any) => void;
  onRoll: (title: string, diceString: string) => void;
  defenseTotal: number;
  totalArmorPenalty: number;
}

const ATTRIBUTE_OPTIONS: { value: AttributeName | 'none', label: string }[] = [
    { value: 'none', label: 'Nenhum' },
    { value: 'for', label: 'Força' },
    { value: 'des', label: 'Destreza' },
    { value: 'con', label: 'Constituição' },
    { value: 'int', label: 'Inteligência' },
    { value: 'sab', label: 'Sabedoria' },
    { value: 'car', label: 'Carisma' },
];

const Combat: React.FC<CombatProps> = ({ data, calculatedAttacks, calculatedSkills, onUpdate, onRoll, defenseTotal, totalArmorPenalty }) => {
  const dexModifier = data.attributes.des.modifier;
  const totalArmorDefense = (data.defense.armor?.defense || 0) + (data.defense.shield?.defense || 0);

  const handleAttackChange = (id: string, field: keyof Attack, value: string | number | boolean) => {
    const newAttacks = data.attacks.map(attack =>
      attack.id === id ? { ...attack, [field]: value } : attack
    );
    onUpdate('attacks', newAttacks);
  };

  const addAttack = () => {
    const newAttack: Attack = { 
        id: Date.now().toString(),
        name: 'Novo Ataque',
        skillUsed: 'luta',
        others: 0,
        damageDice: '1d6',
        damageAttribute: 'for',
        critRange: 20,
        critMultiplier: 2,
        damageType: 'Corte',
        range: 'Corpo a corpo'
    };
    onUpdate('attacks', [...data.attacks, newAttack]);
  };
  
  const removeAttack = (id: string) => {
    onUpdate('attacks', data.attacks.filter(attack => attack.id !== id));
  };
  
  const handleEquipmentChange = (type: 'armor' | 'shield', field: keyof ArmorOrShield, value: string | number) => {
    const path = `defense.${type}.${field}`;
    const finalValue = typeof value === 'string' && field !== 'name' ? parseInt(value) || 0 : value;
    onUpdate(path, finalValue);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Section title="Defesa">
        <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-100 dark:bg-slate-900 p-4 rounded-lg">
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-full h-full text-slate-300 dark:text-slate-800">
                    <path d="M12 2.1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5L12 2.1z" />
                </svg>
                <span className="relative text-5xl font-bold text-red-600 dark:text-red-400">{defenseTotal}</span>
            </div>
            <div className="text-2xl">=</div>
            <div>10</div>
            <div className="text-2xl">+</div>
            <div className="flex flex-col items-center">
                <span>{dexModifier}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">DES</span>
            </div>
            <div className="text-2xl">+</div>
            <div className="flex flex-col items-center">
                <span>{totalArmorDefense}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Equip.</span>
            </div>
            <div className="text-2xl">+</div>
             <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={data.defense.others}
                  onChange={(e) => onUpdate('defense.others', parseInt(e.target.value) || 0)}
                  className="w-12 text-center bg-transparent border-b border-slate-400 dark:border-slate-600 focus:outline-none focus:border-red-500"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">Outros</span>
            </div>
        </div>
         <div className="text-right mt-2 text-sm text-slate-500 dark:text-slate-400">Penalidade de Armadura: <span className="font-bold text-slate-800 dark:text-white">{totalArmorPenalty}</span></div>
      </Section>
      
      <Section title="Equipamentos de Defesa">
        <div className="space-y-4">
            <div>
                <h4 className="text-md font-semibold text-slate-600 dark:text-slate-300 mb-2">Armadura</h4>
                <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-8">
                        <label htmlFor="armor_name" className="text-xs text-slate-500 dark:text-slate-400">Nome</label>
                        <input id="armor_name" value={data.defense.armor.name} onChange={e => handleEquipmentChange('armor', 'name', e.target.value)} className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="armor_def" className="text-xs text-slate-500 dark:text-slate-400 block text-center">Def</label>
                        <input id="armor_def" type="number" value={data.defense.armor.defense} onChange={e => handleEquipmentChange('armor', 'defense', e.target.value)} className="w-full text-center bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="armor_pen" className="text-xs text-slate-500 dark:text-slate-400 block text-center">Pen</label>
                        <input id="armor_pen" type="number" value={data.defense.armor.penalty} onChange={e => handleEquipmentChange('armor', 'penalty', e.target.value)} className="w-full text-center bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="text-md font-semibold text-slate-600 dark:text-slate-300 mb-2">Escudo</h4>
                <div className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-8">
                        <label htmlFor="shield_name" className="text-xs text-slate-500 dark:text-slate-400">Nome</label>
                        <input id="shield_name" value={data.defense.shield.name} onChange={e => handleEquipmentChange('shield', 'name', e.target.value)} className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="shield_def" className="text-xs text-slate-500 dark:text-slate-400 block text-center">Def</label>
                        <input id="shield_def" type="number" value={data.defense.shield.defense} onChange={e => handleEquipmentChange('shield', 'defense', e.target.value)} className="w-full text-center bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="shield_pen" className="text-xs text-slate-500 dark:text-slate-400 block text-center">Pen</label>
                        <input id="shield_pen" type="number" value={data.defense.shield.penalty} onChange={e => handleEquipmentChange('shield', 'penalty', e.target.value)} className="w-full text-center bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                    </div>
                </div>
            </div>
        </div>
      </Section>

      <div className="lg:col-span-2">
        <Section title="Ataques">
            <div className="space-y-4">
                {calculatedAttacks.map(attack => (
                    <div key={attack.id} className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border border-slate-300 dark:border-slate-700 relative transition-all">
                        <button 
                            onClick={() => removeAttack(attack.id)} 
                            className="absolute top-2 right-2 text-red-600 hover:text-red-400 transition-colors"
                            aria-label={`Remover ataque ${attack.name || 'sem nome'}`}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-3 gap-y-3">
                            <div className="sm:col-span-2 lg:col-span-12">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Ataque</label>
                                <input type="text" value={attack.name} onChange={e => handleAttackChange(attack.id, 'name', e.target.value)} placeholder="Ex: Espada Longa" className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"/>
                            </div>

                            <div className="lg:col-span-3">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Perícia Base</label>
                                <select value={attack.skillUsed} onChange={e => handleAttackChange(attack.id, 'skillUsed', e.target.value as AttackSkill)} className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500">
                                    <option value="luta">Luta ({calculatedSkills.luta?.total > 0 ? '+' : ''}{calculatedSkills.luta?.total})</option>
                                    <option value="pontaria">Pontaria ({calculatedSkills.pontaria?.total > 0 ? '+' : ''}{calculatedSkills.pontaria?.total})</option>
                                </select>
                            </div>
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Outros</label>
                                <input type="number" value={attack.others} onChange={e => handleAttackChange(attack.id, 'others', parseInt(e.target.value) || 0)} placeholder="0" className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"/>
                            </div>

                            <div className="lg:col-span-7 flex items-end">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow text-center text-2xl font-bold bg-slate-200 dark:bg-slate-800/50 border border-r-0 border-slate-400 dark:border-slate-600 rounded-l-md py-1">
                                        {attack.testBonus >= 0 ? `+${attack.testBonus}` : attack.testBonus}
                                    </div>
                                    <button onClick={() => onRoll(`${attack.name || 'Ataque'} - Teste`, `1d20${attack.testBonus >= 0 ? '+' : ''}${attack.testBonus}`)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-md text-lg"><i className="fas fa-dice-d20"></i></button>
                                </div>
                            </div>

                            <div className="lg:col-span-3">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Dados de Dano</label>
                                <input type="text" value={attack.damageDice} onChange={e => handleAttackChange(attack.id, 'damageDice', e.target.value)} placeholder="1d8" className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"/>
                            </div>
                            <div className="lg:col-span-3">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Atributo no Dano</label>
                                <select value={attack.damageAttribute} onChange={e => handleAttackChange(attack.id, 'damageAttribute', e.target.value)} className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500">
                                    {ATTRIBUTE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                            <div className="lg:col-span-6 flex items-end">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow text-center text-md font-bold bg-slate-200 dark:bg-slate-800/50 border border-r-0 border-slate-400 dark:border-slate-600 rounded-l-md py-1 px-2 truncate">
                                        {attack.damageRoll}
                                    </div>
                                    <button onClick={() => onRoll(`${attack.name || 'Ataque'} - Dano`, attack.damageRoll)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-[5px] rounded-r"><i className="fas fa-dice-d20"></i></button>
                                </div>
                            </div>

                             <div className="lg:col-span-4">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Crítico</label>
                                <div className="flex items-center gap-1">
                                    <input type="number" value={attack.critRange} onChange={e => handleAttackChange(attack.id, 'critRange', parseInt(e.target.value) || 20)} className="w-1/2 bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                                    <span className="text-slate-500">/ x</span>
                                    <input type="number" value={attack.critMultiplier} onChange={e => handleAttackChange(attack.id, 'critMultiplier', parseInt(e.target.value) || 2)} className="w-1/2 bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1"/>
                                </div>
                            </div>
                            <div className="lg:col-span-4">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Tipo de Dano</label>
                                <select value={attack.damageType} onChange={e => handleAttackChange(attack.id, 'damageType', e.target.value)} className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500">
                                    {DAMAGE_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div className="lg:col-span-4">
                                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Alcance</label>
                                <input type="text" value={attack.range} onChange={e => handleAttackChange(attack.id, 'range', e.target.value)} placeholder="Curto" className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={addAttack} className="mt-4 text-sm bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 transition-colors w-full">+ Adicionar Ataque</button>
        </Section>
      </div>
    </div>
  );
};

export default Combat;