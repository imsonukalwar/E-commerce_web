import axios from 'axios'
import { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom"

const VerifyEmail = () => {
    const {token}=useParams()
    const [status,setstatus]=useState("Verifying...")
    const nevigate=useNavigate()
    const verifyEmail=async()=>{
        try {
            const res= await axios.post('http://localhost:8000/Verify',{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(res.data.success){
                setstatus(' ✅ Email Verified Sucsessfully');
                setTimeout(()=>{
                    nevigate('/login')
                },1000)
            }
        } catch (error) {
            console.log(error);
            setstatus(" ❌ Verification Failed: please try Again")
        }
    }
    useEffect(() => {
    verifyEmail();
   // eslint-disable-next-line react-hooks/exhaustive-deps
}, [token]);

return (
<div className="flex justify-center items-center min-h-screen bg-pink-100">

    {/* Floating background blobs */}
    <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
    <div className="absolute top-1/2 -right-24 w-72 h-72  rounded-full opacity-30 blur-3xl animate-pulse"></div>

    <div className="relative bg-white/80 backdrop-blur-xl 
    p-8 rounded-3xl shadow-xl text-center w-full max-w-md
    border border-white/40 transition-all duration-500
    hover:scale-102 hover:shadow-2xl">

      {/* Status Icon */}
    <div className="flex justify-center mb-4">
        <div className="w-16 h-16 flex items-center justify-center 
        rounded-full bg-blue-100 animate-bounce">
        <span className="text-3xl">📧</span>
        </div>
    </div>

      {/* Status Text */}
    <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
        {status}
    </h2>

      {/* Divider */}
    <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Sub text */}
    <p className="text-sm text-gray-600">
        Please wait while we verify your email.
    </p>
    </div>
    </div>
)

}

export default VerifyEmail
