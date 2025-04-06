import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Use latest API version
});

/**
 * Subscription plans
 */
const PLANS = {
  gold: {
    name: 'Gold Subscription',
    description: 'Premium features including priority matchmaking, AI health reports, and concierge services',
    amount: 2900, // $29.00
    currency: 'usd',
    interval: 'month',
    intervalCount: 1,
  },
  breeder_club: {
    name: 'Breeder Club Subscription',
    description: 'Advanced analytics, promotions, and breeding tools',
    amount: 9900, // $99.00
    currency: 'usd',
    interval: 'year',
    intervalCount: 1,
  },
};

/**
 * One-time services
 */
const SERVICES = {
  concierge_basic: {
    name: 'Basic Concierge Service',
    description: 'Assistance with forms and basic pet needs',
    amount: 1500, // $15.00
    currency: 'usd',
  },
  concierge_premium: {
    name: 'Premium Concierge Service',
    description: 'Premium assistance with veterinary appointment booking and pedigree management',
    amount: 4900, // $49.00
    currency: 'usd',
  },
};

/**
 * Creates a Stripe checkout session for subscriptions or one-time payments
 * POST /api/payments/stripe/checkout
 */
export async function POST(request: NextRequest) {
  try {
    // Get Supabase client
    const supabase = createRouteHandlerClient({ cookies });
    
    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { type, planId, quantity = 1, successUrl, cancelUrl, metadata = {} } = body;

    // Validate required fields
    if (!type || !planId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: type, planId, successUrl, cancelUrl' },
        { status: 400 }
      );
    }

    // Validate type
    if (type !== 'subscription' && type !== 'one_time') {
      return NextResponse.json(
        { error: 'Invalid type. Must be "subscription" or "one_time"' },
        { status: 400 }
      );
    }

    // Get user details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email, full_name, org_id')
      .eq('id', session.user.id)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Failed to get user details' },
        { status: 500 }
      );
    }

    // Set up Stripe checkout based on type
    let stripeSession;

    if (type === 'subscription') {
      // Check if plan exists
      const plan = PLANS[planId as keyof typeof PLANS];
      if (!plan) {
        return NextResponse.json(
          { error: 'Invalid plan ID' },
          { status: 400 }
        );
      }

      // Create or get price
      const price = await getOrCreatePrice(planId, plan);

      // Create subscription checkout session
      stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price,
            quantity,
          },
        ],
        mode: 'subscription',
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl,
        customer_email: user.email,
        metadata: {
          ...metadata,
          userId: session.user.id,
          orgId: user.org_id || '',
          planId,
          type,
        },
      });
    } else {
      // One-time payment
      const service = SERVICES[planId as keyof typeof SERVICES];
      if (!service) {
        return NextResponse.json(
          { error: 'Invalid service ID' },
          { status: 400 }
        );
      }

      // Create one-time checkout session
      stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: service.currency,
              product_data: {
                name: service.name,
                description: service.description,
              },
              unit_amount: service.amount,
            },
            quantity,
          },
        ],
        mode: 'payment',
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl,
        customer_email: user.email,
        metadata: {
          ...metadata,
          userId: session.user.id,
          orgId: user.org_id || '',
          serviceId: planId,
          type,
        },
      });
    }

    // Return checkout URL
    return NextResponse.json({
      success: true,
      url: stripeSession.url,
      sessionId: stripeSession.id,
    });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Helper to get or create a Stripe price for subscriptions
 */
async function getOrCreatePrice(planId: string, plan: any): Promise<string> {
  // Try to find existing price first
  const prices = await stripe.prices.list({
    lookup_keys: [planId],
    active: true,
    limit: 1,
  });

  if (prices.data.length > 0) {
    return prices.data[0].id;
  }

  // Create a new product
  const product = await stripe.products.create({
    name: plan.name,
    description: plan.description,
  });

  // Create a new price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: plan.amount,
    currency: plan.currency,
    recurring: {
      interval: plan.interval as Stripe.PriceRecurringInterval,
      interval_count: plan.intervalCount,
    },
    lookup_key: planId,
  });

  return price.id;
} 