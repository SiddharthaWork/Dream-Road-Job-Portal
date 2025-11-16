import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  experience: { type: String },
  salaryMin: { type: Number, required: true },
  salaryMax: { type: Number, required: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  benefits: { type: String, required: true },
  hasDeadline: { type: Boolean, default: false },
  deadline: { type: Date },
  skills: [{ type: String }],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application"  
  }],
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);
