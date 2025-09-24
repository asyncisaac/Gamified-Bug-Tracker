import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, points, userId } = body;

    if (!title || !description || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const bug = await prisma.bug.create({
      data: {
        title,
        description,
        points: points ?? 1,
        userId,
      },
    });

    return NextResponse.json(bug, { status: 201 });
  } catch (err) {
    console.error("POST /api/bugs error:", err);
    return NextResponse.json({ error: "Failed to create bug" }, { status: 500 });
  }
}
