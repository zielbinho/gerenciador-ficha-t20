import { type CharacterSheet, type Skills, type Condition } from './types';

export const SKILL_LIST: Record<string, { name: string; attribute: 'for' | 'des' | 'con' | 'int' | 'sab' | 'car'; isTrainedOnly: boolean; applyArmorPenalty: boolean }> = {
    acrobacia: { name: 'Acrobacia', attribute: 'des', isTrainedOnly: false, applyArmorPenalty: true },
    adestramento: { name: 'Adestramento', attribute: 'car', isTrainedOnly: true, applyArmorPenalty: false },
    atletismo: { name: 'Atletismo', attribute: 'for', isTrainedOnly: false, applyArmorPenalty: true },
    atuacao: { name: 'Atuação', attribute: 'car', isTrainedOnly: false, applyArmorPenalty: false },
    cavalgar: { name: 'Cavalgar', attribute: 'des', isTrainedOnly: false, applyArmorPenalty: false },
    conhecimento: { name: 'Conhecimento', attribute: 'int', isTrainedOnly: true, applyArmorPenalty: false },
    cura: { name: 'Cura', attribute: 'sab', isTrainedOnly: false, applyArmorPenalty: false },
    diplomacia: { name: 'Diplomacia', attribute: 'car', isTrainedOnly: false, applyArmorPenalty: false },
    enganacao: { name: 'Enganação', attribute: 'car', isTrainedOnly: false, applyArmorPenalty: false },
    fortitude: { name: 'Fortitude', attribute: 'con', isTrainedOnly: false, applyArmorPenalty: false },
    furtividade: { name: 'Furtividade', attribute: 'des', isTrainedOnly: false, applyArmorPenalty: true },
    guerra: { name: 'Guerra', attribute: 'int', isTrainedOnly: true, applyArmorPenalty: false },
    iniciativa: { name: 'Iniciativa', attribute: 'des', isTrainedOnly: false, applyArmorPenalty: false },
    intimidacao: { name: 'Intimidação', attribute: 'car', isTrainedOnly: false, applyArmorPenalty: false },
    intuicao: { name: 'Intuição', attribute: 'sab', isTrainedOnly: false, applyArmorPenalty: false },
    investigacao: { name: 'Investigação', attribute: 'int', isTrainedOnly: false, applyArmorPenalty: false },
    jogatina: { name: 'Jogatina', attribute: 'car', isTrainedOnly: true, applyArmorPenalty: false },
    ladinagem: { name: 'Ladinagem', attribute: 'des', isTrainedOnly: true, applyArmorPenalty: true },
    luta: { name: 'Luta', attribute: 'for', isTrainedOnly: false, applyArmorPenalty: false },
    misticismo: { name: 'Misticismo', attribute: 'int', isTrainedOnly: true, applyArmorPenalty: false },
    nobreza: { name: 'Nobreza', attribute: 'int', isTrainedOnly: true, applyArmorPenalty: false },
    percepcao: { name: 'Percepção', attribute: 'sab', isTrainedOnly: false, applyArmorPenalty: false },
    pilotagem: { name: 'Pilotagem', attribute: 'des', isTrainedOnly: true, applyArmorPenalty: false },
    pontaria: { name: 'Pontaria', attribute: 'des', isTrainedOnly: false, applyArmorPenalty: false },
    reflexos: { name: 'Reflexos', attribute: 'des', isTrainedOnly: false, applyArmorPenalty: false },
    religiao: { name: 'Religião', attribute: 'sab', isTrainedOnly: true, applyArmorPenalty: false },
    sobrevivencia: { name: 'Sobrevivência', attribute: 'sab', isTrainedOnly: false, applyArmorPenalty: false },
    vontade: { name: 'Vontade', attribute: 'sab', isTrainedOnly: false, applyArmorPenalty: false },
};

export const IMPORTANT_SKILLS = ['iniciativa', 'fortitude', 'reflexos', 'vontade', 'percepcao', 'luta', 'pontaria', 'atletismo', 'acrobacia', 'furtividade'];

const initialSkills: Skills = Object.keys(SKILL_LIST).reduce((acc, key) => {
    const skillInfo = SKILL_LIST[key];
    acc[key] = {
        name: skillInfo.name,
        attribute: skillInfo.attribute,
        isTrained: false,
        others: 0,
        isTrainedOnly: skillInfo.isTrainedOnly,
        applyArmorPenalty: skillInfo.applyArmorPenalty,
        showInSummary: IMPORTANT_SKILLS.includes(key),
    };
    return acc;
}, {} as Skills);

