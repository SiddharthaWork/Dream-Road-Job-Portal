import { Job } from "../models/job.model.js";

// export const postJob = async (req,res) => {
//     try {
//         const {title,description,location,company,industry,skills,experience,education} = req.body;
//         if(!title || !description || !location || !company || !industry || !skills || !experience || !education){
//             return res.status(400).json({message:"All fields are required",success:false});
//         }

//         const job = await Job.create({
//             title,
//             description,
//             location,
//             company,
//             industry,
//             skills,
//             experience,
//             education
//         });

//         return res.status(200).json({message:"Job created successfully",success:true,data:job});
//     } catch (error) {
//         return res.status(500).json({message:"Internal server error",success:false});   
//     }
// }

export const createJob = async (req, res) => {
  try {
    const jobData = req.body;
    if (
      jobData.salaryMin === undefined ||
      jobData.salaryMax === undefined
    ) {
      return res.status(400).json({
        message: "Both salaryMin and salaryMax are required.",
        success: false,
      });
    }

    const salaryMin = Number(jobData.salaryMin);
    const salaryMax = Number(jobData.salaryMax);

    if (isNaN(salaryMin) || isNaN(salaryMax)) {
      return res.status(400).json({
        message: "Salary values must be numbers.",
        success: false,
      });
    }

    if (salaryMin < 0 || salaryMax < 0) {
      return res.status(400).json({
        message: "Salary values must be positive.",
        success: false,
      });
    }

    if (salaryMin > salaryMax) {
      return res.status(400).json({
        message: "Minimum salary must not be greater than maximum salary.",
        success: false,
      });
    }
    
    // Create a new job instance
    const newJob = new Job({
      ...jobData,
      company: jobData.createdBy,
      createdBy: jobData.createdBy,
    });
    
    if(!newJob){
        return res.status(400).json({message:"Job creation failed",success:false});
    }
    // Save the job to the database
    const savedJob = await newJob.save();
    
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: savedJob
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: error.message
    });
  }
};

// UpdateJOb Api
// export const updateJob = async (req,res) => {
//     try {
//         const jobId = req.params.id;
//         const jobData = req.body;
//         if(jobData.salaryMin > jobData.salaryMax){
//             return res.status(400).json({message:"Salary min should be less than salary max",success:false});
//         }
//         const job = await Job.findByIdAndUpdate(jobId,jobData,{new:true});
//         if(!job){
//             return res.status(400).json({message:"Job not found",success:false});
//         }
//         return res.status(200).json({message:"Job updated successfully",success:true,data:job});
//     } catch (error) {
//         return res.status(500).json({message:"Internal server error",success:false, error: error.message});   
//     }
// }


export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobData = req.body;

    // Check if required salary fields exist
    if (
      jobData.salaryMin === undefined ||
      jobData.salaryMax === undefined
    ) {
      return res.status(400).json({
        message: "Both salaryMin and salaryMax are required.",
        success: false,
      });
    }

    const salaryMin = Number(jobData.salaryMin);
    const salaryMax = Number(jobData.salaryMax);

    if (isNaN(salaryMin) || isNaN(salaryMax)) {
      return res.status(400).json({
        message: "Salary values must be numbers.",
        success: false,
      });
    }

    if (salaryMin < 0 || salaryMax < 0) {
      return res.status(400).json({
        message: "Salary values must be positive.",
        success: false,
      });
    }

    if (salaryMin > salaryMax) {
      return res.status(400).json({
        message: "Minimum salary must not be greater than maximum salary.",
        success: false,
      });
    }

    // Perform update
    const job = await Job.findByIdAndUpdate(jobId, {
      ...jobData,
      salaryMin,
      salaryMax,
    }, { new: true });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully.",
      success: true,
      data: job,
    });

  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};


// Get all Job Api
export const getAllJobs = async (req,res) => {
    try {
        const jobs = await Job.find().populate({
          path: "createdBy",
          model: "Company"
        }).sort({createdAt:-1});
        return res.status(200).json({message:"Jobs fetched successfully",success:true,data:jobs});
    } catch (error) {
        console.error("Population error:", error);
        return res.status(500).json({message:"Internal server error",success:false, error: error.message});   
    }
}

// Get Job By Company this is for adminsite
export const getJobByCompany = async (req,res) => {
    try {
        const jobs = await Job.find({company: req.params.id}).populate({
          path: "createdBy",
          model: "Company"
        }).sort({createdAt:-1});
        return res.status(200).json({message:"Jobs fetched successfully",success:true,data:jobs});
    } catch (error) {
        console.error("Population error:", error);
        return res.status(500).json({message:"Internal server error",success:false, error: error.message});   
    }
} 

// Get Job By Id this is for adminsite
export const getJobById = async (req,res) => {
    try {
        const job = await Job.findById(req.params.id);
        return res.status(200).json({message:"Job fetched successfully",success:true,data:job});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false, error: error.message});   
    }
}

// Delete Job this is for adminsite
export const deleteJob = async (req,res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"Job deleted successfully",success:true,data:job});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false, error: error.message});   
    }
}
