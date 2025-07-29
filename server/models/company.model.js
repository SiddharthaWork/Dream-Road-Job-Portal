import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:["user","company","admin"],default:"company"},
    phoneNumber:{type:String,required:true},
    website:{type:String},
    location:{type:String},
    logo:{type:String},
    industry:{type:String},
    size:{type:String},
    
    description:{type:String},

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"   
    },
    block:{
        type:Boolean,
        default:false
    },
    deletedJobs:{
        type:[String],
        default:[]
    },
    block:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

export const Company = mongoose.model('Company',companySchema);