import React from "react";
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
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";


const Login = () => {
    const [showpas, setshaowpas] = useState(false);
    const [loading, setloading] = useState(false);
    const [formData, setformData] = useState({
    email: "",
    password: "",
    });
    const nevigate = useNavigate();
    const Dispatch = useDispatch();
    const handlechange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
    ...prev,
    [name]: value,
    }));
    };

        const submithandler = async (e) => {
        e.preventDefault();
        console.log(formData);
    try {
        setloading(true);
        const res = await axios.post(`${import.meta.env.VITE_URL}/login`, formData, {
        "content-type": "application/json",
        });
        if (res.data.success) {
        nevigate("/");
        Dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);

        toast.error(error.response.data.message);
    } finally {
        setloading(false);
    }
    };
        return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      {/* Floating blobs */}
    <div className="absolute -top-24 -left-24 w-72 h-72  rounded-full opacity-30 blur-3xl animate-pulse"></div>
    <div className="absolute top-1/2 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl animate-pulse"></div>

    <Card
        className="
        relative
        w-full max-w-sm
        bg-white/80 backdrop-blur-xl
        border border-white/40
        rounded-3xl
        shadow-xl
        transition-all duration-500
        hover:scale-102 hover:shadow-2xl
    "
    >
        <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-gray-800">
        Welcome Back 👋
        </CardTitle>
        <CardDescription className="text-gray-600">
        Login to continue shopping
        </CardDescription>
        </CardHeader>

        <CardContent>
        <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="grid gap-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
            </Label>
            <Input
                className="rounded-xl bg-white/90 focus:ring-2 focus:ring-pink-400 transition"
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={FormData.email}
                onChange={handlechange}
            />
            </div>

            {/* Password */}
            <div className="grid gap-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
            </Label>
            <div className="relative">
                <Input
                className="rounded-xl bg-white/90 pr-10 focus:ring-2 focus:ring-pink-400 transition"
                id="password"
                name="password"
                placeholder="Enter your password"
                type={showpas ? "text" : "password"}
                required
                value={formData.password}
                onChange={handlechange}
                />

                {showpas ? (
                <EyeOff
                    onClick={() => setshaowpas(false)}
                    className="w-5 h-5 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-pink-600 transition"
                />
                ) : (
                <Eye
                    onClick={() => setshaowpas(true)}
                    className="w-5 h-5 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:text-pink-600 transition"
                />
                )}
            </div>
            {/* ///////////////////////////// */}
            <div className="text-right mt-2">
                <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline text-sm">
                Forgot Password?
                </Link>
                </div>
            {/* ////////////////////////////// */}
            </div>
            </div>
        </CardContent>

        <CardFooter className="flex-col gap-3">
            <Button
            type="submit"
            onClick={submithandler}
            className="
            w-full
            rounded-xl
            bg-gradient-to-r from-pink-500 to-purple-500
            hover:from-pink-600 hover:to-purple-600
            text-white
            font-semibold cursor-pointer
            transition-all duration-300">
            {loading ? (
                <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Please wait
                </>
            ) : (
                "Login"
            )}
            </Button>

            <p className="text-gray-700 text-sm">
            Don&apos;t have an account?{" "}
            <Link
            to="/signup"
            className="text-pink-600 font-semibold hover:underline"
            >
            Signup
            </Link>
            </p>
        </CardFooter>
    </Card>
    </div>
    );
};
export default Login;
