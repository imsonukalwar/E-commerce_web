import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from "@/components/ui/label"
import ImageUpload from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/redux/ProductSlice'
import { Loader2 } from 'lucide-react'



const AddProduct = () => {
  const accesssToken=localStorage.getItem("accessToken")
  const dispatch=useDispatch()
  const {products}=useSelector(store=>store.product)
  const [loading,setLoading]=useState(false)
  const [productData,setProductData]=useState({
    productName:"",
    productPrise:"",
    productDesc:"",
    productImage:[],
    brand:"",
    category:""
  })

  const handleCahnge=(e)=>{
    const {name,value}=e.target;
    setProductData(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const submitHandler=async(e)=>{
    e.preventDefault()
    const formData=new  FormData();
    formData.append("productName",productData.productName)
    formData.append("productPrise",productData.productPrise)
    formData.append("productDesc",productData.productDesc)
    formData.append("brand",productData.brand)
    formData.append("category",productData.category)
// console.log("FINAL PRODUCT DATA:", productData);
// console.log("Prise:", productData.productPrise);

    if(productData.productImage.length===0){
      toast.error("please select at least one image ")
      return;
    }
    productData.productImage.forEach((img)=>{
      formData.append("files",img)
    })
    try {
      setLoading(true)
      const res=await axios.post('http://localhost:8000/product/add',formData,{
        headers:{
          Authorization:`Bearer ${accesssToken} `
        }
      })
      if(res.data.success){
        dispatch(setProducts([...products,res.data.product]))
        toast.success(res.data.message)
    setProductData({
    productName:"",
    productPrise:"",
    productDesc:"",
    productImage:[],
    brand:"",
    category:""
  })
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="
      py-20 px-6 
      bg-gradient-to-br from-slate-100 via-pink-50 to-purple-100 
      w-full flex justify-center mt-11
    ">

      <Card className="
        w-full max-w-5xl 
        rounded-3xl 
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        border border-white/40
        bg-white/80 backdrop-blur-xl
      ">

        <CardHeader className="border-b border-gray-200/50 pb-6">
          <CardTitle className="
            text-3xl font-black 
            bg-gradient-to-r from-pink-600 to-purple-600 
            bg-clip-text text-transparent
          ">
            Add Product
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Enter Product detailes Below
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-10 pt-8">

          <div className='flex flex-col gap-7'>

            {/* PRODUCT NAME */}
            <div className='grid gap-2'>
              <Label className="font-semibold text-gray-700">
                Product Name
              </Label>
              <Input 
                type='text' 
                name="productName" 
                placeholder='Ex-Google-pixel'
                value={productData?.productName}
                onChange={handleCahnge}
                required
                className="
                  rounded-xl h-11
                  border-gray-300
                  focus:ring-2 focus:ring-purple-500
                "
              />
            </div>

            {/* PRODUCT PRICE */}
            <div className='grid gap-2'>
              <Label className="font-semibold text-gray-700">
                Product Price
              </Label>
              <Input 
                type='number' 
                name="productPrise" 
                value={productData.productPrise}
                onChange={handleCahnge}
                required
                className="
                  rounded-xl h-11
                  border-gray-300
                  focus:ring-2 focus:ring-purple-500
                "
              />
            </div>

            {/* BRAND + CATEGORY */}
            <div className='grid grid-cols-2 gap-6'>

              <div className='grid gap-2'>
                <Label className="font-semibold text-gray-700">
                  Product Brand
                </Label>
                <Input 
                  type='text' 
                  name="brand" 
                  value={productData.brand}
                  onChange={handleCahnge}
                  required
                  className="rounded-xl h-11"
                />
              </div>

              <div className='grid gap-2'>
                <Label className="font-semibold text-gray-700">
                  Product Category
                </Label>
                <Input 
                  type='text' 
                  name="category" 
                  value={productData.category}
                  onChange={handleCahnge}
                  required
                  className="rounded-xl h-11"
                />
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className='grid gap-2'>
              <Label className="font-semibold text-gray-700">
                Description
              </Label>
              <Textarea
                name="productDesc"
                value={productData.productDesc}
                onChange={handleCahnge}
                placeholder="Enter Brief Description of Product"
                className="
                  rounded-xl min-h-[140px]
                  border-gray-300
                  focus:ring-2 focus:ring-purple-500
                "
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-dashed border-purple-300">
              <ImageUpload 
                productData={productData} 
                setProductData={setProductData}
              />
            </div>

          </div>

          {/* SUBMIT */}
          <CardFooter className='flex-col gap-2 mt-10'>

            <Button 
              disabled={loading} 
              onClick={submitHandler} 
              type='submit'
              className="
                w-full py-3 text-lg
                bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600
                hover:from-indigo-600 hover:to-pink-600
                rounded-2xl text-white
                shadow-xl hover:shadow-purple-500/40
                transition-all duration-300 hover:scale-[1.03]
              "
            >
              {
                loading
                ? <span className='flex gap-2 items-center'>
                    <Loader2 className='animate-spin'/>
                    Please Wait
                  </span>
                : 'Add Product'
              }
            </Button>

          </CardFooter>

        </CardContent>

      </Card>

    </div>
  )
}


export default AddProduct
