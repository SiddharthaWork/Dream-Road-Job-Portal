import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    location:{type:String,required:true},
    salary:{type:Number,required:true},
    jobType:{type:String,required:true},
    position:{type:String,required:true},
    company:{   
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"   
    },
    createdAt:{type:Date,default:Date.now},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"   
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Application"   
    }], 


},{timestamps:true});

export const Job = mongoose.model('Job',jobSchema);
