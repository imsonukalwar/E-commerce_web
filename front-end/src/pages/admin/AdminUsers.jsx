import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";
import UserLogo from "../../assets/user.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const AdminUsers = () => {
  const [users, setUser] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [search,setSerrch]=useState("")
  const nevigate=useNavigate()

  const getAllUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/all_user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },});
      console.log("FULL RESPONSE 👉", res.data);
      if (res.data.success) {
        setUser(res.data.ans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteruser=users.filter(user=>`${user.firstName}
    ${user.lastName}`.toLowerCase().includes(search.toLowerCase())||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    console.log("UPDATED USERS 👉", users);
    getAllUser();
  }, []);

return (
  <div className="
    py-12 px-8 max-w-7xl mx-auto
    min-h-screen
    bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
  ">

    {/* HEADER */}
    <div className="mb-8">
      <h1 className="
        font-black text-3xl
        bg-gradient-to-r from-pink-600 to-purple-600
        bg-clip-text text-transparent
      ">
        User Management
      </h1>
      <p className="text-gray-600">
        View and manage registered user
      </p>
    </div>

    {/* SEARCH */}
    <div className="relative w-[320px]">
      <Search className="absolute left-3 top-3 text-gray-400 w-5" />
      <Input 
        value={search} 
        onChange={(e)=>setSerrch(e.target.value)} 
        className="pl-11 rounded-xl shadow-sm"
        placeholder="Search user..."
      />
    </div>

    {/* USERS GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

      {filteruser?.map((user, index) => (
        <div 
          key={index} 
          className="
            bg-white/80 backdrop-blur
            p-6 rounded-2xl
            shadow-lg hover:shadow-2xl
            transition-all duration-300
            hover:-translate-y-1
            border border-white/40
          "
        >

          <div className="flex items-center gap-4">

            <img
              src={user?.profilePic || UserLogo}
              alt=""
              className="
                rounded-full w-16 h-16 object-cover 
                border-2 border-pink-500
              "
            />

            <div>
              <h1 className="font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h1>
              <h3 className="text-sm text-gray-500">
                {user?.email}
              </h3>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-5">

            <Button 
              onClick={()=>nevigate(`/dashboard/users/${user?._id}`)} 
              variant="outline"
              className="flex gap-2 rounded-xl"
            >
              <Edit className="w-4"/>
              Edit
            </Button>

            <Button 
              onClick={()=>nevigate(`/dashboard/users/orders/${user?._id}`)} 
              variant="outline"
              className="flex gap-2 rounded-xl"
            >
              <Eye className="w-4"/>
              Orders
            </Button>

          </div>

        </div>
      ))}

    </div>

  </div>
);

};



export default AdminUsers;
