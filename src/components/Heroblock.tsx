"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { client as sanityClient } from "../sanity/lib/client";

interface Category {
  name: string;
  slug: { current: string };
}

function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from Sanity
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await sanityClient.fetch(`*[_type == "category"]{name, slug}`);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Navigation Menu */}
      <nav>
        <ul className="flex flex-wrap justify-center gap-6 text-gray-600 text-lg">
          {/* Render only if categories are loaded */}
          {categories.length > 0 &&
            <>
              {/* Mobile: Show only 2 categories */}
              {categories
                .slice(0, 2) // Limit to 2 categories for small screens
                .map((category) => (
                  <li key={category.slug.current} className="cursor-pointer block sm:hidden">
                    <Link href={`/category/${category.slug.current}`}>{category.name}</Link>
                  </li>
                ))}

              {/* Show all categories for larger screens */}
              {categories.map((category) => (
                <li key={category.slug.current} className="cursor-pointer hidden sm:block">
                  <Link href={`/category/${category.slug.current}`}>{category.name}</Link>
                </li>
              ))}

              {/* "About" is shown only when categories are loaded */}
              <li>
                <Link href="/about" className="hover:text-indigo-600">
                  About
                </Link>
              </li>
            </>
          }
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
