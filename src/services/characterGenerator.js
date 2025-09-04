import { rpgSystems } from '../data/rpgSystems';
import { generateCharacterDetails, generateCharacterStory } from './aiService';

// Função para gerar atributos automaticamente
const generateAbilities = (method = 'standardArray', raceBonus = {}) => {
  let baseAbilities = {};
  
  switch (method) {
    case 'standardArray':
      // Distribuição inteligente baseada na classe
      baseAbilities = {
        strength: 13,
        dexterity: 14,
        constitution: 15,
        intelligence: 12,
        wisdom: 10,
        charisma: 8
      };
      break;
      
    case 'pointBuy':
      // Distribuição equilibrada com 27 pontos
      baseAbilities = {
        strength: 12,
        dexterity: 14,
        constitution: 15,
        intelligence: 13,
        wisdom: 12,
        charisma: 10
      };
      break;
      
    case 'rolling':
      // Simular rolagem 4d6, descartar menor
      Object.keys({ strength: 0, dexterity: 0, constitution: 0, intelligence: 0, wisdom: 0, charisma: 0 })
        .forEach(ability => {
          const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
          rolls.sort((a, b) => b - a);
          baseAbilities[ability] = rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
        });
      break;
  }
  
  // Aplicar bônus raciais
  Object.keys(raceBonus).forEach(ability => {
    if (baseAbilities[ability]) {
      baseAbilities[ability] += raceBonus[ability];
    }
  });
  
  return baseAbilities;
};

// Função para selecionar equipamentos baseados na classe
const generateEquipment = (characterClass, systemData) => {
  const classData = systemData.classes.find(c => c.id === characterClass);
  if (!classData || !classData.equipment) return [];
  
  const equipment = [];
  
  // Adicionar equipamentos básicos da classe
  if (classData.equipment.armor) {
    equipment.push(...classData.equipment.armor);
  }
  
  if (classData.equipment.weapons) {
    equipment.push(...classData.equipment.weapons);
  }
  
  if (classData.equipment.tools) {
    equipment.push(...classData.equipment.tools);
  }
  
  if (classData.equipment.other) {
    equipment.push(...classData.equipment.other);
  }
  
  // Adicionar equipamentos de aventura básicos
  const basicGear = [
    'Mochila',
    'Saco de Dormir',
    'Rações (5 dias)',
    'Cantil',
    'Corda de Cânhamo (15 metros)',
    'Tocha (10)',
    'Caixa de Fogo'
  ];
  
  equipment.push(...basicGear);
  
  return equipment;
};

// Função para selecionar magias baseadas na classe
const generateSpells = (characterClass, level, systemData) => {
  const classData = systemData.classes.find(c => c.id === characterClass);
  if (!classData || !classData.spellcasting) return [];
  
  const spells = [];
  const { cantrips, level1 } = systemData.spells;
  
  // Adicionar truques se a classe os conhece
  if (classData.spellcasting.cantrips && cantrips) {
    const availableCantrips = cantrips.filter(spell => 
      spell.classes.includes(classData.name)
    );
    
    const cantripCount = Math.min(classData.spellcasting.cantrips, availableCantrips.length);
    for (let i = 0; i < cantripCount; i++) {
      const randomCantrip = availableCantrips[Math.floor(Math.random() * availableCantrips.length)];
      if (!spells.find(s => s.id === randomCantrip.id)) {
        spells.push(randomCantrip);
      }
    }
  }
  
  // Adicionar magias de 1º nível se aplicável
  if (level >= 1 && classData.spellcasting.level1 && level1) {
    const availableSpells = level1.filter(spell => 
      spell.classes.includes(classData.name)
    );
    
    const spellCount = Math.min(classData.spellcasting.level1, availableSpells.length);
    for (let i = 0; i < spellCount; i++) {
      const randomSpell = availableSpells[Math.floor(Math.random() * availableSpells.length)];
      if (!spells.find(s => s.id === randomSpell.id)) {
        spells.push(randomSpell);
      }
    }
  }
  
  return spells;
};

// Função para gerar traços raciais
const generateRacialTraits = (race, systemData) => {
  const raceData = systemData.races.find(r => r.id === race);
  if (!raceData || !raceData.traits) return [];
  
  return raceData.traits.map(trait => ({
    name: trait.name,
    description: trait.description
  }));
};

// Função para gerar características de classe
const generateClassFeatures = (characterClass, level, systemData) => {
  const classData = systemData.classes.find(c => c.id === characterClass);
  if (!classData || !classData.features) return [];
  
  return classData.features
    .filter(feature => feature.level <= level)
    .map(feature => ({
      name: feature.name,
      description: feature.description,
      level: feature.level
    }));
};

// Função para otimizar atributos baseados na classe
const optimizeAbilitiesForClass = (abilities, characterClass, systemData) => {
  const classData = systemData.classes.find(c => c.id === characterClass);
  if (!classData) return abilities;
  
  const optimized = { ...abilities };
  const values = Object.values(optimized).sort((a, b) => b - a);
  
  // Mapear prioridades de atributos por classe
  const classPriorities = {
    'barbarian': ['strength', 'constitution', 'dexterity'],
    'bard': ['charisma', 'dexterity', 'constitution'],
    'cleric': ['wisdom', 'constitution', 'strength'],
    'druid': ['wisdom', 'constitution', 'dexterity'],
    'fighter': ['strength', 'constitution', 'dexterity'],
    'monk': ['dexterity', 'wisdom', 'constitution'],
    'paladin': ['strength', 'charisma', 'constitution'],
    'ranger': ['dexterity', 'wisdom', 'constitution'],
    'rogue': ['dexterity', 'intelligence', 'constitution'],
    'sorcerer': ['charisma', 'constitution', 'dexterity'],
    'warlock': ['charisma', 'constitution', 'dexterity'],
    'wizard': ['intelligence', 'constitution', 'dexterity']
  };
  
  const priorities = classPriorities[characterClass] || ['strength', 'dexterity', 'constitution'];
  
  // Redistribuir valores baseado nas prioridades
  priorities.forEach((ability, index) => {
    if (values[index]) {
      optimized[ability] = values[index];
    }
  });
  
  return optimized;
};

