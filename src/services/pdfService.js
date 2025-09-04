import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { rpgSystems } from '../data/rpgSystems';

// Templates específicos para cada sistema
const systemTemplates = {
  dnd5e: (doc, character) => {
    let yPosition = 80;
    
    // Seção de Atributos
    doc.setFontSize(14);
    doc.text('Atributos', 20, yPosition);
    yPosition += 10;
    
    if (character.abilities) {
      const abilities = [
        ['Força', character.abilities.strength || 10],
        ['Destreza', character.abilities.dexterity || 10],
        ['Constituição', character.abilities.constitution || 10],
        ['Inteligência', character.abilities.intelligence || 10],
        ['Sabedoria', character.abilities.wisdom || 10],
        ['Carisma', character.abilities.charisma || 10]
      ];
      
      doc.autoTable({
        startY: yPosition,
        head: [['Atributo', 'Valor', 'Modificador']],
        body: abilities.map(([name, value]) => [
          name,
          value,
          Math.floor((value - 10) / 2) >= 0 ? `+${Math.floor((value - 10) / 2)}` : Math.floor((value - 10) / 2)
        ]),
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] },
        columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 30 }, 2: { cellWidth: 40 } }
      });
      
      yPosition = doc.lastAutoTable.finalY + 15;
    }
    
    // Seção de Perícias
    if (character.skills && character.skills.length > 0) {
      doc.setFontSize(14);
      doc.text('Perícias Proficientes', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      character.skills.forEach(skill => {
        doc.text(`• ${skill}`, 25, yPosition);
        yPosition += 6;
      });
      yPosition += 5;
    }
    
    // Seção de Equipamentos
    if (character.equipment && character.equipment.length > 0) {
      doc.setFontSize(14);
      doc.text('Equipamentos', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      character.equipment.forEach(item => {
        doc.text(`• ${item}`, 25, yPosition);
        yPosition += 6;
      });
      yPosition += 5;
    }
    
    // Seção de Magias (se aplicável)
    if (character.spells && character.spells.length > 0) {
      doc.setFontSize(14);
      doc.text('Magias Conhecidas', 20, yPosition);
      yPosition += 10;
      
      const spellsByLevel = character.spells.reduce((acc, spell) => {
        const level = spell.level || 0;
        if (!acc[level]) acc[level] = [];
        acc[level].push(spell);
        return acc;
      }, {});
      
      Object.keys(spellsByLevel).sort((a, b) => a - b).forEach(level => {
        doc.setFontSize(12);
        doc.text(`Nível ${level === '0' ? 'Truques' : level}:`, 25, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        spellsByLevel[level].forEach(spell => {
          doc.text(`• ${spell.name}`, 30, yPosition);
          yPosition += 6;
        });
        yPosition += 3;
      });
    }
    
    // Traços Raciais
    if (character.racialTraits && character.racialTraits.length > 0) {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.text('Traços Raciais', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      character.racialTraits.forEach(trait => {
        doc.text(`• ${trait.name}: ${trait.description}`, 25, yPosition);
        yPosition += 6;
      });
    }
    
    // Características de Classe
    if (character.classFeatures && character.classFeatures.length > 0) {
      if (yPosition > 230) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.text('Características de Classe', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      character.classFeatures.forEach(feature => {
        doc.text(`• ${feature.name}: ${feature.description}`, 25, yPosition);
        yPosition += 6;
      });
    }
  }
};

export const generateCharacterPDF = (character) => {
  // Obter dados do sistema
  const systemData = rpgSystems[character.gameSystem];
  
  // Criar documento PDF
  const doc = new jsPDF();
  
  // Configurar cores e estilos
  const primaryColor = [41, 128, 185];
  const secondaryColor = [52, 73, 94];
  
  // Cabeçalho principal
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(character.name || 'Personagem Sem Nome', 105, 16, { align: 'center' });
  
  // Resetar cor do texto
  doc.setTextColor(0, 0, 0);
  
  // Informações básicas em caixas
  doc.setFontSize(12);
  doc.setFillColor(240, 240, 240);
  
  // Primeira linha de informações
  doc.rect(15, 35, 85, 15, 'F');
  doc.text(`Sistema: ${systemData.name}`, 20, 45);
  
  doc.rect(110, 35, 85, 15, 'F');
  doc.text(`Nível: ${character.level || 1}`, 115, 45);
  
  // Segunda linha de informações
  doc.rect(15, 55, 85, 15, 'F');
  doc.text(`Raça: ${character.race || 'Não definida'}`, 20, 65);
  
  doc.rect(110, 55, 85, 15, 'F');
  doc.text(`Classe: ${character.class || 'Não definida'}`, 115, 65);
  
  // Terceira linha
  doc.rect(15, 75, 180, 15, 'F');
  doc.text(`Background: ${character.background || 'Não definido'}`, 20, 85);
  
  // Aplicar template específico do sistema
  const template = systemTemplates[character.gameSystem];
  if (template) {
    template(doc, character);
  }
  
  // Adicionar história do personagem em nova página
  if (character.story && character.story.trim()) {
    doc.addPage();
    
    // Cabeçalho da história
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 20, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('História do Personagem', 105, 13, { align: 'center' });
    
    // Conteúdo da história
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    
    const splitStory = doc.splitTextToSize(character.story, 170);
    doc.text(splitStory, 20, 35);
  }
  
  // Adicionar eventos de vida se existirem
  if (character.lifeEvents && character.lifeEvents.length > 0) {
    doc.addPage();
    
    // Cabeçalho dos eventos
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 20, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('Eventos de Vida', 105, 13, { align: 'center' });
    
    // Listar eventos
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    let yPos = 35;
    character.lifeEvents.forEach((event, index) => {
      doc.setFontSize(14);
      doc.text(`${event.stage}: ${event.title}`, 20, yPos);
      yPos += 8;
      
      doc.setFontSize(11);
      const splitDescription = doc.splitTextToSize(event.description, 170);
      doc.text(splitDescription, 20, yPos);
      yPos += splitDescription.length * 5 + 10;
      
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });
  }
  
  // Adicionar rodapé com data de criação
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Criado em ${new Date().toLocaleDateString('pt-BR')} - Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
  }
  
  // Salvar o PDF
  const fileName = `${(character.name || 'Personagem').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
};

// Função para preview do PDF (retorna blob)
export const generateCharacterPDFBlob = (character) => {
  const systemData = rpgSystems[character.gameSystem];
  const doc = new jsPDF();
  
  // Mesmo código de geração, mas retorna blob
  // ... (código similar ao generateCharacterPDF)
  
  return doc.output('blob');
};