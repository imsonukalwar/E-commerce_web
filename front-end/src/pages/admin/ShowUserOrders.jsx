import OrderCard from '@/components/OrderCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const ShowUserOrders = () => {
  const params=useParams()
  const [userOrder,setUserOrder]=useState(null)

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${import.meta.env.VITE_URL}/orders/user-order/${params.userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (res.data.success) {
      setUserOrder(res.data.orders)
    }
  }

  useEffect(()=>{
    getUserOrders()
  },[])

  return (
    <div className="
      pl-[1px]
      min-h-screen
      bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
      py-10
    ">

      <div className="
        max-w-7xl mx-auto
        px-6
      ">

        <OrderCard userOrder={userOrder}/>

      </div>

    </div>
  )
}


export default ShowUserOrders
