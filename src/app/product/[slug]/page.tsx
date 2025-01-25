"use client";

import { useState, useEffect } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";
import { usePathname } from "next/navigation";


// Sanity client setup
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: "2023-01-01",
});

// TypeScript interface
interface Product {
  name: string;
  price: number;
  image?: {
    asset: {
      url: string;
    };
  };
  description?: string;
  features?: string[];
  dimensions?: {
    height: string;
    width: string;
    depth: string;
  };
}

function ProductDetail() {
  const pathname = usePathname();
  const slug = pathname?.split("/").pop(); // Assuming the slug is the last part of the URL

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  useEffect(() => {
    if (slug) {
      client
        .fetch<Product>(
          `*[_type == "product" && slug.current == $slug][0]{
            name,
            price,
            image {
              asset -> {
                url
              }
            },
            description,
            features,
            dimensions {
              height,
              width,
              depth
            }
          }`,
          { slug }
        )
        .then((data) => setProduct(data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [slug]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    const cartItem = { ...product, quantity };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show popup
    setShowPopup(true);

    // Hide popup after 2 seconds
    setTimeout(() => setShowPopup(false), 2000); // 2000 milliseconds = 2 seconds
  };

  return (
    <div className="relative flex flex-col md:flex-row items-start gap-4 p-8">
      {/* Product Image */}
      <div className="w-full md:w-[45%] flex-shrink-0">
        <Image
          src={product.image?.asset?.url || "/images/default-product.png"}
          alt={product.name}
          width={500}
          height={600}
          className="rounded-md object-cover w-full h-[500px]" // Fixed height
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-[55%]">
        <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
        <p className="text-lg font-bold text-gray-800 mb-4">£{product.price * quantity}</p>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-gray-600">
            {product.description || "No description available."}
          </p>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Features</h3>
            <ul className="list-disc ml-6">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Dimensions */}
        {product.dimensions && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Dimensions</h3>
            <div className="text-gray-600">
              <p>Height: {product.dimensions.height}</p>
              <p>Width: {product.dimensions.width}</p>
              <p>Depth: {product.dimensions.depth}</p>
            </div>
          </div>
        )}

        {/* Quantity Controls and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold mr-2">Amount:</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                -
              </button>
              <span className="text-lg mx-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={addToCart}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-3 rounded-md shadow-lg text-center z-50">
          Product added to cart!
        </div>
      )}
    </div>
  );
}

export default ProductDetail;


