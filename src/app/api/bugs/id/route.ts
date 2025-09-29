import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// GET /api/bugs/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const bug = await prisma.bug.findUnique({
      where: { id: Number(params.id) },
      include: { user: true },
    });

    if (!bug) {
      return NextResponse.json({ error: "Bug não encontrado" }, { status: 404 });
    }

    return NextResponse.json(bug);
  } catch (err) {
    console.error("GET /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Erro ao buscar bug" }, { status: 500 });
  }
}

// PUT /api/bugs/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description, points, status, userId } = body;

    const updatedBug = await prisma.bug.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        points,
        status,
        userId,
      },
    });

    return NextResponse.json(updatedBug);
  } catch (err) {
    console.error("PUT /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Erro ao atualizar bug" }, { status: 500 });
  }
}

// DELETE /api/bugs/[id]
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.bug.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Bug deletado com sucesso" });
  } catch (err) {
    console.error("DELETE /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Erro ao deletar bug" }, { status: 500 });
  }
}
