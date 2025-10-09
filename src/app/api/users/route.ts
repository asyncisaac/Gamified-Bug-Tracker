// api/users/route.ts - CORRETO (SEM PARAMS)
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

// GET /api/users → para Leaderboard
export async function GET(request: Request) { // 👈 SEM params aqui!
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

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

// POST /api/users → cria user novo  
export async function POST(req: Request) { // 👈 SEM params aqui!
  try {
    const body = await req.json();
    const { name, email, avatar } = body;

    if (!name) {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email?.trim(),
        avatar,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("POST /api/users error:", err);
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}