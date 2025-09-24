import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

type Params = {
  params: { id: string };
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const bugId = parseInt(params.id, 10);
    const body = await req.json();
    const { status } = body;

    if (!["open", "in-progress", "closed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updatedBug = await prisma.bug.update({
      where: { id: bugId },
      data: { status },
    });

    return NextResponse.json(updatedBug);
  } catch (err) {
    console.error("PATCH /api/bugs/[id] error:", err);
    return NextResponse.json({ error: "Failed to update bug" }, { status: 500 });
  }
}
