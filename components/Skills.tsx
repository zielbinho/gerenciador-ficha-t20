import React from 'react';
import { type Skill, type CalculatedSkills, type CalculatedSkill, type AttributeName } from '../types';
import Section from './Section';

interface SkillsProps {
  skills: CalculatedSkills;
  onUpdate: (field: string, value: any) => void;
  onRoll: (title: string, diceString: string) => void;
}

const ATTRIBUTE_OPTIONS: { value: AttributeName, label: string }[] = [
    { value: 'for', label: 'FOR' },
    { value: 'des', label: 'DES' },
    { value: 'con', label: 'CON' },
    { value: 'int', label: 'INT' },
    { value: 'sab', label: 'SAB' },
    { value: 'car', label: 'CAR' },
];

const SkillRow: React.FC<{
  skillKey: string;
  skill: CalculatedSkill;
  onUpdate: (skillKey: string, field: keyof Skill, value: any) => void;
  onDelete?: (skillKey: string) => void;
  onRoll: (title: string, diceString: string) => void;
}> = ({ skillKey, skill, onUpdate, onDelete, onRoll }) => {

  const handleRoll = () => {
    onRoll(
        `Teste de ${skill.name}`,
        `1d20${skill.total >= 0 ? '+' : ''}${skill.total}`
    );
  };

  const breakdownTitle = `Total: ${skill.total}\n` +
      `1/2 Nível: ${skill.breakdown.halfLevel}\n` +
      `Atributo (${skill.attribute.toUpperCase()}): ${skill.breakdown.attribute}\n` +
      `Treino: ${skill.breakdown.training}\n` +
      `Outros: ${skill.breakdown.others}\n` +
      `Pen. Armadura: ${skill.breakdown.armorPenalty}\n` +
      `Efeitos: ${skill.breakdown.effects}`;

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center text-sm py-1.5 border-b border-slate-300 dark:border-slate-700 last:border-b-0 px-2 gap-x-2 gap-y-2">
      <div className="flex-shrink-0">
        <input 
          type="checkbox" 
          checked={skill.isTrained} 
          onChange={(e) => onUpdate(skillKey, 'isTrained', e.target.checked)}
          className="form-checkbox h-4 w-4 text-red-600 bg-slate-200 dark:bg-slate-800 border-slate-400 dark:border-slate-600 rounded focus:ring-red-500"
          disabled={skill.isTrainedOnly && skill.isCustom}
        />
      </div>
      <div className="flex-shrink-0">
         <button 
            onClick={() => onUpdate(skillKey, 'showInSummary', !skill.showInSummary)}
            className={`text-lg transition-colors ${skill.showInSummary ? 'text-yellow-400 hover:text-yellow-300' : 'text-slate-500 dark:text-slate-600 hover:text-slate-400'}`}
            aria-label={skill.showInSummary ? 'Remover do resumo' : 'Adicionar ao resumo'}
        >
            <i className={`fa-star ${skill.showInSummary ? 'fas' : 'far'}`}></i>
        </button>
      </div>
      <div className="flex-grow font-semibold min-w-[120px]">
        {skill.isCustom ? (
            <input
                type="text"
                value={skill.name}
                onChange={(e) => onUpdate(skillKey, 'name', e.target.value)}
                className="w-full bg-transparent focus:outline-none focus:bg-slate-300/50 dark:focus:bg-slate-900 rounded px-1"
            />
        ) : (
             <button onClick={handleRoll} className="text-left hover:text-red-500 dark:hover:text-red-400 transition-colors w-full">
                {skill.name}
                {skill.isTrainedOnly && <span className="text-red-500 dark:text-red-400">*</span>}
             </button>
        )}
      </div>
      <div className="flex-shrink-0 w-16 text-center" title={breakdownTitle}>
          <span className="font-bold text-lg">{skill.total >= 0 ? `+${skill.total}` : skill.total}</span>
      </div>
      <div className="flex-shrink-0 w-20 text-center">
        <select
          value={skill.attribute}
          onChange={(e) => onUpdate(skillKey, 'attribute', e.target.value as AttributeName)}
          className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded py-0.5 px-1 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 appearance-none text-center"
          aria-label={`Atributo para ${skill.name}`}
        >
            {ATTRIBUTE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div className="flex-shrink-0 w-20">
        <input 
          type="number"
          id={`skill_other_${skillKey}`}
          value={skill.others}
          onChange={(e) => onUpdate(skillKey, 'others', parseInt(e.target.value) || 0)}
          className="w-full text-center bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded py-0.5 focus:outline-none focus:ring-1 focus:ring-red-500"
          aria-label={`Outros bônus para ${skill.name}`}
        />
      </div>
      <div className="flex-shrink-0 w-8 text-right">
        {skill.isCustom && onDelete && (
            <button onClick={() => onDelete(skillKey)} className="text-red-600 hover:text-red-400 text-xs">
                <i className="fas fa-trash"></i>
            </button>
        )}
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills, onUpdate, onRoll }) => {
    
    const handleSkillUpdate = (skillKey: string, field: keyof Skill, value: any) => {
        onUpdate(`skills.${skillKey}.${field}`, value);
    };

    const handleAddOficio = () => {
        const newKey = `oficio_${Date.now()}`;
        const newOficio: Skill = {
            name: 'Ofício (Novo)',
            attribute: 'int',
            isTrained: true,
            others: 0,
            isTrainedOnly: true,
            applyArmorPenalty: false,
            isCustom: true,
            showInSummary: false,
        };
        onUpdate(`skills.${newKey}`, newOficio);
    };

    const handleDeleteOficio = (skillKey: string) => {
        onUpdate(`skills.${skillKey}`, undefined);
    }

  return (
    <Section title="Perícias">
        <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700">
            <h4 className="text-md font-bold text-slate-600 dark:text-slate-300 mb-2 text-center">Resumo de Perícias</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-2 text-sm">
                {Object.keys(skills)
                    .filter((key) => skills[key]?.showInSummary)
                    .map((key) => {
                        const skill = skills[key];
                        if (!skill) return null;
                        return (
                            <div key={key} className="flex justify-between items-center bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
                                <button
                                 onClick={() => onRoll(`Teste de ${skill.name}`, `1d20${skill.total >= 0 ? '+' : ''}${skill.total}`)}
                                 className="font-semibold text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400"
                                >
                                    {skill.name}
                                </button>
                                <span className="font-bold text-lg text-slate-900 dark:text-white">
                                    {skill.total >= 0 ? `+${skill.total}` : skill.total}
                                </span>
                            </div>
                        )
                })}
            </div>
        </div>

        <div className="hidden md:flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 px-2 gap-x-2">
            <div className="flex-shrink-0 w-4 text-center" title="Treinado">T</div>
            <div className="flex-shrink-0 w-8 text-center" title="Favorito"><i className="fas fa-star"></i></div>
            <div className="flex-grow">Nome</div>
            <div className="flex-shrink-0 w-16 text-center">Total</div>
            <div className="flex-shrink-0 w-20 text-center">Atributo</div>
            <div className="flex-shrink-0 w-20 text-center">Outros</div>
            <div className="flex-shrink-0 w-8"></div>
        </div>
        <div className="max-h-[500px] overflow-y-auto pr-2">
            {Object.keys(skills).map((key) => {
                const skill = skills[key];
                if (!skill) return null;
                return (
                    <SkillRow 
                        key={key}
                        skillKey={key}
                        skill={skill}
                        onUpdate={handleSkillUpdate}
                        onDelete={skill.isCustom ? handleDeleteOficio : undefined}
                        onRoll={onRoll}
                    />
                );
            })}
        </div>
         <button onClick={handleAddOficio} className="mt-4 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 transition-colors w-full">+ Adicionar Ofício</button>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2"><span className="text-red-500 dark:text-red-400">*</span> Somente treinado.</p>
    </Section>
  );
};

export default Skills;