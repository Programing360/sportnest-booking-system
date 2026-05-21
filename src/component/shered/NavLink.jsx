"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const pathName = usePathname();

  const isActive =
    pathName === href || (pathName?.startsWith(`${href}/`) && href !== "/");

  return (
    <Link
      href={href}
      className={`relative py-2 px-1 text-sm font-semibold tracking-wide transition-all duration-300 ease-in-out group outline-none
        ${
          isActive
            ? "text-orange-600 font-bold"
            : "text-gray-500 hover:text-gray-950"
        }`}
    >
      <span>{children}</span>

      <span
        className={`absolute bottom-0 left-0 h-[2.5px] bg-orange-600 rounded-full transition-all duration-300 ease-in-out
          ${
            isActive
              ? "w-full opacity-100 shadow-sm shadow-orange-500/50"
              : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50"
          }`}
      />
    </Link>
  );
};

export default NavLink;
