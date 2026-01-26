
const Product = require("../models/productModel.js");
const cloudinary=require("../Utils/cloudnary.js");
const getDataUri=require("../Utils/dataUri.js")
// const streamifier = require("streamifier");

const addProduct=async(req,res)=>{
    try {
        
        
        const{productName,productDesc,productPrise,category,brand}=req.body;
        const userId=req.id;
        if(!productName||!productDesc||!productPrise||!category||!brand){
            return res.status(400).send({
                success:false,
                message:"All fields are required"
            })
        }
        let productImg=[];
        if(req.files&&req.files.length>0){
            for (let file of req.files) {
                const fileUri=getDataUri(file);console.log("FILE:", file);
                const result= await cloudinary.v2.uploader.upload(fileUri, {
                folder: "mern_products",
                
                });console.log(result);
                

                productImg.push({
                    url:result.secure_url,
                    public_id:result.public_id
                })
            }
        }
        
        
        //create a product in Db
        const newProduct=await Product.create({
            userId,
            productName,
            productDesc,
            productPrise,
            category,
            brand,
            productImage: productImg,
        })
        return res.status(200).send({
                success:true,
                message:"Product Added Succsess",
                Product:newProduct
            })
    } catch (error) {
        return res.status(500).send({
                success:false,
                message:error.message
            })
    }
}


const getAllProduct=async(_,res)=>{
    try {
        const products=await Product.find();
        if(!products){
            return res.status(404).send({
                success:false,
                message:"No Product Available",
                products:[],
            })
        }
        return res.status(200).send({
                success:true,
                products
            })
    } catch (error) {
        return res.status(500).send({
                success:false,
                message:error.message
            })
    }
}


const deleteProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const product=await Product.findById(productId)
        if(!product){
            return res.status(404).send({
                success:false,
                message:"product not found"
            })
        }
        //dlelte image from cloudnary
        if(product.productImg&&product.productImg.length>0){
            for (let img of product.productImg) {
                const result=await cloudnary.uploader.destroy(img.public_id)
            }
        }
        //delet from mbd
        await Product.findByIdAndDelete(productId)
        return res.status(200).send({
                success:true,
                message:"Delete Sucsesfully"
            })
    } catch (error) {
        return res.status(500).send({
                success:false,
                message:error.message
            })
    }
}

const updateProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const{productName,productImage,productDesc,productPrise,category,brand,existingImages}=req.body;
        const product=await Product.findById(productId);
        if(!product){
            return res.status(404).send({
                success:false,
                message:"product not found"
            });
        }
        
        let updatedImages=[];
        //keep select image
        if(existingImages){
            const keepIds = JSON.parse(existingImages);
            updatedImages=product.productImage.filter((img)=>
                keepIds.includes(img.public_id)
            );
            //delete only remove images
            const removedImages=product.productImage.filter(
                (img)=>
                    !keepIds.includes(img.public_id)
            )
            for (const img of removedImages) {
                await cloudnary.uploader.destroy(img.public_id)
            }
        }else{
            updatedImages=product.productImage//keep all if nothing send
        }
        console.log("yaha tak sahi sahi");
        if(req.files&& req.files.length>0){
            for (const file of req.files) {
                const fileUri=getDataUri(file)
                const result =await cloudnary.uploader.upload(fileUri,{folser:"mern_products"})
                updatedImages.push({
                    url:result.secure_url,
                    public_id:result.public_id
                })
            }
        }
        //update product
        product.productName=productName||product.productName
        product.productDesc=productDesc||product.productDesc
        product.productPrise=productPrise||product.productPrise
        product.category=category||product.category
        product.brand=brand||product.brand
        product.productImage=productImage||product.productImage
        await product.save();
        return res.status(200).send({
                success:true,
                message:"Product Updated Sucsesfully",
                product
            })
    } catch (error) {
        return res.status(500).send({
                success:false,
                message:error.message
            })
    }
}


module.exports={addProduct,getAllProduct,deleteProduct,updateProduct}