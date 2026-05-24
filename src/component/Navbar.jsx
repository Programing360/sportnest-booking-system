"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
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
import NavLink from "./shered/NavLink";

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
    <div className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl transition-all duration-300 dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="navbar container mx-auto min-h-[76px] px-4 sm:px-6 lg:px-8">
        
        {/* LEFT SECTION */}
        <div className="navbar-start gap-1">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <Menu size={20} className="stroke-[2]" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-[50] mt-3 w-60 gap-1 rounded-2xl border border-slate-100 bg-white/95 p-3.5 shadow-xl backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/95"
            >
              {menuItems}
            </ul>
          </div>

          <Link href="/" className="group flex items-center gap-2.5 transition-opacity active:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform duration-500 group-hover:rotate-[360deg] dark:bg-white dark:text-slate-950">
              <IoIosFootball size={22} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Sport<span className="text-orange-500">Nest</span>
            </h1>
          </Link>
        </div>

        {/* CENTER SECTION (DESKTOP) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1.5 px-1 text-sm font-semibold tracking-wide">
            {menuItems}
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="navbar-end gap-2.5">
          <button 
            onClick={toggleTheme} 
            className="btn btn-ghost btn-circle text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={19} className="stroke-[2]" />
            ) : (
              <Sun size={19} className="text-amber-400 stroke-[2]" />
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar online placeholder hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-800 dark:text-white">
                  {user?.image ? (
                    <Image 
                      src={user.image} 
                      alt={user.name || "User"} 
                      fill
                      sizes="40px"
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-black">{userInitialName}</span>
                  )}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[50] mt-3 w-68 gap-0.5 rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-2xl backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/95"
              >
                <div className="mb-2 border-b border-slate-100 px-4 py-3 dark:border-slate-800/80">
                  <p className="font-black text-sm text-slate-800 dark:text-slate-100 tracking-tight leading-none mb-1">{user.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">{user.email}</p>
                </div>

                <li>
                  <Link href="/myBookings" className="flex items-center gap-2.5 px-3 py-2.5 font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <LayoutDashboard size={15} className="text-slate-400" />
                    <span>My Bookings</span>
                  </Link>
                </li>

                <li>
                  <Link href="/addFacility" className="flex items-center gap-2.5 px-3 py-2.5 font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <PlusCircle size={15} className="text-slate-400" />
                    <span>Add Facility</span>
                  </Link>
                </li>

                <li>
                  <Link href="/manageFacilities" className="flex items-center gap-2.5 px-3 py-2.5 font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <Settings size={15} className="text-slate-400" />
                    <span>Manage Facilities</span>
                  </Link>
                </li>

                <li>
                  <Link href="/createTeam" className="flex items-center gap-2.5 px-3 py-2.5 font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60">
                    <Users size={15} className="text-slate-400" />
                    <span>Create Team</span>
                  </Link>
                </li>

                <div className="my-1.5 border-t border-slate-100 dark:border-slate-800/80"></div>

                <li>
                  <button 
                    onClick={handleLogOut} 
                    className="flex items-center gap-2.5 px-3 py-2.5 font-black text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <LogOut size={15} className="stroke-[2.5]" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login">
              <button className="btn btn-sm h-10 px-5 border-none bg-slate-900 hover:bg-orange-500 dark:bg-white dark:hover:bg-orange-500 text-white dark:text-slate-950 dark:hover:text-white font-black rounded-xl active:scale-95 transition-all text-xs uppercase tracking-wider shadow-md shadow-slate-900/10">
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