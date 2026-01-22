import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useDispatch } from 'react-redux'
import { setuser } from '@/redux/userSlice'


const Login = () => {
    const [showpas,setshaowpas]=useState(false);
        const [loading,setloading]=useState(false)
        const [FormData,setFormData]=useState({
            email:"",
            password:"",
        });
    const nevigate=useNavigate()
    const Dispatch=useDispatch()
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }
    const submithandler=async(e)=>{
            e.preventDefault();
            console.log(FormData);
            try {
                setloading(true)
                const res=await axios.post("http://localhost:8000/login",FormData,{
                    "content-type":"application/json"
                })
                if(res.data.success){
                    nevigate('/')
                    Dispatch(setuser(res.data.user))
                    localStorage.setItem("AccessToken",res.data.AccessToken)
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error);
                
                toast.error(error.response.data.message)
    
            }finally{
                setloading(false)
            }
            
        }
return (
   <div className="flex justify-center items-center min-h-screen bg-gray-600">
        <Card className="w-full max-w-sm">
        <CardHeader>
        <CardTitle>Login your account</CardTitle>
        <CardDescription>
        Enter your detailes below to login your account
        </CardDescription>
        </CardHeader>
        <CardContent>

        <div className="flex flex-col gap-3">

            {/* <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="firstName">first Name</Label>
                    <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                required
                value={FormData.firstName}
                onChange={handlechange}
            className="flex-col gap-2 hover:bg-gra"/>
                </div>
                <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Deo"
                required
                value={FormData.lastName}
                onChange={handlechange}
                />
                </div>

            </div> */}

            <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={FormData.email}
                onChange={handlechange}
            />
                </div>
            
            <div className="grid gap-2">
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
            <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type={showpas?'text':'password'}
            required
            value={FormData.password}
                onChange={handlechange}
            />

            {
                showpas?<EyeOff onClick={()=>setshaowpas(false)} className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"/>:
                <Eye onClick={()=>setshaowpas(true)} className="w-5 h-5 text-gray-700 absolute right-5 bottom-2"/>
            }
            </div>
            </div>
        </div>

        </CardContent>
        <CardFooter className="flex-col gap-2">
        <Button  type="submit" onClick={submithandler} className="w-full cursor-pointer bg-gray-500 hover:bg-gray-700">
        {loading?<><Loader2 className="h-4 w-4 animate-spin mr-2"/>Please wait</>:'Login'}
        </Button>
        <p className="text-gray-700 text-sm">Do't have an account <Link to={'/signup'} className="hover:underline cursor-pointer 
        text-pink-700">Signup</Link></p>
        </CardFooter>
    </Card>

    </div>
)
}
export default Login
