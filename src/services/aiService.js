import { archetypes } from '../data/archetypes';

const GROQ_API_KEY = "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";
const GROQ_MODEL = "allam-2-7b";

const stageTitles = {
  infancy: "infância",
  earlyChildhood: "primeira infância",
  childhood: "infância",
  earlyAdolescence: "início da adolescência",
  adolescence: "adolescência",
  earlyAdulthood: "início da vida adulta",
  adulthood: "vida adulta"
};

const callGroqAPI = async (prompt) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "Você é um assistente que gera histórias detalhadas para personagens de RPG, Você deve usar estas informações para criar uma história breve de 20 linhas e no maximo 20 linhas nunca passar disso, Use Português Correto, Não cometa erros."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from Groq API");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return "Erro ao gerar história. Por favor, tente novamente.";
  }
};

export const generateCharacterDetails = (archetype) => {
  const suggestions = {
    bruto: { race: 'Meio-Orc', class: 'Bárbaro', background: 'Soldado' },
    sabio: { race: 'Elfo', class: 'Mago', background: 'Sábio' },
    assassino: { race: 'Meio-Elfo', class: 'Ladino', background: 'Criminoso' },
    guardiao: { race: 'Humano', class: 'Paladino', background: 'Acolito' },
    artista: { race: 'Halfling', class: 'Bardo', background: 'Artista' }
  };
  return Promise.resolve(suggestions[archetype] || { race: 'Humano', class: 'Guerreiro', background: 'Soldado' });
};

export const getSuggestions = (archetype) => {
  const suggestions = {
    bruto: { race: 'Meio-Orc', class: 'Bárbaro', background: 'Soldado' },
    sabio: { race: 'Elfo', class: 'Mago', background: 'Sábio' },
    assassino: { race: 'Meio-Elfo', class: 'Ladino', background: 'Criminoso' },
    guardiao: { race: 'Humano', class: 'Paladino', background: 'Acolito' },
    artista: { race: 'Halfling', class: 'Bardo', background: 'Artista' }
  };
  return suggestions[archetype] || { race: 'Humano', class: 'Guerreiro', background: 'Soldado' };
};

export const generateCharacterStory = async (character) => {
  const lifeEvents = [];
  
  if (character.lifeStages) {
    Object.entries(character.lifeStages).forEach(([stage, selection]) => {
      if (selection) {
        lifeEvents.push(`Durante sua ${stageTitles[stage] || stage}, ${selection.description}`);
      }
    });
  }
  
  const storyIntro = `${character.name} é um(a) ${character.race} ${character.class} com um passado como ${character.background}.`;
  const lifeStory = lifeEvents.length > 0 
    ? lifeEvents.join(' ') 
    : 'Sua vida foi marcada por diversos eventos que moldaram seu caráter e habilidades.';
  const storyConclusion = `Agora, ${character.name} busca seu lugar no mundo, carregando as experiências do passado e olhando para o futuro com determinação.`;
  
  const fullStory = `${storyIntro}\n\n${lifeStory}\n\n${storyConclusion}`;
  
  return await callGroqAPI(`Por favor, expanda esta história de RPG com mais detalhes e criatividade:\n\n${fullStory}`);
};

export const generateStory = async (character) => {
  const archetypeInfo = archetypes.find(a => a.id === character.archetype) || 
                       { name: 'Aventureiro', description: 'Um viajante em busca de aventuras' };
  
  const storyIntro = `${character.name} é um(a) ${character.race} ${character.class} que personifica o arquétipo do ${archetypeInfo.name}.`;
  const archetypeDescription = `${archetypeInfo.description} Esta característica define sua abordagem para os desafios e sua interação com o mundo.`;
  const backgroundStory = `Com um passado como ${character.background}, ${character.name} desenvolveu habilidades e conexões únicas que o acompanham em sua jornada.`;
  const conclusion = `Agora, ${character.name} enfrenta novos desafios, carregando consigo as lições do passado e a esperança de um futuro glorioso. Sua história continua a ser escrita a cada passo de sua aventura.`;
  
  const fullStory = `${storyIntro}\n\n${archetypeDescription}\n\n${backgroundStory}\n\n${conclusion}`;
  
  return await callGroqAPI(`Por favor, expanda esta história de RPG com mais detalhes e criatividade:\n\n${fullStory}`);
};

export const generateAIResponse = async (prompt) => {
  return await callGroqAPI(prompt);
};