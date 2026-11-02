import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

// GET
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '10');
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
      return NextResponse.json({ error: "Paginação inválida (page >= 1, limit entre 1 e 100)" }, { status: 400 });
    }
    const skip = (page - 1) * limit;
    if (!Number.isSafeInteger(skip)) {
      return NextResponse.json({ error: "Página fora do limite" }, { status: 400 });
    }
    
    const allowedStatus = ["open", "in-progress", "closed"];
    if (status && !allowedStatus.includes(status)) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 });
    }
    const parsedUserId = userId === null ? undefined : Number(userId);
    if (parsedUserId !== undefined && (!Number.isSafeInteger(parsedUserId) || parsedUserId < 1)) {
      return NextResponse.json({ error: "userId inválido" }, { status: 400 });
    }
    const where = {
      ...(status ? { status } : {}),
      ...(parsedUserId !== undefined ? { userId: parsedUserId } : {}),
    };

    const [bugs, total] = await Promise.all([
      prisma.bug.findMany({
        where,
        include: { user: true },
        orderBy: { id: "desc" },
        skip,
        take: limit,
      }),
      prisma.bug.count({ where })
    ]);

    return NextResponse.json({
      bugs,
      pagination: {
        page,
        limit, 
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("GET /api/bugs error:", err);
    return NextResponse.json({ error: "Erro ao buscar bugs" }, { status: 500 });
  }
}

// POST 
export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
    }
    const { title, description, points, status, userId } = body as {
      title?: unknown;
      description?: unknown;
      points?: unknown;
      status?: unknown;
      userId?: unknown;
    };

    if (typeof title !== "string" || !title.trim() || typeof description !== "string" || !description.trim()) {
      return NextResponse.json({ 
        error: "Title e description são obrigatórios" 
      }, { status: 400 });
    }

    const allowedStatus = ["open", "in-progress", "closed"];
    if (status !== undefined && (typeof status !== "string" || !allowedStatus.includes(status))) {
      return NextResponse.json({ 
        error: "Status deve ser: open, in-progress ou closed" 
      }, { status: 400 });
    }

    if (points !== undefined && (typeof points !== "number" || !Number.isSafeInteger(points) || points < 0 || points > 100)) {
      return NextResponse.json({ 
        error: "Points devem ser entre 0 e 100" 
      }, { status: 400 });
    }

    if (typeof userId !== "number" || !Number.isSafeInteger(userId) || userId < 1) {
      return NextResponse.json({ error: "userId válido é obrigatório" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const bug = await prisma.bug.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        points: points ?? 1,
        status: status ?? "open",
        userId,
      },
    });

    return NextResponse.json(bug, { status: 201 });
  } catch (err) {
    console.error("POST /api/bugs error:", err);
    return NextResponse.json({ error: "Erro ao criar bug" }, { status: 500 });
  }
}

