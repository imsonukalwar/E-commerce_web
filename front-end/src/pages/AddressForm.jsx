import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addAddress, deleteAddress, setCart, setSelectedAddress } from '@/redux/ProductSlice';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


const AddressForm = () => {

  const [formData,setFormdata]=useState({
    fullName:"",
    phone:"",
    email:"",
    address:"",
    city:"",
    zip:"",
    state:"",
    country:"",
  })

  const {addresses, selectedAddress,cart } = useSelector(store => store.product)
  const [showForm ,setShowForm]=useState(addresses?.length>0?false:true)
  const dispatch=useDispatch()
  const nevigate=useNavigate()

  const handleChange=(e)=>{
    setFormdata({...formData,[e.target.name]:e.target.value})
  }

  const handleSave=()=>{
    dispatch(addAddress(formData))
    setShowForm(false)
  }

  const subTotal=cart?.totalPrice || 0
  const shipping = subTotal > 299 ? 0 : 25
  const tax = Number((subTotal * 0.05).toFixed(2))
  const total = subTotal + shipping + tax

  const handlepayment=async()=>{
    const accessToken=localStorage.getItem("accessToken")
    try{
      const {data}=await axios.post(
        `${import.meta.env.VITE_URL}/orders/create-order`,
        {
          products:cart?.items?.map(item=>({
            productId:item.productId._id,
            quantity:item.quantity
          })),
          tax,
          shipping,
          amount:total,
          currency:"INR"
        },
        { headers:{Authorization:`Bearer ${accessToken}`} }
      )

      if(!data.success) return toast.error("Something went wrong")

      const options={
        key:import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:data.order.amount,
        currency:data.order.currency,
        order_id:data.order.id,
        name:"Ekat",
        description:"Order Payment",

        handler:async function(responce){
          const verifyRes=await axios.post(
            `${import.meta.env.VITE_URL}/orders/verify-payment`,
            responce,
            {headers:{Authorization:`Bearer ${accessToken}`}}
          )
          if(verifyRes.data.success){
            toast.success("Payment Successful")
            dispatch(setCart({items:[],totalPrice:0}))
            nevigate("/order-success")
          }else{
            toast.error("Payment verification failed")
          }
        },

        prefill:{
          name:formData.fullName,
          email:formData.email,
          contact:formData.phone
        },

        theme:{color:"#ec4899"}
      }

      const rzp=new window.Razorpay(options)
      rzp.open()

    }catch(error){
      toast.error("Payment failed")
    }
  }

  return (

<div className="
min-h-screen
bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100
py-8
">

<div className="
max-w-7xl mx-auto
grid grid-cols-1 lg:grid-cols-2
gap-10
px-4
">

{/* LEFT */}
<div className="
bg-white/80 backdrop-blur-xl
p-6 md:p-8
rounded-3xl
shadow-xl
">

{showForm ? (

<div className="space-y-4">

<h2 className="text-xl font-bold">Shipping Address</h2>

<Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange}/>
<Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}/>
<Input name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
<Input name="address" placeholder="Address" value={formData.address} onChange={handleChange}/>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<Input name="city" placeholder="City" value={formData.city} onChange={handleChange}/>
<Input name="state" placeholder="State" value={formData.state} onChange={handleChange}/>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<Input name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange}/>
<Input name="country" placeholder="Country" value={formData.country} onChange={handleChange}/>
</div>

<Button 
onClick={handleSave}
className="
w-full
bg-gradient-to-r from-pink-600 to-purple-600
text-white
rounded-xl
hover:scale-[1.02] transition
">
Save & Continue
</Button>

</div>

) : (

<div className="space-y-4">

<h2 className="text-xl font-bold">Saved Addresses</h2>

{addresses.map((addr,index)=>(
<div
key={index}
onClick={()=>dispatch(setSelectedAddress(index))}
className={`
p-4 rounded-xl border cursor-pointer transition
${selectedAddress===index
? "border-pink-600 bg-pink-50"
: "border-gray-300 bg-white"}
`}
>
<p className="font-semibold">{addr.fullName}</p>
<p>{addr.phone}</p>
<p>{addr.email}</p>
<p>{addr.address}, {addr.city}</p>
<p>{addr.state}, {addr.zip}, {addr.country}</p>

<button
  onClick={() => dispatch(deleteAddress(index))}
  className="
    mt-2
    text-sm font-semibold
    px-4 py-1.5
    rounded-lg
    bg-red-50
    text-red-600
    border border-red-200
    transition-all duration-300
    hover:bg-red-500
    hover:text-white
    hover:shadow-lg
    hover:shadow-red-300/40
    active:scale-95
  "
>
  Delete
</button>

</div>
))}

<Button
variant="outline"
className="w-full"
onClick={()=>setShowForm(true)}
>
+ Add New Address
</Button>

<Button
className="
w-full
bg-gradient-to-r from-pink-600 to-purple-600
text-white rounded-xl
"
disabled={selectedAddress===null}
onClick={handlepayment}
>
Proceed To Checkout
</Button>

</div>

)}

</div>

{/* RIGHT */}
<Card className="
rounded-3xl
shadow-xl
bg-white/80 backdrop-blur-xl
h-fit
">

<CardHeader>
<CardTitle>Order Summary</CardTitle>
</CardHeader>

<CardContent className="space-y-4">

<div className="flex justify-between">
<span>Subtotal ({cart.items.length})</span>
<span>₹ {subTotal}</span>
</div>

<div className="flex justify-between">
<span>Shipping</span>
<span>₹ {shipping}</span>
</div>

<div className="flex justify-between">
<span>Tax</span>
<span>₹ {tax}</span>
</div>

<div className="flex justify-between font-bold text-lg">
<span>Total</span>
<span>₹ {total}</span>
</div>

<div className="text-sm text-gray-500 pt-4">
<p>* Free shipping above ₹299</p>
<p>* 10-day return policy</p>
<p>* Secure checkout</p>
</div>

</CardContent>

</Card>

</div>
</div>

  )
}





export default AddressForm
