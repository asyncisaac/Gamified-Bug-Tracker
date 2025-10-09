import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// 👇 NEXT.JS 15 - params é Promise e precisa de await
export async function GET(
  _: Request, 
  { params }: { params: Promise<{ id: string }> } // 👈 Promise aqui
) {
  try {
    const { id } = await params; // 👈 AWAIT aqui
    const bugId = parseInt(id);
    
    if (isNaN(bugId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const bug = await prisma.bug.findUnique({
      where: { id: bugId },
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

// 👇 APLIQUE O MESMO PARA PUT, DELETE, PATCH
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // 👈 Promise
) {
  try {
    const { id } = await params; // 👈 AWAIT
    const bugId = parseInt(id);
    // ... resto do código
  } catch (err) {
    console.error("PUT /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Erro ao atualizar bug" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request, 
  { params }: { params: Promise<{ id: string }> } // 👈 Promise
) {
  try {
    const { id } = await params; // 👈 AWAIT
    const bugId = parseInt(id);
    // ... resto do código
  } catch (err) {
    console.error("DELETE /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Erro ao deletar bug" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } // 👈 Promise
) {
  try {
    const { id } = await params; // 👈 AWAIT
    const bugId = parseInt(id);
    // ... resto do código
  } catch (err) {
    console.error("PATCH /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Erro ao fechar bug" }, { status: 500 });
  }
}