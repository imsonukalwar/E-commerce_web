import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { File } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { X } from 'lucide-react';


const ImageUpload = ({productData,setProductData}) => {

const handlefiles=(e)=>{
    const files=Array.from(e.target.files||[]);
    if(files.length){
        setProductData((prev)=>({
            ...prev,
            productImage:[...prev.productImage,...files]
        }))
    }
}

const removeimage=(index)=>{
    setProductData((prev)=>{
        const updatedImage=prev.productImage.filter((_,i)=>i!==index);
        return {...prev,productImage:updatedImage}
    })
}

return (
    <div className='grid gap-2'>
    <Label>Product Image</Label>
    <Input type='file' id="file-upload" className="hidden" accept="image/*" multiple onChange={handlefiles}/>
    <Button variant='outline'>
        <label htmlFor='file-upload' className='cursor-pointer'>Upload Images</label>
    </Button>
    {/* image previw */}
    {
        productData.productImage.length>0&&(
            <div className='grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3'>
                {
                    productData?.productImage?.map((file,idx)=>{
                        //check if file is alredy a file (from input ) or a DB object /String
                        let previw;
                        if(file instanceof window.File){
                            previw=URL.createObjectURL(file)
                        }else if(typeof file==='string'){
                            previw=file;
                        }else if(file?.url){
                            previw=file.url;
                        }else{
                            return null
                        }
                        return(
                            <Card key={idx} className='relative group overflow-hidden'>
                                <CardContent>
                                    <img src={previw} alt='' width={200} height={200} className='w-full h-32 object-cover rounded-md' />
                                    {/* remove  button */}
                                    <button onClick={()=>removeimage(idx)} className='absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition'>
                                    <X size={14}/></button>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
    </div>
)
}

export default ImageUpload
