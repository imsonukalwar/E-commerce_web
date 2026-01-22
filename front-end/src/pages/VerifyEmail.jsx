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
                },2000)
            }
        } catch (error) {
            console.log(error);
            setstatus(" ❌ Verification Failed: please try Again")
        }
    }
    useEffect(() => {
  verifyEmail();
}, [token]);

  return (
    <div className='relative w-full h-[760px] bg-blue-200 overflow-hidden'>
     <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md'>
            <h2 className='text-1x font-semibold text-gray-800'>{status}</h2>
        </div>
     </div>
    </div>
  )
}

export default VerifyEmail
