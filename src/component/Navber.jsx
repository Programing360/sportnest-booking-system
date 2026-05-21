"use client";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosFootball } from "react-icons/io";
import NavLink from "./shered/NavLink";

const Navber = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const route = useRouter();
  const userInitialName = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  console.log(user);

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          route.push("/login"); // redirect to login page
        },
      },
    });
  };

  


  const menuItems = (
    <>
      <li className="font-bold hover:bg-[#ffecde] hover:text-orange-400 transition-all duration-400">
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li className="font-bold hover:bg-[#ffecde] hover:text-orange-400 transition-all duration-400">
        <NavLink href={"/allFacilities"}>All Facilities</NavLink>
      </li>
      <li className="font-bold hover:bg-[#ffecde] hover:text-orange-400 transition-all duration-400">
        <NavLink href={"/myBookings"}>My Bookings</NavLink>
      </li>
      <li className="font-bold hover:bg-[#ffecde] hover:text-orange-400 transition-all duration-400">
        <NavLink href={"/addFacility"}>Add Facility</NavLink>
      </li>
      <li className="font-bold hover:bg-[#ffecde] hover:text-orange-400 transition-all duration-400">
        <NavLink href={"/manageFacilities"}>Manage My Facilities</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {menuItems}
            </ul>
          </div>
          <div className="flex items-center gap-1">
            <IoIosFootball size={30} />
            <h1 className="text-2xl text-[#103e7d] font-bold">SportNest</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 ">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          {session?.user ? (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full">
                <Avatar>
                  <Avatar.Image alt="Junior Garcia" src={user?.image} />
                  <Avatar.Fallback delayMs={600}>
                    {userInitialName}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>
              <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image alt="Jane" src={user?.image} />
                      <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                      <p className="text-sm leading-5 font-medium">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item id="dashboard" textValue="Dashboard">
                    <Label>My Bookings</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="profile" textValue="Profile">
                    <Label>Add Facility</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="settings" textValue="Settings">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Manage My Facilities</Label>
                      <Gear className="size-3.5 text-muted" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item id="new-project" textValue="New project">
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Create Team</Label>
                      <Persons className="size-3.5 text-muted" />
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="logout"
                    textValue="Logout"
                    variant="danger"
                  >
                    <div
                      onClick={handleLogOut}
                      className="flex w-full items-center justify-between gap-2"
                    >
                      <Label>Log Out</Label>
                      <ArrowRightFromSquare className="size-3.5 text-danger" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <Link href={"/login"}>
              <button className="btn w-24 rounded-4xl bg-orange-500 hover:bg-orange-700 text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
