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
    <div className="flex justify-items-center border-b-2 p-2 relative">
      <div className="hidden sm:flex">
        <CiSearch size={22} />
      </div>
      <div className="md:text-center sm:text-center text-left text-2xl 2xl:text-center lg:text-center xl:text-center w-full">
        Avion
      </div>
      <div className="gap-2 sm:flex hidden md:ml-auto ml-auto ">
        <Link href="/cart">
          <IoCartOutline size={20} />
        </Link>
        <CgProfile size={20} />
      </div>
      <div className="flex sm:hidden ml-auto md:hidden ">
        <CiSearch size={22} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IoReorderTwo size={22} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <IoCartOutline size={20} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CgProfile size={20} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Header;
