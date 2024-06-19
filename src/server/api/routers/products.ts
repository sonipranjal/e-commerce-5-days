import { orders, products } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { stripe } from "@/utils/stripe";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const productsRouter = createTRPCRouter({
  getAllProducts: publicProcedure.query(async ({ ctx: { db } }) => {
    const gotAllProducts = await db.select().from(products);

    return {
      gotAllProducts,
    };
  }),
  checkout: protectedProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx: { db, user }, input: { productId } }) => {
      const [foundProduct] = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

      if (!foundProduct) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "product not found!",
        });
      }

      try {
        const session = await stripe.checkout.sessions.create({
          // @ts-ignore
          line_items: [
            {
              price_data: {
                currency: "USD",
                product_data: {
                  name: foundProduct.name,
                  description: foundProduct.description,
                  images: [foundProduct.imageUrl],
                },
                unit_amount: (foundProduct.price ?? 0) * 100,
              },
              quantity: 1,
            },
          ],
          customer_email: user.email,
          mode: "payment",
          success_url: `http://localhost:3000/?success=true`,
          cancel_url: `http://localhost:3000/?canceled=true`,
          metadata: {
            userId: user.id,
            productId,
          },
        });
        return { url: session.url };
      } catch (error) {
        console.log(error);
      }
      return { url: undefined };
    }),

  getUserOrders: protectedProcedure.query(async ({ ctx: { db, user } }) => {
    const userOrders = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, user.id))
      .innerJoin(products, eq(products.id, orders.productId));

    return { userOrders };
  }),
});
