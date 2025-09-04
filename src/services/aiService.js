import { GoogleGenerativeAI } from "@google/generative-ai";
import { archetypes } from '../data/archetypes';
import { rpgSystems } from '../data/rpgSystems';

// API Key directly embedded
const API_KEY = "AIzaSyD0RvqOFTObZS_wAzU_pEamHWRYxV4wpUM";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(API_KEY);

const RPG_SYSTEM_PROMPT = `Você é um mestre de RPG especializado em criar histórias envolventes para personagens de Dungeons & Dragons. 

DIRETRIZES PARA A HISTÓRIA:
- Crie uma narrativa de exatamente 15-20 linhas (máximo 600 tokens)
- Use português brasileiro moderno e acessível
- Inclua elementos específicos do universo D&D (magias, criaturas, divindades, planos, etc.)
- Estabeleça motivações claras e conflitos pessoais
- Mencione pelo menos um evento marcante que definiu o personagem
- Inclua conexões com NPCs, organizações ou locais que o mestre possa usar
- Termine com um gancho narrativo para aventuras futuras

ESTRUTURA SUGERIDA:
1. Origem e família/comunidade
2. Evento formativo relacionado à classe/background
3. Desenvolvimento das habilidades
4. Conflito ou tragédia pessoal
5. Motivação atual e objetivos
6. Gancho para aventuras

TOME CUIDADO PARA:
- Não criar personagens perfeitos ou invencíveis
- Incluir falhas ou medos que humanizem o personagem
- Deixar espaço para desenvolvimento durante o jogo
- Conectar a história com mecânicas de D&D quando apropriado`;

const GEMINI_MODEL = "gemini-1.5-flash";

const stageTitles = {
  infancy: "infância",
  earlyChildhood: "primeira infância", 
  childhood: "infância",
  earlyAdolescence: "início da adolescência",
  adolescence: "adolescência",
  earlyAdulthood: "início da vida adulta",
  adulthood: "vida adulta"
};

/**
 * Calls the Gemini API to generate content
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The generated response
 */
const callGeminiAPI = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: RPG_SYSTEM_PROMPT,
    });

    const generationConfig = {
      temperature: 1.1,
      maxOutputTokens: 600,
      topP: 0.9,
      topK: 40,
    };

    const result = await model.generateContent(prompt, generationConfig);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Erro ao gerar história. Por favor, tente novamente.";
  }
};

// Sugestões de personagem por arquétipo
const CHARACTER_SUGGESTIONS = {
  bruto: { race: 'Meio-Orc', class: 'Bárbaro', background: 'Soldado' },
  sabio: { race: 'Elfo', class: 'Mago', background: 'Sábio' },
  assassino: { race: 'Meio-Elfo', class: 'Ladino', background: 'Criminoso' },
  guardiao: { race: 'Humano', class: 'Paladino', background: 'Acolito' },
  artista: { race: 'Halfling', class: 'Bardo', background: 'Artista' }
};

export const generateCharacterDetails = (characterData) => {
  // Handle both old archetype-only calls and new character data objects
  const archetype = typeof characterData === 'string' ? characterData : characterData?.archetype;
  
  const suggestion = CHARACTER_SUGGESTIONS[archetype] || { race: 'Humano', class: 'Guerreiro', background: 'Soldado' };
  
  // Generate a random name based on race and class
  const names = {
    'Humano': ['Aiden', 'Elena', 'Marcus', 'Sofia', 'Gabriel', 'Isabella'],
    'Elfo': ['Aelar', 'Aerdrie', 'Ahvak', 'Aramil', 'Berrian', 'Dayereth'],
    'Anão': ['Adrik', 'Baern', 'Darrak', 'Eberk', 'Fargrim', 'Gardain'],
    'Halfling': ['Alton', 'Ander', 'Bernie', 'Bobbin', 'Cade', 'Callus'],
    'Meio-Orc': ['Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh'],
    'Meio-Elfo': ['Abel', 'Caleb', 'Dara', 'Enna', 'Galinndan', 'Hadarai']
  };
  
  const raceNames = names[suggestion.race] || names['Humano'];
  const randomName = raceNames[Math.floor(Math.random() * raceNames.length)];
  
  return Promise.resolve({
    ...suggestion,
    name: randomName
  });
};

