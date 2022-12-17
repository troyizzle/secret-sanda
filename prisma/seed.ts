import { prisma } from "../src/server/db/client";

async function main() {
  await prisma.people.createMany({
    data: [
      { name: "Sandy" },
      { name: "Santy" },
      { name: "Daniel" },
      { name: "Soni" },
      { name: "Pao" },
      { name: "Troy" },
      { name: "Fanny" },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
