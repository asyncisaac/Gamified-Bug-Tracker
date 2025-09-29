import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

// GET /api/bugs → lista todos os bugs
export async function GET() {
  try {
    const bugs = await prisma.bug.findMany({
      include: { user: true }, // opcional: traz também o usuário responsável
      orderBy: { id: "desc" },
    });
    return NextResponse.json(bugs);
  } catch (err) {
    console.error("GET /api/bugs error:", err);
    return NextResponse.json({ error: "Erro ao buscar bugs" }, { status: 500 });
  }
}

// POST /api/bugs → cria bug novo
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, points, status, userId } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title e description são obrigatórios" }, { status: 400 });
    }

    const bug = await prisma.bug.create({
      data: {
        title,
        description,
        points: points ?? 1,
        status: status ?? "open",
        userId: userId ?? null,
      },
    });

    return NextResponse.json(bug, { status: 201 });
  } catch (err) {
    console.error("POST /api/bugs error:", err);
    return NextResponse.json({ error: "Erro ao criar bug" }, { status: 500 });
  }
}
