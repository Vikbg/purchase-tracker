// src/app/api/goals/route.ts
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
	const goals = await prisma.goal.findMany();
	return new Response(JSON.stringify(goals), { status: 200 });
  } catch (error) {
	return new Response('Erreur lors de la récupération des objectifs', { status: 500 });
  }
}

export async function POST(req: Request) {
  const { title, totalAmount, savedAmount, targetDate } = await req.json();

  try {
	const newGoal = await prisma.goal.create({
	  data: { title, totalAmount, savedAmount, targetDate: new Date(targetDate) },
	});
	return new Response(JSON.stringify(newGoal), { status: 201 });
  } catch (error) {
	return new Response('Erreur lors de la création de l\'objectif', { status: 500 });
  }
}
