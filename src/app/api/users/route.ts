import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

// GET: lista todos os usuários
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { bugs: true },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(users);
  } catch (err) {
    console.error("GET /api/users error:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST: cria um novo usuário
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: { name },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("POST /api/users error:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

