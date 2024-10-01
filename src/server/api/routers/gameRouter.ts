import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sample } from "remeda";

export const gameRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getQuote: publicProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!input) {
        return null;
      }
      return await ctx.prisma.quote.findFirst({
        where: {
          id: input,
        },
        include: {
          categories: true,
          author: true,
        },
      });
    }),
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.category.findMany();
  }),

  getCategory: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.category.findFirst({
        where: {
          id: input,
        },
        include: {
          quotes: {
            include: {
              author: true,
            },
          },
        },
      });
    }),
  getAllGamesWithCategoryId: publicProcedure
    .input(z.union([z.string(), z.null()]))
    .query(({ input, ctx }) => {
      if (input === null) {
        return null;
      }

      return ctx.prisma.quote.findMany({
        where: {
          categories: {
            some: {
              id: input,
            },
          },
        },
      });
    }),
  getRandomGameWithCategoryId: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const games = await ctx.prisma.quote.findMany({
        where: {
          categories: {
            some: {
              id: input,
            },
          },
        },
      });

      if (!games) return;
      const randomGame = sample(games, 1)[0];
      return randomGame;
    }),
  getRandomGame: publicProcedure.query(async ({ ctx }) => {
    const games = await ctx.prisma.quote.findMany({
      include: {
        categories: true,
      },
    });

    if (!games) return;
    const randomGame = sample(games, 1)[0];
    return randomGame;
  }),
});
