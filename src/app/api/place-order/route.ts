// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe  = new StripeModule.default(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16", // Stripe API version
// });

// export async function POST(req: Request) {
//   try {
//     // Payment Method ID aur amount ko request body se get karo
//     const { paymentMethodId, amount } = await req.json();

//     // Stripe pe Payment Intent create karo
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount, // Amount in cents (e.g. 5000 means $50.00)
//       currency: "usd", // Currency, yeh tumhare requirement ke hisaab se change ho sakta hai
//       payment_method: paymentMethodId,
//       confirm: true, // Payment ko automatically confirm karo
//     });

//     // Payment successfully processed, response send karo
//     return NextResponse.json({ success: true, paymentIntent });
//   } catch (error) {
//     // Agar payment fail ho jaye toh error handle karo
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }
   

// // server.js
// const express = require("express");
// const Stripe = require("stripe");
// const bodyParser = require("body-parser");

// const app = express();
// const stripe = Stripe("your-secret-key-here");

// app.use(bodyParser.json());

// app.post("/api/create-payment-intent", async (req, res) => {
//   const { amount, payment_method, currency } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       payment_method,
//       confirmation_method: "manual",
//       confirm: true,
//     });

//     res.send({
//       client_secret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(400).send({
//       error: error.message,
//     });
//   }
// });

// app.post("/api/place-order", async (req, res) => {
//   const { firstName, lastName, companyName, country, streetAddress, zipCode, cartItems, deliveryCharges, total, paymentMethod } = req.body;

//   // Here you would typically save the order to your database
//   const orderId = "ORDER12345"; // Replace with actual order ID from your database

//   res.send({
//     orderId,
//   });
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  
});

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
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Something went wrong" });
  }
}
