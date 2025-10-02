import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { rpgSystems } from '../data/rpgSystems';

// --- HELPERS ---
const docSettings = {
  pageWidth: 210,
  pageHeight: 297,
  margins: {
    top: 15,
    bottom: 15,
    left: 15,
    right: 15,
  },
  contentWidth: 180, // 210 - 15 - 15
  colors: {
    primary: '#F97316', // Orange
    text: '#1E293B',    // Dark Slate
    lightText: '#64748B', // Lighter Slate
    bg: '#F8FAFC',      // Very light grey
  },
  fonts: {
    title: 'Helvetica',
    body: 'Helvetica',
  }
};

let doc;
let y;

const resetY = () => { y = docSettings.margins.top; };
const advanceY = (amount) => { y += amount; };

const drawHeader = (character) => {
  const headerHeight = 25;
  doc.setFillColor(docSettings.colors.primary);
  doc.rect(0, 0, docSettings.pageWidth, headerHeight, 'F');

  doc.setFont(docSettings.fonts.title, 'bold');
  doc.setFontSize(24);
  doc.setTextColor('#FFFFFF');
  doc.text(character.name || 'Personagem Sem Nome', docSettings.margins.left, 17);

  doc.setFont(docSettings.fonts.body, 'normal');
  doc.setFontSize(11);
  const subtitle = `${character.race} ${character.class} | Nível ${character.level}`;
  doc.text(subtitle, docSettings.pageWidth - docSettings.margins.right, 17, { align: 'right' });

  resetY();
  advanceY(headerHeight + 10);
};

const drawFooter = (page, totalPages) => {
  const footerY = docSettings.pageHeight - docSettings.margins.bottom + 10;
  doc.setFontSize(9);
  doc.setTextColor(docSettings.colors.lightText);
  doc.text(`Gerado com Forged | RPG Builder`, docSettings.margins.left, footerY);
  doc.text(`Página ${page} de ${totalPages}`, docSettings.pageWidth - docSettings.margins.right, footerY, { align: 'right' });
};

const drawSectionTitle = (title) => {
  if (y > 250) {
    doc.addPage();
    resetY();
  }
  doc.setFont(docSettings.fonts.title, 'bold');
  doc.setFontSize(14);
  doc.setTextColor(docSettings.colors.primary);
  doc.text(title, docSettings.margins.left, y);
  doc.setDrawColor(docSettings.colors.primary);
  doc.line(docSettings.margins.left, y + 2, docSettings.pageWidth - docSettings.margins.right, y + 2);
  advanceY(10);
};

const drawStatBox = (x, startY, label, value) => {
  const boxWidth = 35;
  const boxHeight = 18;
  doc.setFillColor(docSettings.colors.bg);
  doc.setDrawColor(docSettings.colors.lightText);
  doc.rect(x, startY, boxWidth, boxHeight, 'FD');

  doc.setFontSize(8);
  doc.setTextColor(docSettings.colors.lightText);
  doc.text(label.toUpperCase(), x + boxWidth / 2, startY + 5, { align: 'center' });

  doc.setFontSize(16);
  doc.setFont(docSettings.fonts.body, 'bold');
  doc.setTextColor(docSettings.colors.text);
  doc.text(String(value), x + boxWidth / 2, startY + 14, { align: 'center' });
  doc.setFont(docSettings.fonts.body, 'normal');
};

const drawWrappedText = (text, options) => {
  const { x, y: startY, maxWidth, lineHeight = 5 } = options;
  doc.setFontSize(10);
  doc.setTextColor(docSettings.colors.text);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, startY);
  return lines.length * lineHeight;
};

