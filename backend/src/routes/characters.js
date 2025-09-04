const express = require('express');
const { PrismaClient } = require('../../generated/prisma');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Todas as rotas precisam de autenticação
router.use(authenticateToken);

// Listar personagens do usuário
router.get('/', async (req, res) => {
  try {
    const characters = await prisma.character.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(characters);
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    res.status(500).json({ error: 'Erro ao buscar personagens' });
  }
});

// Criar personagem
router.post('/', async (req, res) => {
  try {
    const characterData = {
      ...req.body,
      userId: req.user.id
    };
    
    const character = await prisma.character.create({
      data: characterData
    });
    
    res.status(201).json(character);
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    res.status(500).json({ error: 'Erro ao criar personagem' });
  }
});

// Buscar personagem por ID
router.get('/:id', async (req, res) => {
  try {
    const character = await prisma.character.findFirst({
      where: {
        id: parseInt(req.params.id),
        userId: req.user.id
      }
    });
    
    if (!character) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    
    res.json(character);
  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    res.status(500).json({ error: 'Erro ao buscar personagem' });
  }
});

// Atualizar personagem
router.put('/:id', async (req, res) => {
  try {
    const characterId = parseInt(req.params.id);
    
    // Verificar se o personagem pertence ao usuário
    const existingCharacter = await prisma.character.findFirst({
      where: {
        id: characterId,
        userId: req.user.id
      }
    });
    
    if (!existingCharacter) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    
    const updatedCharacter = await prisma.character.update({
      where: { id: characterId },
      data: req.body
    });
    
    res.json(updatedCharacter);
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar personagem' });
  }
});

// Deletar personagem
router.delete('/:id', async (req, res) => {
  try {
    const characterId = parseInt(req.params.id);
    
    // Verificar se o personagem pertence ao usuário
    const existingCharacter = await prisma.character.findFirst({
      where: {
        id: characterId,
        userId: req.user.id
      }
    });
    
    if (!existingCharacter) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    
    await prisma.character.delete({
      where: { id: characterId }
    });
    
    res.json({ message: 'Personagem deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar personagem:', error);
    res.status(500).json({ error: 'Erro ao deletar personagem' });
  }
});

module.exports = router;