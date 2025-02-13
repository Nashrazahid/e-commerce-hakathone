
import Stripe from "stripe";
import { NextResponse } from "next/server";

interface StripeError {
    message: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export async function POST(req: Request) {
    try {
        // JSON request body parse karo
        const { paymentMethodId, amount } = await req.json();

        // Stripe pe payment create karo
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
        });

        return NextResponse.json({ success: true, paymentIntent });
    } catch (error: unknown) {
        let message = "Something went wrong"; // Default message

        if (error instanceof Error) {
            message = error.message;
        }
        //Cast error as StripeError if it is indeed a StripeError
        const stripeError = error as Partial<StripeError>;
        return NextResponse.json({ success: false, error: stripeError.message || message });
    }
}


