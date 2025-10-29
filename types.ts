export type AttributeName = 'for' | 'des' | 'con' | 'int' | 'sab' | 'car';

export interface Attribute {
  modifier: number;
}

export interface Vital {
  current: number;
  max: number;
  temp: number;
}

export interface Skill {
  name: string;
  attribute: AttributeName;
  isTrained: boolean;
  others: number;
  isTrainedOnly: boolean;
  applyArmorPenalty: boolean;
  showInSummary?: boolean;
  isCustom?: boolean;
}

export type Skills = Record<string, Skill>;

export interface Attributes {
  for: Attribute;
  des: Attribute;
  con: Attribute;
  int: Attribute;
  sab: Attribute;
  car: Attribute;
}

export type AttackSkill = 'luta' | 'pontaria';

export interface Attack {
  id: string;
  name: string;
  skillUsed: AttackSkill;
  others: number;
  damageDice: string;
  damageAttribute: AttributeName | 'none';
  critRange: number;
  critMultiplier: number;
  damageType: string;
  range: string;
}

export interface CalculatedAttack extends Attack {
    testBonus: number;
    damageRoll: string;
}

export interface ArmorOrShield {
    name: string;
    defense: number;
    penalty: number;
}

export interface Spell {
  id: string;
  name: string;
  school: string;
  execution: string;
  range: string;
  area: string;
  duration: string;
  resistance: string;
  effect: string;
  isPrepared: boolean;
}

export interface Item {
  id: string;
  name: string;
  slots: number;
  equipped: boolean;
}

export interface Ability {
  id: string;
  name: string;
  description: string;
}

export type EffectTarget = 'defense' | 'all_skills' | 'attack' | string; // string for specific skill key

export interface Effect {
  id: string;
  name: string;
  target: EffectTarget;
  value: number;
  source?: string; // e.g., 'condition_abalado'
}

export interface Condition {
    key: string;
    name: string;
    description: string;
    effects: Omit<Effect, 'id'>[];
}

export interface SkillBreakdown {
  halfLevel: number;
  attribute: number;
  training: number;
  others: number;
  armorPenalty: number;
  effects: number;
}

export interface CalculatedSkill extends Skill {
    total: number;
    breakdown: SkillBreakdown;
}

export type CalculatedSkills = Record<string, CalculatedSkill>;

export interface DiceRoll {
  isOpen: boolean;
  title: string;
  diceString: string;
  rolls: number[];
  modifier: number;
  total: number;
}

export interface CharacterSheet {
  id: string;
  name: string;
  distinction: string;
  race: string;
  origin: string;
  classAndLevel: string;
  divinity: string;
  level: number;
  attributes: Attributes;
  life: Vital;
  mana: Vital;
  moneyTS: number;
  moneyTO: number;
  characterImage: string | null;
  attacks: Attack[];
  defense: {
    others: number;
    armor: ArmorOrShield;
    shield: ArmorOrShield;
  };
  proficiencies: string;
  skills: Skills;
  effects: Effect[];
  magic: {
    keyAttribute: AttributeName;
    spells: {
      circle1: Spell[];
      circle2: Spell[];
      circle3: Spell[];
      circle4: Spell[];
      circle5: Spell[];
    };
  };
  inventory: Item[];
  abilitiesAndPowers: {
    race: Ability[];
    origin: Ability[];
    class: Ability[];
  };
  notes: string;
}

export type UITheme = 'light' | 'dark';

export interface AppState {
  characters: Record<string, CharacterSheet>;
  activeCharacterId: string | null;
  theme: UITheme;
}