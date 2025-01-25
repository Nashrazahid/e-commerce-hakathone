"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: {
    asset: {
      url: string;
    };
  };
}

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter(); // For navigation

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Delete an item from the cart
  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle Checkout
  const handleCheckout = () => {
    console.log("Redirecting to checkout page...");
    router.push("/checkout"); // Replace "/checkout" with your actual checkout page route
  };

  // Redirect to the product page
  const continueShopping = () => {
    router.push("/products"); // Replace "/products" with the correct path for your product page
  };

  if (cart.length === 0) {
    return <p className="text-center text-lg font-bold mt-10">Your cart is empty!</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4">Product</th>
            <th className="border-b p-4">Price</th>
            <th className="border-b p-4">Quantity</th>
            <th className="border-b p-4">Subtotal</th>
            <th className="border-b p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image?.asset.url || "/images/default-product.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="p-4">£{item.price}</td>
              <td className="p-4">{item.quantity}</td>
              <td className="p-4">£{(item.price * item.quantity).toFixed(2)}</td>
              <td className="p-4">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-6">
        <h2 className="text-xl font-bold mb-4">Total: £{calculateTotal()}</h2>
        <div className="flex justify-end gap-4">
    <Link href="/collection">     <button
            onClick={continueShopping}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Continue Shopping
          </button></Link> 
         <Link href="/checkout-form"> <button
            onClick={handleCheckout}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Checkout
          </button></Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
