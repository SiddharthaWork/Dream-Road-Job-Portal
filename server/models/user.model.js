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
    
    profile:{
        bio:{type:String},
        website:{type:String},
        location:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        // company:{type:String},
        company:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"   
        },
        profilePicture:{type:String},
     }    

},{timestamps:true});

export const User = mongoose.model('User',userSchema);