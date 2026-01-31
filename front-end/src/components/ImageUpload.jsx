import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card';
import { X } from 'lucide-react';



const ImageUpload = ({productData,setProductData}) => {

const handlefiles=(e)=>{
    const files=Array.from(e.target.files||[]);
    if(files.length){
setProductData((prev)=>({
  ...prev,
  productImage:[...(prev.productImage || []), ...files]
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
    <div className='grid gap-3'>
    
    <Label className="text-base font-semibold text-gray-700">
      Product Image
    </Label>

    <Input 
      type='file' 
      id="file-upload" 
      className="hidden" 
      accept="image/*" 
      multiple 
      onChange={handlefiles}
    />

    <Button 
      variant='outline'
      className="border-dashed border-2 border-purple-400 text-purple-600 hover:bg-purple-50 
      hover:border-purple-600 transition-all duration-300 rounded-xl"
    >
        <label htmlFor='file-upload' className='cursor-pointer font-medium'>
          Upload Images
        </label>
    </Button>

    {/* image previw */}
    {
        productData.productImage.length>0&&(
            <div className='grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4'>
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
                            <Card 
                              key={idx} 
                              className='relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300'
                            >
                                <CardContent className="p-2">
                                    <img 
                                      src={previw} 
                                      alt='' 
                                      width={200} 
                                      height={200} 
                                      className='w-full h-36 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300' 
                                    />

                                    {/* remove  button */}
                                    <button 
                                      onClick={()=>removeimage(idx)} 
                                      className='absolute top-2 right-2 bg-red-500/90 text-white p-1.5 rounded-full 
                                      opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110'
                                    >
                                      <X size={14}/>
                                    </button>
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
