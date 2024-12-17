import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { RiLeafFill } from "react-icons/ri";
import Link from "next/link";

export default function Home() {
  return (
   
        <div>
        <div
          className="relative flex items-center justify-between min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('images/heroblock.jpeg')" }} 
        >
        
          <div className="flex-1 flex justify-end"> 
            <div className="bg-white p-12 bg-opacity-90 max-w-lg mr-10">
              <h1 className="text-3xl font-medium text-gray-800 mb-6 leading-snug"> 
                Luxury homeware for people <br />
                who love timeless design quality
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Shop the new Spring 2022 collection today
              </p>
       <Link href="/collection"><button className="px-6 py-3 bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 transition">
                View collection
              </button></Link>
            </div>
          </div>
        </div>
      <h1 className="flex justify-center text-2xl">
        What makes our brand different
      </h1>
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
            <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
              <div className="text-xl mb-4">
                <TbTruckDelivery />
              </div>
              <h3 className="text-xl flex mb-2">Next day as standard</h3>
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
                For our materials and quality, you wont find better prices
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
      
    <div className="bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
       
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

      
        <div className="bg-white text-center">
          <Image
            src="/images/ProductCard.png"
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

      <div className="flex justify-center mt-8">
       <Link href="/collection"> <button className="bg-gray-100 text-gray-900 py-3 px-6 text-sm shadow-md hover:bg-gray-200">
          View collection
        </button></Link>
      </div>
    </div>

       <div className="flex flex-col lg:flex-row items-stretch justify-between px-6 lg:px-16 py-12 gap-12">
              {/* Text Section */}
              <div className="lg:w-1/2 bg-indigo-950 p-8  shadow-lg text-gray-300 flex flex-col justify-center">
                <h1 className="text-2xl font-semibold mb-4">It started with a small idea</h1>
                <p className="text-base mb-6">
                  A global brand with local beginnings. Our story began in a small studio in South London in early 2014.
                </p>
                <button className="bg-gray-500 text-white py-2 px-6 w-[160px]">View collection</button>
              </div>
      
              {/* Image Section */}
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
          
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/images/bg.jpeg')" }} // Update with the correct path to your image
    >
     
      <div className="text-center max-w-2xl bg-opacity-80 text-white px-4">
        <h2 className="text-2xl md:text-4xl font-medium mb-4">
          Join the club and get the benefits
        </h2>
        <p className="text-sm md:text-lg mb-6">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop-up stores, and more.
        </p>

       
        <div className="flex justify-center gap-4 md:gap-6 text-sm md:text-base mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-lg">✔</span> Exclusive offers
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">✔</span> Free events
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">✔</span> Large discounts
          </div>
        </div>

       
        <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-lg mx-auto gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full sm:flex-1 px-4 py-3 pl-12 text-gray-800 bg-white rounded-md sm:rounded-l-md outline-none focus:ring-2 focus:ring-indigo-400" 
          />
          <button className="w-auto sm:w-auto px-6 py-3 bg-indigo-800 text-white rounded-md sm:rounded-r-md hover:bg-indigo-700 transition text-sm md:text-base">
            Sign up
          </button>
        </div>
      </div>
    </div>


  



      </div>
  );
}
