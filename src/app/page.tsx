import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { RiLeafFill } from "react-icons/ri";

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
}

export default async function Home() {
  // Sanity query to fetch products
  const query = `*[_type == "product"][0..3]{
    _id,
    name,
    price,
    slug {
      current
    },
    image {
      asset -> {
        url
      }
    }
  }`;

  const response: Product[] = await client.fetch(query);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative flex items-center justify-between min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/heroblock.jpeg')" }}
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
            <Link href="/collection">
              <button className="px-6 py-3 bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 transition">
                View collection
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <h1 className="flex justify-center text-2xl mt-10 mb-6">
        What makes our brand different
      </h1>
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TbTruckDelivery />,
                title: "Next day as standard",
                description:
                  "Order before 3pm and get your order the next day as standard.",
              },
              {
                icon: <FaCircleCheck />,
                title: "Made by true artisans",
                description:
                  "Handmade crafted goods made with real passion and craftsmanship.",
              },
              {
                icon: <CiCreditCard1 />,
                title: "Unbeatable prices",
                description:
                  "For our materials and quality, you won't find better prices anywhere.",
              },
              {
                icon: <RiLeafFill />,
                title: "Recycled packaging",
                description:
                  "We use 100% recycled materials to ensure our footprint is more manageable.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center bg-pink-100 p-6 rounded-lg shadow-md"
              >
                <div className="text-xl mb-4">{feature.icon}</div>
                <h3 className="text-xl mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="bg-gray-50 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {response.map((product) => (
            <Link key={product._id} href={`/product/${product.slug.current}`}>
              <div className="bg-white text-center rounded-lg shadow-md cursor-pointer">
                {product.image?.asset?.url ? (
                  <Image
                    src={product.image.asset.url}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-[300px] rounded-t-lg"
                    priority
                  />
                ) : (
                  <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 text-gray-600 rounded-t-lg">
                    No Image Available
                  </div>
                )}
                <h2 className="text-lg font-bold text-gray-800 mt-2">
                  {product.name}
                </h2>
                <p className="text-gray-600">£{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/collection">
            <button className="bg-gray-100 text-gray-900 py-3 px-6 text-sm shadow-md hover:bg-gray-200">
              View collection
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-between px-4 sm:px-6 lg:px-16 py-8 gap-8">
        <div className="lg:w-1/2 bg-indigo-950 p-6 sm:p-8 shadow-lg text-gray-300 flex flex-col justify-center">
          <h1 className="text-lg sm:text-2xl font-semibold mb-4">
            It started with a small idea
          </h1>
          <p className="text-sm sm:text-base mb-6">
            A global brand with local beginnings. Our story began in a small
            studio in South London in early 2014.
          </p>
   <Link href="/collection"><button className="bg-gray-500 text-white py-2 px-4 sm:px-6 w-full sm:w-[160px]">
            View collection
          </button></Link>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
          <Image
            src="/images/Features (2).png"
            alt="Feature image"
            width={500}
            height={500}
            className="object-contain w-full max-w-md shadow-lg"
          />
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-6"
        style={{ backgroundImage: "url('/images/bg.jpeg')" }}
      >
        <div className="text-center max-w-2xl bg-opacity-80 text-white px-4">
          <h2 className="text-2xl md:text-4xl font-medium mb-4">
            Join the club and get the benefits
          </h2>
          <p className="text-sm md:text-lg mb-6">
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop-up stores, and more.
          </p>
          <div className="flex justify-center gap-4 md:gap-6 text-sm md:text-base mb-8 flex-wrap">
            {["Exclusive offers", "Free events", "Large discounts"].map(
              (benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg">✔</span> {benefit}
                </div>
              )
            )}
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
