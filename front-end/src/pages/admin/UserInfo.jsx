import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import userLogo from "../../assets/user.jpg";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { setUser } from "@/redux/userSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import userLogo from "../../assets/user.jpg";



const UserInfo = () => {
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState(null);
  const [loading, setloading] = useState(false);
  const [file, setFile] = useState(null);
  const Dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.id;

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile),
    });
  };

  const accessToken = localStorage.getItem("accessToken")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role",updateUser.role)
      if (file) {
        formData.append("file", file);
      }
      setloading(true);
      const res = await axios.put(
        `${import.meta.env.VITE_URL}/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type":"multipart/form-data"
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setUpdateUser(res.data.user)
      }
    } catch (error) {
      console.log(error);
      toast.error("Field to update Profile");
    } finally {
      setloading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/getUserById/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="
      min-h-screen 
      bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
      py-14
    ">

      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <Button
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft />
          </Button>

          <h1 className="
            text-3xl font-black
            bg-gradient-to-r from-pink-600 to-purple-600
            bg-clip-text text-transparent
          ">
            Update Profile
          </h1>
        </div>

        {/* MAIN CARD */}
        <div className="
          bg-white/80 backdrop-blur-xl
          rounded-3xl
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          p-10
          flex gap-12
        ">

          {/* PROFILE PIC */}
          <div className="flex flex-col items-center gap-4">

            <img
              src={updateUser?.profilePic || user?.profilePic || userLogo}
              alt="profile"
              className="
                w-36 h-36 rounded-full object-cover
                border-4 border-pink-500
                shadow-lg
              "
            />

            <Label className="
              cursor-pointer
              bg-gradient-to-r from-pink-600 to-purple-600
              text-white px-5 py-2 rounded-xl
              hover:opacity-90 transition
            ">
              Change Picture
              <input
                encType="multipart/form-data"
                type="file"
                name="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </Label>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-5"
          >

            <div className="grid grid-cols-2 gap-5">

              <div>
                <Label>First Name</Label>
                <input
                  type="text"
                  value={updateUser?.firstName}
                  onChange={handleChange}
                  name="firstName"
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <input
                  type="text"
                  value={updateUser?.lastName}
                  onChange={handleChange}
                  name="lastName"
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500"
                />
              </div>

            </div>

            <div>
              <Label>Email</Label>
              <input
                type="email"
                value={updateUser?.email}
                disabled
                className="w-full rounded-xl px-4 py-3 bg-gray-100 border cursor-not-allowed"
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <input
                type="text"
                value={updateUser?.phoneNo}
                onChange={handleChange}
                name="phoneNo"
                className="w-full rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label>Address</Label>
              <input
                type="text"
                value={updateUser?.address}
                onChange={handleChange}
                name="address"
                className="w-full rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">

              <div>
                <Label>City</Label>
                <input
                  type="text"
                  value={updateUser?.city}
                  onChange={handleChange}
                  name="city"
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <Label>Zip Code</Label>
                <input
                  type="text"
                  value={updateUser?.zipCode}
                  onChange={handleChange}
                  name="zipCode"
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 border focus:ring-2 focus:ring-purple-500"
                />
              </div>

            </div>

            {/* ROLE */}
            <div className="flex gap-6 items-center">
              <Label>Role</Label>

              <RadioGroup
                value={updateUser?.role}
                onValueChange={(value) =>
                  setUpdateUser({ ...updateUser, role: value })
                }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">User</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              className="
                w-full py-3 text-lg
                bg-gradient-to-r from-pink-600 to-purple-600
                hover:from-purple-600 hover:to-pink-600
                rounded-2xl text-white
                shadow-xl hover:shadow-purple-500/40
                transition-all duration-300 hover:scale-[1.02]
              "
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin"/>
                  Please wait
                </span>
              ) : (
                "Update Profile"
              )}
            </Button>

          </form>

        </div>

      </div>

    </div>
  );
};


export default UserInfo;
