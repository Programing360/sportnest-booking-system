"use client";
import React, { useState } from "react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Slide, toast } from "react-toastify";
import { IconBase } from "react-icons";
import { FaGoogle } from "react-icons/fa";
import { redirect } from "next/navigation";
const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    console.log(user);
    const { data, error } = await authClient.signIn.email({
      email: user.email, // required
      password: user.password,
      rememberMe: true,
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
      toast.warn(`${error.message}`, {
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
      redirect('/signUp')
    }
    console.log(error);
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
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-[#163962]/10 px-4 py-12">
      <Card className="max-w-2xl mx-auto border border-slate-200/60 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-md p-2 md:p-4">
        <div className="flex flex-col items-center w-90">
          <div className="text-center space-y-2 mt-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-4xl md:text-4xl font-extrabold text-[#163962] tracking-wide">
                ⚽Sport<span className="text-orange-500">Nest</span>
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              Welcome Back
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mb-4 max-w-70">
              Sign in to manage your bookings and explore venues
            </p>
          </div>
          <Form className="space-y-6 w-full p-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              className=""
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>
              <Input className='rounded-2xl shadow border-none w-full' placeholder="Enter your email" />
              <FieldError />
            </TextField>
            <TextField className="w-full " name="password">
              <Label>Password</Label>
              <InputGroup>
                <InputGroup.Input
                  className="w-full "
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <InputGroup.Suffix className="pr-0">
                  <Button
                    isIconOnly
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    size="sm"
                    variant="ghost"
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeSlash className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
            <div className="flex gap-2">
              <Button type="submit" className=" bg-[#0f2947] w-full mt-2">
                <Check />
                Login
              </Button>
            </div>
            <div className="text-center text-xs md:text-sm text-gray-500 mt-2 mb-2">
              Don't have an account? please
              <Link
                href="/signUp"
                className="text-[#163962] font-bold hover:underline"
              >
                Sign Up
              </Link>
            </div>
            <Button
              onClick={handleSocialLogin}
              className="w-full mt-7"
              variant="tertiary"
            >
              <FaGoogle icon="devicon:google" />
              <span>Sign in with Google</span>
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
