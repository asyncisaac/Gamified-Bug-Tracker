// src/app/api/bugs/[id]/route.ts - COMPLETE COM PUT
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// GET - JÁ ESTÁ CORRETO
export async function GET(
  _: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bugId = Number(id);
    
    if (!Number.isSafeInteger(bugId) || bugId < 1) {
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

// ✅ ADICIONE ESTA FUNÇÃO PUT PARA FECHAR BUGS
export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 👈 AWAIT aqui também
    const bugId = Number(id);
    
    if (!Number.isSafeInteger(bugId) || bugId < 1) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;
    const allowedStatus = ["open", "in-progress", "closed"];
    if (typeof status !== "string" || !allowedStatus.includes(status)) {
      return NextResponse.json({ error: "Status deve ser: open, in-progress ou closed" }, { status: 400 });
    }

    // Atualiza o bug no banco
    const updatedBug = await prisma.bug.update({
      where: { id: bugId },
      data: { 
        status: status,
        closedAt: status === 'closed' ? new Date() : null
      },
      include: { user: true }
    });

    return NextResponse.json(updatedBug);

  } catch (err) {
    console.error("❌ PUT /api/bugs/[id] error:", err);
    
    // Erro específico para registro não encontrado
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Bug não encontrado" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Erro interno ao atualizar bug" }, 
      { status: 500 }
    );
  }
}

// DELETE - SE PRECISAR (opcional)
export async function DELETE(
  _: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bugId = Number(id);
    
    if (!Number.isSafeInteger(bugId) || bugId < 1) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    await prisma.bug.delete({
      where: { id: bugId }
    });

    return NextResponse.json({ message: "Bug deletado com sucesso" });
  } catch (err) {
    console.error("DELETE /api/bugs/[id] error:", err);
    if (typeof err === "object" && err !== null && "code" in err && err.code === "P2025") {
      return NextResponse.json({ error: "Bug não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ error: "Erro ao deletar bug" }, { status: 500 });
  }
}

