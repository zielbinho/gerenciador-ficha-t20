import React from 'react';
import { CharacterSheet } from '../types';

interface CharacterSelectorProps {
  characters: CharacterSheet[];
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ characters, onSelect, onCreate, onDelete }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-4 transition-colors duration-300">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-red-600 dark:text-red-500 flex items-center justify-center gap-3">
                <i className="fas fa-dragon"></i>
                <span>Gerenciador T20</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Selecione um personagem para continuar ou crie um novo.</p>
        </header>

        <main className="bg-slate-200 dark:bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-slate-300 dark:border-slate-700">
          <div className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-2">
            {characters.length > 0 ? (
              characters.map(char => (
                <div
                  key={char.id}
                  className="group flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-900/50 rounded-md border border-slate-300 dark:border-slate-700"
                >
                  <div>
                      <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">{char.name}</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{char.classAndLevel || 'Nível 1'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelect(char.id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Carregar
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(char.id); }}
                        className="text-red-500 px-2 py-1 rounded-md hover:bg-red-500/10 transition-colors"
                        aria-label={`Deletar ${char.name}`}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 italic py-4">Nenhum personagem encontrado.</p>
            )}
          </div>
          <button
            onClick={onCreate}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-transform hover:scale-105"
          >
            + Criar Novo Personagem
          </button>
        </main>
      </div>
    </div>
  );
};

export default CharacterSelector;
