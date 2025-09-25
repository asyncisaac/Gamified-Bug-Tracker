import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

// GET /api/bugs → lista todos os bugs
export async function GET() {
  try {
    const bugs = await prisma.bug.findMany({
      include: { user: true },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(bugs);
  } catch (err) {
    console.error("GET /api/bugs error:", err);
    return NextResponse.json({ error: "Failed to fetch bugs" }, { status: 500 });
  }
}

// POST /api/bugs → cria um novo bug
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, status, points, userId } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: "Title, description and userId are required" },
        { status: 400 }
      );
    }

    const bug = await prisma.bug.create({
      data: {
        title,
        description,
        status: status || "open",
        points: points || 1,
        userId,
      },
    });

    return NextResponse.json(bug, { status: 201 });
  } catch (err) {
    console.error("POST /api/bugs error:", err);
    return NextResponse.json({ error: "Failed to create bug" }, { status: 500 });
  }
}
