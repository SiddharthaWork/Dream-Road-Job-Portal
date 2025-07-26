import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

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

export const deleteJob = async (req,res) => {
    try{
        const job = await Job.findByIdAndDelete(req.params.id);
        const company = await Company.findById(job.createdBy);
        company.deletedJobs.push(job.title);
        await company.save();
        return res.status(200).json({message:"Job deleted successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}