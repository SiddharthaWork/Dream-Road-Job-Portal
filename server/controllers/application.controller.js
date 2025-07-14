import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const applyJob = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                message: "Request body is missing",
                success: false
            });
        }
        const userId = req.body.id;
        const jobId = req.params.id;
        
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }
        
        if(!userId){
            return res.status(400).json({
                message: "User id is required.",
                success: false
            })
        };

        // Validate ID formats
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format",
                success: false
            });
        }
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false
            });
        }

        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, user: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        // For optional Resume Handling
        const file = req.file;
        let resumeUrl = null;
        if(file){
            const dataUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
            resumeUrl = cloudResponse.secure_url;
        }   
        
        // For optional Cover Letter Handling
        const coverLetter = req.body.coverLetter;
        
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            user:userId,
            company:job.company,
            createdBy:userId,
            resume: resumeUrl,
            coverLetter: coverLetter || ""  
        });
        
        // update the user applied jobs
        const user = await User.findById(userId);
        user.appliedJobs.push(newApplication._id);
        await user.save();  
        
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true,
            application:newApplication
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// get applied jobs
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.body.id;
        if(!userId){
            return res.status(400).json({
                message: "User id is required.",
                success: false
            })
        };
        const application = await Application.find({user:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin see how many user apply to a job
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'user'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}

// GetApplied Jobs for User that they applied
export const getAppliedJobUsers = async (req,res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format",
                success: false
            });
        }

        const application = await Application.find({user:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}





// get the number of job user applied
export const getAppliedJobCount = async (req,res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format",
                success: false
            });
        }
        const application = await Application.countDocuments({user:userId});
        if(!application){
            return res.status(200).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        }); 
    }
}

// get shortlisted job count by user id
export const getShortlistedJobCount = async (req,res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid user ID format",
                success: false
            });
        }
        const application = await Application.countDocuments({user:userId,status:'shortlisted'});
        if(!application){
            return res.status(200).json({
                message:"No Shortlisted Jobs",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        }); 
    }
}


export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId}).populate({
            path:'user',
            options:{sort:{createdAt:-1}}
        });
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}


// get all applicant
export const getAllApplicant = async (req,res) => {
    try {
        // i need only username and email of the user
        const application = await Application.find().populate({
            path:'user',
            options:{sort:{createdAt:-1}},
            select:'username email'
        });
        const job = await Job.find().populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            select:'title'
        }); 
        return res.status(200).json({message:"Applicant fetched successfully",success:true,data:{application,job}});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   


// get shortlisted job by user id
export const getShortlistedJobByUserId = async (req,res) => {
    if(!req.params.id){
        return res.status(400).json({message:"User id is required",success:false});
    }   
    try {
        const userId = req.params.id;
        const application = await Application.find({user:userId,status:'shortlisted'}).populate({
            path:'job',
            options:{sort:{createdAt:-1}}
        });
        return res.status(200).json({message:"Shortlisted job fetched successfully",success:true,data:application});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

// get applicants by company id
export const getApplicantsByCompanyId = async (req,res) => {
    if(!req.params.id){
        return res.status(400).json({message:"Company id is required",success:false});
    }   
    try {
        const companyId = req.params.id;
        const application = await Application.find({company:companyId}).populate({
            path:'user',
            options:{sort:{createdAt:-1}}
        });
        return res.status(200).json({message:"Applicants fetched successfully",success:true,data:application});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   
    