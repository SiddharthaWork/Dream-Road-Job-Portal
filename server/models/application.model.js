import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job", 
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",   
        required:true
    },
    resume:{type:String},
    resumeOriginalName:{type:String},
    coverLetter:{type:String},
    status:{type:String,enum:["pending","accepted","rejected"],default:"pending"},
    createdAt:{type:Date,default:Date.now},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:true   
    },  
},{timestamps:true});

export const Application = mongoose.model('Application',applicationSchema);
