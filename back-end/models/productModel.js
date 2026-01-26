const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productName:{type:String,required:true},
    productDesc:{type:String,required:true},

    productImage:[
        {
            url:{type:String,required:true},
            public_id:{type:String,required:true}
        }
    ],
    productPrise:{type:Number},
    category:{type:String},
    brand:{type:String}
},{timestamps:true})

const Product=mongoose.model("product",productSchema);

module.exports=Product;