"use client";

import { useState, useEffect } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";
import Link from "next/link"; // Added Link for routing

// Sanity client setup
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: "2023-01-01",
});

// TypeScript interfaces
interface Category {
  name: string;
  slug: {
    current: string;
  };
}

interface Product {
  name: string;
  slug: {
    current: string;
  };
  price: number;
  image?: {
    asset: {
      url: string;
    };
  };
  category?: Category;
  description?: string;
}

function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    sorting: "",
  });

  useEffect(() => {
    // Fetch products from Sanity
    client
      .fetch<Product[]>(
        `*[_type == "product"]{
          name,
          slug,
          price,
          image {
            asset -> {
              url
            }
          },
          category -> {
            name,
            slug
          },
          description
        }`
      )
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Apply filters and sorting
  const filteredProducts = products
    .filter((product) => {
      if (filters.category && product.category?.name !== filters.category) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.price === "Low to High") {
        return a.price - b.price;
      }
      if (filters.price === "High to Low") {
        return b.price - a.price;
      }
      if (filters.sorting === "Newest") {
        return b.slug.current.localeCompare(a.slug.current);
      }
      if (filters.sorting === "Popularity") {
        return a.slug.current.localeCompare(b.slug.current);
      }
      return 0;
    });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <div>
      {/* Header Section */}
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Frame 143.png')" }}
      >
        <div className="bg-black bg-opacity-50 text-white py-16 px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-light">All Products</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md py-4 px-4 sm:px-8 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        {/* Left Section */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <select
            className="w-full sm:w-auto border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">Category</option>
            <option value="Plant Pots">Plant Pots</option>
            <option value="Ceramics">Ceramics</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Crockery">Crockery</option>
            <option value="Tableware">Tableware</option>
          </select>

          <select
            className="w-full sm:w-auto border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => handleFilterChange("price", e.target.value)}
          >
            <option value="">Price</option>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <select
            className="w-full sm:w-auto border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => handleFilterChange("sorting", e.target.value)}
          >
            <option value="">Sorting By</option>
            <option value="Popularity">Popularity</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="bg-gray-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.slug.current}
              href={`/product/${product.slug.current}`} // Link added for routing
              className="bg-white text-center p-4"
            >
              <div className="w-72 h-72 mx-auto">
                <Image
                  src={product.image?.asset?.url || "/images/default-product.png"}
                  alt={product.name}
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mt-2">{product.name}</h2>
              <p className="text-gray-600">£{product.price}</p>
              <p className="text-gray-500 text-sm">
                {product.category?.name || "Uncategorized"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
