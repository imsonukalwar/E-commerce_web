const mongoose=require('mongoose')
const {Schema}=mongoose;

const user=new Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15,
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15,
    },
    profilePic:{
        type:String,
        default: "",//cloudry image url
    },
    profilePicPublicId:{
        type:String,
        default:"",//cloudry public id >> to use delete and update profilepic 
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
    type:String,
        enum:["user","admin"],
        default:"user",
    },
    token:{
    type:String,
    default:null,
    },
    isVerified:{       //>>>this all comment part write in aouthenticatin part(code by "Sonu")
    type:Boolean,
    default:false,
    },
    isLoggedIn:{
    type:Boolean,
    default:false,
    },
    otp:{
        type:String,
        default:null,
    },
    otpexpiry:{
        type:Date,
        default:null,
    },
    address:{
        type:String,
    },
    city:{
        type:String,
    },
    phoneNo:{
        type:Number,
    },
    zipCode:{
        type:String,
    }

},{timestamps:true});

const User=mongoose.model("User",user);
module.exports=User