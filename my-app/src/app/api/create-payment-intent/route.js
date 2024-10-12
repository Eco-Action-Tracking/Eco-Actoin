// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   if (req.method === "POST") {
//     try {
//       const { amount, id } = await req.json();

//       const payment = await stripe.paymentIntents.create({
//         amount,
//         currency: "USD",
//         description: "Your product or service description",
//         payment_method: id,
//         confirm: true,
//       });

//       console.log("Payment", payment);

//       return NextResponse.json({
//         success: true,
//         message: "Payment successful",
//         payment: payment,
//       });
//     } catch (error) {
//       console.log("Error", error);
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Payment failed",
//           error: error.message,
//         },
//         { status: 500 }
//       );
//     }
//   } else {
//     return NextResponse.json(
//       { message: "Method Not Allowed" },
//       { status: 405 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // Use the latest API version
});

export async function POST(req) {
  if (req.method === "POST") {
    try {
      const { amount } = await req.json();

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}
