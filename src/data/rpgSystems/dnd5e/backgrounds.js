const backgrounds = [
  {
    id: 'acolyte',
    name: 'Acolito',
    description: 'Você passou sua vida a serviço de um templo de um deus específico ou panteão.',
    skillProficiencies: ['Intuição', 'Religião'],
    languages: 2,
    equipment: {
      items: [
        'Símbolo sagrado',
        'Livro de orações ou roda de orações',
        '5 varetas de incenso',
        'Vestes',
        'Conjunto de roupas comuns',
        'Algibeira com 15 po'
      ]
    },
    feature: {
      name: 'Abrigo dos Fiéis',
      description: 'Você e seus companheiros aventureiros podem esperar receber cura gratuita e cuidados em um templo, santuário ou outro estabelecimento da sua fé.'
    },
    suggestedCharacteristics: {
      personality: [
        'Eu idolatro um herói particular da minha fé e constantemente me refiro aos feitos e exemplos dessa pessoa.',
        'Eu posso encontrar um terreno comum entre os inimigos mais ferozes, tendo empatia por eles e sempre trabalhando em direção à paz.'
      ],
      ideals: [
        'Tradição. As tradições antigas de adoração e sacrifício devem ser preservadas e defendidas.',
        'Caridade. Eu sempre tento ajudar aqueles em necessidade, não importa o custo pessoal.'
      ],
      bonds: [
        'Eu morreria para recuperar uma relíquia antiga da minha fé que foi perdida há muito tempo.',
        'Eu devo minha vida ao sacerdote que me acolheu quando meus pais morreram.'
      ],
      flaws: [
        'Eu julgo os outros severamente, e a mim mesmo ainda mais severamente.',
        'Eu deposito muita confiança naqueles que exercem poder dentro da hierarquia do meu templo.'
      ]
    }
  },
  {
    id: 'criminal',
    name: 'Criminoso',
    description: 'Você é um criminoso experiente com um histórico de violação da lei.',
    skillProficiencies: ['Enganação', 'Furtividade'],
    toolProficiencies: ['Kit de ladrão', 'Um tipo de kit de jogos'],
    equipment: {
      items: [
        'Pé de cabra',
        'Conjunto de roupas escuras comuns com capuz',
        'Algibeira com 15 po'
      ]
    },
    feature: {
      name: 'Contato Criminal',
      description: 'Você tem um contato confiável e digno de confiança que atua como seu intermediário para uma rede de outros criminosos.'
    },
    variant: {
      name: 'Espião',
      description: 'Embora suas capacidades não sejam muito diferentes das de um criminoso, você as aprendeu e praticou em um contexto muito diferente: como um espião.'
    },
    suggestedCharacteristics: {
      personality: [
        'Eu sempre tenho um plano para o que fazer quando as coisas dão errado.',
        'Eu sou incrivelmente lento para confiar. Aqueles que parecem os mais justos muitas vezes têm mais a esconder.'
      ],
      ideals: [
        'Honra. Eu não roubo de outros no comércio.',
        'Liberdade. Correntes são feitas para serem quebradas, assim como aqueles que as forjariam.'
      ],
      bonds: [
        'Eu sou culpado de um crime terrível. Espero que eu possa me redimir por isso.',
        'Alguém que eu amava morreu por causa de um erro que cometi. Isso nunca acontecerá novamente.'
      ],
      flaws: [
        'Quando vejo algo valioso, não consigo pensar em mais nada além de como roubá-lo.',
        'Quando confrontado com uma escolha entre dinheiro e meus amigos, eu geralmente escolho o dinheiro.'
      ]
    }
  },
  {
    id: 'folk-hero',
    name: 'Herói do Povo',
    description: 'Você vem de uma origem humilde, mas está destinado a muito mais.',
    skillProficiencies: ['Adestrar Animais', 'Sobrevivência'],
    toolProficiencies: ['Um tipo de ferramentas de artesão', 'Veículos (terrestres)'],
    equipment: {
      items: [
        'Conjunto de ferramentas de artesão',
        'Pá',
        'Conjunto de roupas de artesão',
        'Algibeira com 10 po'
      ]
    },
    feature: {
      name: 'Hospitalidade Rústica',
      description: 'Como você vem das fileiras do povo comum, você se encaixa entre eles com facilidade.'
    },
    suggestedCharacteristics: {
      personality: [
        'Eu julgo as pessoas por suas ações, não por suas palavras.',
        'Se alguém está em apuros, eu estou sempre pronto para emprestar ajuda.'
      ],
      ideals: [
        'Respeito. As pessoas merecem ser tratadas com dignidade e respeito.',
        'Justiça. Ninguém deve receber tratamento preferencial perante a lei, e ninguém está acima da lei.'
      ],
      bonds: [
        'Eu tenho uma família, mas não tenho ideia de onde eles estão. Espero vê-los novamente um dia.',
        'Eu trabalhei a terra, eu amo a terra, e eu vou proteger a terra.'
      ],
      flaws: [
        'O tirano que governa minha terra não vai parar por nada para me ver morto.',
        'Eu tenho dificuldade para confiar em meus aliados.'
      ]
    }
  },
  {
    id: 'noble',
    name: 'Nobre',
    description: 'Você entende riqueza, poder e privilégio.',
    skillProficiencies: ['História', 'Persuasão'],
    toolProficiencies: ['Um tipo de kit de jogos'],
    languages: 1,
    equipment: {
      items: [
        'Conjunto de roupas finas',
        'Anel de sinete',
        'Pergaminho de linhagem',
        'Algibeira com 25 po'
      ]
    },
    feature: {
      name: 'Posição de Privilégio',
      description: 'Graças ao seu nascimento nobre, as pessoas estão inclinadas a pensar o melhor de você.'
    },
    variant: {
      name: 'Cavaleiro',
      description: 'Um cavaleiro é um nobre nascido ou um plebeu que foi elevado à nobreza.'
    },
    suggestedCharacteristics: {
      personality: [
        'Minha bajulação eloquente faz com que todos com quem converso se sintam como a pessoa mais maravilhosa e importante do mundo.',
        'Apesar do meu nascimento nobre, eu não me coloco acima de outras pessoas. Todos nós temos o mesmo sangue.'
      ],
      ideals: [
        'Respeito. O respeito me é devido por causa da minha posição, mas todas as pessoas, independentemente da estação, merecem ser tratadas com dignidade.',
        'Responsabilidade. É meu dever respeitar a autoridade daqueles acima de mim, assim como aqueles abaixo de mim devem me respeitar.'
      ],
      bonds: [
        'Eu enfrentarei qualquer desafio para ganhar a aprovação da minha família.',
        'A aliança da minha casa com outra família nobre deve ser sustentada a todo custo.'
      ],
      flaws: [
        'Eu secretamente acredito que todos estão abaixo de mim.',
        'Eu escondo um segredo verdadeiramente escandaloso que poderia arruinar minha família para sempre.'
      ]
    }
  },
  {
    id: 'sage',
    name: 'Sábio',
    description: 'Você passou anos aprendendo a tradição do multiverso.',
    skillProficiencies: ['Arcanismo', 'História'],
    languages: 2,
    equipment: {
      items: [
        'Frasco de tinta preta',
        'Pena',
        'Faca pequena',
        'Carta de um colega morto fazendo uma pergunta que você ainda não conseguiu responder',
        'Conjunto de roupas comuns',
        'Algibeira com 10 po'
      ]
    },
    feature: {
      name: 'Pesquisador',
      description: 'Quando você tenta aprender ou lembrar de um pedaço de conhecimento, se você não souber essa informação, você frequentemente sabe onde e de quem você pode obtê-la.'
    },
    suggestedCharacteristics: {
      personality: [
        'Eu uso palavras polissilábicas que transmitem a impressão de grande erudição.',
        'Eu li todos os livros das grandes bibliotecas do mundo - ou gosto de me gabar que li.'
      ],
      ideals: [
        'Conhecimento. O caminho para o poder e a auto-melhoria é através do conhecimento.',
        'Beleza. O que é belo nos aponta além de nós mesmos em direção ao que é verdadeiro.'
      ],
      bonds: [
        'É meu dever proteger meus estudantes.',
        'Eu tenho um texto antigo que contém segredos terríveis que não devem cair em mãos erradas.'
      ],
      flaws: [
        'Eu sou facilmente distraído pelo apelo de uma boa mistério.',
        'A maioria das pessoas grita e corre quando veem um demônio, então eu paro e tomo notas sobre sua anatomia.'
      ]
    }
  },
  {
    id: 'soldier',
    name: 'Soldado',
    description: 'A guerra foi sua vida por tanto tempo quanto você se lembra.',
    skillProficiencies: ['Atletismo', 'Intimidação'],
    toolProficiencies: ['Um tipo de kit de jogos', 'Veículos (terrestres)'],
    equipment: {
      items: [
        'Insígnia de posto',
        'Troféu tirado de um inimigo caído',
        'Conjunto de cartas de baralho',
        'Conjunto de roupas comuns',
        'Algibeira com 10 po'
      ]
    },
    feature: {
      name: 'Posto Militar',
      description: 'Você tem um posto militar de sua carreira como soldado.'
    },
    variant: {
      name: 'Guarda da Cidade',
      description: 'Você foi um dos guardas da cidade responsáveis por proteger uma comunidade.'
    },
    suggestedCharacteristics: {
      personality: [
        'Eu sou sempre educado e respeitoso.',
        'Eu sou assombrado por memórias de guerra. Eu não posso tirar as imagens de violência da minha mente.'
      ],
      ideals: [
        'Bem Maior. Nosso lote é proteger e cuidar do povo, e nenhum custo é muito grande para esse fim.',
        'Responsabilidade. Eu faço o que devo e obedeço a autoridade legítima.'
      ],
      bonds: [
        'Eu lutaria até a morte pelos meus companheiros.',
        'Alguém salvou minha vida no campo de batalha. Até hoje, eu nunca deixarei um amigo para trás.'
      ],
      flaws: [
        'O inimigo monstruoso que enfrentei em batalha ainda me deixa tremendo de medo.',
        'Eu tenho pouco respeito por qualquer um que não seja um guerreiro comprovado.'
      ]
    }
  },
  {
    id: 'entertainer',
    name: 'Artista',
    description: 'Você prosperou diante de uma audiência.',
    skillProficiencies: ['Atuação', 'Acrobacia'],
    toolProficiencies: ['Kit de disfarce', 'Um tipo de instrumento musical'],
    equipment: {
      items: [
        'Instrumento musical',
        'Presente de um admirador',
        'Conjunto de roupas',
        'Algibeira com 15 po'
      ]
    },
    feature: {
      name: 'A Pedidos do Público',
      description: 'Você sempre pode encontrar um lugar para se apresentar, geralmente em uma taverna ou pousada.'
    },
    variant: {
      name: 'Gladiador',
      description: 'Um gladiador é tanto quanto um artista quanto qualquer menestrel ou ator de circo.'
    },
    suggestedCharacteristics: {
      personality: [
        'Eu conheço uma história relevante para quase todas as situações.',
        'Sempre que eu chego a um novo lugar, eu coleto rumores locais e espalho fofocas.'
      ],
      ideals: [
        'Beleza. Quando eu me apresento, eu torno o mundo melhor do que era.',
        'Tradição. As histórias, lendas e canções do passado nunca devem ser esquecidas.'
      ],
      bonds: [
        'Meu instrumento é minha posse mais preciosa, e me lembra de alguém que eu amo.',
        'Alguém roubou meu instrumento precioso, e algum dia eu vou recuperá-lo.'
      ],
      flaws: [
        'Eu farei qualquer coisa para ganhar fama e renome.',
        'Eu fico ciumento de outros artistas que podem ofuscar meu desempenho.'
      ]
    }
  },
  {
    id: 'hermit',
    name: 'Eremita',
    description: 'Você viveu em reclusão - seja em uma comunidade protegida como um mosteiro, ou inteiramente sozinho.',
    skillProficiencies: ['Medicina', 'Religião'],
    toolProficiencies: ['Kit de herbalismo'],
    languages: 1,
    equipment: {
      items: [
        'Kit de herbalismo',
        'Pergaminho de conhecimento esotérico',
        'Conjunto de roupas',
        'Algibeira com 5 po'
      ]
    },
    feature: {
      name: 'Descoberta',
      description: 'A natureza quieta e solitária de sua reclusão estendida lhe deu acesso a uma descoberta única e poderosa.'
    },
    suggestedCharacteristics: {
      personality: [
        'Eu fui isolado por tanto tempo que raramente falo, preferindo gestos e grunhidos ocasionais.',
        'Eu sou totalmente sereno, mesmo em face do desastre.'
      ],
      ideals: [
        'Bem Maior. Meus dons devem ser compartilhados com todos, não usados para meu próprio benefício.',
        'Lógica. As emoções não devem nublar nosso senso lógico de pensamento.'
      ],
      bonds: [
        'Nada é mais importante que os outros membros do meu eremitério, ordem ou associação.',
        'Eu entrei em reclusão para me esconder daqueles que ainda podem estar me caçando.'
      ],
      flaws: [
        'Agora que voltei ao mundo, eu desfruto de seus prazeres um pouco demais.',
        'Eu nutro pensamentos sombrios e sangrentos que meu isolamento e meditação falharam em silenciar.'
      ]
    }
  }
];

export default backgrounds;