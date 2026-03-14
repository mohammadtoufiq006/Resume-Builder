import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: String,
  endDate: String,
  description: String,
});

const educationSchema = new mongoose.Schema({
  college: String,
  degree: String,
  year: String,
});

const resumeSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      location: String,
    },
    summary: String,
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [String],
    templateType: {
      type: String,
      default: "free1",
    },
  },{ timestamps: true });

export default mongoose.model("Resume", resumeSchema);