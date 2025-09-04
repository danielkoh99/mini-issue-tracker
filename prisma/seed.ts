import prisma from "./client";

async function main() {
  const count = await prisma.issue.count();
  if (count > 0) return;

  await prisma.issue.createMany({
    data: [
      {
        title: "Cannot login",
        description: "User reports 401 on login.",
        status: "OPEN",
      },
      {
        title: "Slow dashboard",
        description: "Graphs take 5s to load.",
        status: "IN_PROGRESS",
      },
      {
        title: "Typo on homepage",
        description: "‘Welcom’ should be ‘Welcome’.",
        status: "CLOSED",
      },
    ],
  });
  await prisma.user.create({
    data: {
      name: "Dani",
      password: "password",
    },
  });
  console.log("Seeded data");
}

main().finally(() => prisma.$disconnect());
