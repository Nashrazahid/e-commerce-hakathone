import React from 'react';
import Image from 'next/image';
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { RiLeafFill } from "react-icons/ri";

function Page() {
  return (
    <div>
     
      <div className="p-14 bg-gray-100 text-center">
        <p className="text-2xl">A brand built on the love of craftsmanship</p>
        <p className="text-2xl">quality and outstanding customer service</p>
      </div>

      
      <div className="flex flex-col lg:flex-row items-stretch justify-between px-6 lg:px-16 py-12 gap-12">
        <div className="lg:w-1/2 bg-indigo-950 p-8  shadow-lg text-gray-300 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mb-4">It started with a small idea</h1>
          <p className="text-base mb-6">
            A global brand with local beginnings. Our story began in a small studio in South London in early 2014.
          </p>
          <button className="bg-gray-500 text-white py-2 px-6 w-[160px]">View collection</button>
        </div>

       
        <div className="lg:w-1/2 flex items-center justify-center">
          <Image
            src="/images/Features (2).png"
            alt="Feature image"
            width={500}
            height={500}
            className="object-contain  shadow-lg"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-between px-6 lg:px-16 py-12 gap-12">
       
        <div className="lg:w-1/2 flex items-center justify-center">
          <Image
            src="/images/image.png"
            alt="Feature image"
            width={500}
            height={500}
            className="object-contain  shadow-lg"
          />
        </div>

        
        <div className="lg:w-1/2 bg-gray-200 p-8  shadow-lg text-black flex flex-col justify-center">
          <h1 className="text-2xl font-semibold mb-4">It started with a small idea</h1>
          <p className="text-base mb-6">
            A global brand with local beginnings. Our story began in a small studio in South London in early 2014.
          </p>
          <button className="bg-gray-500 text-white py-2 px-6 w-[150px]">Get in touch</button>
        </div>
      </div>

  
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         
            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <TbTruckDelivery />
              </div>
              <h3 className="text-xl mb-2">Next day as standard</h3>
              <p className="text-sm text-gray-600">
                Order before 3pm and get your order the next day as standard.
              </p>
            </div>

           
            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <FaCircleCheck />
              </div>
              <h3 className="text-xl mb-2">Made by true artisans</h3>
              <p className="text-sm text-gray-600">
                Handmade crafted goods made with real passion and craftsmanship.
              </p>
            </div>

            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <CiCreditCard1 />
              </div>
              <h3 className="text-xl mb-2">Unbeatable prices</h3>
              <p className="text-sm text-gray-600">
                For our materials and quality, you won’t find better prices
                anywhere.
              </p>
            </div>

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

    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-6">
      
      <div className="text-center w-full px-6 py-8 bg-white rounded-md shadow-md">
      
        <h2 className="text-4xl md:text-6xl font-normal text-indigo-950 mb-6 leading-tight whitespace-nowrap">
          Join the club and get the benefits
        </h2>
        <div className="text-lg md:text-2xl text-indigo-950 mb-10 leading-relaxed">
          <p>Sign up for our newsletter and receive exclusive offers</p>
          <p>on new ranges, sales, pop-up stores, and more.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-lg mx-auto gap-2 sm:gap-0 mt-20">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full sm:flex-1 px-4 py-3 pl-12 text-gray-800 bg-gray-200 rounded-md sm:rounded-l-md outline-none focus:ring-2 focus:ring-indigo-950"
          />
          <button className="w-auto px-6 py-3 bg-indigo-950 text-white rounded-md sm:rounded-r-md hover:bg-indigo-900 transition text-sm md:text-base">
            Sign up
          </button>
        </div>
      </div>
    </div>
  
  
  


  


     
    </div>
  );
}

export default Page;
