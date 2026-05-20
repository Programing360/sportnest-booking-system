import Link from "next/link";
import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from "react-icons/fa";
import { Button, Input } from "@heroui/react";

const Footer = () => {
  return (
    <footer className="bg-[#163962] text-slate-200 mt-20 border-t border-slate-700/50">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* You can replace this with your actual SportNest Logo */}
              <span className="text-2xl font-bold text-white tracking-wide">
                ⚽ Sport<span className="text-orange-400">Nest</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your premier sports facility booking hub. Find, book, and play at the best arenas, courts, and fields in your area with absolute ease.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaTwitter />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-700/40 hover:bg-orange-400 hover:text-[#163962] transition-all duration-300 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 md:mb-6 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-[2px] after:bg-orange-400">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">Home</Link>
              </li>
              <li>
                <Link href="/allFacilities" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">All Facilities</Link>
              </li>
              <li>
                <Link href="/myBookings" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">My Bookings</Link>
              </li>
              <li>
                <Link href="/addFacility" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200">Add Facility</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 md:mb-6 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-[2px] after:bg-orange-400">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-orange-400 mt-1 flex-shrink-0" />
                <span>123 Stadium Road, Sports Zone, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-400 flex-shrink-0" />
                <span>+880 1754318654</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-orange-400 flex-shrink-0" />
                <span className="break-all">support@sportnest.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 md:mb-6 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-10 after:h-[2px] after:bg-orange-400">
              Newsletter
            </h3>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Subscribe to get latest updates, offers, and match slot openings.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                variant="flat"
                size="sm"
                className={`{
                  inputWrapper: "bg-slate-700/30 data-[hover=true]:bg-slate-700/50 group-data-[focus=true]:bg-slate-700/50",
                  input: "text-white placeholder:text-slate-400"
                } bg-slate-700/30 text-white rounded-xl`}
              />
              <Button className="w-full bg-orange-400 hover:bg-orange-500 text-[#163962] font-bold py-5 rounded-xl transition-colors">
                Subscribe
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-700/60 bg-[#0f2947] py-6 text-sm text-slate-400">
        <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} SportNest. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;