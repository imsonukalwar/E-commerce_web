
const User=require("../models/model.js")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {verifyemail}=require("../emailverify/verifyEmail.js")
const Session=require("../models/sessionModel.js")
const sendOTPMail=require("../emailverify/sendOtpTOMail.js")
const cloudinary=require('../Utils/cloudnary.js')



const register=async(req,res)=>{
    try {
        const { firstName, lastName, email, password } = req.body;

if (!firstName || !lastName || !email || !password) {
return res.status(400).json({
    success: false,
    message: "all field is require"
});
}
        const result=await User.findOne({email})
        if(result){
            return res.status(400).json({
                success:false,
                message:"user is alredy exist in DB !"
            });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        console.log(hashpassword);
        
        const newUser=await User.create({
            firstName,
            lastName,
            email,
            password:hashpassword});

        const token= await jwt.sign({id:newUser._id},process.env.KEY,{expiresIn:'10m'});
        verifyemail(token,email);//we are sending email here
        newUser.token=token //we are save token in db (check in model)

        await newUser.save();
        res.status(201).json({
            success:true,
            message:"register is successfull !!",
            user:newUser,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const Verify=async(req,res)=>{
    try {
        const aouthHeader=req.headers.authorization;
        if(!aouthHeader|| !aouthHeader.startsWith("Bearer ")){
            return res.status(400).json({
                success:false,
                message:'aoutherization token is missing',
            })
        }
        const token=aouthHeader.split(" ")[1]  //>> [bearer,jdfndjfbjk]
        let decode;
        try {
            decode=jwt.verify(token,process.env.KEY)
        } catch (error) {
            if(error.name==="TokenExpiredErorr"){
                return res.status(400).json({
                    success:false,
                    message:"the register token has Expire"
                })
            }
            return res.status(400).json({
                success:false,
                message:"token verification failed"
            })
        }
        const user=await User.findById(decode.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not fount"
            })
        }
        user.token=null;
        user.isVerified=true;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"email verifyed sucesss !!"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const reverify=async(req,res)=>{//reverify  ko create iss lia kiye aagar user uus samy apne imal ko verify nahi karta hai to 
    //dobara verify karega ,ye tab hoga jab token time 10m user verify 11minut pe re to uus samy user re verify karega
    try {
        const {email}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user is not found"
            })
        }
        const token= await jwt.sign({id:user._id},process.env.KEY,{expiresIn:'10m'});
                verifyemail(token,email);
                user.token=token;
                await user.save()
            return res.status(200).json({
            success:true,
            message:"email Reverifyed sucesss !!",
            token:user.token
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"all fields are require"
            })
        }
        const exixstUser=await User.findOne({email})
        if(!exixstUser){
            return res.status(400).json({
                success:false,
                message:"user is not exixst"
            })
        }
        const ispassValied=await bcrypt.compare(password,exixstUser.password)
        if(!ispassValied){
            return res.status(400).json({
                success:false,
                message:"Invalied credential"
            })
        }
        if(exixstUser.isVerified===false){
            return res.status(400).json({
                success:false,
                message:"verify your account then login"
            })
        }
//generate token
        const accessToken=await jwt.sign({id:exixstUser._id},process.env.KEY,{expiresIn:'20m'})
        const refressToken=await jwt.sign({id:exixstUser._id},process.env.KEY,{expiresIn:'10d'})
        exixstUser.Islogin=true;
        await exixstUser.save();
//check exixsting Session and Delete
        const existingSession=await Session.findOne({userId:exixstUser._id})
        if(!existingSession){
            await Session.deleteOne({userId:exixstUser._id})
        }
//create a new session 
        await Session.create({userId:exixstUser._id})
        return res.status(200).json({
            success:true,
            message:`Wlcome Back ${exixstUser.firstName}`,
            user:exixstUser,
            accessToken,
            refressToken,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            })
        }
    }

const logout=async(req,res)=>{
    try {
        const userid=req.id
        await Session.deleteMany({userId:userid})
        await User.findOneAndUpdate(userid,{isLoggedIn:false})
        return res.status(200).json({
    success: true,
    message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            })
    }
}

const forgotPassword=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
            success:false,
            message:"USer not found",
            })
        }
        const otp=Math.floor(100000+Math.random()*900000).toString();
        const expOtp=new Date(Date.now()+10*60*1000)//10 min ke bad otp expire
        user.otp=otp;
        user.otpexpiry=expOtp;

        await user.save()
        await sendOTPMail(otp,email);

        return res.status(200).json({
            success:true,
            message:"OTP send to email sucsess !",
            })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message,
            })
    }
}

const verifyOtp=async(req,res)=>{
    try {
        const {otp}=req.body;
        const email=req.params.email;
        if(!otp){
            return res.status(400).json({
            success:false,
            message:"otp is required",
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
            success:false,
            message:"user is not found",
            })
        }
        if(!user.otp||!user.otpexpiry){
            return res.status(400).json({
            success:false,
            message:"otp is not generated or already veryfied",
            })
        }
        if(user.otpexpiry< new Date()){
            return res.status(400).json({
            success:false,
            message:"otp has expire please require a new otp",
            })
        }
        if(otp !==user.otp){
            return res.status(400).json({
            success:false,
            message:"otp is invalied",
            })
        }
        user.otp=null;
        user.otpexpiry=null;
        await user.save();
        return res.status(200).json({
            success:true,
            message:"otp verified sucsessfully!",
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            })
    }
}

