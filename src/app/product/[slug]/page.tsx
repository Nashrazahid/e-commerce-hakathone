"use client"
import Image from "next/image";
import { useState } from "react";

function ProductPage() {
  // State to manage quantity
  const [quantity, setQuantity] = useState(1);

  // Function to increase quantity
  const increaseQuantity = () => setQuantity(quantity + 1);

  // Function to decrease quantity (min value is 1)
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-8">
        {/* Left side - Product Image */}
        <div className="relative h-96 w-full">
          <Image
            src="/images/ProductImage.png"
            alt="The Dandy Chair"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Right side - Product Details */}
        <div className="flex flex-col justify-between">
          {/* Product Title and Price */}
          <div>
            <h1 className="text-3xl font-bold mb-4">The Dandy Chair</h1>
            <p className="text-xl font-semibold mb-6">£250</p>

            {/* Description */}
            <p className="text-gray-700 mb-4">
              A timeless design, with premium materials features as one of our most
              popular and iconic pieces. The dandy chair is perfect for any stylish
              living space with beech legs and lambskin leather upholstery.
            </p>

            {/* Features */}
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Premium material</li>
              <li>Handmade upholstery</li>
              <li>Quality timeless classic</li>
            </ul>

            {/* Dimensions */}
            <h2 className="text-lg font-semibold mb-2">Dimensions</h2>
            <div className="grid grid-cols-3 gap-4 text-gray-700 mb-8">
              <div>
                <p>Height</p>
                <p>110cm</p>
              </div>
              <div>
                <p>Width</p>
                <p>75cm</p>
              </div>
              <div>
                <p>Depth</p>
                <p>50cm</p>
              </div>
            </div>
          </div>

          {/* Quantity Selector and Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md px-2 py-1">
              <button
                onClick={decreaseQuantity}
                className="text-lg px-2 text-gray-700"
              >
                -
              </button>
              <span className="px-4 text-lg">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="text-lg px-2 text-gray-700"
              >
                +
              </button>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-md">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;