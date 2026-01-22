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
import { setuser } from "@/redux/userSlice";



const Profile = () => {
    // const{user}=useSelector(store.user)
    const { user } = useSelector((state) => state.user)

    const params=useParams()
    const userid=params.userId
    const[updateUser,setupdateUser]=useState({
        firstName:user?.firstName,
        lastName:user?.lastName,
        email:user?.email,
        phoneN:user?.phoneN,
        address:user?.address,
        city:user?.city,
        zipCode:user?.zipCode,
        profilePic:user?.profilePic,
        role:user?.role,
    })

    
    const [file,setFile]=useState(null)
    const Dispatch=useDispatch()
    const handleChange=(e)=>{
        setupdateUser({...updateUser,[e.target.name]:e.target.value})
    }
    const handlefileChange=(e)=>{
        const selectedFile = e.target.files[0];
        setFile(selectedFile)
        setupdateUser({...updateUser,profilePic: URL.createObjectURL(selectedFile)})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const AccessToken=localStorage.getItem("AccessToken")
        try {
            const formData=new FormData()
            formData.append("firstName",updateUser.firstName)
            formData.append("lastName",updateUser.lastName)
            formData.append("email",updateUser.email)
            formData.append("phoneN",updateUser.phoneN)
            formData.append("address",updateUser.address)
            formData.append("city",updateUser.city)
            formData.append("zipCode",updateUser.zipCode)
            formData.append("role",updateUser.role)
            if(file){
                formData.append("file",file)//image file for backend multer
            }
            const res=await axios.put(`http://localhost:8000/update/${userid}`,formData,{
                headers:{
                    Authorization:`Bearer ${AccessToken}`,
                    "content-type":"multipart/form-data"
                }
            })
            if(res.data.success){
                toast.success(res.data.message)
                Dispatch(setuser(res.data.user))
                localStorage.setItem("user", JSON.stringify(res.data.user));

            }
        } catch (error) {
            console.log(error);
            toast.error("Field to update Profile")
            
        }
    }
return (
    <div className="pt-20 min-h-screen bg-gray-300">
    <Tabs defaultValue="profile" className="max-w-7xl items-center">
        <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
        <div>
            <div className="flex flex-col justify-center items-center bg-gray-100">
            <h1 className="font-bold mb-7 text-2xl text-gray-900">Update Profile</h1>
            <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
                {/* profile picture */}
                <div className="flex flex-col items-center">
                <img
                    src={updateUser?.profilePic||userLogo}
                    alt="profile"
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-pink-800"/>
                <Label className='mt-4 cursor-pointer bg-pink-700 text-white px-4 py-2 rounded hover:bg-pink-700 '> Cange Picture
                    <input onChange={handlefileChange} type='file' accept='image/*' className="hidden "/>
                </Label>
                </div>
                {/* profile form */}
                    <form onSubmit={handleSubmit} className="space-y-4 shadow-1g p-5 rounded-1g bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                        <Label className='block text-sm font-medium'>First Name</Label>
                        <input type="text" value={updateUser.firstName} onChange={handleChange} name="firstName" placeholder="John" className="w-full border rounded-1g px-3 py-3 mt-1 bg-pink-100"/>
                            </div>
                        <div>
                        <Label className='block text-sm font-medium'>First Name</Label>
                        <input type="text" value={updateUser.lastName} onChange={handleChange}  name="lastName" placeholder="Deo" className="w-full border rounded-1g px-3 py-3 mt-1 bg-pink-100"/>
                            </div>
                        </div>
                        <div>
                        <Label className='block text-sm font-medium'>Email</Label>
                        <input type="email" value={updateUser.email} onChange={handleChange}  name="email" disabled placeholder="Enter your Email" className="w-full border rounded-1g px-3 py-3 mt-1 bg-pink-100 cursor-not-allowed"/>
                        </div>
                        <div>
                        <Label className='block text-sm font-medium'>Phone Number</Label>
                        <input type="text" value={updateUser.phoneN} onChange={handleChange}  name="phoneN" placeholder="Enter your contact number" 
                        className="w-full border rounded-1g px-3 py-3 mt-1 bg-pink-100 cursor-pointer"/>
                        </div>
                        <div>
                        <Label className='block text-sm font-medium'>Address</Label>
                        <input type="text" value={updateUser.address} onChange={handleChange}  name="address" placeholder="Enter your Address" 
                        className="w-full border rounded-1g px-3 py-3 mt-1 bg-pink-100 cursor-pointer"/>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                        <Label className='block text-sm font-medium'>City</Label>
                        <input type="text" value={updateUser.city} onChange={handleChange}  name="city" placeholder="Enter your City" 
                        className="w-full border rounded-1g px-3 py-3 mt-1 bg-pink-100 cursor-pointer"/>
                        </div>
                        <div>
                        <Label className='block text-sm font-medium'>Zip Code</Label>
                        <input type="text" value={updateUser.zipCode} onChange={handleChange}  name="zipCode" placeholder="Enter your ZipCode" 
                        className="w-full border rounded-1g px-3 py-3 mt-1 bg-pink-100 cursor-pointer"/>
                        </div>
                        </div>
                        <Button type="submit" className='hover:bg-pink-700 w-full mt-4 bg-pink-600 text-white font-semibold py-2 rounded-1g cursor-pointer'>Apdate Profile</Button>
                    </form>
                </div>
            </div>
        </div>
        </TabsContent>
        <TabsContent value="orders">
        <Card>
            <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
            </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
            <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
            </div>
            <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
            </div>
            </CardContent>
            <CardFooter>
            <Button>Save password</Button>
            </CardFooter>
        </Card>
        </TabsContent>
    </Tabs>
    </div>
);
};

export default Profile;