export const getSuggestions = (archetype) => {
  return CHARACTER_SUGGESTIONS[archetype] || { race: 'Humano', class: 'Guerreiro', background: 'Soldado' };
};

// Prompts específicos por sistema
const SYSTEM_PROMPTS = {
  dnd: `Você é um mestre de RPG especializado em criar histórias envolventes para personagens de Dungeons & Dragons 5e...`,
  pathfinder: `Você é um mestre de RPG especializado em criar histórias para personagens de Pathfinder...`,
  callOfCthulhu: `Você é um Keeper de Call of Cthulhu especializado em criar investigadores com histórias sombrias...`,
  vampireMasquerade: `Você é um Narrador de Vampire: The Masquerade especializado em criar personagens com histórias trágicas...`
};

// Função auxiliar para formatar eventos de vida
const formatLifeEvents = (lifeStages) => {
  if (!lifeStages) return 'Nenhum evento específico registrado.';
  
  const events = [];
  Object.entries(lifeStages).forEach(([stage, selection]) => {
    if (selection && selection.title) {
      const stageTitle = stageTitles[stage] || stage;
      events.push(`- ${stageTitle}: ${selection.title} - ${selection.description}`);
    }
  });
  
  return events.length > 0 ? events.join('\n') : 'Nenhum evento específico registrado.';
};

export const generateCharacterStory = async (character) => {
  // Selecionar prompt específico do sistema
  const systemPrompt = SYSTEM_PROMPTS[character.gameSystem] || SYSTEM_PROMPTS.dnd;
  
  // Obter dados específicos do sistema
  const systemData = rpgSystems[character.gameSystem];
  
  // Construir prompt com dados específicos do sistema
  const enhancedPrompt = `${systemPrompt}

INFORMAÇÕES DO PERSONAGEM:
- Nome: ${character.name}
- Raça: ${character.race}
- Classe/Arquétipo: ${character.class}
- Background: ${character.background}
// Adicionar atributos específicos do sistema
${systemData.characterPromptTemplate(character)}

EVENTOS DA VIDA:
${formatLifeEvents(character.lifeStages)}

Crie uma história envolvente que faça este personagem ganhar vida!`;

  return await callGeminiAPI(enhancedPrompt);
};

export const generateStory = async (character) => {
  const archetypeInfo = archetypes.find(a => a.id === character.archetype) ||
                       { name: 'Aventureiro', description: 'Um viajante em busca de aventuras' };

  const enhancedPrompt = `CRIAÇÃO DE HISTÓRIA PARA PERSONAGEM D&D:

DADOS DO PERSONAGEM:
- Nome: ${character.name}
- Raça: ${character.race}
- Classe: ${character.class}
- Background: ${character.background}
- Arquétipo: ${archetypeInfo.name}
- Descrição do Arquétipo: ${archetypeInfo.description}

ELEMENTOS OBRIGATÓRIOS NA HISTÓRIA:
1. Origem familiar/tribal e como isso influenciou sua personalidade
2. O evento específico que levou ${character.name} a se tornar um(a) ${character.class}
3. Como o background de ${character.background} se conecta com sua jornada
4. Um conflito, perda ou desafio que ainda afeta o personagem
5. Pelo menos uma referência ao universo D&D (divindades, magias, criaturas, planos, etc.)
6. Uma motivação clara para se aventurar
7. Uma falha, medo ou fraqueza pessoal
8. Conexões com NPCs, organizações ou locais que o mestre possa usar
9. Um gancho narrativo para futuras aventuras

ESTILO:
- Narrativa envolvente e cinematográfica
- Tom heroico mas com nuances realistas
- Linguagem acessível em português brasileiro
- Foque na jornada emocional e crescimento do personagem

Crie uma história que faça o jogador se emocionar com seu personagem e dê ao mestre várias oportunidades narrativas!`;

  return await callGeminiAPI(enhancedPrompt);
};

export const generateAIResponse = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "Erro ao gerar resposta. Por favor, tente novamente.";
  }
};