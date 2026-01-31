

import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaPinterest,
} from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-300 pt-16">

      <div className="max-w-7xl mx-auto px-4 grid gap-10 sm:grid-cols-2 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <Link to="/">
            <h2 className="text-3xl font-extrabold tracking-wide text-white">
              EK<span className="text-pink-500">art</span>
            </h2>
          </Link>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Powering your world with the best in electronics.
          </p>

          <div className="mt-4 space-y-1 text-sm text-gray-400">
            <p>123 Electronics St, Style City, NY 10001</p>
            <p>Email: support@ekart.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>

          <ul className="space-y-2 text-sm">
            {[
              "Contact Us",
              "Shipping & Returns",
              "FAQs",
              "Order Tracking",
              "Size Guide"
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-pink-500 transition cursor-pointer hover:translate-x-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex space-x-4">
            <FaFacebook className="text-2xl hover:text-pink-500 transition hover:scale-110 cursor-pointer" />
            <FaInstagram className="text-2xl hover:text-pink-500 transition hover:scale-110 cursor-pointer" />
            <FaTwitterSquare className="text-2xl hover:text-pink-500 transition hover:scale-110 cursor-pointer" />
            <FaPinterest className="text-2xl hover:text-pink-500 transition hover:scale-110 cursor-pointer" />
          </div>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay in the Loop
          </h3>

          <p className="text-sm text-gray-400">
            Subscribe to get special offers, free giveaways and more.
          </p>

          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                w-full px-4 py-2 rounded-l-lg
                bg-gray-800/80 text-gray-100
                focus:outline-none focus:ring-2 focus:ring-pink-500
              "
            />
            <button
              className="
                bg-gradient-to-r from-pink-500 to-pink-600
                hover:from-pink-600 hover:to-pink-700
                text-white px-5 rounded-r-lg
                transition-all
              "
            >
              Submit
            </button>
          </form>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="mt-12 border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-500 font-semibold">EKart</span> · All rights reserved
      </div>

    </footer>
  );
};




export default Footer;











