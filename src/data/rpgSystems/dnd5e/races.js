const races = [
  {
    id: 'human',
    name: 'Humano',
    description: 'Versáteis e adaptáveis, os humanos são a raça mais comum.',
    abilityScoreIncrease: { all: 1 },
    speed: 30,
    languages: ['Comum', 'Um idioma adicional à escolha'],
    traits: [
      {
        name: 'Versátil',
        description: 'Você ganha proficiência em uma perícia à sua escolha.'
      }
    ],
    subraces: []
  },
  {
    id: 'dwarf',
    name: 'Anão',
    description: 'Ousados e resistentes, os anões são conhecidos como guerreiros habilidosos, mineradores e trabalhadores em pedra e metal.',
    abilityScoreIncrease: { Constitution: 2 },
    speed: 25,
    languages: ['Comum', 'Anão'],
    traits: [
      {
        name: 'Visão no Escuro',
        description: 'Você pode ver no escuro a até 18 metros.'
      },
      {
        name: 'Resistência Anã',
        description: 'Vantagem em testes de resistência contra veneno.'
      },
      {
        name: 'Treinamento Anão em Combate',
        description: 'Proficiência com machados de guerra, machadinhas, martelos leves e martelos de guerra.'
      },
      {
        name: 'Proficiência com Ferramentas',
        description: 'Proficiência com ferramentas de artesão (ferreiro, cervejeiro ou pedreiro).'
      },
      {
        name: 'Especialização em Rochas',
        description: 'Dobra o bônus de proficiência em testes de História relacionados à origem de trabalhos em pedra.'
      }
    ],
    subraces: [
      {
        id: 'mountain_dwarf',
        name: 'Anão da Montanha',
        description: 'Como um anão da montanha, você é forte e resistente, acostumado com uma vida difícil em terrenos acidentados.',
        abilityScoreIncrease: { Strength: 2 },
        traits: [
          {
            name: 'Proficiência com Armaduras',
            description: 'Proficiência com armaduras leves e médias.'
          }
        ]
      },
      {
        id: 'hill_dwarf',
        name: 'Anão da Colina',
        description: 'Como um anão da colina, você tem sentidos aguçados, intuição profunda e resistência notável.',
        abilityScoreIncrease: { Wisdom: 1 },
        traits: [
          {
            name: 'Tenacidade Anã',
            description: 'Seu máximo de pontos de vida aumenta em 1, e aumenta em 1 novamente sempre que você ganha um nível.'
          }
        ]
      }
    ]
  },
  {
    id: 'elf',
    name: 'Elfo',
    description: 'Elfos são um povo mágico de graça sobrenatural, vivendo no mundo sem pertencer inteiramente a ele.',
    abilityScoreIncrease: { Dexterity: 2 },
    speed: 30,
    languages: ['Comum', 'Élfico'],
    traits: [
      {
        name: 'Visão no Escuro',
        description: 'Você pode ver no escuro a até 18 metros.'
      },
      {
        name: 'Sentidos Aguçados',
        description: 'Proficiência na perícia Percepção.'
      },
      {
        name: 'Ancestralidade Feérica',
        description: 'Vantagem em testes de resistência contra ser enfeitiçado, e magia não pode colocá-lo para dormir.'
      },
      {
        name: 'Transe',
        description: 'Elfos não precisam dormir. Em vez disso, eles meditam profundamente por 4 horas por dia.'
      }
    ],
    subraces: [
      {
        id: 'high_elf',
        name: 'Alto Elfo',
        description: 'Como um alto elfo, você tem uma mente aguçada e domina pelo menos o básico da magia.',
        abilityScoreIncrease: { Intelligence: 1 },
        traits: [
          {
            name: 'Treinamento Élfico com Armas',
            description: 'Proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.'
          },
          {
            name: 'Truque',
            description: 'Você conhece um truque à sua escolha da lista de magias de mago.'
          },
          {
            name: 'Idioma Adicional',
            description: 'Você pode falar, ler e escrever um idioma adicional à sua escolha.'
          }
        ]
      },
      {
        id: 'wood_elf',
        name: 'Elfo da Floresta',
        description: 'Como um elfo da floresta, você tem sentidos aguçados e intuição, e seus pés ligeiros o carregam rapidamente através de suas florestas nativas.',
        abilityScoreIncrease: { Wisdom: 1 },
        traits: [
          {
            name: 'Treinamento Élfico com Armas',
            description: 'Proficiência com espadas longas, espadas curtas, arcos longos e arcos curtos.'
          },
          {
            name: 'Pés Ligeiros',
            description: 'Sua velocidade base de caminhada aumenta para 10,5 metros.'
          },
          {
            name: 'Máscara da Natureza',
            description: 'Você pode tentar se esconder mesmo quando apenas levemente obscurecido por folhagem, chuva forte, neve, névoa e outros fenômenos naturais.'
          }
        ]
      },
      {
        id: 'dark_elf',
        name: 'Elfo Sombrio (Drow)',
        description: 'Descendentes de uma subraça élfica mais antiga de pele escura, os drow foram banidos da superfície por seguirem a deusa Lolth.',
        abilityScoreIncrease: { Charisma: 1 },
        traits: [
          {
            name: 'Visão no Escuro Superior',
            description: 'Sua visão no escuro tem alcance de 36 metros.'
          },
          {
            name: 'Sensibilidade à Luz Solar',
            description: 'Desvantagem em jogadas de ataque e testes de Percepção que dependem da visão quando você, o alvo do seu ataque, ou qualquer coisa que você está tentando perceber está sob luz solar direta.'
          },
          {
            name: 'Magia Drow',
            description: 'Você conhece o truque luzes dançantes. Quando você alcança o 3º nível, pode conjurar a magia fogo das fadas uma vez por dia. Quando alcança o 5º nível, pode conjurar escuridão uma vez por dia.'
          },
          {
            name: 'Treinamento Drow com Armas',
            description: 'Proficiência com rapieiras, espadas curtas e bestas de mão.'
          }
        ]
      }
    ]
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Os halflings são um povo afável que valoriza o lar, raramente sendo tentados pela estrada.',
    abilityScoreIncrease: { Dexterity: 2 },
    speed: 25,
    languages: ['Comum', 'Halfling'],
    traits: [
      {
        name: 'Sortudo',
        description: 'Quando você rolar um 1 natural em uma jogada de ataque, teste de habilidade ou teste de resistência, você pode rolar o dado novamente e deve usar o novo resultado.'
      },
      {
        name: 'Bravura',
        description: 'Vantagem em testes de resistência contra ser amedrontado.'
      },
      {
        name: 'Agilidade Halfling',
        description: 'Você pode mover-se através do espaço de qualquer criatura que seja de um tamanho maior que o seu.'
      }
    ],
    subraces: [
      {
        id: 'lightfoot_halfling',
        name: 'Halfling Pés-leves',
        description: 'Como um halfling pés-leves, você pode facilmente se esconder de percepção, até mesmo usando outras pessoas como cobertura.',
        abilityScoreIncrease: { Charisma: 1 },
        traits: [
          {
            name: 'Furtividade Natural',
            description: 'Você pode tentar se esconder mesmo quando obscurecido apenas por uma criatura que seja pelo menos um tamanho maior que você.'
          }
        ]
      },
      {
        id: 'stout_halfling',
        name: 'Halfling Robusto',
        description: 'Como um halfling robusto, você é mais resistente que a média e tem alguma resistência a venenos.',
        abilityScoreIncrease: { Constitution: 1 },
        traits: [
          {
            name: 'Resistência Robusta',
            description: 'Vantagem em testes de resistência contra veneno e resistência a dano de veneno.'
          }
        ]
      }
    ]
  },
  {
    id: 'dragonborn',
    name: 'Draconato',
    description: 'Nascidos de dragões, como seu nome proclama, os draconatos caminham orgulhosamente através de um mundo que os recebe com incompreensão temerosa.',
    abilityScoreIncrease: { Strength: 2, Charisma: 1 },
    speed: 30,
    languages: ['Comum', 'Dracônico'],
    traits: [
      {
        name: 'Ancestralidade Dracônica',
        description: 'Você tem ancestralidade dracônica. Escolha um tipo de dragão da tabela de Ancestralidade Dracônica. Sua arma de sopro e resistência a dano são determinadas pelo tipo de dragão.'
      },
      {
        name: 'Arma de Sopro',
        description: 'Você pode usar sua ação para exalar energia destrutiva. Quando você usa sua arma de sopro, cada criatura na área da exalação deve fazer um teste de resistência.'
      },
      {
        name: 'Resistência a Dano',
        description: 'Você tem resistência ao tipo de dano associado à sua ancestralidade dracônica.'
      }
    ],
    subraces: [
      {
        id: 'chromatic_dragonborn',
        name: 'Draconato Cromático',
        description: 'Descendente de dragões cromáticos malignos, você carrega a herança de poder destrutivo.',
        abilityScoreIncrease: {},
        traits: [
          {
            name: 'Resistência Cromática',
            description: 'Escolha um tipo de dragão cromático. Você tem resistência ao tipo de dano associado.'
          },
          {
            name: 'Arma de Sopro Cromática',
            description: 'Sua arma de sopro causa o tipo de dano associado à sua ancestralidade cromática.'
          }
        ]
      },
      {
        id: 'metallic_dragonborn',
        name: 'Draconato Metálico',
        description: 'Descendente de dragões metálicos benevolentes, você possui uma natureza mais nobre.',
        abilityScoreIncrease: {},
        traits: [
          {
            name: 'Resistência Metálica',
            description: 'Escolha um tipo de dragão metálico. Você tem resistência ao tipo de dano associado.'
          },
          {
            name: 'Arma de Sopro Metálica',
            description: 'Sua arma de sopro causa o tipo de dano associado à sua ancestralidade metálica.'
          }
        ]
      },
      {
        id: 'gem_dragonborn',
        name: 'Draconato de Gema',
        description: 'Descendente de dragões de gema psíquicos, você possui habilidades mentais únicas.',
        abilityScoreIncrease: {},
        traits: [
          {
            name: 'Resistência Psíquica',
            description: 'Você tem resistência a dano psíquico.'
          },
          {
            name: 'Arma de Sopro Psíquica',
            description: 'Sua arma de sopro causa dano psíquico em uma área cônica.'
          }
        ]
      }
    ]
  },
  {
    id: 'gnome',
    name: 'Gnomo',
    description: 'Um gnomo é uma criatura pequena e vibrante com uma curiosidade natural que frequentemente os mete em encrencas.',
    abilityScoreIncrease: { Intelligence: 2 },
    speed: 25,
    languages: ['Comum', 'Gnômico'],
    traits: [
      {
        name: 'Visão no Escuro',
        description: 'Você pode ver no escuro a até 18 metros.'
      },
      {
        name: 'Esperteza Gnômica',
        description: 'Vantagem em todos os testes de resistência de Inteligência, Sabedoria e Carisma contra magia.'
      }
    ],
    subraces: [
      {
        id: 'forest_gnome',
        name: 'Gnomo da Floresta',
        description: 'Como um gnomo da floresta, você tem um instinto natural para ilusão e velocidade herdada.',
        abilityScoreIncrease: { Dexterity: 1 },
        traits: [
          {
            name: 'Ilusionista Natural',
            description: 'Você conhece o truque ilusão menor. Inteligência é sua habilidade de conjuração para ele.'
          },
          {
            name: 'Falar com Bestas Pequenas',
            description: 'Através de sons e gestos, você pode comunicar ideias simples com bestas Pequenas ou menores.'
          }
        ]
      },
      {
        id: 'rock_gnome',
        name: 'Gnomo da Rocha',
        description: 'Como um gnomo da rocha, você tem uma inventividade natural e resistência mais que a maioria dos outros gnomos.',
        abilityScoreIncrease: { Constitution: 1 },
        traits: [
          {
            name: 'Conhecimento de Artífice',
            description: 'Sempre que você fizer um teste de Inteligência (História) relacionado a itens mágicos, objetos alquímicos ou dispositivos tecnológicos, você pode adicionar o dobro do seu bônus de proficiência.'
          },
          {
            name: 'Engenhoqueiro',
            description: 'Você tem proficiência com ferramentas de artesão (ferramentas de engenhoqueiro). Usando essas ferramentas, você pode gastar 1 hora e 10 po em materiais para construir um dispositivo mecânico Miúdo.'
          }
        ]
      }
    ]
  },
  {
    id: 'half_elf',
    name: 'Meio-elfo',
    description: 'Caminhando em dois mundos mas não pertencendo verdadeiramente a nenhum, meio-elfos combinam o que alguns dizem serem as melhores qualidades de seus pais elfos e humanos.',
    abilityScoreIncrease: { Charisma: 2, 'two_different': 1 },
    speed: 30,
    languages: ['Comum', 'Élfico', 'Um idioma adicional à escolha'],
    traits: [
      {
        name: 'Visão no Escuro',
        description: 'Você pode ver no escuro a até 18 metros.'
      },
      {
        name: 'Ancestralidade Feérica',
        description: 'Vantagem em testes de resistência contra ser enfeitiçado, e magia não pode colocá-lo para dormir.'
      },
      {
        name: 'Versatilidade em Perícias',
        description: 'Você ganha proficiência em duas perícias à sua escolha.'
      }
    ],
    subraces: []
  },
  {
    id: 'half_orc',
    name: 'Meio-orc',
    description: 'Seja unidos sob a liderança de um poderoso bruxo ou tendo lutado para sobreviver, meio-orcs e seus clãs orcs viveram sua vida.',
    abilityScoreIncrease: { Strength: 2, Constitution: 1 },
    speed: 30,
    languages: ['Comum', 'Orc'],
    traits: [
      {
        name: 'Visão no Escuro',
        description: 'Você pode ver no escuro a até 18 metros.'
      },
      {
        name: 'Resistência Implacável',
        description: 'Quando você é reduzido a 0 pontos de vida mas não morto, você pode voltar a 1 ponto de vida. Você não pode usar essa característica novamente até terminar um descanso longo.'
      },
      {
        name: 'Ataques Selvagens',
        description: 'Quando você consegue um acerto crítico com um ataque corpo a corpo, você pode rolar um dos dados de dano da arma mais uma vez e adicioná-lo ao dano extra do acerto crítico.'
      },
      {
        name: 'Ameaçador',
        description: 'Você ganha proficiência na perícia Intimidação.'
      }
    ],
    subraces: []
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Ser recebido com olhares e sussurros, sofrer violência e insultos na rua, ver desconfiança e medo nos olhos de cada pessoa que encontra.',
    abilityScoreIncrease: { Charisma: 2 },
    speed: 30,
    languages: ['Comum', 'Infernal'],
    traits: [
      {
        name: 'Visão no Escuro',
        description: 'Você pode ver no escuro a até 18 metros.'
      },
      {
        name: 'Resistência Infernal',
        description: 'Você tem resistência a dano de fogo.'
      }
    ],
    subraces: [
      {
        id: 'asmodeus_tiefling',
        name: 'Tiefling de Asmodeus',
        description: 'Os tieflings ligados a Nessus comandam o poder do fogo e da escuridão, guiados por uma mente aguçada.',
        abilityScoreIncrease: { Intelligence: 1 },
        traits: [
          {
            name: 'Legado Infernal',
            description: 'Você conhece o truque taumaturgia. Quando você alcança o 3º nível, pode conjurar a magia repreensão infernal uma vez por dia. Quando alcança o 5º nível, pode conjurar escuridão uma vez por dia.'
          }
        ]
      },
      {
        id: 'baalzebul_tiefling',
        name: 'Tiefling de Baalzebul',
        description: 'Os tieflings ligados a Baalzebul dominam a corrupção e a deterioração.',
        abilityScoreIncrease: { Intelligence: 1 },
        traits: [
          {
            name: 'Legado de Baalzebul',
            description: 'Você conhece o truque taumaturgia. Quando você alcança o 3º nível, pode conjurar a magia raio do enfraquecimento uma vez por dia. Quando alcança o 5º nível, pode conjurar coroa da loucura uma vez por dia.'
          }
        ]
      },
      {
        id: 'dispater_tiefling',
        name: 'Tiefling de Dispater',
        description: 'Os tieflings ligados a Dispater são mestres da intriga e da manipulação.',
        abilityScoreIncrease: { Dexterity: 1 },
        traits: [
          {
            name: 'Legado de Dispater',
            description: 'Você conhece o truque taumaturgia. Quando você alcança o 3º nível, pode conjurar a magia disfarçar-se uma vez por dia. Quando alcança o 5º nível, pode conjurar detectar pensamentos uma vez por dia.'
          }
        ]
      },
      {
        id: 'fierna_tiefling',
        name: 'Tiefling de Fierna',
        description: 'Os tieflings ligados a Fierna dominam o fogo e o charme.',
        abilityScoreIncrease: { Wisdom: 1 },
        traits: [
          {
            name: 'Legado de Fierna',
            description: 'Você conhece o truque amizade. Quando você alcança o 3º nível, pode conjurar a magia enfeitiçar pessoa uma vez por dia. Quando alcança o 5º nível, pode conjurar sugestão uma vez por dia.'
          }
        ]
      },
      {
        id: 'glasya_tiefling',
        name: 'Tiefling de Glasya',
        description: 'Os tieflings ligados a Glasya são mestres da ilusão e do engano.',
        abilityScoreIncrease: { Dexterity: 1 },
        traits: [
          {
            name: 'Legado de Glasya',
            description: 'Você conhece o truque ilusão menor. Quando você alcança o 3º nível, pode conjurar a magia disfarçar-se uma vez por dia. Quando alcança o 5º nível, pode conjurar invisibilidade uma vez por dia.'
          }
        ]
      },
      {
        id: 'levistus_tiefling',
        name: 'Tiefling de Levistus',
        description: 'Os tieflings ligados a Levistus comandam o gelo e a sobrevivência.',
        abilityScoreIncrease: { Constitution: 1 },
        traits: [
          {
            name: 'Legado de Levistus',
            description: 'Você conhece o truque rajada de vento. Quando você alcança o 3º nível, pode conjurar a magia armadura de Agathys uma vez por dia. Quando alcança o 5º nível, pode conjurar escuridão uma vez por dia.'
          }
        ]
      },
      {
        id: 'mammon_tiefling',
        name: 'Tiefling de Mammon',
        description: 'Os tieflings ligados a Mammon são obcecados por riqueza e ganância.',
        abilityScoreIncrease: { Intelligence: 1 },
        traits: [
          {
            name: 'Legado de Mammon',
            description: 'Você conhece o truque mão do mago. Quando você alcança o 3º nível, pode conjurar a magia enfeitiçar pessoa uma vez por dia. Quando alcança o 5º nível, pode conjurar arcanotruque uma vez por dia.'
          }
        ]
      },
      {
        id: 'mephistopheles_tiefling',
        name: 'Tiefling de Mefistófeles',
        description: 'Os tieflings ligados a Mefistófeles são mestres da magia arcana.',
        abilityScoreIncrease: { Intelligence: 1 },
        traits: [
          {
            name: 'Legado de Mefistófeles',
            description: 'Você conhece o truque mão do mago. Quando você alcança o 3º nível, pode conjurar a magia mãos flamejantes uma vez por dia. Quando alcança o 5º nível, pode conjurar esfera flamejante uma vez por dia.'
          }
        ]
      },
      {
        id: 'zariel_tiefling',
        name: 'Tiefling de Zariel',
        description: 'Os tieflings ligados a Zariel são guerreiros ferozes com sede de batalha.',
        abilityScoreIncrease: { Strength: 1 },
        traits: [
          {
            name: 'Legado de Zariel',
            description: 'Você conhece o truque taumaturgia. Quando você alcança o 3º nível, pode conjurar a magia repreensão infernal uma vez por dia. Quando alcança o 5º nível, pode conjurar esfera flamejante uma vez por dia.'
          }
        ]
      }
     ]
  },
  {
    id: 'aarakocra',
    name: 'Aarakocra',
    description: 'Sequestered in high mountains atop tall trees, the aarakocra evoke wonder and fear.',
    abilityScoreIncrease: { Dexterity: 2, Wisdom: 1 },
    speed: 25,
    languages: ['Comum', 'Aarakocra'],
    traits: [
      {
        name: 'Voo',
        description: 'Você tem velocidade de voo de 15 metros. Para usar essa velocidade, você não pode estar vestindo armadura média ou pesada.'
      },
      {
        name: 'Garras',
        description: 'Você tem garras que são armas naturais, que você pode usar para fazer ataques desarmados.'
      }
    ],
    subraces: []
  },
  {
    id: 'aasimar',
    name: 'Aasimar',
    description: 'Aasimar bear within their souls the light of the heavens.',
    abilityScoreIncrease: { Charisma: 2 },
    speed: 30,
    languages: ['Comum', 'Celestial'],
    traits: [
      {
        name: 'Visão no Escuro',
        description: 'Você pode ver no escuro a até 18 metros.'
      },
      {
        name: 'Resistência Celestial',
        description: 'Você tem resistência a dano radiante e necrótico.'
      },
      {
        name: 'Mãos Curadoras',
        description: 'Como uma ação, você pode tocar uma criatura e fazer com que ela recupere pontos de vida iguais ao seu nível.'
      },
      {
        name: 'Portador da Luz',
        description: 'Você conhece o truque luz. Carisma é sua habilidade de conjuração para ele.'
      }
    ],
    subraces: [
      {
        id: 'protector_aasimar',
        name: 'Aasimar Protetor',
        description: 'Protector aasimar are charged by the powers of good to guard the weak.',
        abilityScoreIncrease: { Wisdom: 1 },
        traits: [
          {
            name: 'Alma Radiante',
            description: 'A partir do 3º nível, você pode usar sua ação para liberar a energia divina dentro de você, fazendo com que suas asas espectrais brotem das suas costas.'
          }
        ]
      },
      {
        id: 'scourge_aasimar',
        name: 'Aasimar Flagelo',
        description: 'Scourge aasimar are imbued with a divine energy that blazes intensely within them.',
        abilityScoreIncrease: { Constitution: 1 },
        traits: [
          {
            name: 'Radiância Consumidora',
            description: 'A partir do 3º nível, você pode usar sua ação para liberar a energia divina dentro de você, fazendo com que luz radiante derrame do seu corpo.'
          }
        ]
      },
      {
        id: 'fallen_aasimar',
        name: 'Aasimar Caído',
        description: 'Fallen aasimar have turned to evil, and their angelic guide is now a fiendish entity.',
        abilityScoreIncrease: { Strength: 1 },
        traits: [
          {
            name: 'Mortalha Necrótica',
            description: 'A partir do 3º nível, você pode usar sua ação para liberar a energia divina dentro de você, fazendo com que suas asas esqueléticas brotem das suas costas.'
          }
        ]
      }
    ]
  },
  {
    id: 'firbolg',
    name: 'Firbolg',
    description: 'Firbolg tribes cloister in remote forest strongholds, preferring to spend their days in quiet harmony with the woods.',
    abilityScoreIncrease: { Wisdom: 2, Strength: 1 },
    speed: 30,
    languages: ['Comum', 'Élfico', 'Gigante'],
    traits: [
      {
        name: 'Magia Firbolg',
        description: 'Você pode conjurar detectar magia e disfarçar-se com essa característica, usando Sabedoria como sua habilidade de conjuração.'
      },
      {
        name: 'Fala Oculta',
        description: 'Você pode se comunicar de forma limitada com bestas e plantas.'
      },
      {
        name: 'Força Poderosa',
        description: 'Você conta como um tamanho maior quando determina sua capacidade de carga e o peso que você pode empurrar, arrastar ou levantar.'
      }
    ],
    subraces: []
  },
  {
    id: 'genasi',
    name: 'Genasi',
    description: 'Those who think of other planes at all consider them remote, distant realms, but planar influence can be felt throughout the world.',
    abilityScoreIncrease: { Constitution: 2 },
    speed: 30,
    languages: ['Comum', 'Primordial'],
    traits: [],
    subraces: [
      {
        id: 'air_genasi',
        name: 'Genasi do Ar',
        description: 'Air genasi are descended from djinn, the genies of the Elemental Plane of Air.',
        abilityScoreIncrease: { Dexterity: 1 },
        traits: [
          {
            name: 'Respiração Infinita',
            description: 'Você pode prender a respiração indefinidamente enquanto não estiver incapacitado.'
          },
          {
            name: 'Magia Mephit',
            description: 'Você conhece o truque rajada de vento. Quando você alcança o 3º nível, pode conjurar a magia levitar uma vez por dia.'
          }
        ]
      },
      {
        id: 'earth_genasi',
        name: 'Genasi da Terra',
        description: 'Earth genasi are descended from dao, the genies of the Elemental Plane of Earth.',
        abilityScoreIncrease: { Strength: 1 },
        traits: [
          {
            name: 'Passagem pela Terra',
            description: 'Você pode se mover através de terreno difícil feito de terra ou pedra sem gastar movimento extra.'
          },
          {
            name: 'Magia Mephit',
            description: 'Você conhece o truque moldar terra. Quando você alcança o 3º nível, pode conjurar a magia passos sem pegadas uma vez por dia.'
          }
        ]
      },
      {
        id: 'fire_genasi',
        name: 'Genasi do Fogo',
        description: 'Fire genasi are descended from efreet, the genies of the Elemental Plane of Fire.',
        abilityScoreIncrease: { Intelligence: 1 },
        traits: [
          {
            name: 'Visão no Escuro',
            description: 'Você pode ver no escuro a até 18 metros.'
          },
          {
            name: 'Resistência ao Fogo',
            description: 'Você tem resistência a dano de fogo.'
          },
          {
            name: 'Alcançar o Blaze',
            description: 'Você conhece o truque produzir chama. Quando você alcança o 3º nível, pode conjurar a magia mãos flamejantes uma vez por dia.'
          }
        ]
      },
      {
        id: 'water_genasi',
        name: 'Genasi da Água',
        description: 'Water genasi are descended from marids, the genies of the Elemental Plane of Water.',
        abilityScoreIncrease: { Wisdom: 1 },
        traits: [
          {
            name: 'Resistência ao Ácido',
            description: 'Você tem resistência a dano ácido.'
          },
          {
            name: 'Anfíbio',
            description: 'Você pode respirar ar e água.'
          },
          {
            name: 'Natação',
            description: 'Você tem velocidade de natação de 9 metros.'
          },
          {
            name: 'Chamada da Onda',
            description: 'Você conhece o truque moldar água. Quando você alcança o 3º nível, pode conjurar a magia criar ou destruir água uma vez por dia.'
          }
        ]
      }
    ]
  },
  {
    id: 'goliath',
    name: 'Goliath',
    description: 'At the highest mountain peaks dwell the reclusive goliaths, wandering a bleak realm of rock, wind, and cold.',
    abilityScoreIncrease: { Strength: 2, Constitution: 1 },
    speed: 30,
    languages: ['Comum', 'Gigante'],
    traits: [
      {
        name: 'Resistência Natural',
        description: 'Você tem resistência a dano de frio.'
      },
      {
        name: 'Atletismo de Pedra',
        description: 'Você tem proficiência na perícia Atletismo.'
      },
      {
        name: 'Resistência Poderosa',
        description: 'Você pode se concentrar para evitar ocasionalmente ferimentos. Quando você sofre dano, pode usar sua reação para rolar um d12.'
      },
      {
        name: 'Aclimatação de Montanha',
        description: 'Você está aclimatado a grandes altitudes, incluindo elevações acima de 6.000 metros.'
      }
    ],
     subraces: []
   },
   {
     id: 'kenku',
     name: 'Kenku',
     description: 'Haunted by an ancient crime that robbed them of their wings, the kenku wander the world as vagabonds and burglars.',
     abilityScoreIncrease: { Dexterity: 2, Wisdom: 1 },
     speed: 30,
     languages: ['Comum'],
     traits: [
       {
         name: 'Perícia Especializada',
         description: 'Você tem proficiência em duas perícias à sua escolha.'
       },
       {
         name: 'Falsificação',
         description: 'Você tem proficiência com kit de falsificação e pode duplicar a escrita e artesanato de outras criaturas.'
       },
       {
         name: 'Mímica',
         description: 'Você pode imitar sons que ouviu, incluindo vozes. Uma criatura que ouve os sons pode determinar que são imitações com um teste bem-sucedido de Sabedoria (Intuição).'
       }
     ],
     subraces: []
   },
   {
     id: 'lizardfolk',
     name: 'Lizardfolk',
     description: 'The saurian lizardfolk are thought by many to be little more than monsters.',
     abilityScoreIncrease: { Constitution: 2, Wisdom: 1 },
     speed: 30,
     languages: ['Comum', 'Dracônico'],
     traits: [
       {
         name: 'Mordida',
         description: 'Sua mordida fanged é uma arma natural, que você pode usar para fazer ataques desarmados.'
       },
       {
         name: 'Artesão Astuto',
         description: 'Como parte de um descanso curto, você pode colher osso e couro de um humanoide morto, construto, dragão, monstruosidade ou planta para criar um dos seguintes itens.'
       },
       {
         name: 'Prender Respiração',
         description: 'Você pode prender a respiração por até 15 minutos de cada vez.'
       },
       {
         name: 'Armadura Natural',
         description: 'Você tem pele escamosa resistente. Quando você não está usando armadura, sua CA é 13 + seu modificador de Destreza.'
       },
       {
         name: 'Velocidade de Natação',
         description: 'Você tem velocidade de natação de 9 metros.'
       }
     ],
     subraces: []
   },
   {
     id: 'tabaxi',
     name: 'Tabaxi',
     description: 'Hailing from a strange and distant land, wandering tabaxi are catlike humanoids driven by curiosity.',
     abilityScoreIncrease: { Dexterity: 2, Charisma: 1 },
     speed: 30,
     languages: ['Comum'],
     traits: [
       {
         name: 'Visão no Escuro',
         description: 'Você pode ver no escuro a até 18 metros.'
       },
       {
         name: 'Agilidade Felina',
         description: 'Seus reflexos e agilidade permitem que você se mova com uma rajada de velocidade. Quando você se move em seu turno em combate, você pode dobrar sua velocidade até o final do turno.'
       },
       {
         name: 'Garras de Gato',
         description: 'Devido às suas garras, você tem velocidade de escalada de 6 metros. Além disso, suas garras são armas naturais.'
       },
       {
         name: 'Perícias Felinas',
         description: 'Você tem proficiência nas perícias Percepção e Furtividade.'
       }
     ],
     subraces: []
   },
   {
     id: 'triton',
     name: 'Triton',
     description: 'Tritons guard the ocean depths, building small settlements beside deep trenches.',
     abilityScoreIncrease: { Strength: 1, Constitution: 1, Charisma: 1 },
     speed: 30,
     languages: ['Comum', 'Primordial'],
     traits: [
       {
         name: 'Anfíbio',
         description: 'Você pode respirar ar e água.'
       },
       {
         name: 'Controle de Ar e Água',
         description: 'Uma criança dos mares, você pode chamar a magia de ar e água elementais.'
       },
       {
         name: 'Emissário dos Mares',
         description: 'Aquatic beasts have an extraordinary affinity with your people. You can communicate simple ideas with beasts that can breathe water.'
       },
       {
         name: 'Guardiões das Profundezas',
         description: 'Adaptado às profundezas mais extremas do oceano, você tem resistência a dano de frio.'
       },
       {
         name: 'Velocidade de Natação',
         description: 'Você tem velocidade de natação de 9 metros.'
       }
     ],
     subraces: []
   },
   {
     id: 'tortle',
     name: 'Tortle',
     description: 'What many tortles consider a simple life, others might call a life of adventure.',
     abilityScoreIncrease: { Strength: 2, Wisdom: 1 },
     speed: 30,
     languages: ['Comum', 'Aquan'],
     traits: [
       {
         name: 'Casco',
         description: 'Devido ao seu casco natural, você tem uma CA base de 17 (sua Destreza não afeta esse número).'
       },
       {
         name: 'Recolher-se no Casco',
         description: 'Você pode se recolher em seu casco como uma ação. Até emergir, você ganha +4 de bônus na CA.'
       },
       {
         name: 'Prender Respiração',
         description: 'Você pode prender a respiração por até 1 hora de cada vez.'
       },
       {
         name: 'Sobrevivência Natural',
         description: 'Você tem proficiência na perícia Sobrevivência.'
       }
     ],
     subraces: []
   },
   {
     id: 'bugbear',
     name: 'Bugbear',
     description: 'Bugbears feature in the nightmare tales of many races.',
     abilityScoreIncrease: { Strength: 2, Dexterity: 1 },
     speed: 30,
     languages: ['Comum', 'Goblin'],
     traits: [
       {
         name: 'Visão no Escuro',
         description: 'Você pode ver no escuro a até 18 metros.'
       },
       {
         name: 'Membros Longos',
         description: 'Quando você faz um ataque corpo a corpo em seu turno, seu alcance para ele é 1,5 metro maior que o normal.'
       },
       {
         name: 'Construção Poderosa',
         description: 'Você conta como um tamanho maior quando determina sua capacidade de carga e o peso que você pode empurrar, arrastar ou levantar.'
       },
       {
         name: 'Furtividade Surpreendente',
         description: 'Apesar de seu tamanho volumoso, você tem proficiência na perícia Furtividade.'
       }
     ],
     subraces: []
   },
   {
     id: 'hobgoblin',
     name: 'Hobgoblin',
     description: 'Hobgoblins are large goblinoids with dark orange or red-orange skin.',
     abilityScoreIncrease: { Constitution: 2, Intelligence: 1 },
     speed: 30,
     languages: ['Comum', 'Goblin'],
     traits: [
       {
         name: 'Visão no Escuro',
         description: 'Você pode ver no escuro a até 18 metros.'
       },
       {
         name: 'Treinamento Marcial',
         description: 'Você tem proficiência com armaduras leves e com duas armas marciais à sua escolha.'
       },
       {
         name: 'Salvando a Face',
         description: 'Hobgoblins são cuidadosos para não mostrar fraqueza na frente de seus aliados, por medo de perder status.'
       }
     ],
     subraces: []
   },
   {
     id: 'goblin',
     name: 'Goblin',
     description: 'Goblins are small, black-hearted humanoids that lair in despoiled dungeons and other dismal settings.',
     abilityScoreIncrease: { Dexterity: 2, Constitution: 1 },
     speed: 30,
     languages: ['Comum', 'Goblin'],
     traits: [
       {
         name: 'Visão no Escuro',
         description: 'Você pode ver no escuro a até 18 metros.'
       },
       {
         name: 'Fúria Furiosa',
         description: 'Quando você causa dano a uma criatura com um ataque ou uma magia e a criatura não foi morta, você pode usar sua reação para se mover até sua velocidade.'
       },
       {
         name: 'Escape Ágil',
         description: 'Você pode realizar a ação Desengajar ou Esconder como uma ação bônus em cada um de seus turnos.'
       }
     ],
     subraces: []
   },
   {
     id: 'orc',
     name: 'Orc',
     description: 'Orcs are savage raiders and pillagers with stooped postures, low foreheads, and piggish faces.',
     abilityScoreIncrease: { Strength: 2, Constitution: 1 },
     speed: 30,
     languages: ['Comum', 'Orc'],
     traits: [
       {
         name: 'Visão no Escuro',
         description: 'Você pode ver no escuro a até 18 metros.'
       },
       {
         name: 'Agressivo',
         description: 'Como uma ação bônus, você pode se mover até sua velocidade em direção a uma criatura hostil que você possa ver.'
       },
       {
         name: 'Ataques Poderosos',
         description: 'Quando você marca um acerto crítico com um ataque de arma corpo a corpo, você pode rolar um dos dados de dano da arma uma vez adicional.'
       },
       {
         name: 'Resistência Implacável',
         description: 'Quando você é reduzido a 0 pontos de vida mas não morto imediatamente, você pode cair para 1 ponto de vida.'
       }
     ],
     subraces: []
   },
   {
     id: 'yuan_ti_pureblood',
     name: 'Yuan-ti Pureblood',
     description: 'The serpentine yuan-ti are utterly evil and bent on enslaving or exterminating all other races.',
     abilityScoreIncrease: { Charisma: 2, Intelligence: 1 },
     speed: 30,
     languages: ['Comum', 'Abissal', 'Dracônico'],
     traits: [
       {
         name: 'Visão no Escuro',
         description: 'Você pode ver no escuro a até 18 metros.'
       },
       {
         name: 'Magia Inata',
         description: 'Você conhece o truque veneno spray. Quando você alcança o 3º nível, pode conjurar a magia sugestão uma vez por dia.'
       },
       {
         name: 'Imunidade Mágica',
         description: 'Você tem vantagem em testes de resistência contra magias e outros efeitos mágicos.'
       },
       {
         name: 'Resistência a Veneno',
         description: 'Você tem resistência a dano de veneno.'
       }
     ],
     subraces: []
   }
];

export default races;