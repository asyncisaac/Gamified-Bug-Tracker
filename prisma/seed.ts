import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: { name: "Maria" }
  });

  const user2 = await prisma.user.create({
    data: { name: "Joaozinho" }
  });

  await prisma.bug.createMany({
    data: [
      { title: "Erro no login", description: "Não consegue logar", status: "open", points: 5, userId: user1.id },
      { title: "Página quebra", description: "Erro 500 na home", status: "open", points: 3, userId: user2.id },
      { title: "Layout bugado", description: "CSS não aplica", status: "in-progress", points: 2, userId: user1.id },
    ]
  });

  console.log("Seed complete!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
