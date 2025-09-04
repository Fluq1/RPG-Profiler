// Arquivo central que importa todos os sistemas
import dnd5e from './dnd5e/index.js';

export const rpgSystems = {
  dnd5e: dnd5e,
  dnd: dnd5e // Alias para compatibilidade
  // Outros sistemas serão adicionados conforme implementados
  // pathfinder,
  // callOfCthulhu,
  // vampireMasquerade
};

export default rpgSystems;