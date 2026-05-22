"use client";
import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Slide, toast } from "react-toastify";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { Check } from "@gravity-ui/icons";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    
    if (user.password.length < 8 || !/[A-Z]/.test(user.password) || !/[0-9]/.test(user.password)) {
      toast.error("Password does not meet required specifications.");
      return;
    }
    
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.url,
        callbackURL: "/login",
      });

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
        toast.warn(`${error?.message || "Something went wrong"}`, {
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
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setLoading(true);
    try {
      const data = await authClient.signIn.social({
        provider: "google",
      });
      if (data?.user) {
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
        redirect('/login');
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2.5rem] p-6 sm:p-10 transition-all">
        
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2">
            <span className="text-3xl font-black text-[#163962] dark:text-white tracking-wide">
              ⚽ Sport<span className="text-orange-500">Nest</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-400 max-w-[280px] mx-auto font-medium">
            Join us today to explore and book sports facilities effortlessly.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSignUpSubmit}>
          
          <div className="form-control w-full">
            <label className="label font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 py-1">
              Full Name
            </label>
            <input
              required
              disabled={loading}
              name="name"
              type="text"
              minLength={3}
              placeholder="John Doe"
              className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm disabled:opacity-60"
            />
          </div>

          <div className="form-control w-full">
            <label className="label font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 py-1">
              Email Address
            </label>
            <input
              required
              disabled={loading}
              name="email"
              type="email"
              placeholder="john@example.com"
              className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm disabled:opacity-60"
            />
          </div>

          <div className="form-control w-full">
            <label className="label font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 py-1">
              Photo URL
            </label>
            <input
              disabled={loading}
              name="url"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm disabled:opacity-60"
            />
          </div>

          <div className="form-control w-full">
            <label className="label font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 py-1">
              Password
            </label>
            <input
              required
              disabled={loading}
              name="password"
              type="password"
              placeholder="••••••••"
              className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm disabled:opacity-60"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1.5 block leading-normal">
              💡 Must be at least 8 characters with 1 uppercase and 1 number.
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-md w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-none text-white font-black rounded-xl shadow-lg shadow-orange-500/10 active:scale-98 transition-all gap-2 uppercase tracking-wide text-xs disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Check className="size-4 stroke-[2.5]" />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#163962] dark:text-orange-400 font-extrabold hover:underline"
            >
              Login
            </Link>
          </div>

          <div className="divider text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-600 my-4">
            OR REGISTER WITH
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleSocialLogin}
            className="btn btn-md btn-outline w-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 hover:text-slate-900 dark:text-slate-300 font-bold rounded-xl active:scale-98 transition-all gap-2.5 text-xs uppercase tracking-wide disabled:opacity-50"
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <FaGoogle className="text-red-500 size-3.5" />
            )}
            <span>Sign in with Google</span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default SignUpPage;