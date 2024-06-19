import { orders, productInsertSchema, products } from "@/server/db/schema";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import slugify from "slugify";

export const adminRouter = createTRPCRouter({
  createProduct: adminProcedure
    .input(productInsertSchema)
    .mutation(async ({ ctx: { db }, input }) => {
      await db.insert(products).values({ ...input, slug: slugify(input.slug) });
    }),

  updateProduct: adminProcedure
    .input(
      productInsertSchema
        .partial()
        .omit({
          id: true,
        })
        .extend({
          productId: z.string().uuid(),
        }),
    )
    .mutation(async ({ ctx: { db }, input: { productId, ...finalInput } }) => {
      let finalObj = finalInput;

      if (finalInput.slug) {
        finalObj = { ...finalInput, slug: slugify(finalInput.slug) };
      }

      await db.update(products).set(finalObj).where(eq(products.id, productId));
    }),

  getAllProducts: adminProcedure.query(async ({ ctx: { db } }) => {
    const gotAllProducts = await db.select().from(products);

    return {
      gotAllProducts,
    };
  }),

  deleteProduct: adminProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { db }, input: { productId } }) => {
      await db.delete(products).where(eq(products.id, productId));
    }),

  getProductById: adminProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx: { db }, input: { productId } }) => {
      const [gotProduct] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      return {
        gotProduct,
      };
    }),

  getAllOrders: adminProcedure.query(async ({ ctx: { db } }) => {
    const allOrders = await db
      .select()
      .from(orders)
      .innerJoin(products, eq(products.id, orders.productId));

    return { allOrders };
  }),
});
