"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosFootball } from "react-icons/io";

import {
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Users,
  Sun,
  Moon,
  Menu,
} from "lucide-react";

import { useTheme } from "next-themes";
import NavLink from "./shered/NavLink";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const userInitialName = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const menuItems = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>

      <li>
        <NavLink href="/allFacilities">All Facilities</NavLink>
      </li>

      <li>
        <NavLink href="/myBookings">My Bookings</NavLink>
      </li>

      <li>
        <NavLink href="/addFacility">Add Facility</NavLink>
      </li>

      <li>
        <NavLink href="/manageFacilities">Manage Facilities</NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="navbar container mx-auto min-h-[70px] px-4 md:px-6">
        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost p-2 lg:hidden"
            >
              <Menu size={22} />
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[50] mt-3 w-56 gap-1 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
            >
              {menuItems}
            </ul>
          </div>

          {/* LOGO */}
          <Link href="/" className="ml-2 flex items-center gap-2 lg:ml-0">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <IoIosFootball size={24} className="animate-spin" />
            </div>

            <h1 className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-2xl font-black text-transparent dark:from-blue-400 dark:to-indigo-300">
              Sport
              <span className="text-orange-500">Nest</span>
            </h1>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">{menuItems}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          {/* THEME BUTTON */}
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "light" ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} className="text-amber-400" />
            )}
          </button>

          {/* USER */}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-ghost btn-circle"
              >
                {user?.image ? (
                  <div className="w-10 rounded-full">
                    <Image src={user.image} alt={user.name} />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    {userInitialName}
                  </div>
                )}
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[50] mt-3 w-64 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-2 border-b border-gray-100 px-4 py-3 dark:border-slate-700">
                  <p className="font-bold">{user.name}</p>

                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>

                <li>
                  <Link href="/myBookings">
                    <LayoutDashboard size={16} />
                    My Bookings
                  </Link>
                </li>

                <li>
                  <Link href="/addFacility">
                    <PlusCircle size={16} />
                    Add Facility
                  </Link>
                </li>

                <li>
                  <Link href="/manageFacilities">
                    <Settings size={16} />
                    Manage Facilities
                  </Link>
                </li>

                <li>
                  <Link href="/createTeam">
                    <Users size={16} />
                    Create Team
                  </Link>
                </li>

                <div className="my-1 border-t border-gray-100 dark:border-slate-700"></div>

                <li>
                  <button onClick={handleLogOut} className="text-rose-600">
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login">
              <button className="btn border-none bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
