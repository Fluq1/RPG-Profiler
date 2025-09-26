const classes = [
  {
    id: 'barbarian',
    name: 'Bárbaro',
    description: 'Um guerreiro primitivo feroz de origem selvagem que pode entrar em fúria de batalha.',
    hitDie: 12,
    primaryAbility: ['Força'],
    savingThrowProficiencies: ['Força', 'Constituição'],
    skillProficiencies: {
      choose: 2,
      from: ['Adestrar Animais', 'Atletismo', 'Intimidação', 'Natureza', 'Percepção', 'Sobrevivência']
    },
    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciais'],
    equipment: {
      armor: 'Armadura de couro',
      weapons: ['Machado de guerra', 'Duas machadinhas'],
      gear: ['Kit de explorador', '4 azagaias']
    },
    features: [
      { level: 1, name: 'Fúria', description: 'Pode entrar em fúria de batalha' },
      { level: 1, name: 'Defesa sem Armadura', description: 'CA = 10 + mod Des + mod Con quando não usar armadura' }
    ]
  },
  {
    id: 'bard',
    name: 'Bardo',
    description: 'Um mestre das canções, discursos e da magia que eles contêm.',
    hitDie: 8,
    primaryAbility: ['Carisma'],
    savingThrowProficiencies: ['Destreza', 'Carisma'],
    skillProficiencies: {
      choose: 3,
      from: 'Qualquer'
    },
    armorProficiencies: ['Armaduras leves'],
    weaponProficiencies: ['Armas simples', 'Bestas de mão', 'Espadas longas', 'Rapieiras', 'Espadas curtas'],
    equipment: {
      armor: 'Armadura de couro',
      weapons: ['Rapieira', 'Adaga'],
      gear: ['Kit de artista', 'Lira', 'Kit de explorador']
    },
    spellcasting: {
      ability: 'Carisma',
      cantripsKnown: { 1: 2, 4: 3, 10: 4 },
      spellsKnown: { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12, 10: 14 }
    },
    features: [
      { level: 1, name: 'Conjuração', description: 'Pode conjurar magias de bardo' },
      { level: 1, name: 'Inspiração de Bardo', description: 'Pode inspirar aliados com palavras' }
    ]
  },
  {    id: 'cleric',    name: 'Clérigo',    description: 'Um campeão divino que empunha magia divina a serviço de um poder superior.',    hitDie: 8,    primaryAbility: ['Sabedoria'],    savingThrowProficiencies: ['Sabedoria', 'Carisma'],    skillProficiencies: {      choose: 2,      from: ['História', 'Intuição', 'Medicina', 'Persuasão', 'Religião']    },    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos'],    weaponProficiencies: ['Armas simples'],    equipment: {      armor: 'Cota de malha',      weapons: ['Maça', 'Escudo'],      gear: ['Kit de sacerdote', 'Símbolo sagrado']    },    spellcasting: {      ability: 'Sabedoria',      cantripsKnown: { 1: 3, 4: 4, 10: 5 },      spellSlots: { 1: [2], 2: [3], 3: [4, 2] }    },    features: [      { level: 1, name: 'Conjuração', description: 'Pode conjurar magias divinas' },      { level: 1, name: 'Domínio Divino', description: 'Escolhe um domínio divino' }    ],    subclasses: [      {        id: 'life',        name: 'Domínio da Vida',        description: 'Foca em cura e proteção dos vivos.',        features: [          { level: 1, name: 'Magias de Domínio', description: 'Ganha magias extras de cura' },          { level: 1, name: 'Discípulo da Vida', description: 'Magias de cura restauram pontos de vida extras' }        ]      },      {        id: 'war',        name: 'Domínio da Guerra',        description: 'Combina fé com proweza marcial.',        features: [          { level: 1, name: 'Magias de Domínio', description: 'Ganha magias extras de combate' },          { level: 1, name: 'Sacerdote da Guerra', description: 'Pode fazer ataques bônus com armas' }        ]      },      {        id: 'light',        name: 'Domínio da Luz',        description: 'Canaliza o poder da luz divina.',        features: [          { level: 1, name: 'Magias de Domínio', description: 'Ganha magias extras de luz e fogo' },          { level: 1, name: 'Chama Protetora', description: 'Pode criar uma chama que protege aliados' }        ]      }    ]  },
  {
    id: 'druid',
    name: 'Druida',
    description: 'Um sacerdote da natureza, empunhando magia elemental e tendo a habilidade de se transformar em animais.',
    hitDie: 8,
    primaryAbility: ['Sabedoria'],
    savingThrowProficiencies: ['Inteligência', 'Sabedoria'],
    skillProficiencies: {
      choose: 2,
      from: ['Adestrar Animais', 'Arcanismo', 'Intuição', 'Medicina', 'Natureza', 'Percepção', 'Religião', 'Sobrevivência']
    },
    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos (não-metálicos)'],
    weaponProficiencies: ['Clavas', 'Adagas', 'Dardos', 'Azagaias', 'Maças', 'Bordões', 'Cimitarras', 'Foices', 'Fundas', 'Lanças'],
    equipment: {
      armor: 'Armadura de couro',
      weapons: ['Escudo', 'Cimitarra'],
      gear: ['Kit de explorador', 'Armadura de couro']
    },
    spellcasting: {
      ability: 'Sabedoria',
      cantripsKnown: { 1: 2, 4: 3, 10: 4 },
      spellSlots: { 1: [2], 2: [3], 3: [4, 2] }
    },
    features: [
      { level: 1, name: 'Druídico', description: 'Conhece a linguagem secreta dos druidas' },
      { level: 1, name: 'Conjuração', description: 'Pode conjurar magias de druida' }
    ]
  },
  {    id: 'fighter',    name: 'Guerreiro',    description: 'Um mestre do combate marcial, habilidoso com uma variedade de armas e armaduras.',    hitDie: 10,    primaryAbility: ['Força', 'Destreza'],    savingThrowProficiencies: ['Força', 'Constituição'],    skillProficiencies: {      choose: 2,      from: ['Acrobacia', 'Adestrar Animais', 'Atletismo', 'História', 'Intuição', 'Intimidação', 'Percepção', 'Sobrevivência']    },    armorProficiencies: ['Todas as armaduras', 'Escudos'],    weaponProficiencies: ['Armas simples', 'Armas marciais'],    equipment: {      armor: 'Cota de malha',      weapons: ['Espada longa', 'Escudo'],      gear: ['Kit de explorador', 'Besta leve com 20 virotes']    },    features: [      { level: 1, name: 'Estilo de Luta', description: 'Escolhe uma especialização em combate' },      { level: 1, name: 'Recuperação', description: 'Pode recuperar o fôlego em combate' }    ],    subclasses: [      {        id: 'champion',        name: 'Campeão',        description: 'Foca na excelência física e combate direto.',        features: [          { level: 3, name: 'Crítico Aprimorado', description: 'Acerta críticos em 19-20' },          { level: 7, name: 'Atleta Notável', description: 'Adiciona metade do bônus de proficiência em testes de Força, Destreza e Constituição' }        ]      },      {        id: 'battlemaster',        name: 'Mestre de Batalha',        description: 'Usa manobras táticas para dominar o campo de batalha.',        features: [          { level: 3, name: 'Manobras de Combate', description: 'Aprende manobras especiais de combate' },          { level: 3, name: 'Dados de Superioridade', description: 'Ganha dados especiais para usar com manobras' }        ]      },      {        id: 'eldritchknight',        name: 'Cavaleiro Arcano',        description: 'Combina magia arcana com habilidades marciais.',        features: [          { level: 3, name: 'Conjuração', description: 'Aprende a conjurar magias de mago' },          { level: 3, name: 'Vínculo com Arma', description: 'Pode invocar uma arma vinculada' }        ]      }    ]  },
  {
    id: 'monk',
    name: 'Monge',
    description: 'Um mestre das artes marciais, aproveitando o poder do corpo em busca da perfeição física e espiritual.',
    hitDie: 8,
    primaryAbility: ['Destreza', 'Sabedoria'],
    savingThrowProficiencies: ['Força', 'Destreza'],
    skillProficiencies: {
      choose: 2,
      from: ['Acrobacia', 'Atletismo', 'Furtividade', 'História', 'Intuição', 'Religião']
    },
    armorProficiencies: [],
    weaponProficiencies: ['Armas simples', 'Espadas curtas'],
    equipment: {
      armor: 'Nenhuma',
      weapons: ['Espada curta', '10 dardos'],
      gear: ['Kit de explorador']
    },
    features: [
      { level: 1, name: 'Defesa sem Armadura', description: 'CA = 10 + mod Des + mod Sab quando não usar armadura' },
      { level: 1, name: 'Artes Marciais', description: 'Pode usar Destreza para ataques desarmados' }
    ]
  },
  {
    id: 'paladin',
    name: 'Paladino',
    description: 'Um guerreiro sagrado ligado a um juramento sagrado.',
    hitDie: 10,
    primaryAbility: ['Força', 'Carisma'],
    savingThrowProficiencies: ['Sabedoria', 'Carisma'],
    skillProficiencies: {
      choose: 2,
      from: ['Atletismo', 'Intuição', 'Intimidação', 'Medicina', 'Persuasão', 'Religião']
    },
    armorProficiencies: ['Todas as armaduras', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciais'],
    equipment: {
      armor: 'Cota de malha',
      weapons: ['Espada longa', 'Escudo'],
      gear: ['Kit de explorador', 'Símbolo sagrado', '5 azagaias']
    },
    spellcasting: {
      ability: 'Carisma',
      spellSlots: { 2: [2], 3: [3], 4: [3], 5: [4, 2] }
    },
    features: [
      { level: 1, name: 'Sentido Divino', description: 'Pode detectar celestiais, mortos-vivos e demônios' },
      { level: 1, name: 'Cura pelas Mãos', description: 'Pode curar ferimentos pelo toque' }
    ]
  },
  {
    id: 'ranger',
    name: 'Patrulheiro',
    description: 'Um guerreiro das terras selvagens, habilidoso em rastreamento, sobrevivência e combate.',
    hitDie: 10,
    primaryAbility: ['Destreza', 'Sabedoria'],
    savingThrowProficiencies: ['Força', 'Destreza'],
    skillProficiencies: {
      choose: 3,
      from: ['Adestrar Animais', 'Atletismo', 'Furtividade', 'Intuição', 'Investigação', 'Natureza', 'Percepção', 'Sobrevivência']
    },
    armorProficiencies: ['Armaduras leves', 'Armaduras médias', 'Escudos'],
    weaponProficiencies: ['Armas simples', 'Armas marciais'],
    equipment: {
      armor: 'Armadura de couro batido',
      weapons: ['Espada curta', 'Arco longo'],
      gear: ['Kit de explorador', 'Aljava com 20 flechas']
    },
    spellcasting: {
      ability: 'Sabedoria',
      spellSlots: { 2: [2], 3: [3], 4: [3], 5: [4, 2] }
    },
    features: [
      { level: 1, name: 'Inimigo Favorito', description: 'Escolhe um tipo de criatura como inimigo favorito' },
      { level: 1, name: 'Explorador Natural', description: 'Escolhe um terreno favorito' }
    ]
  },
  {
    id: 'rogue',
    name: 'Ladino',
    description: 'Um canalha que usa furtividade e truques para superar obstáculos e inimigos.',
    hitDie: 8,
    primaryAbility: ['Destreza'],
    savingThrowProficiencies: ['Destreza', 'Inteligência'],
    skillProficiencies: {
      choose: 4,
      from: ['Acrobacia', 'Atletismo', 'Atuação', 'Enganação', 'Furtividade', 'Intimidação', 'Intuição', 'Investigação', 'Percepção', 'Persuasão', 'Prestidigitação', 'Sobrevivência']
    },
    armorProficiencies: ['Armaduras leves'],
    weaponProficiencies: ['Armas simples', 'Bestas de mão', 'Espadas longas', 'Rapieiras', 'Espadas curtas'],
    equipment: {
      armor: 'Armadura de couro',
      weapons: ['Rapieira', 'Espada curta'],
      gear: ['Kit de ladrão', 'Kit de explorador', '2 adagas']
    },
    features: [
      { level: 1, name: 'Especialização', description: 'Dobra bônus de proficiência em certas perícias' },
      { level: 1, name: 'Ataque Furtivo', description: 'Causa dano extra em ataques furtivos' },
      { level: 1, name: 'Gíria de Ladrão', description: 'Conhece a linguagem secreta dos ladinos' }
    ]
  },
  {
    id: 'sorcerer',
    name: 'Feiticeiro',
    description: 'Um conjurador que extrai sua magia inata de uma fonte dracônica ou outra origem exótica.',
    hitDie: 6,
    primaryAbility: ['Carisma'],
    savingThrowProficiencies: ['Constituição', 'Carisma'],
    skillProficiencies: {
      choose: 2,
      from: ['Arcanismo', 'Enganação', 'Intimidação', 'Intuição', 'Persuasão', 'Religião']
    },
    armorProficiencies: [],
    weaponProficiencies: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves'],
    equipment: {
      armor: 'Nenhuma',
      weapons: ['Besta leve', '2 adagas'],
      gear: ['Kit de explorador', 'Foco arcano']
    },
    spellcasting: {
      ability: 'Carisma',
      cantripsKnown: { 1: 4, 4: 5, 10: 6 },
      spellsKnown: { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11 },
      spellSlots: { 1: [2], 2: [3], 3: [4, 2], 4: [4, 3], 5: [4, 3, 2] }
    },
    features: [
      { level: 1, name: 'Conjuração', description: 'Pode conjurar magias de feiticeiro' },
      { level: 1, name: 'Origem Sorcera', description: 'Escolhe a origem de seus poderes mágicos' }
    ]
  },
  {
    id: 'warlock',
    name: 'Bruxo',
    description: 'Um conjurador que fez um pacto com uma entidade extraplanar.',
    hitDie: 8,
    primaryAbility: ['Carisma'],
    savingThrowProficiencies: ['Sabedoria', 'Carisma'],
    skillProficiencies: {
      choose: 2,
      from: ['Arcanismo', 'Enganação', 'História', 'Intimidação', 'Investigação', 'Natureza', 'Religião']
    },
    armorProficiencies: ['Armaduras leves'],
    weaponProficiencies: ['Armas simples'],
    equipment: {
      armor: 'Armadura de couro',
      weapons: ['Besta leve', '2 adagas'],
      gear: ['Kit de explorador', 'Foco arcano']
    },
    spellcasting: {
      ability: 'Carisma',
      cantripsKnown: { 1: 2, 4: 3, 10: 4 },
      spellsKnown: { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11 },
      spellSlots: { 1: [1], 2: [2], 3: [2], 4: [2], 5: [2] },
      pactMagic: true
    },
    features: [
      { level: 1, name: 'Patrono Transcendental', description: 'Fez um pacto com uma entidade poderosa' },
      { level: 1, name: 'Magia de Pacto', description: 'Conjura magias usando espaços de magia de pacto' }
    ]
  },
  {    id: 'wizard',    name: 'Mago',    description: 'Um usuário de magia erudito capaz de manipular as estruturas da realidade.',    hitDie: 6,    primaryAbility: ['Inteligência'],    savingThrowProficiencies: ['Inteligência', 'Sabedoria'],    skillProficiencies: {      choose: 2,      from: ['Arcanismo', 'História', 'Intuição', 'Investigação', 'Medicina', 'Religião']    },    armorProficiencies: [],    weaponProficiencies: ['Adagas', 'Dardos', 'Fundas', 'Bordões', 'Bestas leves'],    equipment: {      armor: 'Nenhuma',      weapons: ['Bordão', 'Adaga'],      gear: ['Kit de erudito', 'Livro de magias', 'Foco arcano']    },    spellcasting: {      ability: 'Inteligência',      cantripsKnown: { 1: 3, 4: 4, 10: 5 },      spellSlots: { 1: [2], 2: [3], 3: [4, 2], 4: [4, 3], 5: [4, 3, 2] },      ritualCasting: true,      spellbook: true    },    features: [      { level: 1, name: 'Conjuração', description: 'Pode conjurar magias de mago' },      { level: 1, name: 'Recuperação Arcana', description: 'Pode recuperar espaços de magia uma vez por dia' }    ],    subclasses: [      {        id: 'evocation',        name: 'Escola de Evocação',        description: 'Especializa-se em magias de dano e energia.',        features: [          { level: 2, name: 'Esculpir Magias', description: 'Pode proteger aliados de suas magias de área' },          { level: 6, name: 'Truque Potente', description: 'Truques de dano ignoram resistências' }        ]      },      {        id: 'abjuration',        name: 'Escola de Abjuração',        description: 'Foca em proteção e banimento.',        features: [          { level: 2, name: 'Proteção Arcana', description: 'Cria uma barreira mágica protetora' },          { level: 6, name: 'Proteção Projetada', description: 'Pode usar sua proteção para defender aliados' }        ]      },      {        id: 'divination',        name: 'Escola de Divinação',        description: 'Especializa-se em prever e alterar o destino.',        features: [          { level: 2, name: 'Presságio', description: 'Pode substituir rolagens de dados' },          { level: 6, name: 'Especialista em Presságio', description: 'Recupera usos de presságio mais rapidamente' }        ]      }    ]  }
];

export default classes;