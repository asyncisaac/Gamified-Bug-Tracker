import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// GET /api/users/[id]
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // 👈 AWAIT AQUI
    const userId = Number(id);
    
    if (!Number.isSafeInteger(userId) || userId < 1) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { bugs: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("GET /api/users/[id] error:", err);
    return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
  }
}

// PUT /api/users/[id] 
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // 👈 AWAIT AQUI
    const userId = Number(id);
    
    if (!Number.isSafeInteger(userId) || userId < 1) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
    }

    const input = body as { name?: unknown; xp?: unknown; level?: unknown };
    const data: { name?: string; xp?: number; level?: number } = {};
    if (input.name !== undefined) {
      if (typeof input.name !== "string" || !input.name.trim()) {
        return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
      }
      data.name = input.name.trim();
    }
    for (const field of ["xp", "level"] as const) {
      const value = input[field];
      if (value !== undefined) {
        if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
          return NextResponse.json({ error: `${field} deve ser um inteiro não negativo` }, { status: 400 });
        }
        data[field] = value;
      }
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Informe ao menos um campo para atualizar" }, { status: 400 });
    }

    const user = await prisma.user.update({ where: { id: userId }, data });
    return NextResponse.json(user);
  } catch (err) {
    console.error("PUT /api/users/[id] error:", err);
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

// DELETE /api/users/[id]
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // 👈 AWAIT AQUI
    const userId = Number(id);
    
    if (!Number.isSafeInteger(userId) || userId < 1) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.bug.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);
    return NextResponse.json({ message: "Usuário removido com sucesso" });
  } catch (err) {
    console.error("DELETE /api/users/[id] error:", err);
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}

