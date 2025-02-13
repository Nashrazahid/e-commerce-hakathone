"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { client as sanityClient } from "@/sanity/lib/client";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Product {
  name: string;
  price: number;
  slug: { current: string };
  image: {
    asset: {
      url: string;
    };
  };
}

function CategoryPage() {
  const pathname = usePathname();
  const categorySlug = pathname?.split("/").pop(); // Get category slug from URL
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (categorySlug) {
      const fetchProducts = async () => {
        const data = await sanityClient.fetch(
          `*[_type == "product" && category->slug.current == $categorySlug]{
            name,
            price,
            slug,
            image {
              asset -> {
                url
              }
            }
          }`,
          { categorySlug }
        );
        setProducts(data);
      };

      fetchProducts();
    }
  }, [categorySlug]);

  if (!products.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        Products in {categorySlug} Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.slug.current} className="border rounded-lg p-4">
            <Image
              src={product.image?.asset?.url || "/images/default-product.png"}
              alt={product.name}
              height={48}
              width={48}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-4">Price: £{product.price}</p>
            <Link
              href={`/product/${product.slug.current}`}
              className="text-indigo-600 underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
