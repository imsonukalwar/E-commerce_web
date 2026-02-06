const mongoose=require('mongoose')
const {Schema}=mongoose;

const user=new Schema({
    // firstName:{
    //     type:String,
    //     required:true,
    //     minlength:3,
    //     maxlength:15,
    // },
    // lastName:{
    //     type:String,
    //     required:true,
    //     minlength:3,
    //     maxlength:15,
    // },

  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must be at least 3 characters"],
    maxlength: [15, "First name must be at most 15 characters"],
    trim: true
  },

  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name must be at least 3 characters"],
    maxlength: [15, "Last name must be at most 15 characters"],
    trim: true
  },

    profilePic:{
        type:String,
        default: "",//cloudry image url
    },
    profilePicPublicId:{
        type:String,
        default:"",//cloudry public id >> to use delete and update profilepic 
    },
    // email:{
    //     type:String,
    //     required:true,
    //     unique:true,
    // },
email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,        // 🔥 important
    trim: true,
    match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please enter a valid email"
    ]
},

    password:{
        type:String,
        required:true,
    },

// password: {
//   type: String,
//   required: [true, "Password is required"],
//   minlength: [8, "Password must be at least 8 characters"],
//   match: [
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//     "Password must contain uppercase, lowercase, number and special character"
//   ]
// },

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
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],//this line added after the deployment
    },
    zipCode:{
        type:String,
    }

},{timestamps:true});

const User=mongoose.model("User",user);
module.exports=User