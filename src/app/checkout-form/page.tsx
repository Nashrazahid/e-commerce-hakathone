// "use client";

// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../checkout/action";
// import { useRouter } from "next/navigation";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   companyName: string;
//   country: string;
//   streetAddress: string;
//   zipCode: string;
//   paymentMethod: "bank_transfer" | "cod" | "stripe";
// }

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

// const CheckoutPage: React.FC = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [deliveryCharges, setDeliveryCharges] = useState<number>(200); // £2.00
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     country: "United Kingdom",
//     streetAddress: "",
//     zipCode: "",
//     paymentMethod: "bank_transfer",
//   });

//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const cartData = localStorage.getItem("cart");
//     const parsed = cartData ? JSON.parse(cartData) : [];
//     setCartItems(parsed);

//     const total = parsed.reduce(
//       (sum: number, item: CartItem) => sum + item.price * item.quantity,
//       0
//     );
//     const totalWithDelivery = total * 100 + deliveryCharges;

//     createPaymentIntent(totalWithDelivery).then((res: { clientSecret: string | null }) => {
//       setClientSecret(res.clientSecret);
//     });
//   }, []);

//   const calculateTotal = () => {
//     const subtotal = cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//     return subtotal + deliveryCharges / 100;
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePlaceOrder = async () => {
//     const response = await fetch("/api/place-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...formData,
//         cartItems,
//         deliveryCharges,
//         total: calculateTotal(),
//       }),
//     });

//     const result = await response.json();
//     if (result.error) {
//       alert("Order failed: " + result.error);
//     } else {
//       // ✅ Send order to Sanity
//       try {
//         await fetch("/api/create-order", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             customerName: `${formData.firstName} ${formData.lastName}`,
//             email: "nashra@example.com",
//             address: `${formData.streetAddress}, ${formData.country}, ZIP: ${formData.zipCode}`,
//             products: cartItems.map((item) => ({
//               productId: item.id,
//               productName: item.name,
//               quantity: item.quantity,
//               price: item.price,
//             })),
//             totalAmount: calculateTotal() * 100,
//           }),
//         });
//       } catch (err) {
//         console.error("Sanity order failed:", err);
//       }

//       alert(`Order placed! Order ID: ${result.orderId}`);
//       router.push("/success");
//     }
//   };

//   if (!clientSecret && formData.paymentMethod === "stripe") {
//     return <div>Loading payment details...</div>;
//   }

//   return (
//     <div className="min-h-screen px-6 py-12">
//       <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-10">
//         {/* Billing Details */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
//           <div className="space-y-4">
//             <input
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               placeholder="First Name"
//             />
//             <input
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               placeholder="Last Name"
//             />
//             <input
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               placeholder="Company (optional)"
//             />
//             <input
//               name="streetAddress"
//               value={formData.streetAddress}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               placeholder="Street Address"
//             />
//             <input
//               name="zipCode"
//               value={formData.zipCode}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               placeholder="ZIP Code"
//             />
//             <input
//               name="city"
//               value={formData.zipCode}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               placeholder="city"
//             />
//              <h2 className="text-1xl font-semibold mt-[-2]">Country</h2>
//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             >
//               <option>United Kingdom</option>
//               <option>United States</option>
//               <option>Pakistan</option>
//             </select>
//             {/* <select
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="bank_transfer">Bank Transfer</option>
//               <option value="cod">Cash on Delivery</option>
//               <option value="stripe">Credit/Debit Card (Stripe)</option>
//             </select> */}

//    <div className="mt-4">
//               <p className="font-medium mb-2">Select Payment Method:</p>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="cod"
//                   checked={formData.paymentMethod === "cod"}
//                   onChange={handleInputChange}
//                 />
//                 <span>Cash on Delivery</span>
//               </label>
//               <label className="flex items-center space-x-2 mt-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="stripe"
//                   checked={formData.paymentMethod === "bank_transfer"}
//                   onChange={handleInputChange}
//                 />
//                 <span>Credit/Debit Card (Stripe)</span>
//               </label>
//             </div>




//           </div>
//         </div>

//         {/* Order Summary */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
//           <div className="border rounded-lg p-6 bg-gray-50">
//             {cartItems.map((item, i) => (
//               <div key={i} className="flex justify-between mb-2">
//                 <p>
//                   {item.name} x {item.quantity}
//                 </p>
//                 <p>£{(item.price * item.quantity).toFixed(2)}</p>
//               </div>
//             ))}
//             <div className="border-t pt-2 mt-2">
//               <p>Delivery: £{(deliveryCharges / 100).toFixed(2)}</p>
//               <p className="font-bold mt-2">
//                 Total: £{calculateTotal().toFixed(2)}
//               </p>
//             </div>
//           </div>

//           {/* Payment */}
//           {formData.paymentMethod === "stripe" && clientSecret ? (
//             <Elements stripe={stripePromise} options={{ clientSecret }}>
//               <StripePaymentForm totalAmount={calculateTotal()} />
//             </Elements>
//           ) : (
//             <button
//               onClick={handlePlaceOrder}
//               className="w-full bg-black text-white py-3 mt-6 rounded-md"
//             >
//               Place Order
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


// function StripePaymentForm({ totalAmount }: { totalAmount: number }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     setIsProcessing(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {},
//       redirect: "if_required",
//     });

//     if (error) {
//       setErrorMessage(error.message || "Payment error occurred.");
//       setIsProcessing(false);
//     } else {
//       alert("Payment successful!");
//       router.push("/success");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-yellow-600 text-white py-3 mt-6 rounded-md"
//       >
//         {isProcessing ? "Processing..." : `Pay £${totalAmount.toFixed(2)}`}
//       </button>
//       {errorMessage && (
//         <div className="text-red-600 mt-2">{errorMessage}</div>
//       )}
//     </form>
//   );
// }

// export default CheckoutPage;










// 






// "use client";

// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { createPaymentIntent } from "../checkout/action";
// import { useRouter } from "next/navigation";

// interface FormData {
//   firstName: string;
//   lastName: string;
//   phoneNo: string;
//   country: string;
//   streetAddress: string;
//   zipCode: string;
//   city: string;
//   state: string;
//   paymentMethod: "bank_transfer" | "cod" | "stripe";
// }

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

// const CheckoutPage: React.FC = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     phoneNo: "",
//     country: "United Kingdom",
//     streetAddress: "",
//     zipCode: "",
//     city: "",
//     state: "",
//     paymentMethod: "bank_transfer",
//   });

//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const cartData = localStorage.getItem("cart");
//     const parsed = cartData ? JSON.parse(cartData) : [];
//     setCartItems(parsed);

//     const total = parsed.reduce(
//       (sum: number, item: CartItem) => sum + item.price * item.quantity,
//       0
//     );
//     const totalWithDelivery = total * 100 + deliveryCharges;

//     createPaymentIntent(totalWithDelivery).then((res: { clientSecret: string | null }) => {
//       setClientSecret(res.clientSecret);
//     });
//   }, [deliveryCharges]);

//   const calculateTotal = () => {
//     const subtotal = cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//     return subtotal + deliveryCharges / 100;
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       const shipToAddress = {
//         name: `${formData.firstName} ${formData.lastName}`,
//         phone: formData.phoneNo || "00000000000",
//         addressLine1: formData.streetAddress,
//         cityLocality: formData.city,
//         stateProvince: formData.state || "N/A",
//         postalCode: formData.zipCode,
//         countryCode:
//           formData.country === "Pakistan"
//             ? "PK"
//             : formData.country === "United Kingdom"
//               ? "GB"
//               : "US",
//         addressResidentialIndicator: "yes",
//       };

//       const shipRes = await fetch("/api/trackInfo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ shipToAddress }),
//       });

//       const shipData = await shipRes.json();

//       if (!shipData.trackingNo) {
//         alert("Failed to generate shipping details");
//         return;
//       }

//       setDeliveryCharges(shipData.deliveryCharge * 100); // update delivery charge in UI

//       const response = await fetch("/api/place-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           cartItems,
//           deliveryCharges: shipData.deliveryCharge * 100,
//           total: calculateTotal() + shipData.deliveryCharge,
//           shippingDetails: shipData,
//         }),
//       });

//       const result = await response.json();
//       if (result.error) {
//         alert("Order failed: " + result.error);
//         return;
//       }

//       await fetch("/api/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           customerName: `${formData.firstName} ${formData.lastName}`,
//           email: "nashra@example.com",
//           address: `${formData.streetAddress}, ${formData.country}, ZIP: ${formData.zipCode}`,
//           products: cartItems.map((item) => ({
//             productId: item.id,
//             productName: item.name,
//             quantity: item.quantity,
//             price: item.price,
//           })),
//           totalAmount: (calculateTotal() + shipData.deliveryCharge) * 100,
//           trackingNumber: shipData.trackingNo,
//           labelId: shipData.labelId,
//           courier: shipData.carrier,
//           shippingDays: shipData.estimatedDays,
//         }),
//       });

//       alert(`Order placed! Tracking No: ${shipData.trackingNo}`);
//       router.push("/success");
//     } catch (err) {
//       console.error("Checkout error:", err);
//       alert("Something went wrong during checkout.");
//     }
//   };

//   return (
//     <div className="min-h-screen px-6 py-12">
//       <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-10">
//         {/* Billing Details */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
//           <div className="space-y-4">
//             {["firstName", "lastName", "phoneNo", "streetAddress", "zipCode", "city", "state"].map((field) => (
//               <input
//                 key={field}
//                 name={field}
//                 value={(formData as any)[field]}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//                 placeholder={field}
//               />
//             ))}

//             <h2 className="text-1xl font-semibold mt-[-2]">Country</h2>
//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             >
//               <option>United Kingdom</option>
//               <option>United States</option>
//               <option>Pakistan</option>
//             </select>

//             <div className="mt-4">
//               <p className="font-medium mb-2">Select Payment Method:</p>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="cod"
//                   checked={formData.paymentMethod === "cod"}
//                   onChange={handleInputChange}
//                 />
//                 <span>Cash on Delivery</span>
//               </label>
//               <label className="flex items-center space-x-2 mt-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="stripe"
//                   checked={formData.paymentMethod === "stripe"}
//                   onChange={handleInputChange}
//                 />
//                 <span>Credit/Debit Card (Stripe)</span>
//               </label>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
//           <div className="border rounded-lg p-6 bg-gray-50">
//             {cartItems.map((item, i) => (
//               <div key={i} className="flex justify-between mb-2">
//                 <p>{item.name} x {item.quantity}</p>
//                 <p>£{(item.price * item.quantity).toFixed(2)}</p>
//               </div>
//             ))}
//             <div className="border-t pt-2 mt-2">
//               <p>Delivery: £{(deliveryCharges / 100).toFixed(2)}</p>
//               <p className="font-bold mt-2">Total: £{calculateTotal().toFixed(2)}</p>
//             </div>
//           </div>

//           {formData.paymentMethod === "stripe" && clientSecret ? (
//             <Elements stripe={stripePromise} options={{ clientSecret }}>
//               <StripePaymentForm
//                 totalAmount={calculateTotal()}
//                 handlePlaceOrder={handlePlaceOrder}
//               />
//             </Elements>
//           ) : (
//             <button
//               onClick={handlePlaceOrder}
//               className="w-full bg-black text-white py-3 mt-6 rounded-md"
//             >
//               Place Order
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// function StripePaymentForm({
//   totalAmount,
//   handlePlaceOrder,
// }: {
//   totalAmount: number;
//   handlePlaceOrder: () => Promise<void>;
// }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     setIsProcessing(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {},
//       redirect: "if_required",
//     });

//     if (error) {
//       setErrorMessage(error.message || "Payment error occurred.");
//       setIsProcessing(false);
//     } else {
//       await handlePlaceOrder();
//       router.push("/success");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-6">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={!stripe || isProcessing}
//         className="w-full bg-yellow-600 text-white py-3 mt-6 rounded-md"
//       >
//         {isProcessing ? "Processing..." : `Pay £${totalAmount.toFixed(2)}`}
//       </button>
//       {errorMessage && (
//         <div className="text-red-600 mt-2">{errorMessage}</div>
//       )}
//     </form>
//   );
// }

// export default CheckoutPage;


'use client';

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'cod';
}

const CheckoutFormInner = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    paymentMethod: 'card',
  });

  const [deliveryCharge, setDeliveryCharge] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDeliveryCharge = async () => {
      try {
        const response = await fetch('/api/trackInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            shipToAddress: {
              name: `${formData.firstName} ${formData.lastName}`,
              phone: formData.phone,
              addressLine1: formData.address,
              cityLocality: formData.city,
              stateProvince: formData.state,
              postalCode: formData.postalCode,
              countryCode: formData.country,
              addressResidentialIndicator: 'yes',
            },
          }),
        });

        const data = await response.json();
        setDeliveryCharge(data.deliveryCharge);
        console.log('ShipEngine data:', data);
      } catch (error) {
        console.error('ShipEngine error:', error);
      }
    };

    if (formData.firstName && formData.address && formData.city) {
      getDeliveryCharge();
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.paymentMethod === 'card') {
      if (!stripe || !elements) return;
      setLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        alert(error.message);
      }
      setLoading(false);
    } else {
      // COD logic
      alert('Order placed with Cash on Delivery');
      router.push('/success');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Checkout</h2>

      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="State"
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={formData.postalCode}
        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        required
      />

      <div className="space-x-4">
        <label>
          <input
            type="radio"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            value="cod"
            checked={formData.paymentMethod === 'cod'}
            onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
          />
          Cash on Delivery
        </label>
      </div>

      {formData.paymentMethod === 'card' && (
        <div>
          <PaymentElement />
        </div>
      )}

      <p className="font-semibold">
        Delivery Charges: {deliveryCharge !== null ? `$${deliveryCharge}` : 'Loading...'}
      </p>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
};

const CheckoutFormPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutFormInner />
  </Elements>
);

export default CheckoutFormPage;