// --- D&D 5e TEMPLATE ---
const dnd5eTemplate = (character) => {
  // --- PAGE 1: CORE STATS ---
  drawHeader(character);

  // --- TOP STATS ---
  const topStats = [
    { label: 'Classe de Armadura', value: character.armorClass || 'N/A' },
    { label: 'Iniciativa', value: character.initiative >= 0 ? `+${character.initiative}` : character.initiative },
    { label: 'Deslocamento', value: `${character.speed} m` },
    { label: 'Pontos de Vida', value: character.hitPoints || 'N/A' },
    { label: 'Bônus de Prof.', value: `+${character.proficiencyBonus}` },
  ];
  topStats.forEach((stat, i) => {
    drawStatBox(docSettings.margins.left + i * (35 + 2), y, stat.label, stat.value);
  });
  advanceY(28);

  // --- TWO-COLUMN LAYOUT ---
  const col1X = docSettings.margins.left;
  const col2X = docSettings.margins.left + 95;
  const colWidth = 85;
  let yCol1 = y;
  let yCol2 = y;

  // --- COLUMN 1: ABILITIES & SKILLS ---
  // Abilities
  doc.setFont(docSettings.fonts.title, 'bold');
  doc.setFontSize(12);
  doc.setTextColor(docSettings.colors.text);
  doc.text('Atributos', col1X, yCol1);
  yCol1 += 6;

  if (character.abilities) {
    const abilities = Object.entries(character.abilities);
    abilities.forEach(([key, value]) => {
      const modifier = Math.floor((value - 10) / 2);
      const modStr = modifier >= 0 ? `+${modifier}` : String(modifier);
      doc.setDrawColor(docSettings.colors.lightText);
      doc.rect(col1X, yCol1 - 4, 30, 12);
      
      doc.setFontSize(14);
      doc.setFont(docSettings.fonts.body, 'bold');
      doc.text(String(value), col1X + 15, yCol1 + 3, { align: 'center' });
      
      doc.setFontSize(9);
      doc.setFont(docSettings.fonts.body, 'normal');
      doc.text(modStr, col1X + 6, yCol1 + 9, { align: 'center' });

      doc.setFontSize(10);
      doc.text(key.charAt(0).toUpperCase() + key.slice(1), col1X + 35, yCol1 + 2);
      yCol1 += 15;
    });
  }
  yCol1 += 5; // Extra space

  // Skills
  doc.setFont(docSettings.fonts.title, 'bold');
  doc.setFontSize(12);
  doc.setTextColor(docSettings.colors.text);
  doc.text('Perícias', col1X, yCol1);
  yCol1 += 6;

  if (character.skills && character.skills.length > 0) {
    character.skills.forEach(skill => {
      const text = `• ${skill}`;
      yCol1 += drawWrappedText(text, { x: col1X, y: yCol1, maxWidth: colWidth }) - 1;
    });
  }

  // --- COLUMN 2: FEATURES, TRAITS, EQUIPMENT ---
  // Racial Traits
  if (character.racialTraits && character.racialTraits.length > 0) {
    doc.setFont(docSettings.fonts.title, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(docSettings.colors.text);
    doc.text('Traços Raciais', col2X, yCol2);
    yCol2 += 6;

    character.racialTraits.forEach(trait => {
      const text = `• ${trait.name}: ${trait.description}`;
      yCol2 += drawWrappedText(text, { x: col2X, y: yCol2, maxWidth: colWidth });
    });
    yCol2 += 5;
  }

  // Class Features
  if (character.classFeatures && character.classFeatures.length > 0) {
    doc.setFont(docSettings.fonts.title, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(docSettings.colors.text);
    doc.text('Características de Classe', col2X, yCol2);
    yCol2 += 6;

    character.classFeatures.forEach(feature => {
      const text = `• ${feature.name}: ${feature.description}`;
      yCol2 += drawWrappedText(text, { x: col2X, y: yCol2, maxWidth: colWidth });
    });
    yCol2 += 5;
  }

  // Equipment
  if (character.equipment && character.equipment.length > 0) {
    doc.setFont(docSettings.fonts.title, 'bold');
    doc.setFontSize(12);
    doc.setTextColor(docSettings.colors.text);
    doc.text('Equipamento', col2X, yCol2);
    yCol2 += 6;
    
    const equipText = character.equipment.join(', ');
    yCol2 += drawWrappedText(equipText, { x: col2X, y: yCol2, maxWidth: colWidth });
  }

  // --- PAGE 2: STORY & SPELLS ---
  if (character.story || (character.spells && character.spells.length > 0)) {
    doc.addPage();
    resetY();
    advanceY(10);

    if (character.story) {
      drawSectionTitle('História & Personalidade');
      drawWrappedText(character.story, { x: docSettings.margins.left, y, maxWidth: docSettings.contentWidth });
      advanceY(80); // Approximate space for story
    }

    if (character.spells && character.spells.length > 0) {
      drawSectionTitle('Magias');
      const spellsByLevel = character.spells.reduce((acc, spell) => {
        const level = `Nível ${spell.level === 0 ? 'Truques' : spell.level}`;
        if (!acc[level]) acc[level] = [];
        acc[level].push(spell.name);
        return acc;
      }, {});

      Object.entries(spellsByLevel).forEach(([level, spells]) => {
        doc.setFont(docSettings.fonts.body, 'bold');
        doc.setFontSize(11);
        doc.text(level, docSettings.margins.left, y);
        advanceY(6);

        const spellList = spells.join(', ');
        const height = drawWrappedText(spellList, { x: docSettings.margins.left, y, maxWidth: docSettings.contentWidth, lineHeight: 6 });
        advanceY(height + 2);
      });
    }
  }
};

export const generateCharacterPDF = (character) => {
  doc = new jsPDF();
  const template = dnd5eTemplate; // Hardcoded for now

  if (template) {
    template(character);
  } else {
    // Fallback for unknown systems
    doc.text('Este sistema de RPG não possui um template de PDF definido.', 20, 20);
  }

  // Add footers to all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(i, pageCount);
  }

  const fileName = `${(character.name || 'Personagem').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
};

// Blob generation for previews (can be implemented if needed)
export const generateCharacterPDFBlob = (character) => {
  // This function would be almost identical to generateCharacterPDF
  // but would return doc.output('blob') instead of doc.save()
  console.log("Blob generation not fully implemented in this version.");
  return null;
};