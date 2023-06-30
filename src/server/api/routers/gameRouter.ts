
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),
    getAllCategories: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.category.findMany()
        }),

    getAllGamesWithCategoryId: publicProcedure.input(z.union([z.string(), z.null()])).query(({ input, ctx }) => {
        if (input === null) {
            return null
        }

        return ctx.prisma.gameText.findMany({
            where: {
                categories: {
                    some: {
                        id: input
                    }
                }
            }
        });
    }),
});
