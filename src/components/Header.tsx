"use client";

import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoReorderTwo } from "react-icons/io5";
import { client as sanityClient } from "../sanity/lib/client";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Product {
  name: string;
  slug: { current: string };
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [FilteredProducts ,setFilteredProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await sanityClient.fetch(
        `*[_type == "product"]{name, slug}`
      );
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      toast.success("Login Successfully!");
      router.push("/"); // Home page pr redirect
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center border-b-2 p-2 relative">
      <div className="hidden sm:flex items-center">
        <CiSearch
          size={22}
          onClick={() => setSearchOpen(!searchOpen)}
          className="cursor-pointer"
        />
      </div>

      <div className="text-2xl font-semibold sm:flex-1 sm:text-center text-left">
        Avion
      </div>

      {/* Right Icons for Large Screens */}
      <div className="gap-4 sm:flex hidden items-center">
        <Link href="/cart" className="hover:text-gray-600">
          <IoCartOutline size={20} />
        </Link>

        {!isLoaded ? (
          <span>Loading...</span>
        ) : isSignedIn ? (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="hover:text-gray-600"
            >
              <CgProfile size={20} />
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <div className="px-4 py-2 border-b text-sm text-gray-700">
                  {user?.primaryEmailAddress?.emailAddress ||
                    user?.emailAddresses?.[0]?.emailAddress ||
                    "User"}
                </div>
                <Link href="/profile">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </div>
                </Link>
                <SignOutButton redirectUrl="/contact">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </SignOutButton>
              </div>
            )}
          </div>
        ) : (
          <Link href="/contact" className="hover:text-gray-600">
            <CgProfile size={20} />
          </Link>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="flex sm:hidden ml-auto items-center gap-2 relative">
        <CiSearch
          size={22}
          onClick={() => setSearchOpen(!searchOpen)}
          className="cursor-pointer"
        />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="relative">
            <IoReorderTwo size={22} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
            <DropdownMenu.Label>
              <Link
                href="/cart"
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
              >
                <IoCartOutline size={20} />
                <span>Cart</span>
              </Link>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item asChild>
              {!isLoaded ? (
                <div className="p-2 text-gray-500">Loading...</div>
              ) : isSignedIn ? (
                <div className="p-2 text-sm text-gray-700 bg-gray-100 rounded-md">
                  {user?.primaryEmailAddress?.emailAddress ||
                    user?.emailAddresses?.[0]?.emailAddress ||
                    "User"}
                </div>
              ) : (
                <Link
                  href="/contact"
                  className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md"
                >
                  <CgProfile size={20} />
                  <span>Login</span>
                </Link>
              )}
            </DropdownMenu.Item>
            {isSignedIn && (
              <DropdownMenu.Item asChild>
                <SignOutButton redirectUrl="/contact">
                  <button className="w-full text-left flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
                    <span>Logout</span>
                  </button>
                </SignOutButton>
              </DropdownMenu.Item>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}

export default Header;
