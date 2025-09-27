// src/app/api/auth/signup/route.ts
import { PrismaClient } from '@/generated/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
	return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
	return NextResponse.json({ error: 'Email déjà utilisé.' }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  await prisma.user.create({
	data: {
	  email,
	  password: hashedPassword,
	},
  });

  return NextResponse.json({ success: true });
}
