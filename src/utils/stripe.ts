import { env } from "@/env";
import loadStripe from "stripe";

export const stripe = new loadStripe(env.STRIPE_KEY, {
  typescript: true,
  apiVersion: "2024-04-10",
});
