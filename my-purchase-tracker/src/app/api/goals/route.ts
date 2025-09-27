// src/app/api/goals/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

type GoalInput = {
  title: string;
  totalAmount: number;
  savedAmount: number;
  targetDate: string;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
	return new Response("Unauthorized", { status: 401 });
  }

  const body: GoalInput = await req.json();
  const { title, totalAmount, savedAmount, targetDate } = body;

  if (!title || !totalAmount || !targetDate) {
	return new Response("Missing required fields", { status: 400 });
  }

  const goal = await prisma.goal.create({
	data: {
	  title,
	  totalAmount,
	  savedAmount,
	  targetDate: new Date(targetDate),
	  user: { connect: { id: Number(session.user.id) } },
	},
  });

  return Response.json(goal);
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
	return new Response("Unauthorized", { status: 401 });
  }

  const goals = await prisma.goal.findMany({
	where: { userId: Number(session.user.id) },
	orderBy: { targetDate: "asc" },
  });

  return Response.json(goals);
}
