// src/scripts/testPrisma.ts
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Connexion réussie à la base de données');
    // Teste une requête pour vérifier que tout fonctionne
    const goals = await prisma.goal.findMany();
    console.log(goals);
  } catch (error) {
    console.error('Échec de la connexion à la base de données', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
