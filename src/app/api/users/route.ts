import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { bugs: true },
      orderBy: { xp: "desc" },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.error("GET /api/users error:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
