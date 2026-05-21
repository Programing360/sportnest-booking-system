"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoIosFootball } from "react-icons/io";
import { LogOut, LayoutDashboard, PlusCircle, Settings, Users, Sun, Moon, Menu } from "lucide-react";
import NavLink from "./shered/NavLink";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );

  
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
        <NavLink href="/" className="font-bold text-sm tracking-wide rounded-xl py-2 px-4 transition-all">Home</NavLink>
      </li>
      <li>
        <NavLink href="/allFacilities" className="font-bold text-sm tracking-wide rounded-xl py-2 px-4 transition-all">All Facilities</NavLink>
      </li>
      <li>
        <NavLink href="/myBookings" className="font-bold text-sm tracking-wide rounded-xl py-2 px-4 transition-all">My Bookings</NavLink>
      </li>
      <li>
        <NavLink href="/addFacility" className="font-bold text-sm tracking-wide rounded-xl py-2 px-4 transition-all">Add Facility</NavLink>
      </li>
      <li>
        <NavLink href="/manageFacilities" className="font-bold text-sm tracking-wide rounded-xl py-2 px-4 transition-all">Manage Facilities</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar container mx-auto px-4 md:px-6 min-h-[70px]">
        
    
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-2 text-gray-700 dark:text-gray-200">
              <Menu size={22} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow-2xl bg-white dark:bg-slate-800 rounded-2xl w-56 border border-gray-100 dark:border-slate-700 gap-1 text-gray-700 dark:text-gray-200"
            >
              {menuItems}
            </ul>
          </div>
          
       
          <Link href="/" className="flex items-center gap-2 active:scale-95 transition-transform ml-2 lg:ml-0">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-500/20">
              <IoIosFootball size={24} className="animate-spin-slow" />
            </div>
            <h1 className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-300 font-black tracking-tight">
              SportNest
            </h1>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 text-gray-600 dark:text-gray-300">
            {menuItems}
          </ul>
        </div>

   
        <div className="navbar-end gap-3">
          
          
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon size={20} className="stroke-[2]" />
            ) : (
              <Sun size={20} className="stroke-[2] text-amber-400" />
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
           
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online placeholder border border-gray-200 dark:border-slate-700">
                {user?.image ? (
                  <div className="w-10 rounded-full">
                    <img alt={user?.name || "User"} src={user.image} />
                  </div>
                ) : (
                  <div className="bg-neutral text-neutral-content rounded-full w-10 font-bold">
                    <span>{userInitialName}</span>
                  </div>
                )}
              </div>
              
          
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-2xl bg-white dark:bg-slate-800 rounded-2xl w-64 border border-gray-100 dark:border-slate-700 font-medium text-gray-700 dark:text-gray-200"
              >
                
                <div className="px-4 py-3 border-b border-gray-50 dark:border-slate-700/60 mb-1 flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-blue-500 text-white rounded-xl w-10 font-bold text-sm">
                      {user?.image ? <img src={user.image} alt="" /> : <span>{userInitialName}</span>}
                    </div>
                  </div>
                  <div className="truncate max-w-[160px]">
                    <p className="text-sm font-black text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>

            
                <li>
                  <Link href="/myBookings" className="py-2.5 rounded-xl flex items-center gap-2.5 hover:bg-blue-50 dark:hover:bg-slate-700/50">
                    <LayoutDashboard size={16} className="text-blue-500" />
                    <span>My Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link href="/addFacility" className="py-2.5 rounded-xl flex items-center gap-2.5 hover:bg-blue-50 dark:hover:bg-slate-700/50">
                    <PlusCircle size={16} className="text-emerald-500" />
                    <span>Add Facility</span>
                  </Link>
                </li>
                <li>
                  <Link href="/manageFacilities" className="py-2.5 rounded-xl flex items-center gap-2.5 hover:bg-blue-50 dark:hover:bg-slate-700/50">
                    <Settings size={16} className="text-purple-500" />
                    <span>Manage My Facilities</span>
                  </Link>
                </li>
                <li>
                  <Link href="/createTeam" className="py-2.5 rounded-xl flex items-center gap-2.5 hover:bg-blue-50 dark:hover:bg-slate-700/50">
                    <Users size={16} className="text-indigo-500" />
                    <span>Create Team</span>
                  </Link>
                </li>
                
                <div className="border-t border-gray-50 dark:border-slate-700/60 my-1"></div>
                
           
                <li>
                  <button 
                    onClick={handleLogOut}
                    className="py-2.5 rounded-xl flex items-center gap-2.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold"
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            
            <Link href={"/login"}>
              <button className="btn btn-md px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/10 active:scale-95 transition-all">
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