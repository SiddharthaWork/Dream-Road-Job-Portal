import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import { Company } from "../models/company.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { getJobRecommendations } from "../services/recommendation.service.js";
import { sendEmail } from "../utils/sendmail.js";
import crypto from "crypto";

export const registerUser = async (req,res) => {
    try {
        const {fullname,email,password,role} = req.body;
        console.log(req.body);
        if(!fullname || !email || !password || !role){
            return res.status(400).json({message:"All fields are required",success:false});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already exists",success:false});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({fullname,email,password:hashedPassword,role});
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

// delete user from id 
export const deleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }
        return res.status(200).json({message:"User deleted successfully",success:true});
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

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email, role } = req.body;
    
    if (!email || !role) {
      return res.status(400).json({ message: "Email and role are required", success: false });
    }

    // Validate role
    if (!["user", "admin", "company"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be user, admin, or company", success: false });
    }

    // Check the specific model based on role
    let foundEntity = null;
    let entityName = null;

    if (role === "user") {
      const user = await User.findOne({ email });
      if (user) {
        foundEntity = user;
        entityName = user.fullname;
      }
    } else if (role === "admin") {
      const admin = await Admin.findOne({ email });
      if (admin) {
        foundEntity = admin;
        entityName = "Admin";
      }
    } else if (role === "company") {
      const company = await Company.findOne({ email });
      if (company) {
        foundEntity = company;
        entityName = company.name;
      }
    }

    // If no entity found with this email and role
    if (!foundEntity) {
      return res.status(404).json({ message: `No ${role} account found with this email`, success: false });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save reset token to the found entity
    foundEntity.resetPasswordToken = resetToken;
    foundEntity.resetPasswordExpiry = resetTokenExpiry;
    await foundEntity.save();

    // Create reset URL
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}&role=${role}`;

    // Email content
    const emailSubject = "Password Reset Request - Dream Road";
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #255cf4; margin: 0; font-size: 28px;">Dream Road</h1>
            <p style="color: #666; margin: 5px 0 0 0;">Job Portal</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Hello ${entityName},
          </p>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            We received a request to reset your password for your Dream Road ${role} account. If you didn't make this request, you can safely ignore this email.
          </p>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 30px;">
            To reset your password, click the button below:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #255cf4; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
            Or copy and paste this link into your browser:
          </p>
          
          <p style="color: #255cf4; word-break: break-all; background-color: #f5f5f5; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
            ${resetUrl}
          </p>
          
          <p style="color: #888; font-size: 14px; margin-bottom: 10px;">
            This link will expire in 10 minutes for security reasons.
          </p>
          
          <p style="color: #888; font-size: 14px;">
            If you have any questions, please contact our support team.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
            © 2024 Dream Road Job Portal. All rights reserved.
          </p>
        </div>
      </div>
    `;

    // Send email
    await sendEmail(email, emailSubject, emailHtml);

    return res.status(200).json({
      message: "Password reset email sent successfully",
      success: true
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, password, role } = req.body;
    
    if (!token || !password || !role) {
      return res.status(400).json({ message: "Token, password, and role are required", success: false });
    }

    // Validate role
    if (!["user", "admin", "company"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be user, admin, or company", success: false });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character", 
        success: false 
      });
    }

    // Find entity with valid reset token in the specific model based on role
    let foundEntity = null;

    if (role === "user") {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: Date.now() }
      });
      if (user) {
        foundEntity = user;
      }
    } else if (role === "admin") {
      const admin = await Admin.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: Date.now() }
      });
      if (admin) {
        foundEntity = admin;
      }
    } else if (role === "company") {
      const company = await Company.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: Date.now() }
      });
      if (company) {
        foundEntity = company;
      }
    }

    // If no entity found with valid token
    if (!foundEntity) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token", 
        success: false 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update entity password and clear reset token
    foundEntity.password = hashedPassword;
    foundEntity.resetPasswordToken = undefined;
    foundEntity.resetPasswordExpiry = undefined;
    await foundEntity.save();

    return res.status(200).json({
      message: "Password reset successfully",
      success: true
    });

  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};
