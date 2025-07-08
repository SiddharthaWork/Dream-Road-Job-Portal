import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res) => {
    try {
        const {fullname,email,password,role,phoneNumber} = req.body;
        console.log(req.body);
        if(!fullname || !email || !password || !role || !phoneNumber){
            return res.status(400).json({message:"All fields are required",success:false});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exists",success:false});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({fullname,email,password:hashedPassword,role,phoneNumber});
        return res.status(201).json({message:"User created successfully",success:true});



    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

export const login = async (req,res) => {
    try {
        const {email,password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({message:"All fields are required",success:false});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(400).json({message:"Invalid credentials",success:false});
        }

        if(user.role !== role){
            return res.status(400).json({message:"Invalid role",success:false});
        }

        const token = jwt.sign({id:user._id  },process.env.JWT_SECRET,{expiresIn:"1d"});

        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        const userData = {
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user.profile,
            profileCompleted:user.profileCompleted,
            token
        }


        return res.status(200).cookie("token",token,cookieOptions).json({message:"User logged in successfully",
            success:true,
            data:userData});


    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

export const logout = async (req,res) => {
    try {
        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        return res.status(200).json({message:"User logged out successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

export const updateProfile = async (req,res) => {
    try {
        const user = await User.findOne({id:req._id});
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }

        // updating data
        if(req.body.fullname){
            user.fullname = req.body.fullname;
        }
        if(req.body.email){
            user.email = req.body.email;
        }
        if(req.body.phoneNumber){
            user.phoneNumber = req.body.phoneNumber;
        }
        if(req.body.profile){
            user.profile = req.body.profile;
        }

        // resume later




        await user.save();

        
        const userData = {
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user.profile,
        }


        return res.status(200).json({message:"User profile updated successfully",success:true,data:userData});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

export const saveProfile = async (req, res) => {
  try {
    const { userId, ...profileData } = req.body; // Extract userId from request body

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        // fullname:profileData.fullname,
        profile: profileData,
        profileCompleted: true
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile saved successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// getallUser
export const getAllUser = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json({message:"Users fetched successfully",success:true,data:users});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

// getbyId
export const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({message:"User fetched successfully",success:true,data:user});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   