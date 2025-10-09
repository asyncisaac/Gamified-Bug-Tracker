// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...')

  // Criar usuários
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Silva',
      email: 'alice@bugtracker.com',
      avatar: '👩‍💻',
      level: 3,
      xp: 275
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Santos',
      email: 'bob@bugtracker.com', 
     avatar: '👨‍💻',
      level: 5,
      xp: 480
    }
  })

  const user3 = await prisma.user.create({
    data: {
      name: 'Carol Oliveira',
      email: 'carol@bugtracker.com',
      avatar: '👩‍🎨',
      level: 2,
      xp: 150
    }
  })

  // Criar bugs
  await prisma.bug.createMany({
    data: [
      {
        title: 'Botão de login não funciona',
        description: 'O botão de login na página principal não redireciona para a dashboard',
        status: 'open',
        points: 10,
        userId: user1.id
      },
      {
        title: 'Responsividade quebrada no mobile',
        description: 'Layout quebra em dispositivos com tela menor que 375px',
        status: 'in-progress', 
        points: 15,
        userId: user2.id
      },
      {
        title: 'Erro 500 ao enviar formulário',
        description: 'API retorna erro 500 quando o campo email está vazio',
        status: 'closed',
        points: 20,
        userId: user3.id
      },
      {
        title: 'Loading infinito na página de perfil',
        description: 'Spinner fica girando eternamente ao carregar dados do usuário',
        status: 'open',
        points: 8,
        userId: user1.id
      },
      {
        title: 'Cor incorreta no tema escuro',
        description: 'Texto fica ilegível no modo escuro devido ao contraste baixo',
        status: 'open',
        points: 5,
        userId: user2.id
      }
    ]
  })

  console.log('✅ Seed completed!')
  console.log(`👥 ${await prisma.user.count()} usuários criados`)
  console.log(`🐛 ${await prisma.bug.count()} bugs criados`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })