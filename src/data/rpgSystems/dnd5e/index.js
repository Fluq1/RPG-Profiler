import races from './races.js';
import classes from './classes.js';
import backgrounds from './backgrounds.js';
import spells from './spells.js';
import abilities, { abilityGenerationMethods } from './abilities.js';
import skills from './skills.js';
import equipment from './equipment.js';
// import characterSheet from './characterSheet';

const dnd5e = {
  id: 'dnd',
  name: 'Dungeons & Dragons 5e',
  description: 'O mais popular sistema de RPG de fantasia medieval',
  icon: '🐉',
  races,
  classes,
  backgrounds,
  spells,
  abilities,
  skills,
  equipment,
  abilityGenerationMethods,
  // characterSheet,
  // Configurações específicas para geração de personagem
  characterCreation: {
    steps: ['race'], // Apenas race por enquanto
    requiredFields: ['name', 'race'],
    abilityScoreMethod: ['standard', 'pointBuy', 'rolling']
  },
  // Função para gerar template de prompt específico do sistema
  characterPromptTemplate: (character) => {
    return `
ATRIBUTOS ESPECÍFICOS D&D 5E:
- Sistema: Dungeons & Dragons 5ª Edição
- Raça: ${character.race}
- Classe: ${character.class}
- Background: ${character.background}
- Arquétipo: ${character.archetype || 'Não especificado'}

CONSIDERAÇÕES PARA D&D 5E:
- Inclua referências a divindades do panteão de D&D
- Mencione magias, habilidades ou características raciais relevantes
- Conecte com organizações ou facções conhecidas de D&D
- Use terminologia específica do sistema (níveis, classes, etc.)`;
  }
};

export default dnd5e;