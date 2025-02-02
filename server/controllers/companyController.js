import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose"; // Import mongoose
import Company from "../models/Company.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js"; // Import User model
import generateToken from "../utils/generateToken.js";

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.json({ success: false, message: "Company already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (await bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        message: "Login Successful",
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get Company data
export const getCompanyData = async (req, res) => {
  try {
    const company = req.company;
    res.json({ success: true, company });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;
  const companyId = req.company._id;
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      date: Date.now(),
      level,
      category,
    });
    await newJob.save();
    res.json({ success: true, newJob , message:'Job Posted Successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get company Job Applicants
export const getCompanyJobApplicants = async (req, res) => {
  try {
    const companyId = req.company._id;

    //Find job applications for the user and populate related data

    const applications = await JobApplication.find({companyId})
    .populate('userId', 'name image resume')
    .populate('jobId', 'title location category level salary')
    .exec()

    return res.json({
      success:true,
      applications
    })
  } catch (error) {
    res.json({success:false, message: error.message})
  }
};

//Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;

    const jobs = await Job.find({ companyId });

    //Adding no of applicants info in data
     const jobsData = await Promise.all(jobs.map(async(job)=>{
      const applicants = await JobApplication.find({jobId: job._id});
      return {...job.toObject(), applicants:applicants.length}
    }))

    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Change job Application status
export const changeJobApplicationsStatus = async (req, res) => {

 try {
  const {id,status} = req.body;

  //Find job application and update status
  await JobApplication.findOneAndUpdate({
    _id : id
  },{status})
  res.json({
    success:true, message:'Status Changed'
  })
 } catch (error) {
  res.json({success:false, message:error.message})
 }
};

//Change job visibility
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;

    const companyId = req.company._id;

    const job = await Job.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // Convert userId to ObjectId
    const userObjectId = mongoose.Types.ObjectId(userId);

    // Check if user exists
    const user = await User.findById(userObjectId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User Not Found' });
    }

    // Create a new job application
    const jobApplication = new JobApplication({
      userId: userObjectId,
      jobId,
      // ...other fields
    });

    await jobApplication.save();
    res.status(201).json({ success: true, message: 'Job Application Submitted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  registerCompany,
  loginCompany,
  getCompanyData,
  postJob,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  changeJobApplicationsStatus,
  changeVisibility,
  applyForJob, // Export applyForJob
};