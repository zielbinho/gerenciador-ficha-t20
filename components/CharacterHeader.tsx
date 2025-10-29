import React from 'react';
import { type CharacterSheet } from '../types';
import EditableField from './EditableField';

interface CharacterHeaderProps {
  data: Pick<CharacterSheet, 'name' | 'distinction' | 'race' | 'origin' | 'classAndLevel' | 'divinity' | 'level'>;
  onUpdate: (field: keyof CharacterSheet, value: any) => void;
  onLevelUpClick: () => void;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ data, onUpdate, onLevelUpClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <EditableField label="Personagem" value={data.name} onChange={value => onUpdate('name', value)} inputClassName="text-xl"/>
        <EditableField label="Distinção" value={data.distinction} onChange={value => onUpdate('distinction', value)} />
        <EditableField label="Raça" value={data.race} onChange={value => onUpdate('race', value)} />
        <EditableField label="Origem" value={data.origin} onChange={value => onUpdate('origin', value)} />
        <EditableField label="Classe" value={data.classAndLevel} onChange={value => onUpdate('classAndLevel', value)} />
        <EditableField label="Divindade" value={data.divinity} onChange={value => onUpdate('divinity', value)} />
        <div className="flex items-end gap-2">
            <EditableField label="Nível" type="number" value={data.level} onChange={value => onUpdate('level', Math.max(1, value as number))} className="flex-grow" />
            <button
                onClick={onLevelUpClick}
                className="h-9 px-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                title="Subir de Nível"
            >
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    </div>
  );
};

export default CharacterHeader;