import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { RiLeafFill } from "react-icons/ri";

export default function Home() {
  return (
  <div>
    <div className="relative w-full h-[70vh] md:h-[80vh]">
    <Image src="/images/HeroBlocks.png.png" alt="image"
    layout="fill" // Makes the image fill its parent container
    objectFit="cover" // Ensures the image covers the entire area
    quality={100} /></div>
    <h1 className="flex justify-center text-2xl">What makes our brand different</h1>
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
            <div className="text-xl mb-4"><TbTruckDelivery /></div>
            <h3 className="text-xl flex mb-2">Next day as standard</h3>
            <p className="text-sm text-gray-600">
              Order before 3pm and get your order the next day as standard.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
            <div className="text-xl mb-4"><FaCircleCheck/></div>
            <h3 className="text-xl mb-2">Made by true artisans</h3>
            <p className="text-sm text-gray-600">
              Handmade crafted goods made with real passion and craftsmanship.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
            <div className="text-xl mb-4"><CiCreditCard1 /></div>
            <h3 className="text-xl mb-2">Unbeatable prices</h3>
            <p className="text-sm text-gray-600">
              For our materials and quality, you won't find better prices anywhere.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="text-center bg-pink-100 p-6 rounded-lg shadow-md">
            <div className="text-xl mb-4"><RiLeafFill /></div>
            <h3 className="text-xl mb-2">Recycled packaging</h3>
            <p className="text-sm text-gray-600">
              We use 100% recycled materials to ensure our footprint is more manageable.
            </p>
          </div>
        </div>
      </div>
    </section>
    <div  className="relative w-full h-[70vh] md:h-[80vh]">
    <Image src="/images/Listings.png" alt="image"
    layout="fill" // Makes the image fill its parent container
    objectFit="cover" // Ensures the image covers the entire area
    quality={100} /></div>
    <div  className="relative w-full h-[70vh] md:h-[80vh]">
    <Image src="/images/Features (1).png" alt="image"
    layout="fill" // Makes the image fill its parent container
    objectFit="cover" // Ensures the image covers the entire area
    quality={100} /></div>
     <div className="relative w-full h-[70vh] md:h-[80vh]">
    <Image src="/images/Email sign-up.png" alt="image"
    layout="fill" // Makes the image fill its parent container
    objectFit="cover" // Ensures the image covers the entire area
    quality={100} /></div>
  </div>)}