import { Prisma } from "@prisma/client";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const peopleRouter = router({
  getNames: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.people.findMany({
      where: {
        chosenName: null
      }
    })
  }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.people.findMany()
  }),
  assignPerson: publicProcedure.input(
    z.object({
      id: z.string(),
    })
  ).mutation( async (input) => {
    const { ctx, input: data } = input

    const availableName = await ctx.prisma.$queryRaw<{ name: string }[] | null>(
        Prisma.sql`SELECT "People".name FROM "People" LEFT JOIN "People" available_people ON "People"."name" = available_people."chosenName" WHERE available_people.id IS NULL AND "People"."id" != ${data.id} LIMIT 1`
      )

    if (availableName == null) {
      throw Error("No mas genti")
    }

    if (availableName[0] == undefined) {
      throw Error("No mas genti")
    }

    return ctx.prisma.people.update({
      where: {
        id: data.id,
      },
      data: {
        chosenName: availableName[0].name
      }
    })
  })
});
