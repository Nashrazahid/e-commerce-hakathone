
import { NextRequest, NextResponse } from "next/server";

interface CartItem {
  weight?: number;  // Make weight optional since the prompt says `item.weight || 1`
}

export async function POST(req: NextRequest) {
  try {
    const { type, postalCode, country, weight, address, cartItems } = await req.json();
    const SHIPENGINE_API_KEY = process.env.SHIPENGINE_API_KEY;

    if (!SHIPENGINE_API_KEY) {
      return NextResponse.json({ error: "Missing ShipEngine API key" }, { status: 500 });
    }

    if (type === "shippingCost") {
      const response = await fetch("https://api.shipengine.com/v1/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": SHIPENGINE_API_KEY,
        },
        body: JSON.stringify({
          rate_options: { carrier_ids: ["se-123456"] },
          shipment: {
            ship_to: { postal_code: postalCode, country_code: country },
            packages: [{ weight: { value: weight, unit: "pound" } }],
          },
        }),
      });

      const data = await response.json();
      if (data.rate_response) {
        return NextResponse.json({ rate: data.rate_response.rates[0].shipping_amount.amount });
      } else {
        return NextResponse.json({ error: "Could not fetch shipping rate" }, { status: 400 });
      }
    }

    if (type === "createShipment") {
      const response = await fetch("https://api.shipengine.com/v1/labels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-Key": SHIPENGINE_API_KEY,
        },
        body: JSON.stringify({
          shipment: {
            service_code: "usps_priority_mail",
            ship_to: {
              name: address.name,
              address_line1: address.address,
              postal_code: address.zipCode,
              country_code: address.country,
            },
            packages: cartItems.map((item: CartItem) => ({  // Use the CartItem type here
              weight: { value: item.weight || 1, unit: "pound" },
            })),
          },
        }),
      });

      const data = await response.json();
      if (data.label_id) {
        return NextResponse.json({ trackingNumber: data.tracking_number });
      } else {
        return NextResponse.json({ error: "Could not create shipment" }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Invalid request type" }, { status: 400 });
  } catch (error) {
    console.error("ShipEngine API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
