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


const Signup = () => {
    const [showpas,setshaowpas]=useState(false);
    const [loading,setloading]=useState(false)
    const [formData,setformData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })
const nevigate=useNavigate()
const handlechange=(e)=>{
    const {name,value}=e.target;
    setformData((prev)=>({
        ...prev,
        [name]:value
    }));
}
const submithandler=async(e)=>{
        e.preventDefault();
        console.log(FormData);
        try {
            setloading(true)
            const res=await axios.post("http://localhost:8000/register",FormData,{
                "content-type":"application/json"
            })
            if(res.data.success){
                nevigate('/verify')
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
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
        <Card className="w-full max-w-sm">
        <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
        Enter your detailes below to create to your account
        </CardDescription>
        </CardHeader>
        <CardContent>

        <div className="flex flex-col gap-3">

            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="firstName">first Name</Label>
                    <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                required
                value={formData.firstName}
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
                value={formData.lastName}
                onChange={handlechange}
                />
                </div>

            </div>

            <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
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
            placeholder="create your password"
            type={showpas?'text':'password'}
            required
            value={formData.password}
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
        {loading?<><Loader2 className="h-4 w-4 animate-spin mr-2"/>Please wait</>:'Signup'}
        </Button>
        <p className="text-gray-700 text-sm">Already have an account <Link to={'/login'} className="hover:underline cursor-pointer 
        text-pink-700">login</Link></p>
        </CardFooter>
    </Card>

    </div>
)
}

export default Signup
