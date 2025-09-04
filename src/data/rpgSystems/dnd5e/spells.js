const spells = {
  cantrips: [
    {
      id: 'acid-splash',
      name: 'Borrifo Ácido',
      level: 0,
      school: 'Conjuração',
      castingTime: '1 ação',
      range: '18 metros',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Você arremessa uma bolha de ácido. Escolha uma ou duas criaturas que você possa ver dentro do alcance.',
      classes: ['Feiticeiro', 'Mago']
    },
    {
      id: 'eldritch-blast',
      name: 'Rajada Mística',
      level: 0,
      school: 'Evocação',
      castingTime: '1 ação',
      range: '36 metros',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Um feixe de energia crepitante e crepitante atinge uma criatura dentro do alcance.',
      classes: ['Bruxo']
    },
    {
      id: 'fire-bolt',
      name: 'Dardo Ígneo',
      level: 0,
      school: 'Evocação',
      castingTime: '1 ação',
      range: '36 metros',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Você arremessa um dardo de fogo em uma criatura ou objeto dentro do alcance.',
      classes: ['Feiticeiro', 'Mago']
    },
    {
      id: 'guidance',
      name: 'Orientação',
      level: 0,
      school: 'Adivinhação',
      castingTime: '1 ação',
      range: 'Toque',
      components: 'V, S',
      duration: 'Concentração, até 1 minuto',
      description: 'Você toca uma criatura voluntária. Uma vez antes da magia acabar, o alvo pode rolar um d4.',
      classes: ['Clérigo', 'Druida']
    },
    {
      id: 'light',
      name: 'Luz',
      level: 0,
      school: 'Evocação',
      castingTime: '1 ação',
      range: 'Toque',
      components: 'V, M',
      duration: '1 hora',
      description: 'Você toca um objeto que não seja maior que 3 metros em qualquer dimensão.',
      classes: ['Bardo', 'Clérigo', 'Feiticeiro', 'Mago']
    },
    {
      id: 'mage-hand',
      name: 'Mão Arcana',
      level: 0,
      school: 'Conjuração',
      castingTime: '1 ação',
      range: '9 metros',
      components: 'V, S',
      duration: '1 minuto',
      description: 'Uma mão espectral e flutuante aparece em um ponto que você escolher dentro do alcance.',
      classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago']
    },
    {
      id: 'minor-illusion',
      name: 'Ilusão Menor',
      level: 0,
      school: 'Ilusão',
      castingTime: '1 ação',
      range: '9 metros',
      components: 'S, M',
      duration: '1 minuto',
      description: 'Você cria um som ou uma imagem de um objeto dentro do alcance que dura pela duração.',
      classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago']
    },
    {
      id: 'prestidigitation',
      name: 'Prestidigitação',
      level: 0,
      school: 'Transmutação',
      castingTime: '1 ação',
      range: '3 metros',
      components: 'V, S',
      duration: 'Até 1 hora',
      description: 'Esta magia é um truque mágico menor que conjuradores novatos usam para praticar.',
      classes: ['Bardo', 'Feiticeiro', 'Bruxo', 'Mago']
    },
    {
      id: 'sacred-flame',
      name: 'Chama Sagrada',
      level: 0,
      school: 'Evocação',
      castingTime: '1 ação',
      range: '18 metros',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Chamas divinas descem sobre uma criatura que você possa ver dentro do alcance.',
      classes: ['Clérigo']
    },
    {
      id: 'thaumaturgy',
      name: 'Taumaturgia',
      level: 0,
      school: 'Transmutação',
      castingTime: '1 ação',
      range: '9 metros',
      components: 'V',
      duration: 'Até 1 minuto',
      description: 'Você manifesta uma maravilha menor, um sinal de poder sobrenatural, dentro do alcance.',
      classes: ['Clérigo']
    }
  ],
  level1: [
    {
      id: 'cure-wounds',
      name: 'Curar Ferimentos',
      level: 1,
      school: 'Evocação',
      castingTime: '1 ação',
      range: 'Toque',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Uma criatura que você tocar recupera um número de pontos de vida igual a 1d8 + seu modificador de habilidade de conjuração.',
      classes: ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro']
    },
    {
      id: 'magic-missile',
      name: 'Mísseis Mágicos',
      level: 1,
      school: 'Evocação',
      castingTime: '1 ação',
      range: '36 metros',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Você cria três dardos brilhantes de força mágica.',
      classes: ['Feiticeiro', 'Mago']
    },
    {
      id: 'shield',
      name: 'Escudo',
      level: 1,
      school: 'Abjuração',
      castingTime: '1 reação',
      range: 'Pessoal',
      components: 'V, S',
      duration: '1 rodada',
      description: 'Uma barreira invisível de força mágica aparece e o protege.',
      classes: ['Feiticeiro', 'Mago']
    },
    {
      id: 'healing-word',
      name: 'Palavra de Cura',
      level: 1,
      school: 'Evocação',
      castingTime: '1 ação bônus',
      range: '18 metros',
      components: 'V',
      duration: 'Instantâneo',
      description: 'Uma criatura à sua escolha que você possa ver dentro do alcance recupera pontos de vida.',
      classes: ['Bardo', 'Clérigo', 'Druida']
    },
    {
      id: 'burning-hands',
      name: 'Mãos Flamejantes',
      level: 1,
      school: 'Evocação',
      castingTime: '1 ação',
      range: 'Pessoal (cone de 4,5 metros)',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Enquanto você mantém suas mãos com os polegares se tocando e os dedos espalhados, uma fina camada de chamas irrompe de seus dedos estendidos.',
      classes: ['Feiticeiro', 'Mago']
    },
    {
      id: 'detect-magic',
      name: 'Detectar Magia',
      level: 1,
      school: 'Adivinhação',
      castingTime: '1 ação',
      range: 'Pessoal',
      components: 'V, S',
      duration: 'Concentração, até 10 minutos',
      description: 'Pela duração, você sente a presença de magia a até 9 metros de você.',
      classes: ['Bardo', 'Clérigo', 'Druida', 'Paladino', 'Patrulheiro', 'Feiticeiro', 'Mago']
    },
    {
      id: 'sleep',
      name: 'Sono',
      level: 1,
      school: 'Encantamento',
      castingTime: '1 ação',
      range: '27 metros',
      components: 'V, S, M',
      duration: '1 minuto',
      description: 'Esta magia envia criaturas em um sono mágico.',
      classes: ['Bardo', 'Feiticeiro', 'Mago']
    },
    {
      id: 'thunderwave',
      name: 'Onda Trovejante',
      level: 1,
      school: 'Evocação',
      castingTime: '1 ação',
      range: 'Pessoal (cubo de 4,5 metros)',
      components: 'V, S',
      duration: 'Instantâneo',
      description: 'Uma onda de força trovejante varre de você.',
      classes: ['Bardo', 'Druida', 'Feiticeiro', 'Mago']
    }
  ],
  level2: [
    {
      id: 'fireball',
      name: 'Bola de Fogo',
      level: 3,
      school: 'Evocação',
      castingTime: '1 ação',
      range: '45 metros',
      components: 'V, S, M',
      duration: 'Instantâneo',
      description: 'Um raio brilhante lampeja de seu dedo apontado para um ponto que você escolher dentro do alcance.',
      classes: ['Feiticeiro', 'Mago']
    },
    {
      id: 'misty-step',
      name: 'Passo Sombrio',
      level: 2,
      school: 'Conjuração',
      castingTime: '1 ação bônus',
      range: 'Pessoal',
      components: 'V',
      duration: 'Instantâneo',
      description: 'Brevemente cercado por névoa prateada, você se teletransporta até 9 metros para um espaço desocupado que você possa ver.',
      classes: ['Feiticeiro', 'Bruxo', 'Mago']
    },
    {
      id: 'hold-person',
      name: 'Imobilizar Pessoa',
      level: 2,
      school: 'Encantamento',
      castingTime: '1 ação',
      range: '18 metros',
      components: 'V, S, M',
      duration: 'Concentração, até 1 minuto',
      description: 'Escolha um humanoide que você possa ver dentro do alcance.',
      classes: ['Bardo', 'Clérigo', 'Druida', 'Feiticeiro', 'Bruxo', 'Mago']
    },
    {
      id: 'spiritual-weapon',
      name: 'Arma Espiritual',
      level: 2,
      school: 'Evocação',
      castingTime: '1 ação bônus',
      range: '18 metros',
      components: 'V, S',
      duration: '1 minuto',
      description: 'Você cria uma arma espectral flutuante dentro do alcance que dura pela duração.',
      classes: ['Clérigo']
    }
  ]
};

export default spells;