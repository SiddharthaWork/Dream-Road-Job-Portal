import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { calculateApplicantScore, generateApplicantSummary } from "../services/applicantRanking.service.js";

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

// delete application
export const deleteApplication = async (req,res) => {
    if(!req.params.id){
        return res.status(400).json({message:"Application id is required",success:false});
    }   
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Application deleted successfully",success:true,data:application});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

// delete application by job id
export const deleteApplicationByJobId = async (req,res) => {
    if(!req.params.id){
        return res.status(400).json({message:"Job id is required",success:false});
    }   
    try {
        const application = await Application.deleteMany({job:req.params.id});
        return res.status(200).json({message:"Application deleted successfully",success:true,data:application});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
   }
}

// Get ranked applicants for a job using weighted scoring algorithm
export const getRankedApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { 
            minScore = 0.3, 
            sortBy = 'score', 
            showBreakdown = false,
            limit = 50
        } = req.query;
        
        // Validate job ID format
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false
            });
        }
        
        // Get job with populated applications and user data
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'user',
                select: '-password' // Exclude sensitive data
            }
        });
        
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }
        
        // Calculate scores for each applicant
        const rankedApplicants = job.applications
            .filter(app => app.user) // Ensure user data exists
            .map(application => {
                const scoring = calculateApplicantScore(application, job);
                
                return {
                    ...application.toObject(),
                    applicantScore: scoring.totalScore,
                    scoreBreakdown: showBreakdown === 'true' ? scoring.breakdown : undefined,
                    weights: showBreakdown === 'true' ? scoring.weights : undefined,
                    // Add helpful summary
                    summary: generateApplicantSummary(application.user, scoring)
                };
            })
            .filter(app => app.applicantScore >= parseFloat(minScore))
            .sort((a, b) => {
                if (sortBy === 'score') {
                    return b.applicantScore - a.applicantScore;
                }
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .slice(0, parseInt(limit));
        
        // Add ranking statistics
        const stats = {
            totalApplicants: job.applications.length,
            qualifiedApplicants: rankedApplicants.length,
            averageScore: rankedApplicants.length > 0 ? 
                Math.round((rankedApplicants.reduce((sum, app) => 
                    sum + app.applicantScore, 0) / rankedApplicants.length) * 100) / 100 : 0,
            topScore: rankedApplicants[0]?.applicantScore || 0,
            minScoreFilter: parseFloat(minScore)
        };
        
        return res.status(200).json({
            job: {
                _id: job._id,
                title: job.title,
                department: job.department,
                location: job.location,
                type: job.type,
                experience: job.experience,
                skills: job.skills,
                applications: rankedApplicants
            },
            stats,
            success: true
        });
    } catch (error) {
        console.log('Error in getRankedApplicants:', error);
        return res.status(500).json({
            message: 'Error ranking applicants',
            success: false
        });
    }
};

// Auto-shortlist top applicants based on score
export const autoShortlistApplicants = async (req, res) => {
    try {
        const { jobId, minScore = 0.7, maxShortlist = 10 } = req.body;
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }
        
        // Validate job ID format
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false
            });
        }
        
        // Get job with applications
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: 'user',
                select: '-password'
            }
        });
        
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }
        
        // Calculate scores and get top candidates
        const scoredApplicants = job.applications
            .filter(app => app.user)
            .map(application => {
                const scoring = calculateApplicantScore(application, job);
                return {
                    _id: application._id,
                    score: scoring.totalScore
                };
            })
            .filter(app => app.score >= minScore)
            .sort((a, b) => b.score - a.score)
            .slice(0, maxShortlist);
        
        const shortlistedIds = scoredApplicants.map(app => app._id);
        
        // Update application status to shortlisted
        const updateResult = await Application.updateMany(
            { _id: { $in: shortlistedIds } },
            { status: 'shortlisted' }
        );
        
        return res.status(200).json({
            message: `${shortlistedIds.length} applicants shortlisted automatically`,
            shortlistedCount: shortlistedIds.length,
            averageScore: scoredApplicants.length > 0 ? 
                Math.round((scoredApplicants.reduce((sum, app) => sum + app.score, 0) / scoredApplicants.length) * 100) / 100 : 0,
            success: true
        });
    } catch (error) {
        console.log('Error in autoShortlistApplicants:', error);
        return res.status(500).json({
            message: 'Error auto-shortlisting applicants',
            success: false
        });
    }
}
    