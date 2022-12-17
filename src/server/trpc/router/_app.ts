import { router } from "../trpc";
import { peopleRouter } from "./people";

export const appRouter = router({
  people: peopleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
