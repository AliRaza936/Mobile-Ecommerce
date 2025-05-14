import e, { request } from "express";
import { deleteImageFromCloudinary, uploadImage } from "../cloudinary/cloudinary.js";
  import userModel from "./model.js";
  import bcrypt from 'bcryptjs'
  import jwt from 'jsonwebtoken'
import sendEmail from "../utils/email.js";

let signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check only verified users
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      if (existingUser.verified) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
    }
        // 🔹 If an unverified user exists, update their data instead of creating a new one
        let user = await userModel.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        
        if (user) {
            // If user exists but is NOT verified, update their OTP and password
            user.password = hashedPassword;
            user.otpCode = otpCode;
            user.otpExpires = otpExpires;
            await user.save();
        } else {
            // Otherwise, create a new user
            user = new userModel({
                name,
                email,
          
                password: hashedPassword,
                otpCode,
                otpExpires,
                verified: false
            });
            await user.save();
        }


    try {
      await sendEmail(email, "Verify Your Email", otpCode,);
      res.status(200).json({success:true, message: "OTP sent to email for verification" });
    } catch (emailError) {
      await userModel.deleteOne({ email }); // Delete user if email sending fails
      return res.status(500).json({success:false, message: "Failed to send OTP email. Please try again." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: "Server error" });
  }
};
let verifyOTP = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({success:false, message: "User not found" });

      if (user.otpCode !== otpCode) {
      return res.status(400).json({ success:false, message: "Invalid OTP" });
    }
    if (user.otpExpires < new Date()) {
      return res.status(400).json({success:false, message: "OTP expired, please request a new one" });
    }

    // OTP is valid - mark user as verified (optional)
    user.verified = true;
    user.otpCode = null; // Remove OTP after verification
    user.otpExpires = null;
    await user.save();

    res.status(200).json({success:true,message: "Email verified successfully!" });
  } catch (error) {
    
    res.status(500).json({success:false, message: "Server error" });
  }
};

let signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({success:true, message: "This email is not registered " });
    }

    // Check if the user is verified
    if (!user.verified) {
      return res.status(400).json({success:false, message: "Please verify your email first" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || user.password ==='') {
      return res.status(400).json({success:true, message: "Incorrect Email/Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Send token in HTTP-only cookie
//     res.cookie("authToken", token, {
//       httpOnly: true,
// secure:true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

   return res.status(200).json({success:true, message: "Login successfully", token,user });

  } catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Server error" });
  }
};
let forgetPassowrd = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Email not found" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    user.otpCode = otpCode;
    user.otpExpires = otpExpires;
    await user.save();

    try {
      await sendEmail(email, "Reset Your Password",otpCode);
      return res.status(200).json({ success: true, message: "OTP sent to your email" });
    } catch (emailError) {
      return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

};
let logoutPage = (req, res) => {
  return res
    .cookie("authToken", "", {
      httpOnly: true, 
      secure: true,
      expires: new Date(0),
    })
    .status(201)
    .send({ success: true, message: "User Logout successfully" });
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otpCode, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user)
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired, please request a new one" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




let allUsers = async (req, res) => {
  try {
    
    let users = await userModel.find()
    if(!users){
        return res
        .status(500)
        .send({ success: false, message: "Error in fetching all user", error });
    }
    return res
      .status(201)
      .send({
        success: true,
        message: "users fetch successfully",
        users,
      });
  } catch (error) {

    return res
      .status(500)
      .send({ success: false, message: "Error in fetching users", error });
  }
};
let singleUser = async (req, res) => {
  try {
      
   let userId = req.params.id
   
    let user = await userModel.findById(userId).select('-password')
    if(!user){
        return res
        .status(500)
        .send({ success: false, message: 'user not found' });
    }
   
   
    
    
    return res
      .status(201)
      .send({
        success: true,
        message: "user fetch successfully",
       user
      });
  } catch (error) {

    return res
      .status(500)
      .send({ success: false, message: "Error in get single user", error });
  }
};
let deleteUser = async (req, res) => {
  try {
    let {userId} = req.params
    let user = await userModel.findById(userId)
    if(!user){
        return res
        .status(500)
        .send({ success: false, message: 'user not found' });
    }
   
   await userModel.findByIdAndDelete(userId)
    
    
    return res
      .status(201)
      .send({
        success: true,
        message: "user delete successfully",
       
      });
  } catch (error) {

    return res
      .status(500)
      .send({ success: false, message: "Error in delete user", error });
  }
};
let updateUser = async (req, res) => {
  try {

    const userId = req.params.id;
    let { name,phone } = req.body;
    let user = await userModel.findById(userId)
    if(!user){
        return res
        .status(500)
        .send({ success: false, message: 'user not found' });
    }

    let updateuser =  await userModel.findByIdAndUpdate(userId,{name:name,phone:phone, },{new:true})

    return res
      .status(201)
      .send({
        success: true,
        message: "user update successfully",
        updateuser,
      });
  } catch (error) {
  console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in update user", error });
  }
};
let changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userId = req.params.id; // Get user ID from middleware

    // Check if all fields are provided
    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({success:false, message: "All fields are required" });
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
        return res.status(400).json({success:false, message: "New passwords do not match" });
    }

    // Find user by ID
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({success:false, message: "User not found" });
    }

    // Compare old password with stored hash
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({success:false, message: "Old password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({success:true, message: "Password updated successfully" });
} catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Server error" });
} 
};
let authWithGoogle = async (req, res) => {
  try {
    const { name, email, phone,password ,verified} = req.body;
  // Check if user already exists
  if(!email){
    return res.status(401).json({success:true, message: "Something went wrong. Please try again", });

  }
  const existingUser = await userModel.findOne({ email });
  if (!existingUser) {
    const newUser = await userModel.create({ name, email, phone, password,verified });
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
//     res.cookie("authToken", token, {
//       httpOnly: true,
// secure:true,
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });
    return res.status(201).json({success:true, message: "User Login Successfully",token,user:newUser });
  }else
  {
const existingUser = await userModel.findOne({email})
const token = jwt.sign(
  { userId: existingUser._id, role: existingUser.role },
  process.env.SECRET_KEY,
  { expiresIn: "7d" }
  
);
// res.cookie("authToken", token, {
//   httpOnly: true,
// secure:true,
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// });
return res.status(201).json({success:true, message: "User Login Successfully",token, user:existingUser});

  }
    // Generate JWT token

  

 
} catch (error) {
    console.error(error);
    res.status(500).json({success:false, message: "Server error" });
} 
};



export { signUp,verifyOTP,signin,allUsers,singleUser,deleteUser,forgetPassowrd,logoutPage ,updateUser,changePassword,authWithGoogle};
