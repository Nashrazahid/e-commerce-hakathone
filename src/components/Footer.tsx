import React from "react";
import { IoLogoLinkedin } from "react-icons/io";
import { AiFillFacebook } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { PiSkypeLogo } from "react-icons/pi";
import { PiTwitterLogo } from "react-icons/pi";
import { FaPinterest } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-indigo-950 text-gray-300 p-4 sm:p-10 gap-20">
      {/* Footer Main Content */}
      <div className="flex flex-col justify-between md:flex-row items-start md:gap-8 w-full border-b-2 pb-6 gap-20">
        {/* First Column */}
        <ul className="space-y-2">
          <li className="font-semibold text-lg md:text-xl">Menu</li>
          <li className="text-sm md:text-base">New arrivals</li>
          <li className="text-sm md:text-base">Best seller</li>
          <li className="text-sm md:text-base">Recently viewed</li>
          <li className="text-sm md:text-base">Popular this week</li>
          <li className="text-sm md:text-base">All products</li>
        </ul>

        {/* Second Column */}
        <ul className="space-y-2">
          <li className="font-semibold text-lg md:text-xl">Categories</li>
          <li className="text-sm md:text-base">Grocery</li>
          <li className="text-sm md:text-base">Furniture</li>
          <li className="text-sm md:text-base">Home Ware</li>
          <li className="text-sm md:text-base">Paint Pots</li>
          <li className="text-sm md:text-base">Chairs</li>
          <li className="text-sm md:text-base">Cutlery</li>
        </ul>

        {/* Third Column */}
        <ul className="space-y-2">
          <li className="font-semibold text-lg md:text-xl">Our Company</li>
          <li className="text-sm md:text-base">About us</li>
          <li className="text-sm md:text-base">Vacancies</li>
          <li className="text-sm md:text-base">Contact us</li>
          <li className="text-sm md:text-base">Privacy</li>
          <li className="text-sm md:text-base">Return Policy</li>
        </ul>

        {/* Mailing List */}
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <h1 className="text-lg md:text-xl font-semibold">
            Join our mailing list
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-purple-600 text-gray-200 placeholder-gray-400 p-4 rounded w-full text-sm md:text-base sm:placeholder:text-xs md:placeholder:text-sm placeholder:mt-4 md:placeholder:mt-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button className="absolute right-2 top-2 bg-white text-black py-2 px-4 rounded text-sm md:text-base">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="flex text- pt-3 ">copyright 2022 avion LTD</div>
      <div className="flex justify-end gap-3">
        <IoLogoLinkedin size={20} />
        <AiFillFacebook size={20} />
        <FaInstagram size={20} />
        <PiSkypeLogo size={20} />
        <PiTwitterLogo size={20} />
        <FaPinterest size={20} />
      </div>
    </div>
  );
}

export default Footer;