export const INITIAL_CHARACTER_SHEET: Omit<CharacterSheet, 'id'> = {
  name: 'Novo Personagem',
  distinction: '',
  race: '',
  origin: '',
  classAndLevel: '',
  divinity: '',
  level: 1,
  attributes: {
    for: { modifier: 0 },
    des: { modifier: 0 },
    con: { modifier: 0 },
    int: { modifier: 0 },
    sab: { modifier: 0 },
    car: { modifier: 0 },
  },
  life: { current: 10, max: 10, temp: 0 },
  mana: { current: 10, max: 10, temp: 0 },
  moneyTS: 0,
  moneyTO: 0,
  characterImage: null,
  attacks: [],
  defense: {
    others: 0,
    armor: { name: '', defense: 0, penalty: 0 },
    shield: { name: '', defense: 0, penalty: 0 },
  },
  proficiencies: '',
  skills: initialSkills,
  effects: [],
  magic: {
    keyAttribute: 'int',
    spells: {
      circle1: [],
      circle2: [],
      circle3: [],
      circle4: [],
      circle5: [],
    }
  },
  inventory: [],
  abilitiesAndPowers: {
    race: [],
    origin: [],
    class: [],
  },
  notes: '',
};

export const CONDITIONS: Condition[] = [
    { key: 'abalado', name: 'Abalado', description: 'O personagem sofre –2 em testes de perícia. Se ficar abalado novamente, em vez disso fica apavorado.', effects: [{ name: 'Abalado', target: 'all_skills', value: -2 }] },
    { key: 'agarrado', name: 'Agarrado', description: 'Fica desprevenido e imóvel, sofre –2 em testes de ataque e só pode atacar com armas leves.', effects: [{ name: 'Agarrado', target: 'attack', value: -2 }] },
    { key: 'alquebrado', name: 'Alquebrado', description: 'O custo em pontos de mana das habilidades do personagem aumenta em +1.', effects: [] },
    { key: 'apavorado', name: 'Apavorado', description: 'Sofre –5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo.', effects: [{ name: 'Apavorado', target: 'all_skills', value: -5 }] },
    { key: 'atordoado', name: 'Atordoado', description: 'Fica desprevenido e não pode fazer ações.', effects: [] },
    { key: 'caido', name: 'Caído', description: 'Sofre –5 na Defesa contra ataques corpo a corpo e recebe +5 na Defesa contra ataques à distância. Sofre –5 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m.', effects: [] },
    { key: 'cego', name: 'Cego', description: 'Fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre –5 em testes de perícias baseadas em Força ou Destreza. Alvos recebem camuflagem total.', effects: [] },
    { key: 'confuso', name: 'Confuso', description: 'Comporta-se de modo aleatório (role 1d6): 1) Movimenta-se aleatoriamente; 2-3) Não faz ações; 4-5) Ataca a criatura mais próxima; 6) A condição termina.', effects: [] },
    { key: 'debilitado', name: 'Debilitado', description: 'Sofre –5 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos.', effects: [
        { name: 'Debilitado (FOR)', target: 'atletismo', value: -5 }, { name: 'Debilitado (FOR)', target: 'luta', value: -5 },
        { name: 'Debilitado (DES)', target: 'acrobacia', value: -5 }, { name: 'Debilitado (DES)', target: 'furtividade', value: -5 }, { name: 'Debilitado (DES)', target: 'ladinagem', value: -5 }, { name: 'Debilitado (DES)', target: 'pilotagem', value: -5 }, { name: 'Debilitado (DES)', target: 'pontaria', value: -5 }, { name: 'Debilitado (DES)', target: 'reflexos', value: -5 },
        { name: 'Debilitado (CON)', target: 'fortitude', value: -5 },
    ]},
    { key: 'desprevenido', name: 'Desprevenido', description: 'Sofre –5 na Defesa e em Reflexos.', effects: [{ name: 'Desprevenido (Defesa)', target: 'defense', value: -5 }, { name: 'Desprevenido (Reflexos)', target: 'reflexos', value: -5 }] },
    { key: 'doente', name: 'Doente', description: 'Sob efeito de uma doença. O efeito varia.', effects: [] },
    { key: 'em_chamas', name: 'Em Chamas', description: 'No início de seus turnos, sofre 1d6 pontos de dano de fogo.', effects: [] },
    { key: 'enfeiticado', name: 'Enfeitiçado', description: 'Torna-se prestativo em relação à fonte da condição, que recebe +10 em testes de Diplomacia com o personagem.', effects: [] },
    { key: 'enjoado', name: 'Enjoado', description: 'Só pode realizar uma ação padrão ou de movimento por rodada.', effects: [] },
    { key: 'enredado', name: 'Enredado', description: 'Fica lento, vulnerável e sofre –2 em testes de ataque.', effects: [{ name: 'Enredado (Ataque)', target: 'attack', value: -2 }, { name: 'Enredado (Defesa)', target: 'defense', value: -2 }] },
    { key: 'envenenado', name: 'Envenenado', description: 'O efeito desta condição varia de acordo com o veneno.', effects: [] },
    { key: 'esmorecido', name: 'Esmorecido', description: 'Sofre –5 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos.', effects: [
        { name: 'Esmorecido (INT)', target: 'conhecimento', value: -5 }, { name: 'Esmorecido (INT)', target: 'guerra', value: -5 }, { name: 'Esmorecido (INT)', target: 'investigacao', value: -5 }, { name: 'Esmorecido (INT)', target: 'misticismo', value: -5 }, { name: 'Esmorecido (INT)', target: 'nobreza', value: -5 },
        { name: 'Esmorecido (SAB)', target: 'cura', value: -5 }, { name: 'Esmorecido (SAB)', target: 'intuicao', value: -5 }, { name: 'Esmorecido (SAB)', target: 'percepcao', value: -5 }, { name: 'Esmorecido (SAB)', target: 'religiao', value: -5 }, { name: 'Esmorecido (SAB)', target: 'sobrevivencia', value: -5 }, { name: 'Esmorecido (SAB)', target: 'vontade', value: -5 },
        { name: 'Esmorecido (CAR)', target: 'adestramento', value: -5 }, { name: 'Esmorecido (CAR)', target: 'atuacao', value: -5 }, { name: 'Esmorecido (CAR)', target: 'diplomacia', value: -5 }, { name: 'Esmorecido (CAR)', target: 'enganacao', value: -5 }, { name: 'Esmorecido (CAR)', target: 'intimidacao', value: -5 }, { name: 'Esmorecido (CAR)', target: 'jogatina', value: -5 },
    ]},
    { key: 'exausto', name: 'Exausto', description: 'Fica debilitado, lento e vulnerável.', effects: [
        ...[
            { name: 'Debilitado (FOR)', target: 'atletismo', value: -5 }, { name: 'Debilitado (FOR)', target: 'luta', value: -5 },
            { name: 'Debilitado (DES)', target: 'acrobacia', value: -5 }, { name: 'Debilitado (DES)', target: 'furtividade', value: -5 }, { name: 'Debilitado (DES)', target: 'ladinagem', value: -5 }, { name: 'Debilitado (DES)', target: 'pilotagem', value: -5 }, { name: 'Debilitado (DES)', target: 'pontaria', value: -5 }, { name: 'Debilitado (DES)', target: 'reflexos', value: -5 },
            { name: 'Debilitado (CON)', target: 'fortitude', value: -5 },
        ].map(e => ({...e, name: `Exausto via ${e.name}`})),
        { name: 'Exausto (Vulnerável)', target: 'defense', value: -2 }
    ]},
    { key: 'fascinado', name: 'Fascinado', description: 'Sofre –5 em Percepção e não pode fazer ações, exceto observar o que o fascinou.', effects: [{ name: 'Fascinado', target: 'percepcao', value: -5 }] },
    { key: 'fatigado', name: 'Fatigado', description: 'Fica fraco e vulnerável.', effects: [
        ...[
            { name: 'Fraco (FOR)', target: 'atletismo', value: -2 }, { name: 'Fraco (FOR)', target: 'luta', value: -2 },
            { name: 'Fraco (DES)', target: 'acrobacia', value: -2 }, { name: 'Fraco (DES)', target: 'furtividade', value: -2 }, { name: 'Fraco (DES)', target: 'ladinagem', value: -2 }, { name: 'Fraco (DES)', target: 'pilotagem', value: -2 }, { name: 'Fraco (DES)', target: 'pontaria', value: -2 }, { name: 'Fraco (DES)', target: 'reflexos', value: -2 },
            { name: 'Fraco (CON)', target: 'fortitude', value: -2 },
        ].map(e => ({...e, name: `Fatigado via ${e.name}`})),
        { name: 'Fatigado (Vulnerável)', target: 'defense', value: -2 }
    ]},
    { key: 'fraco', name: 'Fraco', description: 'Sofre –2 em testes de Força, Destreza e Constituição e de perícias baseadas nesses atributos.', effects: [
        { name: 'Fraco (FOR)', target: 'atletismo', value: -2 }, { name: 'Fraco (FOR)', target: 'luta', value: -2 },
        { name: 'Fraco (DES)', target: 'acrobacia', value: -2 }, { name: 'Fraco (DES)', target: 'furtividade', value: -2 }, { name: 'Fraco (DES)', target: 'ladinagem', value: -2 }, { name: 'Fraco (DES)', target: 'pilotagem', value: -2 }, { name: 'Fraco (DES)', target: 'pontaria', value: -2 }, { name: 'Fraco (DES)', target: 'reflexos', value: -2 },
        { name: 'Fraco (CON)', target: 'fortitude', value: -2 },
    ]},
    { key: 'frustrado', name: 'Frustrado', description: 'Sofre –2 em testes de Inteligência, Sabedoria e Carisma e de perícias baseadas nesses atributos.', effects: [
        { name: 'Frustrado (INT)', target: 'conhecimento', value: -2 }, { name: 'Frustrado (INT)', target: 'guerra', value: -2 }, { name: 'Frustrado (INT)', target: 'investigacao', value: -2 }, { name: 'Frustrado (INT)', target: 'misticismo', value: -2 }, { name: 'Frustrado (INT)', target: 'nobreza', value: -2 },
        { name: 'Frustrado (SAB)', target: 'cura', value: -2 }, { name: 'Frustrado (SAB)', target: 'intuicao', value: -2 }, { name: 'Frustrado (SAB)', target: 'percepcao', value: -2 }, { name: 'Frustrado (SAB)', target: 'religiao', value: -2 }, { name: 'Frustrado (SAB)', target: 'sobrevivencia', value: -2 }, { name: 'Frustrado (SAB)', target: 'vontade', value: -2 },
        { name: 'Frustrado (CAR)', target: 'adestramento', value: -2 }, { name: 'Frustrado (CAR)', target: 'atuacao', value: -2 }, { name: 'Frustrado (CAR)', target: 'diplomacia', value: -2 }, { name: 'Frustrado (CAR)', target: 'enganacao', value: -2 }, { name: 'Frustrado (CAR)', target: 'intimidacao', value: -2 }, { name: 'Frustrado (CAR)', target: 'jogatina', value: -2 },
    ]},
    { key: 'imovel', name: 'Imóvel', description: 'Todas as formas de deslocamento do personagem são reduzidas a 0m.', effects: [] },
    { key: 'inconsciente', name: 'Inconsciente', description: 'Fica indefeso e não pode fazer ações.', effects: [ { name: 'Inconsciente (Indefeso/Defesa)', target: 'defense', value: -10 }, { name: 'Inconsciente (Indefeso/Reflexos)', target: 'reflexos', value: -5 }] },
    { key: 'indefeso', name: 'Indefeso', description: 'Fica desprevenido, mas sofre –10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia.', effects: [{ name: 'Indefeso (Defesa)', target: 'defense', value: -10 }, { name: 'Indefeso (Reflexos)', target: 'reflexos', value: -5 }] },
    { key: 'lento', name: 'Lento', description: 'Todas as formas de deslocamento são reduzidas à metade e não pode correr ou fazer investidas.', effects: [] },
    { key: 'ofuscado', name: 'Ofuscado', description: 'Sofre –2 em testes de ataque e de Percepção.', effects: [{ name: 'Ofuscado (Ataque)', target: 'attack', value: -2 }, { name: 'Ofuscado (Percepção)', target: 'percepcao', value: -2 }] },
    { key: 'paralisado', name: 'Paralisado', description: 'Fica imóvel e indefeso e só pode realizar ações puramente mentais.', effects: [{ name: 'Paralisado (Indefeso/Defesa)', target: 'defense', value: -10 }, { name: 'Paralisado (Indefeso/Reflexos)', target: 'reflexos', value: -5 }] },
    { key: 'pasmo', name: 'Pasmo', description: 'Não pode fazer ações.', effects: [] },
    { key: 'petrificado', name: 'Petrificado', description: 'Fica inconsciente e recebe redução de dano 8.', effects: [{ name: 'Petrificado (Indefeso/Defesa)', target: 'defense', value: -10 }, { name: 'Petrificado (Indefeso/Reflexos)', target: 'reflexos', value: -5 }] },
    { key: 'sangrando', name: 'Sangrando', description: 'No início de seu turno, deve fazer um teste de Constituição (CD 15). Se falhar, perde 1d6 PV.', effects: [] },
    { key: 'sobrecarregado', name: 'Sobrecarregado', description: 'Sofre penalidade de armadura –5 e seu deslocamento é reduzido em –3m.', effects: [] },
    { key: 'surdo', name: 'Surdo', description: 'Não pode fazer testes de Percepção para ouvir e sofre –5 em testes de Iniciativa.', effects: [{ name: 'Surdo', target: 'iniciativa', value: -5 }] },
    { key: 'surpreendido', name: 'Surpreendido', description: 'Fica desprevenido e não pode fazer ações.', effects: [{ name: 'Surpreendido (Defesa)', target: 'defense', value: -5 }, { name: 'Surpreendido (Reflexos)', target: 'reflexos', value: -5 }] },
    { key: 'vulneravel', name: 'Vulnerável', description: 'O personagem sofre –2 na Defesa.', effects: [{ name: 'Vulnerável', target: 'defense', value: -2 }] },
];


export const DAMAGE_TYPES = [
    'Ácido', 'Corte', 'Eletricidade', 'Essência', 'Fogo', 'Frio',
    'Impacto', 'Luz', 'Perfuração', 'Psíquico', 'Trevas'
];