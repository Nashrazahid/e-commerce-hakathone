import React from "react";
import Image from "next/image";
export default function Home() {
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 p-6">
        {/* Left Section (Image) */}
        <div className="md:w-1/2 w-full">
          <Image
            src="/ProductCard.png" // Replace with your image URL
            alt="The Dandy Chair"
            width={600} // Set the desired width
            height={600} // Set the desired height
            className="rounded-md"
          />
        </div>
  
        {/* Right Section (Details) */}
        <div className="md:w-1/2 w-full">
          <h1 className="text-2xl font-semibold mb-2">The Dandy Chair</h1>
          <p className="text-lg font-bold text-gray-800 mb-4">£250</p>
          
          {/* Description */}
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600 mb-2">
              A timeless design, with premium materials featured as one of our most popular and iconic pieces. The Dandy Chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.
            </p>
            <ul className="list-disc list-inside text-gray-600">
              <li>Premium material</li>
              <li>Handmade upholstery</li>
              <li>Quality timeless classic</li>
            </ul>
          </div>
  
          {/* Dimensions */}
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2">Dimensions</h2>
            <div className="flex gap-4 text-gray-600">
              <p><strong>Height:</strong> 110cm</p>
              <p><strong>Width:</strong> 75cm</p>
              <p><strong>Depth:</strong> 50cm</p>
            </div>
          </div>
  
          {/* Amount & Button */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2">
              <button className="text-gray-600">-</button>
              <span className="px-2">1</span>
              <button className="text-gray-600">+</button>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Add to cart</button>
          </div>
        </div>
      </div>
    );
  }
  