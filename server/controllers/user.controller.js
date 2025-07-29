import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { getJobRecommendations } from "../services/recommendation.service.js";

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
            isLoggedIn:true,
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

        await user.save();

        
        const userData = {
            id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profilePicture:user.profilePicture,
            resume:user.resume,
        }


        return res.status(200).json({message:"User profile updated successfully",success:true,data:userData});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

export const saveProfile = async (req, res) => {
  try {
    // console.log('Request body:', JSON.stringify(req.body, null, 2));
    // console.log('Request files:', req.files);

    const { userId, data } = req.body;
    const profileData = JSON.parse(data);
    let profilePicture = profileData.profilePicture;
    let resume = profileData.resume;

    // Handle profile picture upload
    if (req.files && req.files['profilePicture']) {
      const profileFile = req.files['profilePicture'][0];
      const dataUri = getDataUri(profileFile);
      const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
      profilePicture = cloudResponse.secure_url;   
    }

    // Handle resume upload
    if (req.files && req.files['resume']) {
      const resumeFile = req.files['resume'][0];
      const dataUri = getDataUri(resumeFile);
      const cloudResponse = await cloudinary.uploader.upload(dataUri.content, { 
        resource_type: 'raw',
        format: 'pdf',
        flags: 'attachment' 
      });
      resume = cloudResponse.secure_url;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $set: {
          fullname: profileData.fullname,
          "profile.firstName": profileData.firstName,
          "profile.lastName": profileData.lastName,
          "profile.gender": profileData.gender,
          "profile.phoneNumber": profileData.phoneNumber,
          "profile.dateOfBirth": profileData.dateOfBirth,
          "profile.sectors": profileData.sectors,
          "profile.designation": profileData.designation,
          "profile.aboutMe": profileData.aboutMe,
          "profile.city": profileData.city,
          "profile.currentAddress": profileData.currentAddress,
          "profile.postalCode": profileData.postalCode,
          "profile.province": profileData.province,
          "profile.education": profileData.education,
          "profile.skills": profileData.skills,
          "profile.experiences": profileData.experiences,
          "profile.achievements": profileData.achievements,
          "profile.projects": profileData.projects,
          "profile.certificates": profileData.certificates,
          "profile.profilePicture": profilePicture,
          "profile.resume": resume,
          profileCompleted: true
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile saved successfully",
      user: updatedUser,
      success:true
    });
  } catch (error) {
    console.error("Error saving profile:", error);
    console.error("Error stack:", error.stack);
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

// getByIDforAppliedJobs and match the specific job
export const getUserByIdforAppliedJobs = async (req,res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path:'appliedJobs',
            options:{sort:{createdAt:-1}},
            match:{
                job:req.query.jobId
            }
        });
        return res.status(200).json({message:"User fetched successfully",success:true,data:user});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}
// explanation
// this function is used to get the user by id and populate the appliedJobs field with the job details
// and match the specific job

// Api to get only user profile logo
export const getUserProfileLogo = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const profilePicture = user.profile.profilePicture;
        return res.status(200).json({message:"User fetched successfully",success:true,data:profilePicture});
    } catch (error) {
        return res.status(200).json({message:"Internal server error",success:false});   
    }
}

// get all user count
export const getAllUserCount = async (req,res) => {
    try {
        const count = await User.countDocuments();
        return res.status(200).json({message:"User count fetched successfully",success:true,data:count});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

// getRecommendations
export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await getJobRecommendations(req.params.id);
    return res.status(200).json({message:"Recommendations fetched successfully",success:true,data:recommendations});
  } catch (error) {
    return res.status(500).json({message:"Internal server error",success:false});   
  }
};
