import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

// GET /api/users
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '10');
    if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
      return NextResponse.json({ error: "Paginação inválida (page >= 1, limit entre 1 e 100)" }, { status: 400 });
    }
    const skip = (page - 1) * limit;
    if (!Number.isSafeInteger(skip)) {
      return NextResponse.json({ error: "Página fora do limite" }, { status: 400 });
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        include: {
          bugs: {
            where: {
              status: "closed"
            }
          }
        },
        orderBy: { xp: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count()
    ]);

    const usersWithStats = users.map(user => ({
      id: user.id,
      name: user.name,
      level: user.level,
      xp: user.xp,
      bugsResolved: user.bugs.length,
      avatar: user.avatar,
      email: user.email
    }));

    return NextResponse.json({
      users: usersWithStats,
      pagination: {
        page,
        limit,  
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("GET /api/users error:", err);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

// POST /api/users
export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Corpo da requisição inválido" }, { status: 400 });
    }
    const { name, email, avatar } = body as {
      name?: unknown;
      email?: unknown;
      avatar?: unknown;
    };

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
    }
    if (email !== undefined && email !== null && typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    if (avatar !== undefined && avatar !== null && typeof avatar !== "string") {
      return NextResponse.json({ error: "Avatar inválido" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: typeof email === "string" ? email.trim() : undefined,
        avatar,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("POST /api/users error:", err);
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}

