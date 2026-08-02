import Stripe from "stripe";

export function getStripeClient() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export type PlanId = "starter" | "growth" | "pro";

export function priceIdForPlan(plan: PlanId): string {
  const priceIds: Record<PlanId, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    growth: process.env.STRIPE_PRICE_GROWTH,
    pro: process.env.STRIPE_PRICE_PRO,
  };

  const priceId = priceIds[plan];
  if (!priceId) {
    throw new Error(`No Stripe price configured for plan "${plan}"`);
  }
  return priceId;
}

export function isPlanId(value: string): value is PlanId {
  return value === "starter" || value === "growth" || value === "pro";
}

export function planForPriceId(priceId: string): PlanId | null {
  const entries: [PlanId, string | undefined][] = [
    ["starter", process.env.STRIPE_PRICE_STARTER],
    ["growth", process.env.STRIPE_PRICE_GROWTH],
    ["pro", process.env.STRIPE_PRICE_PRO],
  ];
  return entries.find(([, id]) => id === priceId)?.[0] ?? null;
}
