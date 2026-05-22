"use client";
import React from "react";
import bannerImage from "../../../public/assets/loginBanner.webp";
import Image from "next/image";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Slide, toast } from "react-toastify";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
const SignUpPage = () => {
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
      name: user.name, // required
      email: user.email, // required
      password: user.password, // required
      image: user.url,
      callbackURL: "/login",
    });

    console.log(data);

    if (data?.user) {
      toast.success("Register Successful", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      redirect("/login");
    } else {
      toast.warn(`${error?.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  const handleSocialLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (data) {
      toast.success("User Login Successful", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } else {
      toast.warn("Something is Wrong! Try Again.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-4 sm:p-8 md:p-12 min-h-screen  ">
        <div className="w-full max-w-md mx-auto  shadow-2xl p-4 rounded-4xl">
          {/* Header Section */}
          <div className="text-center space-y-2 mb-6 ">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#163962] tracking-wide">
              ⚽ Sport<span className="text-orange-500">Nest</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-xs mx-auto">
              Join us today to explore and book sports facilities effortlessly
            </p>
            <h1 className="text-lg md:text-4xl font-bold text-slate-800 pt-2">
              Create Your Account
            </h1>
          </div>
          {/* form data collect from user */}
          <Form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSignUpSubmit}
          >
            {/* 1. Full Name Field (Fixed validation & type) */}
            <TextField
              isRequired
              name="name"
              className="w-full"
              type="text"
              validate={(value) => {
                if (value.trim().length < 3) {
                  return "Name must be at least 3 characters long";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                Full Name
              </Label>
              <Input
                placeholder="Enter Your Name"
                className={`{
                  inputWrapper:
                    "bg-white border border-slate-200 rounded-xl h-11 md:h-12 data-[hover=true]:border-slate-400 group-data-[focus=true]:border-[#163962] transition-all shadow-sm",
                  input: "text-slate-800 placeholder:text-slate-400 text-sm",
                } w-full`}
              />
              <FieldError className="text-xs text-danger-500 mt-1 font-medium" />
            </TextField>

            {/* 2. Email Field (Removed Duplication) */}
            <TextField
              isRequired
              name="email"
              className="w-full"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                Email Address
              </Label>
              <Input
                placeholder="john@example.com"
                className={`{
                  inputWrapper:
                    "bg-white border border-slate-200 rounded-xl h-11 md:h-12 data-[hover=true]:border-slate-400 group-data-[focus=true]:border-[#163962] transition-all shadow-sm",
                  input: "text-slate-800 placeholder:text-slate-400 text-sm",
                } w-full`}
              />
              <FieldError className="text-xs text-danger-500 mt-1 font-medium" />
            </TextField>
            <TextField
              name="url"
              className="w-full"
              type="url"
              validate={(value) => {
                try {
                  new URL(value);
                  return null;
                } catch {
                  return "Please enter a valid URL";
                }
              }}
            >
              <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                Photo URL
              </Label>

              <Input
                placeholder="Enter your photo URL"
                className={`{
                  inputWrapper:
                    "bg-white border border-slate-200 rounded-xl h-11 md:h-12 data-[hover=true]:border-slate-400 group-data-[focus=true]:border-[#163962] transition-all shadow-sm",
                  input: "text-slate-800 placeholder:text-slate-400 text-sm",
                } w-full`}
              />

              <FieldError className="text-xs text-danger-500 mt-1 font-medium" />
            </TextField>

            {/* 3. Password Field */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              className="w-full"
              type="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-700 mb-1 block">
                Password
              </Label>
              <Input
                placeholder="Enter your password"
                className={`{
                  inputWrapper:
                    "bg-white border border-slate-200 rounded-xl h-11 md:h-12 data-[hover=true]:border-slate-400 group-data-[focus=true]:border-[#163962] transition-all shadow-sm",
                  input: "text-slate-800 placeholder:text-slate-400 text-sm",
                } w-full`}
              />
              <Description className="text-[11px] text-gray-400 leading-normal mt-1 block">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs text-danger-500 mt-1 font-medium" />
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#163962] text-white font-semibold h-11 md:h-12 rounded-xl shadow-md hover:bg-[#122e50] active:scale-98 transition-all text-sm gap-2 mt-2"
            >
              <Check className="text-md" />
              Sign Up
            </Button>

            {/* Footer Navigation */}
            <div className="text-center text-xs md:text-sm text-gray-500 mt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#163962] font-bold hover:underline ml-1"
              >
                Login
              </Link>
            </div>
            <Button
              onClick={handleSocialLogin}
              className="w-full mt-7"
              variant="tertiary"
            >
              <FaGoogle icon="devicon:google" />
              <span className="dark:text-black">Sign in with Google</span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
