import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
   email:{type:String,required:true},
   password:{type:String,required:true},
   role:{type:String,enum:["admin"]},
   resetPasswordToken: {
       type: String
   },
   resetPasswordExpiry: {
       type: Date
   }
},{timestamps:true});

export const Admin = mongoose.model('Admin',adminSchema);