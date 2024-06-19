import { env } from "@/env";
import { stripe } from "@/utils/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { db } from "@/server/db";
import { orders } from "@/server/db/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const charge = event.data.object as Stripe.Checkout.Session;

        const userId = charge.metadata?.userId;
        const productId = charge.metadata?.productId;

        if (userId && productId) {
          await db.insert(orders).values({
            userId,
            productId,
            paymentStatus: true,
          });

          // send an email to user about payment confirmation
        } else {
          res.status(400).send(`metadata not found!`);
        }

        break;
      default:
        // Unexpected event type
        console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
