const equipment = {
  weapons: {
    simple: {
      melee: [
        {
          id: 'club',
          name: 'Clava',
          cost: '1 pp',
          damage: '1d4 contundente',
          weight: '2 lb',
          properties: ['Leve']
        },
        {
          id: 'dagger',
          name: 'Adaga',
          cost: '2 po',
          damage: '1d4 perfurante',
          weight: '1 lb',
          properties: ['Acuidade', 'Leve', 'Arremesso (alcance 6/18)']
        },
        {
          id: 'javelin',
          name: 'Azagaia',
          cost: '5 pp',
          damage: '1d6 perfurante',
          weight: '2 lb',
          properties: ['Arremesso (alcance 9/36)']
        },
        {
          id: 'mace',
          name: 'Maça',
          cost: '5 po',
          damage: '1d6 contundente',
          weight: '4 lb',
          properties: []
        },
        {
          id: 'quarterstaff',
          name: 'Bordão',
          cost: '2 pp',
          damage: '1d6 contundente',
          weight: '4 lb',
          properties: ['Versátil (1d8)']
        },
        {
          id: 'spear',
          name: 'Lança',
          cost: '1 po',
          damage: '1d6 perfurante',
          weight: '3 lb',
          properties: ['Arremesso (alcance 6/18)', 'Versátil (1d8)']
        }
      ],
      ranged: [
        {
          id: 'crossbow-light',
          name: 'Besta Leve',
          cost: '25 po',
          damage: '1d8 perfurante',
          weight: '5 lb',
          properties: ['Munição (alcance 24/96)', 'Carregamento', 'Duas mãos']
        },
        {
          id: 'dart',
          name: 'Dardo',
          cost: '5 pc',
          damage: '1d4 perfurante',
          weight: '1/4 lb',
          properties: ['Acuidade', 'Arremesso (alcance 6/18)']
        },
        {
          id: 'shortbow',
          name: 'Arco Curto',
          cost: '25 po',
          damage: '1d6 perfurante',
          weight: '2 lb',
          properties: ['Munição (alcance 24/96)', 'Duas mãos']
        },
        {
          id: 'sling',
          name: 'Funda',
          cost: '1 pp',
          damage: '1d4 contundente',
          weight: '—',
          properties: ['Munição (alcance 9/36)']
        }
      ]
    },
    martial: {
      melee: [
        {
          id: 'battleaxe',
          name: 'Machado de Batalha',
          cost: '10 po',
          damage: '1d8 cortante',
          weight: '4 lb',
          properties: ['Versátil (1d10)']
        },
        {
          id: 'longsword',
          name: 'Espada Longa',
          cost: '15 po',
          damage: '1d8 cortante',
          weight: '3 lb',
          properties: ['Versátil (1d10)']
        },
        {
          id: 'rapier',
          name: 'Rapieira',
          cost: '25 po',
          damage: '1d8 perfurante',
          weight: '2 lb',
          properties: ['Acuidade']
        },
        {
          id: 'scimitar',
          name: 'Cimitarra',
          cost: '25 po',
          damage: '1d6 cortante',
          weight: '3 lb',
          properties: ['Acuidade', 'Leve']
        },
        {
          id: 'shortsword',
          name: 'Espada Curta',
          cost: '10 po',
          damage: '1d6 perfurante',
          weight: '2 lb',
          properties: ['Acuidade', 'Leve']
        },
        {
          id: 'greatsword',
          name: 'Espada Grande',
          cost: '50 po',
          damage: '2d6 cortante',
          weight: '6 lb',
          properties: ['Pesada', 'Duas mãos']
        },
        {
          id: 'greataxe',
          name: 'Machado Grande',
          cost: '30 po',
          damage: '1d12 cortante',
          weight: '7 lb',
          properties: ['Pesada', 'Duas mãos']
        }
      ],
      ranged: [
        {
          id: 'longbow',
          name: 'Arco Longo',
          cost: '50 po',
          damage: '1d8 perfurante',
          weight: '2 lb',
          properties: ['Munição (alcance 45/180)', 'Pesada', 'Duas mãos']
        },
        {
          id: 'crossbow-heavy',
          name: 'Besta Pesada',
          cost: '50 po',
          damage: '1d10 perfurante',
          weight: '18 lb',
          properties: ['Munição (alcance 30/120)', 'Pesada', 'Carregamento', 'Duas mãos']
        }
      ]
    }
  },
  armor: {
    light: [
      {
        id: 'leather',
        name: 'Armadura de Couro',
        cost: '10 po',
        armorClass: '11 + Mod Des',
        weight: '10 lb',
        stealthDisadvantage: false
      },
      {
        id: 'studded-leather',
        name: 'Armadura de Couro Batido',
        cost: '45 po',
        armorClass: '12 + Mod Des',
        weight: '13 lb',
        stealthDisadvantage: false
      }
    ],
    medium: [
      {
        id: 'hide',
        name: 'Armadura de Peles',
        cost: '10 po',
        armorClass: '12 + Mod Des (máx 2)',
        weight: '12 lb',
        stealthDisadvantage: false
      },
      {
        id: 'chain-shirt',
        name: 'Camisão de Cota de Malha',
        cost: '50 po',
        armorClass: '13 + Mod Des (máx 2)',
        weight: '20 lb',
        stealthDisadvantage: false
      },
      {
        id: 'scale-mail',
        name: 'Brunea',
        cost: '50 po',
        armorClass: '14 + Mod Des (máx 2)',
        weight: '45 lb',
        stealthDisadvantage: true
      },
      {
        id: 'breastplate',
        name: 'Peitoral',
        cost: '400 po',
        armorClass: '14 + Mod Des (máx 2)',
        weight: '20 lb',
        stealthDisadvantage: false
      },
      {
        id: 'half-plate',
        name: 'Meia Armadura',
        cost: '750 po',
        armorClass: '15 + Mod Des (máx 2)',
        weight: '40 lb',
        stealthDisadvantage: true
      }
    ],
    heavy: [
      {
        id: 'ring-mail',
        name: 'Cota de Anéis',
        cost: '30 po',
        armorClass: '14',
        weight: '40 lb',
        stealthDisadvantage: true,
        strengthRequirement: null
      },
      {
        id: 'chain-mail',
        name: 'Cota de Malha',
        cost: '75 po',
        armorClass: '16',
        weight: '55 lb',
        stealthDisadvantage: true,
        strengthRequirement: 13
      },
      {
        id: 'splint',
        name: 'Armadura Segmentada',
        cost: '200 po',
        armorClass: '17',
        weight: '60 lb',
        stealthDisadvantage: true,
        strengthRequirement: 15
      },
      {
        id: 'plate',
        name: 'Armadura de Placas',
        cost: '1.500 po',
        armorClass: '18',
        weight: '65 lb',
        stealthDisadvantage: true,
        strengthRequirement: 15
      }
    ],
    shields: [
      {
        id: 'shield',
        name: 'Escudo',
        cost: '10 po',
        armorClass: '+2',
        weight: '6 lb'
      }
    ]
  },
  adventuringGear: [
    {
      id: 'backpack',
      name: 'Mochila',
      cost: '2 po',
      weight: '5 lb',
      description: 'Uma mochila é um saco de couro carregado nas costas.'
    },
    {
      id: 'bedroll',
      name: 'Saco de Dormir',
      cost: '2 pp',
      weight: '7 lb',
      description: 'Um saco de dormir confortável para descansar ao ar livre.'
    },
    {
      id: 'blanket',
      name: 'Cobertor',
      cost: '5 pp',
      weight: '3 lb',
      description: 'Um cobertor de lã para se manter aquecido.'
    },
    {
      id: 'rope-hemp',
      name: 'Corda de Cânhamo (15 metros)',
      cost: '2 po',
      weight: '20 lb',
      description: 'Corda resistente feita de fibras de cânhamo.'
    },
    {
      id: 'rope-silk',
      name: 'Corda de Seda (15 metros)',
      cost: '10 po',
      weight: '5 lb',
      description: 'Corda leve e resistente feita de seda.'
    },
    {
      id: 'torch',
      name: 'Tocha',
      cost: '1 pc',
      weight: '1 lb',
      description: 'Uma tocha queima por 1 hora, fornecendo luz brilhante em um raio de 6 metros.'
    },
    {
      id: 'tinderbox',
      name: 'Caixa de Fogo',
      cost: '5 pp',
      weight: '1 lb',
      description: 'Esta pequena caixa contém pederneira, isqueiro e pavio.'
    },
    {
      id: 'rations',
      name: 'Rações (1 dia)',
      cost: '2 po',
      weight: '2 lb',
      description: 'Rações consistem em comida seca adequada para viagens longas.'
    },
    {
      id: 'waterskin',
      name: 'Cantil',
      cost: '2 po',
      weight: '5 lb (cheio)',
      description: 'Um cantil pode conter 4 litros de líquido.'
    },
    {
      id: 'crowbar',
      name: 'Pé de Cabra',
      cost: '2 po',
      weight: '5 lb',
      description: 'Usar um pé de cabra concede vantagem em testes de Força para forçar algo.'
    },
    {
      id: 'grappling-hook',
      name: 'Gancho de Escalada',
      cost: '2 po',
      weight: '4 lb',
      description: 'Um gancho de metal usado para escalar ou prender cordas.'
    },
    {
      id: 'hammer',
      name: 'Martelo',
      cost: '1 po',
      weight: '3 lb',
      description: 'Um martelo comum usado para construção e outras tarefas.'
    },
    {
      id: 'piton',
      name: 'Piton',
      cost: '5 pc',
      weight: '1/4 lb',
      description: 'Um pino de ferro usado para escalar rochas ou paredes.'
    }
  ],
  tools: [
    {
      id: 'thieves-tools',
      name: 'Ferramentas de Ladrão',
      cost: '25 po',
      weight: '1 lb',
      description: 'Este conjunto de ferramentas inclui uma pequena lima, um conjunto de gazuas, um pequeno espelho montado em uma alça de metal, um conjunto de tesouras de lâmina estreita e um par de alicates.'
    },
    {
      id: 'disguise-kit',
      name: 'Kit de Disfarce',
      cost: '25 po',
      weight: '3 lb',
      description: 'Esta bolsa de cosméticos, tintura de cabelo e pequenos adereços permite que você crie disfarces que mudam sua aparência física.'
    },
    {
      id: 'forgery-kit',
      name: 'Kit de Falsificação',
      cost: '15 po',
      weight: '5 lb',
      description: 'Esta pequena caixa contém uma variedade de papéis e pergaminhos, canetas e tintas, selos e lacre, folha de ouro e prata, e outros suprimentos necessários para criar falsificações convincentes de documentos físicos.'
    },
    {
      id: 'herbalism-kit',
      name: 'Kit de Herbalismo',
      cost: '5 po',
      weight: '3 lb',
      description: 'Este kit contém uma variedade de instrumentos como garrafas, almofariz e pilão, e bolsas e frascos usados por herbalistas para criar remédios e poções.'
    },
    {
      id: 'poisoners-kit',
      name: 'Kit de Envenenador',
      cost: '50 po',
      weight: '2 lb',
      description: 'Um kit de envenenador inclui as ampolas, produtos químicos e outros equipamentos necessários para a criação de venenos.'
    }
  ]
};

export default equipment;