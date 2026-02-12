



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/userSlice";
import toast from "react-hot-toast";
import ele from "../assets/ele1.jpg"
const Navbar = () => {

  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.product);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const admin = user?.role === "admin";

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    toast.success("Logout successful");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={ele}
            className="w-15 h-16"
          />
          <span className="text-xl font-bold text-blue-400">
            ElectroMart
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          {user && (
            <Link to={`/profile/${user._id}`}>
              Hello, {user.firstName}
            </Link>
          )}

          {admin && (
            <Link to="/dashboard/sales">
              Dashboard
            </Link>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs px-2 rounded-full">
              {cart?.items?.length || 0}
            </span>
          </Link>

          {user ? (
            <Button onClick={logoutHandler}>Logout</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}

        </nav>

        {/* MOBILE ICON */}
        <div className="md:hidden">
          {open ? (
            <X size={26} onClick={() => setOpen(false)} />
          ) : (
            <Menu size={26} onClick={() => setOpen(true)} />
          )}
        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md">

          <div className="flex flex-col gap-4 p-5 text-gray-700">

            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>

            {user && (
              <Link
                to={`/profile/${user._id}`}
                onClick={() => setOpen(false)}
              >
                Hello, {user.firstName}
              </Link>
            )}

            {admin && (
              <Link
                to="/dashboard/sales"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
            )}

            <Link to="/cart" onClick={() => setOpen(false)}>
              Cart ({cart?.items?.length || 0})
            </Link>

            {user ? (
              <Button onClick={logoutHandler}>Logout</Button>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button>
            )}

          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;


