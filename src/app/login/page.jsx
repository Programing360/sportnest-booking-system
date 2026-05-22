"use client";
import React, { useState } from "react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Slide, toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        rememberMe: true,
        callbackURL: "/",
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
        redirect("/signUp");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setLoading(true);
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
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
        
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2">
            <span className="text-3xl font-black text-[#163962] dark:text-white tracking-wide">
              ⚽ Sport<span className="text-orange-500">Nest</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 max-w-[280px] mx-auto font-medium">
            Sign in to manage your bookings and explore premium sports venues.
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          
          <div className="form-control w-full">
            <label className="label font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email Address
            </label>
            <input
              required
              disabled={loading}
              name="email"
              type="email"
              placeholder="name@example.com"
              className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm disabled:opacity-60"
            />
          </div>

          <div className="form-control w-full">
            <label className="label font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Password
            </label>
            <div className="relative w-full">
              <input
                required
                disabled={loading}
                name="password"
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                className="input input-md w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:border-orange-500 outline-none transition-all font-medium text-sm pr-12 disabled:opacity-60"
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors disabled:opacity-30"
                aria-label={isVisible ? "Hide password" : "Show password"}
              >
                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
              </button>
            </div>
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Check className="size-4 stroke-[2.5]" />
                  <span>Login</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
            Don't have an account?{" "}
            <Link
              href="/signUp"
              className="text-[#163962] dark:text-orange-400 font-extrabold hover:underline"
            >
              Sign Up
            </Link>
          </div>

          <div className="divider text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-600 my-6">
            OR CONTINUE WITH
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

export default LoginPage;