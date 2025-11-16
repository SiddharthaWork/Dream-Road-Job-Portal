import { Company } from "../models/company.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req,res) => {
    try {
        const {name, email, password, role, phoneNumber, industry, size, website, description} = req.body;
        if(!name || !email || !password || !role || !phoneNumber || !industry || !size){
            return res.status(400).json({message:"All fields are required",success:false});
        }

        const file = req.file;
        if(!file){
            return res.status(400).json({message:"Please upload a logo",success:false});
        }


        // Basically this is the all the configuration needed to upload the image in the cloudnary
        const dataUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(dataUri.content);


        

        const company = await Company.findOne({email});
        if(company){
            return res.status(400).json({message:"You Cannot Register Same Company",success:false});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        await Company.create({
            name,email
            ,password:hashedPassword
            ,role,phoneNumber,
            industry,
            size,
            logo:cloudResponse.secure_url,
            description,
            website
        });

            // save the cloudnary URL in the database
            // in the case you need the name of the image use
            //resume: cloudResponse.original_filename

        const companyData = {
            name,email
            ,password:hashedPassword
            ,role,phoneNumber,
            industry,
            size,
        }

            
        return res.status(201).json({message:"Company created successfully",success:true,data:companyData});
    } catch (error) {
        console.error('Error in registerCompany:', error);
        return res.status(500).json({message:error.message || 'Internal server error',success:false});   
    }
}   

// Creating a company login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }
    
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }
    
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password', success: false });
    }
    
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    
    const cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };  
    
    const { password: _, ...companyWithoutPassword } = company.toObject();
    res.status(200).cookie("token",token,cookieOptions).json({ message:"Company logged in successfully",success:true ,token, company: companyWithoutPassword,isLoggedIn:true, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllCompanies = async (req,res) => {
    try {
        const companies = await Company.aggregate([
            {
                $lookup: {
                    from: "jobs",
                    localField: "_id",
                    foreignField: "company",
                    as: "jobs"
                }
            },
            {
                $addFields: {
                    jobCount: { $size: "$jobs" }
                }
            },
            {
                $project: {
                    jobs: 0
                }
            }
        ]);

        if(companies.length === 0){
            return res.status(404).json({message:"Companies not found",success:false});
        }

        return res.status(200).json({message:"Companies found",success:true,data:companies});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}   

export const getCompany = async (req,res) => {
    try {
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(404).json({message:"Company not found",success:false});
        }
            return res.status(200).json({message:"Company found",success:true,data:company});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

export const updateCompany = async (req,res) => {
    try {
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(404).json({message:"Company not found",success:false});
        }
        const file = req.file;
        if(file){
            const dataUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
            company.logo = cloudResponse.secure_url;
        }   

        // updating data
        if(req.body.name){
            company.name = req.body.name;
        }
        if(req.body.email){
            company.email = req.body.email;
        }
        if(req.body.phoneNumber){
            company.phoneNumber = req.body.phoneNumber;
        }
        if(req.body.industry){
            company.industry = req.body.industry;
        }
        if(req.body.size){
            company.size = req.body.size;
        }
        if(req.body.website){
            company.website = req.body.website;
        }
        if(req.body.description){
            company.description = req.body.description;
        }

        await company.save();

        // Exclude password from the response
        const { password, ...companyData } = company.toObject();

        return res.status(200).json({message:"Company updated successfully",success:true,data:companyData});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// delete company
export const deleteCompany = async (req,res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if(!company){
            return res.status(404).json({message:"Company not found",success:false});
        }
        return res.status(200).json({message:"Company deleted successfully",success:true});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// get deleted jobs by company id
export const getDeletedJobsByCompanyId = async (req,res) => {
    try {
        const company = await Company.findById(req.params.id);
        if(!company){
            return res.status(404).json({message:"Company not found",success:false});
        }
        return res.status(200).json({message:"Deleted jobs fetched successfully",success:true,data:company.deletedJobs});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// get all company count
export const getAllCompanyCount = async (req,res) => {
    try {
        const count = await Company.countDocuments();
        return res.status(200).json({message:"Company count fetched successfully",success:true,data:count});
    } catch (error) {
        return res.status(500).json({message:"Internal server error",success:false});   
    }
}

// get all companies names and logo and job count
// export const getAllCompaniesNamesAndLogo = async (req,res) => {
//     try {
//         const companies = await Company.find({}, { name: 1, logo: 1});        
//         return res.status(200).json({message:"Companies names and logo fetched successfully",success:true,data:companies});
//     } catch (error) {
//         return res.status(500).json({message:"Internal server error",success:false});   
//     }
// }
