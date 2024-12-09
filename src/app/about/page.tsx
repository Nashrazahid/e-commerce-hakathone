import React from 'react';
import Image from 'next/image';
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { RiLeafFill } from "react-icons/ri";

function page() {
  return (
    <div>
        <div className='p-14 bg-gray-300'><p className='flex justify-center  text-2xl'>a brand built on the love of craftsmanship</p>
        <p className='flex justify-center  text-2xl'>quality and outstanding customer service</p></div>
      
        <div className="flex flex-col lg:flex-row justify-center items-stretch lg:h-screen px-4 lg:px-0 ">
  {/* Text Section */}
  <div className="lg:w-1/2 w-full bg-indigo-950 px-6 lg:pl-8 lg:pr-4 py-8 text-gray-300 flex flex-col justify-center ml-10 mt-24 mb-24 ">
    <div className="max-w-md">
      <h1 className="text-xl lg:text-2xl font-semibold">It started with a small idea</h1>
      <p className="pt-2 pb-4 text-sm lg:text-base">
        A global brand with local beginnings. Our story began in a small studio in South London in early 2014.
      </p>
      <button className="bg-gray-500 text-white py-2 px-6 mt-4 lg:mt-8">
        View collection
      </button>
    </div>
  </div>

  {/* Image Section */}
  <div className="lg:w-1/2 w-full flex items-center justify-center lg:ml-8 p-4">
  <Image
      src="/images/Features (2).png"
      alt="Feature image"
      width={500}
      height={500}
      className="object-contain max-w-full h-auto"
    />
  </div>
</div>
<div className="flex flex-col lg:flex-row justify-center items-stretch lg:h-screen px-4 lg:px-0 ">
<div className="lg:w-1/2 w-full flex items-center justify-center lg:ml-8 p-4">
  <Image
      src="/images/image.png"
      alt="Feature image"
      width={500}
      height={500}
      className="object-contain max-w-full h-auto"
    />
  </div>
  <div className="lg:w-1/2 w-full bg-gray-200 px-6 lg:pl-8 lg:pr-4 py-8 text-black flex flex-col justify-center ml-10 mt-24 mb-24 ">
    <div className="max-w-md">
      <h1 className="text-xl lg:text-2xl font-semibold">It started with a small idea</h1>
      <p className="pt-2 pb-4 text-sm lg:text-base">
        A global brand with local beginnings. Our story began in a small studio in South London in early 2014.
      </p>
      <button className="bg-gray-500 text-white py-2 px-6 mt-4 lg:mt-8">
        Get in touch
      </button>
    </div>
  </div>
    </div>
    <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <TbTruckDelivery />
              </div>
              <h3 className="text-xl flex mb-2">Next day as standard</h3>
              <p className="text-sm text-gray-600">
                Order before 3pm and get your order the next day as standard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <FaCircleCheck />
              </div>
              <h3 className="text-xl mb-2">Made by true artisans</h3>
              <p className="text-sm text-gray-600">
                Handmade crafted goods made with real passion and craftsmanship.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <CiCreditCard1 />
              </div>
              <h3 className="text-xl mb-2">Unbeatable prices</h3>
              <p className="text-sm text-gray-600">
                For our materials and quality, you wont find better prices
                anywhere.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <RiLeafFill />
              </div>
              <h3 className="text-xl mb-2">Recycled packaging</h3>
              <p className="text-sm text-gray-600">
                We use 100% recycled materials to ensure our footprint is more
                manageable.
              </p>
            </div>
          </div>
        </div>
      </section>
   
<div className="lg:w-1/2 w-full flex  items-center justify-center lg:ml-8 p-4 v-screen">
  <Image
      src="/images/container.png"
      alt="Feature image"
     width={1034}
     height={1034}
      objectFit="cover" // Ensures the image covers the entire area
      quality={100}
      className='v-screen p-0 w-[4000px] flex justify-center '
    />
    
  </div>
    </div>
    
  )
}

export default page