const changePassword=async(req,res)=>{
try {
    const {newpassword,conformpassword}=req.body;
    const email=req.params.email;
    const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
            success:false,
            message:"user1 is not found",
            })
        }
    if(!conformpassword||!newpassword){
        return res.status(400).json({
            success:false,
            message:"All fileds are require",
            })
        }
        if(newpassword!==conformpassword){
            return res.status(400).json({
            success:false,
            message:"password do not match",
            })
        }

        const haspass= await bcrypt.hash(newpassword,10)
        user.password=haspass;
        await user.save()
        return res.status(200).json({
            success:true,
            message:"password change sucsessfully",
            })
} catch (error) {
    return res.status(500).json({
            success:false,
            message:error.message,
            })
}
}

const allUser=async(req,res)=>{
    try {
        const ans=await User.find();
        return res.status(200).json({
            success:true,
            ans,
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            })
    }
}

const getUserById=async(req,res)=>{
    try {
        const {userId}=req.params;
        const user=await User.findById(userId).select("-password -otp -token -otpexpiry ");
        if(!user){
            return res.status(404).json({
            success:false,
            message:"user not found",
            })
        }
        return res.status(200).json({
            success:true,
            user1,
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            })
    }
}


// const updateUser=async(req,res)=>{
//     try {
//         const useridUpdate=req.params.id;//the id of the user we want to update
//         const logeduser=req.user1//from is authentication middleware
//         const{firstName,lastName,address,city,zipCode,phoneN,role}=req.body
//         if(logeduser._id.toString()!==useridUpdate&&logeduser.role !=='admin'){
//         }{
//             return res.status(403).json({
//             success:false,
//             message:"you are not apllicabe to update this profile",
//             })
//         }
//         let user1=await user.findById(useridUpdate)
//         if(!user1){
//             return res.status(404).json({
//             success:false,
//             message:error.message,
//             })
//         }
//         let profilepicurl=user1.profilepic;
//         let profilepicPublicId=user1.profilepicpublicId;
//         if(req.file){
//             if(profilepicPublicId){
//                 await cloudinary.uploader.destry(profilepicPublicId)
//             }
//             cosnt uploadResult=await new promises((resolve,reject)=>{
//                 cosnt stream =cloudinary.uploader.upload_strea(
//                     {folder:"profiles"},
//                     (error,result)=>{
//                         if(error) reject(error)
//                             else resolve(result)
//                     }
//                 )
//                 stream.end(req.file.buffer)
//             })
//             profilepicurl=uploadResult.secure_url;
//             profilepicPublicId=uploadResult.public_id
//         }
//         user1.firstName=firstName||user1.firstName
//         user1.lastName=lasstName||user1.lasstName
//         user1.address=address||user1.address
//         user1.city=city||user1.city
//         user1.zipCode=zipCode||user1.zipCode
//         user1.phoneN=phoneN||user1.phoneN
//         user1.role=role
//         user1.profilepic=profilepicurl
//         user1.profilepicpublicId=profilepicPublicId

//         const updauser=await user1.save()
//         return res.status(200).json({
//             success:true,
//             message:"Profile update sucsessfull",
//             })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//             })
//     }
// }

const updateUser = async (req, res) => {
try {
    const userIdToUpdate = req.params.id;
    const  loggedInUser = req.user; // from auth middleware
if (!loggedInUser) {
  return res.status(401).json({
    success: false,
    message: "Authentication failed (user missing in request)",
  });
}
    const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phoneNo,
    } = req.body;

    //  Authorization check
    if (
    loggedInUser._id.toString() !== userIdToUpdate &&
    loggedInUser.role !== 'admin'
    ) {
    return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
    });
    }

    let user= await User.findById(userIdToUpdate);
    if (!user) {
        return res.status(404).json({
        success: false,
        message: "User not found",
        });
        }

    let profilePicUrl = user.profilePic;
    let profilePicPublicId = user1.profilePicPublicId;

    //  If new image uploaded
    if (req.file) {
        if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicId);
        }

        const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "profiles" },
            (error, result) => {
            if (error) reject(error);
            else resolve(result);
            }
            );
        stream.end(req.file.buffer);
        });

        profilePicUrl = uploadResult.secure_url;
        profilePicPublicId = uploadResult.public_id;
    }

    //  Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.phoneN = phoneNo || user.phoneNo;
    user.profilePic = profilePicUrl;
    user.profilePicPublicId = profilePicPublicId;
    user.profilePicPublicId=role;

    //  Role update only admin can do
    // if (loggedUser.role === "admin" && req.body.role) {
    //     user.role = req.body.role;
    // }

    // await user.save();
    const updatedUser=await user.save()

    return res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        user: user,
    });
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};


module.exports={register,Verify,reverify,login,logout,forgotPassword,verifyOtp,changePassword,allUser,getUserById,updateUser}