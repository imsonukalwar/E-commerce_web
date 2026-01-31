
import {
  LayoutDashboard,
  PackagePlus,
  PackageSearch,
  Users,
} from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Sidebar = () => {

  return (

    <aside
      className="
        fixed
        bottom-0 left-0
        w-full h-16
        flex
        md:top-16 md:left-0
        md:w-[280px]
        md:h-[calc(100vh-64px)]
        md:flex-col

        bg-white/80 backdrop-blur-xl
        border-t md:border-t-0
        md:border-r border-gray-200
        shadow-xl
        z-40
      "
    >

      {/* BRAND (HIDE ON MOBILE) */}
      <div className="hidden md:block px-6 py-6 border-b border-gray-200">
        <h2
          className="
            text-xl font-black
            bg-gradient-to-r from-pink-600 to-purple-600
            bg-clip-text text-transparent
          "
        >
          Admin Panel
        </h2>
      </div>

      {/* LINKS */}
      <div
        className="
          flex flex-row
          md:flex-col
          flex-1
          justify-around md:justify-start
          items-center md:items-stretch
          p-1 md:p-4
          md:space-y-2
        "
      >

        {/* DASHBOARD */}
        <NavLink to="/dashboard/sales" className={navClass}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-xs md:text-base">Dashboard</span>
        </NavLink>

        {/* ADD */}
        <NavLink to="/dashboard/add-product" className={navClass}>
          <PackagePlus className="w-5 h-5" />
          <span className="text-xs md:text-base">Add</span>
        </NavLink>

        {/* PRODUCTS */}
        <NavLink to="/dashboard/products" className={navClass}>
          <PackageSearch className="w-5 h-5" />
          <span className="text-xs md:text-base">Products</span>
        </NavLink>

        {/* USERS */}
        <NavLink to="/dashboard/users" className={navClass}>
          <Users className="w-5 h-5" />
          <span className="text-xs md:text-base">Users</span>
        </NavLink>

        {/* ORDERS */}
        <NavLink to="/dashboard/order" className={navClass}>
          <FaRegEdit className="w-5 h-5" />
          <span className="text-xs md:text-base">Orders</span>
        </NavLink>

      </div>

    </aside>

  );
};

const navClass = ({ isActive }) =>
`
flex flex-col md:flex-row
items-center gap-1 md:gap-3
px-3 py-2 md:p-3
rounded-xl
font-semibold
transition-all duration-300
${
  isActive
    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg"
    : "text-gray-700 hover:bg-gray-100"
}
`;






export default Sidebar;
