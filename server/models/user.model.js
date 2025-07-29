import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","company","admin"],
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    profile: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        gender: { type: String, default: '' },
        phoneNumber: { type: String, default: '' },
        dateOfBirth: { type: String, default: '' },
        sectors: { type: [String], default: [] },
        designation: { type: String, default: '' },
        aboutMe: { type: String, default: '' },
        city: { type: String, default: '' },
        currentAddress: { type: String, default: '' },
        postalCode: { type: String, default: '' },
        province: { type: String, default: '' },
        education: [{
          id: String,
          collegeType: String,
          degree: String,
          city: String,
          startDate: String,
          graduationDate: String,
          currentlyStudying: Boolean
        }],
        projects: [{
          id: String,
          title: String,
          description: String,
          link: String
        }],
        skills: { type: [String], default: [] },
        achievements: [{
          id: String,
          title: String,
          description: String,
          date: String
        }],
        certificates: [{
          id: String,
          title: String,
          issuer: String,
          date: String,
          link: String
        }],
        experiences: [{
          id: String,
          jobTitle: String,
          company: String,
          location: String,
          startDate: String,
          endDate: String,
          currentlyWorking: Boolean,
          description: String
        }],
        profilePicture: { type: String },
        bio:{type:String},
        website:{type:String},
        location:{type:String},
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"   
        },
    },
    profileCompleted: { type: Boolean, default: false },
    appliedJobs:{
      type:[mongoose.Schema.Types.ObjectId],
      ref:"Application" 
    },
    block:{
        type:Boolean,
        default:false
    } 
},{timestamps:true});

export const User = mongoose.model('User',userSchema);