import { Job } from "../models/job.model";

export const postJob = async (req,res) => {
    try {
        const {title,description,location,company,industry,skills,experience,education} = req.body;
        if(!title || !description || !location || !company || !industry || !skills || !experience || !education){
            return res.status(400).json({message:"All fields are required",success:false});
        }

        const job = await Job.create({
            title,
            description,
            location,
            company,
            industry,
            skills,
            experience,
            education
        });

        return res.status(200).json({message:"Job created successfully",success:true,data:job});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

    