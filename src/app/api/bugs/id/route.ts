import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// GET /api/bugs/[id] retorna um bug específico
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const bug = await prisma.bug.findUnique({
      where: { id: Number(params.id) },
      include: { user: true },
    });

    if (!bug) {
      return NextResponse.json({ error: "Bug not found" }, { status: 404 });
    }

    return NextResponse.json(bug);
  } catch (err) {
    console.error("GET /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch bug" }, { status: 500 });
  }
}

// PUT /api/bugs/[id] atualiza bug
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, description, status, points, userId } = body;

    const bug = await prisma.bug.update({
      where: { id: Number(params.id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
        ...(points && { points }),
        ...(userId && { userId }),
      },
    });

    return NextResponse.json(bug);
  } catch (err) {
    console.error("PUT /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Failed to update bug" }, { status: 500 });
  }
}

// DELETE /api/bugs/[id] remove bug
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.bug.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Bug deleted" });
  } catch (err) {
    console.error("DELETE /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete bug" }, { status: 500 });
  }
}
