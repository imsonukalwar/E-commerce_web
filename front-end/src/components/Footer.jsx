
// import { FaFacebook ,FaInstagram,FaTwitterSquare,FaPinterest} from "react-icons/fa";
// import React from 'react'
// import { Link } from 'react-router-dom'

// const Footer = () => {
//   return (
//     <footer className='bg-gray-600 text-gray-100 py-10'>
//       <div className='max-w-7xl max-auto px-4 md:flex md:justify-between'>
//         {/* info */}
//         <div className='mb-6 md:mb-0'>
//           <Link to={'/'}>
//           <img src='' alt='' className='w-32'/>
//           </Link>
//           <p className='mt-2 text-sm'>Powering YOur World With THeBest In Electronics</p>
//           <p className='mt-2 text-sm'>123 Electronics St , Style, City , NY 10001</p>
//           <p className=' text-sm'>Email: support@Zaptro.com</p>
//           <p className=' text-sm'>Phone: (123) 456-789</p>
//         </div>
//         {/* Custumer survise link*/}
//         <div className='mb-6 md:mb-0'>
//           <h3 className='text-xl font-semibold'>Customer Survice</h3>
//           <ul className='mt-2 text-sm space-y-2'>
//             <li>Contact Us</li>
//             <li>Shepping & Returns</li>
//             <li>FAQs</li>
//             <li>Order Tracking</li>
//             <li>Size Guied</li>
//           </ul>
//           </div>
//           {/* social medai link  */}
//           <div className='mb-6 md:mb-0'>
//             <h3 className='text-xl font-semibold'>Follow Us</h3>
//             <div className='flex space-x-4 mt-2'>
//               <FaFacebook />
//               <FaInstagram/>
//               <FaTwitterSquare/>
//               <FaPinterest/>
//             </div>
//           </div>
//           {/* news letter subscription */}
//           <div>
//             <h3 className='text-xl font-semibold'>Stay In The Loop</h3>
//             <p className='mt-2 text-sm'>Suscribe to get special Offer,free giveway And more,</p>
//             <form action='' className='mt-4 flex'>
//               <input
//               type='email'
//               placeholder='Enter your email'
//               className='bg-gray-400 w-full p-2 rounded-1-mt text-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-200'
//               />
//               <button type='submite' className='bg-pink-700 text-white px-4 rounded-r-md hover:bg-red-700' >submite</button>
//             </form>
//           </div>
//         </div>
//         {/* button section  */}
//         <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
//           <p>&copy; {new Date().getFullYear()}<span className='text-pink-700'>EKart</span>All rights required</p>
//         </div>
//     </footer>
//   )
// }

// export default Footer







import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaPinterest,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-4">

        {/* BRAND / INFO */}
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold text-white">
              EK<span className="text-pink-600">art</span>
            </h2>
          </Link>

          <p className="mt-3 text-sm text-gray-400">
            Powering your world with the best in electronics.
          </p>

          <p className="mt-3 text-sm">123 Electronics St, Style City, NY 10001</p>
          <p className="text-sm">Email: support@ekart.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-pink-500 transition cursor-pointer">
              Contact Us
            </li>
            <li className="hover:text-pink-500 transition cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-pink-500 transition cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-pink-500 transition cursor-pointer">
              Order Tracking
            </li>
            <li className="hover:text-pink-500 transition cursor-pointer">
              Size Guide
            </li>
          </ul>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-2xl">
            <FaFacebook className="hover:text-pink-500 transition cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />
            <FaTwitterSquare className="hover:text-pink-500 transition cursor-pointer" />
            <FaPinterest className="hover:text-pink-500 transition cursor-pointer" />
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
                w-full px-3 py-2 rounded-l-md
                bg-gray-800 text-gray-100
                focus:outline-none focus:ring-2 focus:ring-pink-600
              "
            />
            <button
              type="submit"
              className="
                bg-pink-600 hover:bg-pink-700
                text-white px-4 rounded-r-md
                transition
              "
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-10 border-t border-gray-700 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-600 font-semibold">EKart</span> · All rights
        reserved
      </div>
    </footer>
  );
};

export default Footer;











