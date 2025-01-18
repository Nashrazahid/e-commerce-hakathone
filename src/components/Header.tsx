import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoReorderTwo } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function Header() {
  return (
    <div className="flex items-center border-b-2 p-2 relative">
      {/* Search Icon for Large Screens */}
      <div className="hidden sm:flex items-center">
        <CiSearch size={22} />
      </div>

      {/* Left-Aligned Logo for Mobile and Centered for Larger Screens */}
      <div className="text-2xl font-semibold sm:flex-1 sm:text-center text-left ">
        Avion
      </div>

      {/* Right Icons for Large Screens */}
      <div className="gap-4 sm:flex hidden items-center">
        <Link href="/cart" className="hover:text-gray-600">
          <IoCartOutline size={20} />
        </Link>
        <CgProfile size={20} />
      </div>

      {/* Right Icons for Mobile */}
      <div className="flex sm:hidden ml-auto items-center gap-2 relative">
        <CiSearch size={22} />
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <IoReorderTwo size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
          >
            <DropdownMenuLabel>
              <Link href="/cart" className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
                <IoCartOutline size={20} />
                <span>Cart</span>
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md">
                <CgProfile size={20} />
                <span>Profile</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
