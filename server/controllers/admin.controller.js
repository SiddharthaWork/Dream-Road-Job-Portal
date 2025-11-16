import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Admin } from "../models/admin.model.js";
import { Application } from "../models/application.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// admin login
export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required",success:false});
        }
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message:"Admin not found",success:false});
        }
        const isPasswordMatched = await bcrypt.compare(password,admin.password);
        if(!isPasswordMatched){
            return res.status(400).json({message:"Invalid credentials",success:false});
        }
        const token = jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.status(200).json({message:"Admin logged in successfully",success:true,token,role:admin.role});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// admin register
export const register = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required",success:false});
        }
        const admin = await Admin.findOne({email});
        if(admin){
            return res.status(400).json({message:"Email already exists",success:false});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await Admin.create({email, password:hashedPassword, role:"admin"});
        return res.status(201).json({message:"Admin created successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

// getAllUser
export const getAllUser = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json({message:"Users fetched successfully",success:true,data:users});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// blockUser
export const blockUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }
        user.block = true;
        await user.save();
        return res.status(200).json({message:"User blocked successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// unblockUser
export const unblockUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }
        user.block = false;
        await user.save();
        return res.status(200).json({message:"User unblocked successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// getAllCompany
export const getAllCompany = async (req,res) => {
    try {
        const companies = await Company.find();
        return res.status(200).json({message:"Companies fetched successfully",success:true,data:companies});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// blockCompany 
export const blockCompany = async (req,res) => {
    try{
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(400).json({message:"Company not found",success:false});
        }
        company.block = true;
        await company.save();
        return res.status(200).json({message:"Company blocked successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// unblockCompany
export const unblockCompany = async (req,res) => {
    try{
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(400).json({message:"Company not found",success:false});
        }
        company.block = false;
        await company.save();
        return res.status(200).json({message:"Company unblocked successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// approveCompany
export const approveCompany = async (req,res) => {
    try{
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(400).json({message:"Company not found",success:false});
        }
        company.adminApproved = true;
        await company.save();
        return res.status(200).json({message:"Company approved successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// rejectCompany
export const rejectCompany = async (req,res) => {
    try{
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(400).json({message:"Company not found",success:false});
        }
        company.adminApproved = false;
        await company.save();
        return res.status(200).json({message:"Company rejected successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}


// check block or not of user
export const checkBlockUser = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({message:"User not found",success:false});
        }
        return res.status(200).json({message:"User block status",success:true,data:user.block});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// check block or not of company
export const checkBlockCompany = async (req,res) => {
    try{
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(400).json({message:"Company not found",success:false});
        }
        return res.status(200).json({message:"Company block status",success:true,data:company.block});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}


export const getAllJobs = async (req,res) => {
    try{
        const jobs = await Job.find().populate({
            path:"createdBy",
            model:"Company"
        }).sort({createdAt:-1});
        return res.status(200).json({message:"Jobs fetched successfully",success:true,data:jobs});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
        return res.status(404).json({ message: "Job not found", success: false });
    }
    
    // Delete all applications associated with this job
    await Application.deleteMany({ job: jobId });

    const company = await Company.findById(job.createdBy);
    company.deletedJobs.push(job.title);
    await company.save();

    return res.status(200).json({ message: "Job and associated applications deleted successfully", success: true, data: job });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
}