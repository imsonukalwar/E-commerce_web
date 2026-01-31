import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import userLogo from "../assets/user.jpg";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import { Loader2 } from "lucide-react";
import MyOrder from "./MyOrder";



import {  Camera } from "lucide-react";



const Profile = () => {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
  });

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selected),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      const formData = new FormData();
      Object.keys(updateUser).forEach((key) => {
        if (key !== "profilePic") {
          formData.append(key, updateUser[key]);
        }
      });
      if (file) formData.append("file", file);

      setLoading(true);

      const res = await axios.put(
        `http://localhost:8000/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-100 via-blue-100 to-purple-100">

      <Tabs defaultValue="profile" className="max-w-5xl mx-auto px-4">

        {/* TABS */}
        <TabsList className="
          bg-white/80 backdrop-blur-lg
          rounded-full shadow-xl
          p-2 flex justify-center gap-3
        ">
          <TabsTrigger value="profile" className="rounded-full px-6 text-sm sm:text-base">
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-full px-6 text-sm sm:text-base">
            Orders
          </TabsTrigger>
        </TabsList>

        {/* ================= PROFILE ================= */}
        <TabsContent value="profile">

          <div className="
            mt-10
            bg-white/80 backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            p-5 sm:p-8 md:p-12
          ">

            <h1 className="
              text-2xl sm:text-3xl font-extrabold
              text-center mb-12
              bg-gradient-to-r from-pink-600 to-purple-600
              bg-clip-text text-transparent
            ">
              Update Your Profile
            </h1>

            <div className="
              flex flex-col md:flex-row
              gap-10 md:gap-16
              items-center md:items-start
            ">

              {/* AVATAR */}
              <div className="relative group">

                <img
                  src={updateUser.profilePic || user?.profilePic || userLogo}
                  className="
                    w-32 h-32 sm:w-36 sm:h-36
                    rounded-full object-cover
                    border-4 border-pink-500
                    shadow-xl
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                />

                <Label className="
                  absolute -bottom-3 left-1/2 -translate-x-1/2
                  flex items-center gap-2
                  bg-gradient-to-r from-pink-600 to-purple-600
                  text-white px-4 py-1.5 rounded-full
                  text-xs cursor-pointer
                  shadow-lg
                ">
                  <Camera size={14} />
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>

              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="
                  flex-1
                  grid grid-cols-1 md:grid-cols-2
                  gap-4 md:gap-6
                "
              >

                {[
                  { label: "First Name", name: "firstName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Phone", name: "phoneNo" },
                  { label: "City", name: "city" },
                  { label: "Zip Code", name: "zipCode" },
                ].map((field) => (
                  <div key={field.name}>
                    <Label>{field.label}</Label>
                    <Input
                      className="
                        w-full
                        focus:ring-2 focus:ring-pink-400
                      "
                      name={field.name}
                      value={updateUser[field.name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <Label>Email</Label>
                  <Input
                    className="w-full bg-gray-100"
                    value={updateUser.email}
                    disabled
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Address</Label>
                  <Input
                    className="w-full"
                    name="address"
                    value={updateUser.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 pt-6">

                  <Button
                    type="submit"
                    className="
                      w-full py-3
                      text-base sm:text-lg
                      bg-gradient-to-r from-pink-600 to-purple-600
                      rounded-xl text-white
                      hover:scale-[1.03]
                      transition-all
                    "
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" />
                        Updating...
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>

                </div>

              </form>

            </div>
          </div>

        </TabsContent>

        {/* ================= ORDERS ================= */}
        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>

      </Tabs>
    </div>
  );
};









export default Profile;