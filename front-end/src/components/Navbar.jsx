// import axios from 'axios'
// import { ShoppingCart } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'sonner'
// import { Button } from './ui/button'



// import { setuser } from '@/redux/userSlice'




// const Navbar = () => {
// const {user} = useSelector( store=>store.user);
//     const AccessToken=localStorage.getItem('AccessToken')
//     const dispatch=useDispatch()
//  const nevigate=useNavigate()
//     const logouthandler=async()=>{
//         try {
//             const res= await axios.post('http://localhost:8000/logout',{},
//                 {headers:{
//                     Authorization:`Bearer ${AccessToken}`
//                 }
//             })
//             if(res.data.success){
//                 dispatch(setuser(null))
//                 toast.success(res.data.message);
                
                
//             }
//         } catch (error) {
//             console.log(error);
            
//         }
//     }
// return (
//     <header className='bg-pink-200 fixex w-full z-20 border-gray-700'>
//     <div className='max-w-7xl max-auto flex justify-between items-center py-3'>
//         {/* logo section */}
//         <div>
//             <img src='https://simpleicons.org/icons/shopify.svg'alt='' className='w-[100px] h-12'/>
//         </div>
//         {/* navbar section */}
//         <nav className='flex gap-10 justify-between items-center'>
//             <ul className='flex gap-7 items-center text-xl font-semibold'>
//                 <Link to={'/'}><li>Home</li></Link>
//                 <Link to={'/product'}><li>Product</li></Link>
//                 {
//                     user && <Link to={'/profile'}><li>Hello,{user.firstName}</li></Link>
//                 }
//             </ul>
//             <Link to={'/cart'} className='relative'>
//             <ShoppingCart/>
//             <span className='bg-pink-400 rounded-full absolute trxt-white -top-3 -right-5 px-2'>0</span>
//             </Link>
//             {user?<Button onClick={logouthandler} className='bg-pink-700 text-white cursor-pointer'>Logout
//             </Button>:<Button onClick={()=>nevigate('/login')} className='bg-gradient-to-tl from-blue-600 to-purple-600
//             text-white cursor-pointer
//             transition-all duration-500 ease-in-out
//             hover:from-purple-600 hover:to-blue-600
//             hover:scale-[1.08]
//             hover:shadow-xl hover:shadow-purple-500/40
//             active:scale-[0.98]'>Login</Button>}
//         </nav>
//     </div>
//     </header>
// )
// }

// export default Navbar









import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { setUser } from "@/redux/userSlice";



const Navbar = () => {
const { user } = useSelector((state) => state.user);
const {cart}=useSelector((state) => state.product);
// console.log("😄",cart);

const dispatch = useDispatch();
const navigate = useNavigate();
const accessToken = localStorage.getItem("accessToken");

const admin=user?.role==="admin"?true:false

const logouthandler = async () => {
    try {
        const res = await axios.post("http://localhost:8000/logout",{},{headers:{
        Authorization: `Bearer ${accessToken}`,},});
        if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);}

        // localStorage.removeItem("accessToken");
        // dispatch(setUser(null));
        // toast.success("Logout successful");
        // navigate("/login");


        } catch (error) {
        console.log(error);}};
        


    return (
    <header className="bg-white/80 backdrop-blur-md fixed w-full z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2">
            <img
            src="https://simpleicons.org/icons/shopify.svg"
            alt="logo"
            className="w-10 h-10"
            />
            <span className="text-xl font-bold text-gray-800">
            Shopify
            </span>
        </div>

        {/* NAV LINKS */}
        <nav className="flex items-center gap-8 text-gray-800 font-semibold">

            <ul className="flex gap-7 items-center text-lg">
            <Link to="/" className="hover:text-purple-600 transition">
                <li>Home</li>
            </Link>

            <Link to="/products" className="hover:text-purple-600 transition">
                <li>Product</li>
            </Link>

            {user && (
                <Link to={`/profile/${user._id}`} className="hover:text-purple-600 transition">
                <li>Hello, {user.firstName}</li>
                </Link>
            )}

            {admin && (
                <Link to={`/dashboard/sales`} className="hover:text-purple-600 transition">
                <li >Dashboard</li>
                </Link>
            )}

            </ul>

          {/* CART */}
            <Link to="/cart" className="relative hover:text-purple-600 transition">
            <ShoppingCart size={22} />
            <span className="absolute -top-3 -right-4 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
            {cart?.items?.length || 0}
            </span>
            </Link>

            {user ? (<Button onClick={logouthandler}className="bg-pink-600 hover:bg-pink-600 text-white transition cursor-pointer">
            Logout
            </Button>) : 
            (<Button onClick={() => navigate("/login")}
            className="
                bg-gradient-to-tl from-blue-600 to-purple-600 text-white transition-all duration-500 
                ease-in-out hover:from-purple-600 hover:to-blue-600 hover:scale-[1.08] hover:shadow-xl 
                hover:shadow-purple-500/40 active:scale-[0.98]"
            >
            Login
            </Button>
            )}
        </nav>
    </div>
    </header>
);
};

export default Navbar;
