import React, { useRef, useEffect } from 'react';
import { type CharacterSheet, type Ability, type CalculatedSkills } from '../types';
import Section from './Section';
import Inventory from './Inventory';

interface CharacterMiscProps {
  data: CharacterSheet;
  onUpdate: (field: string, value: any) => void;
  calculatedSkills: CalculatedSkills;
}

const TextAreaSection: React.FC<{
    title: string;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    autoExpand?: boolean;
}> = ({ title, value, onChange, rows = 5, autoExpand = false }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (autoExpand && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto'; 
            textarea.style.height = `${textarea.scrollHeight}px`; 
        }
    }, [value, autoExpand]);
    
    return (
        <Section title={title}>
            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className={`w-full bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition ${autoExpand ? 'resize-none overflow-y-hidden' : ''}`}
            />
        </Section>
    );
};

interface AbilityListProps {
  title: string;
  abilities: Ability[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: 'name' | 'description', value: string) => void;
}

const AbilityList: React.FC<AbilityListProps> = ({ title, abilities, onAdd, onRemove, onUpdate }) => {
    return (
        <div>
            <label className="text-md font-semibold text-slate-600 dark:text-slate-300 mb-2 block">{title}</label>
            <div className="space-y-3">
                {abilities.length > 0 ? abilities.map(ability => (
                    <div key={ability.id} className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border border-slate-300 dark:border-slate-700 relative">
                        <button 
                            onClick={() => onRemove(ability.id)} 
                            className="absolute top-2 right-2 text-red-600 hover:text-red-400 transition-colors"
                            aria-label={`Remover habilidade ${ability.name || 'sem nome'}`}
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                        <input
                            type="text"
                            placeholder="Nome da Habilidade"
                            value={ability.name}
                            onChange={(e) => onUpdate(ability.id, 'name', e.target.value)}
                            className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded px-2 py-1 mb-2 font-semibold focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        <textarea
                            placeholder="Descrição"
                            value={ability.description}
                            onChange={(e) => onUpdate(ability.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-400 dark:border-slate-600 rounded p-2 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                    </div>
                )) : (
                    <p className="text-center text-sm text-slate-500 italic py-2">Nenhuma habilidade adicionada.</p>
                )}
            </div>
            <button onClick={onAdd} className="mt-3 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded px-2 py-1 transition-colors w-full">
                + Adicionar Habilidade
            </button>
        </div>
    );
};


const CharacterMisc: React.FC<CharacterMiscProps> = ({ data, onUpdate, calculatedSkills }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onUpdate('characterImage', e.target?.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleAddAbility = (type: 'race' | 'origin' | 'class') => {
        const newAbility: Ability = { id: Date.now().toString(), name: '', description: '' };
        const updatedAbilities = [...data.abilitiesAndPowers[type], newAbility];
        onUpdate(`abilitiesAndPowers.${type}`, updatedAbilities);
    };

    const handleRemoveAbility = (type: 'race' | 'origin' | 'class', id: string) => {
        const updatedAbilities = data.abilitiesAndPowers[type].filter(ability => ability.id !== id);
        onUpdate(`abilitiesAndPowers.${type}`, updatedAbilities);
    };

    const handleUpdateAbility = (type: 'race' | 'origin' | 'class', id: string, field: 'name' | 'description', value: string) => {
        const updatedAbilities = data.abilitiesAndPowers[type].map(ability => 
            ability.id === id ? { ...ability, [field]: value } : ability
        );
        onUpdate(`abilitiesAndPowers.${type}`, updatedAbilities);
    };
    
  return (
    <div className="space-y-6">
        <Section title="Ilustração do Personagem">
            <div className="flex flex-col items-center">
                {data.characterImage ? (
                    <img src={data.characterImage} alt="Character" className="max-h-60 w-auto max-w-full object-contain rounded-lg mb-4 border-2 border-slate-300 dark:border-slate-700" />
                ) : (
                    <div className="h-60 w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-lg mb-4">
                        <span className="text-slate-500">Sem Imagem</span>
                    </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
                <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        <i className="fas fa-upload mr-2"></i>Carregar Imagem
                    </button>
                    {data.characterImage && (
                         <button onClick={() => onUpdate('characterImage', null)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                            <i className="fas fa-trash mr-2"></i>Remover
                        </button>
                    )}
                </div>
            </div>
        </Section>
        
        <TextAreaSection title="Proficiências" value={data.proficiencies} onChange={v => onUpdate('proficiencies', v)} rows={3} />
        <Inventory
          inventory={data.inventory}
          forModifier={data.attributes.for.modifier}
          moneyTS={data.moneyTS}
          moneyTO={data.moneyTO}
          onUpdate={(field, value) => onUpdate(field, value)}
        />

        <Section title="Habilidades & Poderes">
            <div className="space-y-6">
                <AbilityList 
                    title="Habilidades de Raça"
                    abilities={data.abilitiesAndPowers.race}
                    onAdd={() => handleAddAbility('race')}
                    onRemove={(id) => handleRemoveAbility('race', id)}
                    onUpdate={(id, field, value) => handleUpdateAbility('race', id, field, value)}
                />
                <AbilityList 
                    title="Habilidades de Origem"
                    abilities={data.abilitiesAndPowers.origin}
                    onAdd={() => handleAddAbility('origin')}
                    onRemove={(id) => handleRemoveAbility('origin', id)}
                    onUpdate={(id, field, value) => handleUpdateAbility('origin', id, field, value)}
                />
                <AbilityList 
                    title="Habilidades de Classe & Nível"
                    abilities={data.abilitiesAndPowers.class}
                    onAdd={() => handleAddAbility('class')}
                    onRemove={(id) => handleRemoveAbility('class', id)}
                    onUpdate={(id, field, value) => handleUpdateAbility('class', id, field, value)}
                />
            </div>
        </Section>

        <TextAreaSection title="Anotações" value={data.notes} onChange={v => onUpdate('notes', v)} rows={8} autoExpand={true} />
    </div>
  );
};

export default CharacterMisc;