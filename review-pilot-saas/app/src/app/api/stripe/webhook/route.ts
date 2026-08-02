import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripeClient, planForPriceId } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const stripe = getStripeClient();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const businessId = session.metadata?.business_id;
      const plan = session.metadata?.plan;
      if (businessId && plan) {
        await supabase.from("businesses").update({ plan }).eq("id", businessId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const priceId = subscription.items.data[0]?.price.id;
      const plan = priceId ? planForPriceId(priceId) : null;

      if (plan && ["active", "trialing", "past_due"].includes(subscription.status)) {
        await supabase
          .from("businesses")
          .update({ plan })
          .eq("stripe_customer_id", subscription.customer as string);
      } else if (subscription.status === "canceled" || subscription.status === "unpaid") {
        await supabase
          .from("businesses")
          .update({ plan: "canceled" })
          .eq("stripe_customer_id", subscription.customer as string);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("businesses")
        .update({ plan: "canceled" })
        .eq("stripe_customer_id", subscription.customer as string);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
