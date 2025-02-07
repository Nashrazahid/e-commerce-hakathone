"use client";

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "your-publishable-key-here"); //Added fallback and env variable

interface FormData {
    firstName: string;
    lastName: string;
    companyName: string;
    country: string;
    streetAddress: string;
    zipCode: string;
    paymentMethod: "bank_transfer" | "cod" | "stripe";
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const CheckoutForm: React.FC<{
    formData: FormData;
    cartItems: CartItem[];
    deliveryCharges: number | null;
    calculateTotal: () => number;
}> = ({ formData, cartItems, deliveryCharges, calculateTotal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.warn("Stripe or Elements is not yet initialized.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                setError("Card element not found.");
                setLoading(false);
                return;
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                setError(error.message || "An unexpected error occurred.");
                setLoading(false);
                return;
            }

            if (!paymentMethod) {
                setError("Failed to create payment method.");
                setLoading(false);
                return;
            }

            const response = await fetch("/api/create-payment-intent", {  //Changed endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: Math.round(calculateTotal() * 100), // Amount in cents
                    currency: "usd",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Payment intent creation failed: ${errorData.error}`);
                setLoading(false);
                return;
            }

            const paymentIntentData = await response.json();

            if (paymentIntentData.error) {
                setError(paymentIntentData.error);
                setLoading(false);
                return;
            }

            const { client_secret } = paymentIntentData;

            const { error: confirmError } = await stripe.confirmCardPayment(client_secret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                setError(confirmError.message || "An unexpected error occurred.");
                setLoading(false);
                return;
            }

            // Payment successful, place the order
            const orderResponse = await fetch("/api/place-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    cartItems,
                    deliveryCharges,
                    total: calculateTotal(),
                    paymentMethod: "stripe",
                }),
            });

            const order = await orderResponse.json();

            if (order.error) {
                setError(order.error);
            } else {
                // Handle successful order placement
                alert(`Order placed successfully! Order ID: ${order.orderId}`);
            }

            setLoading(false);
        } catch (err: any) {
            setError(`An unexpected error occurred: ${err.message}`);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                onChange={(event) => {
                    if (event.error) {
                        setError(event.error.message);
                    } else {
                        setError(null);
                    }
                }}
            />
            {error && <div className="text-red-500">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-black text-white font-semibold py-3 mt-6 rounded-lg"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

const Page: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [deliveryCharges, setDeliveryCharges] = useState<number | null>(null);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "Pakistan",
        streetAddress: "",
        zipCode: "",
        paymentMethod: "bank_transfer",
    });

    useEffect(() => {
        const cartData = localStorage.getItem("cart");
        let cart: CartItem[] = [];

        try {
            cart = cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error("Error parsing cart data from localStorage:", error);
            cart = [];
        }

        setCartItems(cart);
        calculateDeliveryCharges(cart);
    }, []);

    const calculateDeliveryCharges = (cart: CartItem[]) => {
        setDeliveryCharges(cart.length > 0 ? 200 : 0);
    };

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return subtotal + (deliveryCharges || 0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-6 py-12">
            <div className="w-full max-w-4xl grid lg:grid-cols-2 grid-cols-1 gap-12">
                {/* Billing Details */}
                <div>
                    <h1 className="text-2xl font-bold mb-6 text-center">Billing Details</h1>
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-md font-semibold block">First Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-400 h-12 p-3 rounded-md w-full"
                                    required
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="text-md font-semibold block">Last Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-400 h-12 p-3 rounded-md w-full"
                                    required
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-md font-semibold block">Company Name (Optional)</label>
                            <input
                                type="text"
                                className="border border-gray-400 h-12 p-3 rounded-md w-full"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="text-md font-semibold block">Country/Region</label>
                            <select
                                className="border border-gray-400 h-12 p-3 rounded-md w-full"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                            >
                                <option>Pakistan</option>
                                <option>Saudi Arabia</option>
                                <option>Australia</option>
                                <option>Sri Lanka</option>
                                <option>Dubai</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-md font-semibold block">Street Address</label>
                            <input
                                type="text"
                                className="border border-gray-400 h-12 p-3 rounded-md w-full"
                                required
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="text-md font-semibold block">ZIP Code</label>
                            <input
                                type="text"
                                className="border border-gray-400 h-12 p-3 rounded-md w-full"
                                required
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <h1 className="text-2xl font-bold mb-4 text-center">Order Summary</h1>
                    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                        <div className="flex justify-between font-semibold border-b pb-2">
                            <p>Product</p>
                            <p>Amount</p>
                        </div>

                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between mt-3">
                                <p>
                                    {item.name} x {item.quantity}
                                </p>
                                <p>Rs. {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}

                        <div className="mt-4 border-t pt-3">
                            <div className="flex justify-between">
                                <p className="font-semibold">Subtotal</p>
                                <p>
                                    Rs.{" "}
                                    {cartItems
                                        .reduce((total, item) => total + item.price * item.quantity, 0)
                                        .toLocaleString()}
                                </p>
                            </div>

                            <div className="flex justify-between mt-2">
                                <p className="font-semibold">Delivery Charges</p>
                                <p>
                                    Rs.{" "}
                                    {deliveryCharges !== null ? deliveryCharges.toLocaleString() : "Calculating..."}
                                </p>
                            </div>

                            <div className="flex justify-between mt-4 border-t pt-3 font-bold text-lg text-yellow-600">
                                <p>Total</p>
                                <p>Rs. {calculateTotal().toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="mt-6 border-t p-6">
                        <p className="font-semibold mb-4">Payment Method</p>
                        <div className="space-y-2">
                            <div className="flex space-x-4">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank_transfer"
                                    checked={formData.paymentMethod === "bank_transfer"}
                                    onChange={handleInputChange}
                                />
                                <label>Bank Transfer</label>
                            </div>

                            <div className="flex space-x-4">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={formData.paymentMethod === "cod"}
                                    onChange={handleInputChange}
                                />
                                <label>Cash on Delivery</label>
                            </div>

                            <div className="flex space-x-4">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="stripe"
                                    checked={formData.paymentMethod === "stripe"}
                                    onChange={handleInputChange}
                                />
                                <label>Credit/Debit Card (Stripe)</label>
                            </div>
                        </div>

                        {formData.paymentMethod === "stripe" && (
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    formData={formData}
                                    cartItems={cartItems}
                                    deliveryCharges={deliveryCharges}
                                    calculateTotal={calculateTotal}
                                />
                            </Elements>
                        )}
                        {formData.paymentMethod !== "stripe" && (
                            <button className="w-full bg-black text-white font-semibold py-3 mt-6 rounded-lg">
                                Place Order
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
