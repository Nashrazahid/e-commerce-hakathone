import React from 'react'
import Image from 'next/image'
import { Fullscreen } from 'lucide-react'

function page() {
  return (
    <div>
    <div className="bg-cover bg-center" style={{ backgroundImage: "url('/images/Frame 143.png')" }}>
      {/* Header Section */}
      <div className="bg-black bg-opacity-50 text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-light">All products</h1>
      </div>

      {/* Filter Bar */}
      <div className="bg-white shadow-md py-4 px-4 sm:px-8 flex flex-wrap justify-between items-center">
        {/* Left Section */}
        <div className="flex flex-wrap gap-4">
          <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option>Category</option>
            <option>Furniture</option>
            <option>Decor</option>
          </select>

          <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option>Product type</option>
            <option>Chair</option>
            <option>Vase</option>
          </select>

          <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option>Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>

          <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option>Brand</option>
            <option>Brand A</option>
            <option>Brand B</option>
          </select>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-4">
          <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option>Sorting by</option>
            <option>Popularity</option>
            <option>Newest</option>
          </select>

          <select className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <option>Date added</option>
            <option>Last Week</option>
            <option>Last Month</option>
          </select>
        </div>
      </div>
    </div>
    <div className="bg-gray-50">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Product 1 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card.png"
            alt="The Dandy Chair"
            width={300}
            height={300}
            className="object-cover w-full"
            priority
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Dandy Chair
          </h2>
          <p className="text-gray-600">£250</p>
        </div>

        {/* Product 2 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (1).png"
            alt="Rustic Vase Set"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            Rustic Vase Set
          </h2>
          <p className="text-gray-600">£155</p>
        </div>

        {/* Product 3 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (2).png"
            alt="The Silky Vase"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Silky Vase
          </h2>
          <p className="text-gray-600">£125</p>
        </div>

        {/* Product 4 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (3).png"
            alt="The Lucy Lamp"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Lucy Lamp
          </h2>
          <p className="text-gray-600">£399</p>
        </div>
      </div>
</div>

<div className="bg-gray-50">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Product 1 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (4).png"
            alt="The Dandy Chair"
            width={300}
            height={300}
            className="object-cover w-full"
            priority
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Dandy Chair
          </h2>
          <p className="text-gray-600">£250</p>
        </div>

        {/* Product 2 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (5).png"
            alt="Rustic Vase Set"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            Rustic Vase Set
          </h2>
          <p className="text-gray-600">£155</p>
        </div>

        {/* Product 3 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (6).png"
            alt="The Silky Vase"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Silky Vase
          </h2>
          <p className="text-gray-600">£125</p>
        </div>

        {/* Product 4 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (8).png"
            alt="The Lucy Lamp"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Lucy Lamp
          </h2>
          <p className="text-gray-600">£399</p>
        </div>
      </div>
      </div>
      <div className="bg-gray-50">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Product 1 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card.png"
            alt="The Dandy Chair"
            width={300}
            height={300}
            className="object-cover w-full"
            priority
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Dandy Chair
          </h2>
          <p className="text-gray-600">£250</p>
        </div>

        {/* Product 2 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (1).png"
            alt="Rustic Vase Set"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            Rustic Vase Set
          </h2>
          <p className="text-gray-600">£155</p>
        </div>

        {/* Product 3 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (2).png"
            alt="The Silky Vase"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Silky Vase
          </h2>
          <p className="text-gray-600">£125</p>
        </div>

        {/* Product 4 */}
        <div className="bg-white text-center">
          <Image
            src="/images/Product Card (3).png"
            alt="The Lucy Lamp"
            width={300}
            height={300}
            className="object-cover w-full"
          />
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            The Lucy Lamp
          </h2>
          <p className="text-gray-600">£399</p>
        </div>
      </div>
</div>

    </div>
  )
}

export default page