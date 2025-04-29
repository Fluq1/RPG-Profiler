export const lifeStages = {
  infancy: {
    title: "Infância",
    description: "Os primeiros anos de vida (0-5 anos)",
    options: [
      { id: "loving", title: "Lar Amoroso", description: "Cresceu em um ambiente familiar amoroso e protetor." },
      { id: "orphan", title: "Órfão", description: "Perdeu os pais muito cedo e foi criado por outros." },
      { id: "abandoned", title: "Abandonado", description: "Foi abandonado e teve que sobreviver por conta própria." },
      { id: "noble", title: "Berço Nobre", description: "Nasceu em uma família nobre com privilégios." },
      { id: "poor", title: "Pobreza", description: "Nasceu em condições de extrema pobreza." },
      { id: "isolated", title: "Isolamento", description: "Cresceu isolado do resto do mundo." },
      { id: "magical", title: "Manifestação Mágica", description: "Demonstrou poderes mágicos desde muito cedo." },
      { id: "prophecy", title: "Profecia", description: "Seu nascimento foi marcado por uma profecia." }
    ]
  },
  earlyChildhood: {
    title: "Primeira Infância",
    description: "Anos de formação inicial (6-8 anos)",
    options: [
      { id: "education", title: "Educação Formal", description: "Recebeu educação de tutores ou escolas." },
      { id: "street", title: "Criança de Rua", description: "Aprendeu a sobreviver nas ruas." },
      { id: "apprentice", title: "Aprendiz", description: "Tornou-se aprendiz de um ofício ou arte." },
      { id: "religious", title: "Educação Religiosa", description: "Foi educado em um templo ou monastério." },
      { id: "military", title: "Treinamento Militar", description: "Iniciou treinamento militar desde cedo." },
      { id: "wilderness", title: "Vida Selvagem", description: "Cresceu em contato próximo com a natureza." },
      { id: "servant", title: "Servidão", description: "Trabalhou como servo para uma família ou indivíduo." },
      { id: "performer", title: "Artista", description: "Começou a se apresentar como artista ou entertainer." }
    ]
  },
  childhood: {
    title: "Infância",
    description: "Anos de desenvolvimento (9-12 anos)",
    options: [
      { id: "bully", title: "Intimidador", description: "Era conhecido por intimidar outras crianças." },
      { id: "bullied", title: "Intimidado", description: "Era frequentemente alvo de intimidação." },
      { id: "prodigy", title: "Prodígio", description: "Demonstrou talentos excepcionais." },
      { id: "troublemaker", title: "Encrenqueiro", description: "Sempre se metia em problemas." },
      { id: "sickly", title: "Doente", description: "Sofria de doenças frequentes ou crônicas." },
      { id: "explorer", title: "Explorador", description: "Passava o tempo explorando e descobrindo coisas novas." },
      { id: "studious", title: "Estudioso", description: "Dedicava-se intensamente aos estudos." },
      { id: "loner", title: "Solitário", description: "Preferia a própria companhia à de outros." }
    ]
  },
  earlyAdolescence: {
    title: "Início da Adolescência",
    description: "Primeiros anos da adolescência (13-15 anos)",
    options: [
      { id: "rebellion", title: "Rebeldia", description: "Rebelou-se contra autoridades e tradições." },
      { id: "responsibility", title: "Responsabilidade", description: "Assumiu grandes responsabilidades cedo." },
      { id: "romance", title: "Primeiro Amor", description: "Viveu uma intensa história de primeiro amor." },
      { id: "tragedy", title: "Tragédia", description: "Sofreu ou testemunhou um evento trágico." },
      { id: "adventure", title: "Aventura", description: "Embarcou em uma aventura significativa." },
      { id: "crime", title: "Crime", description: "Envolveu-se em atividades criminosas." },
      { id: "discovery", title: "Descoberta", description: "Fez uma descoberta importante sobre si mesmo ou o mundo." },
      { id: "mentor", title: "Mentor", description: "Encontrou um mentor que mudou sua vida." }
    ]
  },
  adolescence: {
    title: "Adolescência",
    description: "Anos de formação da identidade (16-18 anos)",
    options: [
      { id: "training", title: "Treinamento Intensivo", description: "Dedicou-se intensamente a aperfeiçoar habilidades." },
      { id: "travel", title: "Viagem", description: "Viajou para lugares distantes, expandindo horizontes." },
      { id: "war", title: "Guerra", description: "Participou de um conflito armado." },
      { id: "love", title: "Amor Profundo", description: "Viveu um relacionamento que o marcou profundamente." },
      { id: "betrayal", title: "Traição", description: "Foi traído por alguém próximo." },
      { id: "achievement", title: "Grande Conquista", description: "Alcançou algo notável para sua idade." },
      { id: "loss", title: "Perda", description: "Perdeu alguém ou algo muito importante." },
      { id: "transformation", title: "Transformação", description: "Passou por uma transformação física ou espiritual." }
    ]
  },
  earlyAdulthood: {
    title: "Início da Vida Adulta",
    description: "Primeiros anos como adulto (19-25 anos)",
    options: [
      { id: "career", title: "Carreira", description: "Estabeleceu-se em uma carreira ou profissão." },
      { id: "wanderer", title: "Andarilho", description: "Viveu como andarilho, sem raízes fixas." },
      { id: "leadership", title: "Liderança", description: "Assumiu posição de liderança em um grupo." },
      { id: "isolation", title: "Isolamento", description: "Isolou-se da sociedade por um período." },
      { id: "wealth", title: "Riqueza", description: "Acumulou riqueza significativa." },
      { id: "poverty", title: "Pobreza", description: "Enfrentou dificuldades financeiras severas." },
      { id: "fame", title: "Fama", description: "Tornou-se conhecido por algum feito ou talento." },
      { id: "disgrace", title: "Desgraça", description: "Caiu em desgraça ou foi desonrado." }
    ]
  },
  adulthood: {
    title: "Vida Adulta",
    description: "Anos de maturidade (26+ anos)",
    options: [
      { id: "family", title: "Família", description: "Formou uma família própria." },
      { id: "power", title: "Poder", description: "Alcançou posição de poder ou influência." },
      { id: "enlightenment", title: "Iluminação", description: "Atingiu algum tipo de iluminação espiritual ou intelectual." },
      { id: "revenge", title: "Vingança", description: "Dedicou-se a uma missão de vingança." },
      { id: "redemption", title: "Redenção", description: "Buscou redenção por erros do passado." },
      { id: "legacy", title: "Legado", description: "Trabalhou para construir um legado duradouro." },
      { id: "corruption", title: "Corrupção", description: "Foi corrompido por poder, riqueza ou magia." },
      { id: "quest", title: "Busca", description: "Embarcou em uma busca importante que define sua vida atual." }
    ]
  }
};