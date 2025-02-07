"use client";
import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        alert("Stripe is not loaded yet.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        alert("Card details are missing.");
        setLoading(false);
        return;
      }

      // Backend API Call to Create Payment Intent
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: calculateTotal() }),
      });

      const data = await response.json();
      if (!data.clientSecret) {
        alert("Failed to create payment intent.");
        setLoading(false);
        return;
      }

      // Confirm Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement! },
      });

      if (result.error) {
        alert("Payment failed: " + result.error.message);
      } else {
        const generatedOrderId = "ORD-" + Math.floor(Math.random() * 1000000);
        setOrderId(generatedOrderId);
        alert(`Payment successful! Your Order ID: ${generatedOrderId}`);
        localStorage.removeItem("cart");
      }
    } else {
      const generatedOrderId = "COD-" + Math.floor(Math.random() * 1000000);
      setOrderId(generatedOrderId);
      alert(`Order placed successfully! Your Order ID: ${generatedOrderId}`);
      localStorage.removeItem("cart");
    }

    setLoading(false);
  };

  return (
    <div>
      {orderId ? (
        <div className="text-center p-6 border border-green-500 rounded-lg bg-green-100 text-green-700">
          <h2 className="text-xl font-semibold">🎉 Order Placed Successfully!</h2>
          <p>Your Order ID: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid gap-6">
          <div className="border-2 border-gray-300 rounded-lg p-6 flex flex-col gap-6">
            <h1 className="text-xl font-semibold">Order Summary</h1>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.price} x {item.quantity}</span>
              </div>
            ))}
            <div className="font-bold text-lg">Total: ${calculateTotal()}</div>
          </div>

          <div>
            <label className="block font-medium mb-2">Select Payment Method</label>
            <select
              className="w-full border p-2 rounded-lg"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="cod">Cash on Delivery</option>
              <option value="stripe">Credit/Debit Card (Stripe)</option>
            </select>
          </div>

          {paymentMethod === "stripe" && (
            <div className="border p-4 rounded-lg">
              <label className="block font-medium mb-2">Card Details</label>
              <CardElement className="p-2 border rounded-lg" />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      )}
    </div>
  );
}

export default PaymentForm;
