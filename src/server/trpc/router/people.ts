import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const peopleRouter = router({
  assignPerson: publicProcedure.input(
    z.object({
      name: z.string(),
    })
  ).mutation( async (input) => {
    const { ctx, input: data } = input
    const availablePeople = await ctx.prisma.availablePeople.findFirst();
    if (availablePeople === null) {
      throw Error("no more people")
    }
    await ctx.prisma.availablePeople.delete({
      where: {
        id: availablePeople.id
      }
    })

    return ctx.prisma.people.create({
      data: {
        name: data.name,
        chosenPerson: availablePeople.name
      }
    })
  })
});
