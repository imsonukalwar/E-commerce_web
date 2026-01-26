import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from "@/components/ui/label"
import ImageUpload from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setProducts } from '@/redux/ProductSlice'
import Products from '../Products'
import { Loader2 } from 'lucide-react'


const AddProduct = () => {
  const accesssToken=localStorage.getItem("accessToken")
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(false)
  const [productData,setProductData]=useState({
    productName:"",
    productPrise:0,
    productDesc:"",
    productImage:[],
    brand:"",
    category:""
  })

  const handleCahnge=(e)=>{
    const {name,value}=e.target;
    setProductData((prev)=>({
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
        dispatch(setProducts([...Products,res.data.product]))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className=' py-10 px-6 bg-gray-100 w-full flex justify-center mt-11'>
      <Card className='w-full max-w-5xl'>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Enter Product detailes Below</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className='flex flex-col gap-2'>
            <div className='grid gap-2'>
              <Label>Product Name</Label>
              <Input type='text' 
              name="productName" 
              placeholder='Ex-Google-pixel'
              value={productData.productName}
              onChange={handleCahnge}
              required
              />
            </div>

            <div className='grid gap-2'>
              <Label>Product Price</Label>
              <Input type='number' 
              name="productPrise" 
              placeholder='' 
              value={productData.productPrise}
              onChange={handleCahnge}
              required/>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-2'>
              <Label>Product Brand</Label>
              <Input type='text' 
              name="brand" placeholder='Ex-GOOGLE' 
              value={productData.brand}
              onChange={handleCahnge}
              required/>
            </div>

            <div className='grid gap-2'>
              <Label>Product Category</Label>
              <Input type='text' 
              name="category" placeholder='Ex-Mobile' 
              value={productData.category}
              onChange={handleCahnge}
              required/>
            </div>
            </div>

            <div className='grid gap-2'>
              <div className='felx items-center'>
                <Label>Description</Label>
              </div>
              <Textarea name='ProductDesc' 
              value={productData.productDesc}
              onChange={handleCahnge}
              placeholder="Enter Brief Description of Product"
              />
            </div>
            <ImageUpload productData={productData} setProductData={setProductData}/>
          </div>
          <CardFooter className='flex-col gap-2'>
            <Button disabled={loading} 
            onClick={submitHandler} 
            className='w-full bg-pink-600 cursor-pointer mt-10' 
            type='submit'>
              {
                loading?<span className='flex gap-1 items-center'><Loader2 className='animate-spin'/>Please Wait</span>:'Add Product'
              }
              </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddProduct
