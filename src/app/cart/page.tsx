"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; // Trash icon
import Image from "next/image";

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
  const [loadingEmptyCart, setLoadingEmptyCart] = useState(true); // Spinner for empty cart
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  

   // Spinner timeout for empty cart
    if (storedCart.length === 0) {
      const timeout = setTimeout(() => {
        setLoadingEmptyCart(false);
      }, 1500); // 1.5 seconds spinner

      return () => clearTimeout(timeout);
    } else {
      setLoadingEmptyCart(false);
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    router.push("/checkout-form");
  };

  const continueShopping = () => {
    router.push("/collection");
  };

  // if (cart.length === 0) {
  //   return (
  //     <div className="text-center mt-10">
  //       <p className="text-lg font-bold">Your cart is empty!</p>
  //     </div>
  //   );
  // }


  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        {loadingEmptyCart ? (
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-600"></div>
        ) : (
          <p className="text-lg font-bold">Your cart is empty!</p>
        )}
      </div>
    );
  }
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm md:flex-row md:items-center md:justify-between"
          >
            {/* Left Section: Image + Product Details */}
            <div className="flex items-center gap-4">
              <Image
                src={item.image?.asset.url || "/images/default-product.png"}
                alt={item.name}
                height= {24}
                width= {24}
                className="w-24 h-24 object-cover "
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">£{item.price}</p>
              </div>
            </div>

            {/* Right Section: Counter + Subtotal + Trash Icon */}
            <div className="flex items-center justify-between md:justify-end md:gap-6 w-full">
              {/* Counter */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecreaseQuantity(index)}
                  className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(index)}
                  className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <p className="text-gray-600 font-semibold">£{(item.price * item.quantity).toFixed(2)}</p>

              {/* Trash Icon */}
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="text-right mt-6">
        <h2 className="text-xl font-bold mb-4">Total: £{calculateTotal()}</h2>
        <div className="flex flex-col md:flex-row justify-end gap-4">
          <button
            onClick={continueShopping}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleCheckout}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;