// Função principal para gerar personagem automaticamente
export const generateAutoCharacter = async (options = {}) => {
  const {
    gameSystem = 'dnd5e',
    race = null,
    characterClass = null,
    background = null,
    level = 1,
    abilityMethod = 'standardArray',
    archetype = null,
    ageRange = 'adult'
  } = options;
  
  const systemData = rpgSystems[gameSystem];
  if (!systemData) {
    throw new Error(`Sistema ${gameSystem} não encontrado`);
  }
  
  // Selecionar raça aleatória se não especificada
  const selectedRace = race || systemData.races[Math.floor(Math.random() * systemData.races.length)].id;
  const raceData = systemData.races.find(r => r.id === selectedRace);
  
  // Selecionar classe aleatória se não especificada
  const selectedClass = characterClass || systemData.classes[Math.floor(Math.random() * systemData.classes.length)].id;
  const classData = systemData.classes.find(c => c.id === selectedClass);
  
  // Selecionar background aleatório se não especificado
  const selectedBackground = background || systemData.backgrounds[Math.floor(Math.random() * systemData.backgrounds.length)].id;
  const backgroundData = systemData.backgrounds.find(b => b.id === selectedBackground);
  
  // Gerar atributos
  const raceBonus = raceData?.abilityScoreIncrease || {};
  let abilities = generateAbilities(abilityMethod, raceBonus);
  abilities = optimizeAbilitiesForClass(abilities, selectedClass, systemData);
  
  // Gerar perícias baseadas na classe e background
  const skills = [];
  if (classData?.skillProficiencies) {
    skills.push(...classData.skillProficiencies.slice(0, 2));
  }
  if (backgroundData?.skillProficiencies) {
    backgroundData.skillProficiencies.forEach(skill => {
      if (!skills.includes(skill)) {
        skills.push(skill);
      }
    });
  }
  
  // Gerar equipamentos
  const equipment = generateEquipment(selectedClass, systemData);
  
  // Gerar magias se aplicável
  const spells = generateSpells(selectedClass, level, systemData);
  
  // Gerar traços raciais
  const racialTraits = generateRacialTraits(selectedRace, systemData);
  
  // Gerar características de classe
  const classFeatures = generateClassFeatures(selectedClass, level, systemData);
  
  // Criar objeto do personagem
  const character = {
    gameSystem,
    race: raceData?.name || selectedRace,
    class: classData?.name || selectedClass,
    background: backgroundData?.name || selectedBackground,
    level,
    abilities,
    skills,
    equipment,
    spells,
    racialTraits,
    classFeatures,
    archetype,
    ageRange,
    hitPoints: level * 8 + (abilities.constitution ? Math.floor((abilities.constitution - 10) / 2) : 0),
    armorClass: 10 + (abilities.dexterity ? Math.floor((abilities.dexterity - 10) / 2) : 0),
    proficiencyBonus: Math.ceil(level / 4) + 1
  };
  
  try {
    // Gerar detalhes do personagem usando IA
    const characterDetails = await generateCharacterDetails({
      gameSystem: systemData.name,
      race: character.race,
      class: character.class,
      background: character.background,
      archetype,
      ageRange
    });
    
    // Extrair nome dos detalhes gerados
    if (characterDetails && characterDetails.name) {
      character.name = characterDetails.name;
    }
    
    // Gerar história do personagem
    const story = await generateCharacterStory({
      ...character,
      name: character.name || 'Personagem Misterioso',
      lifeEvents: [] // Pode ser expandido para incluir eventos de vida
    });
    
    if (story) {
      character.story = story;
    }
    
  } catch (error) {
    console.warn('Erro ao gerar detalhes com IA:', error);
    // Continuar sem os detalhes da IA
    character.name = `${character.race} ${character.class}`;
    character.story = `Um ${character.race.toLowerCase()} ${character.class.toLowerCase()} com background de ${character.background.toLowerCase()}.`;
  }
  
  return character;
};

// Função para gerar múltiplos personagens
export const generateMultipleCharacters = async (count = 1, options = {}) => {
  const characters = [];
  
  for (let i = 0; i < count; i++) {
    try {
      const character = await generateAutoCharacter(options);
      characters.push(character);
    } catch (error) {
      console.error(`Erro ao gerar personagem ${i + 1}:`, error);
    }
  }
  
  return characters;
};

// Função para validar personagem gerado
export const validateCharacter = (character) => {
  const errors = [];
  
  if (!character.name || character.name.trim() === '') {
    errors.push('Nome do personagem é obrigatório');
  }
  
  if (!character.race) {
    errors.push('Raça é obrigatória');
  }
  
  if (!character.class) {
    errors.push('Classe é obrigatória');
  }
  
  if (!character.abilities || Object.keys(character.abilities).length === 0) {
    errors.push('Atributos são obrigatórios');
  }
  
  // Validar valores de atributos
  if (character.abilities) {
    Object.entries(character.abilities).forEach(([ability, value]) => {
      if (value < 3 || value > 20) {
        errors.push(`Valor de ${ability} deve estar entre 3 e 20`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export default {
  generateAutoCharacter,
  generateMultipleCharacters,
  validateCharacter
};