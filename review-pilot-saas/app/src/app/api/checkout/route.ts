import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripeClient, isPlanId, priceIdForPlan } from "@/lib/stripe";

export async function POST(request: Request) {
  const { plan } = await request.json();

  if (typeof plan !== "string" || !isPlanId(plan)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { data: membership } = await supabase
    .from("business_members")
    .select("business_id, role")
    .eq("user_id", user.id)
    .eq("role", "owner")
    .limit(1)
    .maybeSingle();

  if (!membership) {
    return NextResponse.json(
      { error: "No business found for this account" },
      { status: 404 },
    );
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id, stripe_customer_id")
    .eq("id", membership.business_id)
    .single();

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const stripe = getStripeClient();
  let stripeCustomerId = business.stripe_customer_id as string | null;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { business_id: business.id },
    });
    stripeCustomerId = customer.id;

    await supabase
      .from("businesses")
      .update({ stripe_customer_id: stripeCustomerId })
      .eq("id", business.id);
  }

  const { origin } = new URL(request.url);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: stripeCustomerId,
    line_items: [{ price: priceIdForPlan(plan), quantity: 1 }],
    subscription_data: { trial_period_days: 14 },
    success_url: `${origin}/dashboard?checkout=success`,
    cancel_url: `${origin}/pricing?checkout=canceled`,
    metadata: { business_id: business.id, plan },
  });

  return NextResponse.json({ url: session.url });
}
