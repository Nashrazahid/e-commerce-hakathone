"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; // Trash icon

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
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
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

  if (cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg font-bold">Your cart is empty!</p>
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
              <img
                src={item.image?.asset.url || "/images/default-product.png"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
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

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link"; // Import Link component
// import { useRouter } from "next/navigation";
// import { Trash2 } from "lucide-react";

// interface CartItem {
//   slug: string;
//   quantity: number;
//   name?: string;
//   price?: number;
//   height?: number;
//   width?: number;
//   depth?: number;
//   image?: {
//     asset: {
//       url: string;
//     };
//   };
// }

// export default function CartPage() {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchCartItems() {
//       const storedCart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

//       if (storedCart.length === 0) {
//         setCart([]);
//         setIsLoading(false);
//         return;
//       }

//       const enrichedCart = await Promise.all(
//         storedCart.map(async (item) => {
//           if (item.name && item.price && item.height && item.width && item.depth) {
//             return item;
//           }
//           try {
//             const res = await fetch(`/api/products/${item.slug}`);
//             if (!res.ok) {
//               console.error(`Failed to fetch details for ${item.slug}`);
//               return item;
//             }
//             const productDetails = await res.json();
//             return { ...item, ...productDetails };
//           } catch (error) {
//             console.error("Error fetching product details:", error);
//             return item;
//           }
//         })
//       );

//       setCart(enrichedCart);
//       setIsLoading(false);
//     }

//     fetchCartItems();
//   }, []);

//   const updateCart = (newCart: CartItem[]) => {
//     setCart(newCart);
//     localStorage.setItem("cart", JSON.stringify(newCart));
//   };

//   const handleIncreaseQuantity = (index: number) => {
//     const updatedCart = [...cart];
//     updatedCart[index].quantity++;
//     updateCart(updatedCart);
//   };

//   const handleDecreaseQuantity = (index: number) => {
//     const updatedCart = [...cart];
//     if (updatedCart[index].quantity > 1) {
//       updatedCart[index].quantity--;
//       updateCart(updatedCart);
//     }
//   };

//   const handleRemoveItem = (index: number) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     updateCart(updatedCart);
//   };

//   const handleCheckout = () => {
//     router.push("/contact");
//   };

//   const continueShopping = () => {
//     router.push("/collection");
//   };

//   const calculateSubtotal = () => {
//     return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-lg font-bold">Loading your cart...</p>
//       </div>
//     );
//   }

//   if (cart.length === 0) {
//     return (
//       <div className="text-center mt-10">
//         <p className="text-lg font-bold">Your cart is empty!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
//       <div className="space-y-4">
//         {cart.map((item, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg shadow-sm"
//           >
//             {/* Wrap Product Details with Link */}
//             <Link href={`/product/${item.slug}`} className="flex items-center gap-4 cursor-pointer">
//               <img
//                 src={item.image?.asset.url || "/images/default-product.png"}
//                 alt={item.name || item.slug}
//                 className="w-24 h-24 object-cover rounded"
//               />
//               <div>
//                 <h2 className="font-semibold text-lg">{item.name || item.slug}</h2>
//                 <p className="text-gray-600">£{item.price?.toFixed(2)}</p>
//                 {item.height && item.width && item.depth && (
//                   <p className="text-gray-500 text-sm">
//                     {item.height} x {item.width} x {item.depth} cm
//                   </p>
//                 )}
//               </div>
//             </Link>

//             {/* Quantity Controls, Price and Remove Button */}
//             <div className="flex items-center gap-4">
//               <div className="flex items-center">
//                 <button
//                   onClick={() => handleDecreaseQuantity(index)}
//                   className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   -
//                 </button>
//                 <span className="mx-2">{item.quantity}</span>
//                 <button
//                   onClick={() => handleIncreaseQuantity(index)}
//                   className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//               </div>
//               <p className="font-semibold">£{((item.price || 0) * item.quantity).toFixed(2)}</p>
//               <button
//                 onClick={() => handleRemoveItem(index)}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 <Trash2 className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 text-right">
//         <h2 className="text-xl font-bold">
//           Subtotal: £{calculateSubtotal().toFixed(2)}
//         </h2>
//         <div className="mt-4 flex justify-end gap-4">
//           <button
//             onClick={continueShopping}
//             className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//           >
//             Continue Shopping
//           </button>
//           <button
//             onClick={handleCheckout}
//             className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


