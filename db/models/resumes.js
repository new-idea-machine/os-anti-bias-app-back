const mongoose = require("../db");
const { v4: uuidv4 } = require("uuid");

const resumeSchema = new mongoose.Schema({
  resume_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: String,
  skills: [String],
  education: [
    {
      degree: String,
      school: String,
      major: String,
      graduationYear: Number,
    },
  ],
  workExperience: [
    {
      jobTitle: String,
      company: String,
      location: String,
      startDate: Date,
      endDate: Date,
      responsibilities: [String],
      achievements: [String],
    },
  ],
  projects: [
    {
      projectName: String,
      description: String,
      rolesResponsibilities: [String],
      technologiesUsed: [String],
    },
  ],
  certifications: [
    {
      certificationName: String,
      issuingOrganization: String,
      dateEarned: Date,
    },
  ],
  languages: [
    {
      languageName: String,
      proficiencyLevel: String,
    },
  ],
  references: [
    {
      referenceName: String,
      relationship: String,
      contactInformation: String,
    },
  ],
  contactInformation: {
    phoneNumber: String,
    emailAddress: String,
    linkedInProfile: String,
    otherSocialMedia: String,
  },
});

resumeSchema.set("toJSON", {
  virtuals: true,
});

const Resume = mongoose.model("Resume", resumeSchema);

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

//GET ALL RESUMES
const getAll = async () => {
  const resumes = await Resume.find();
  if (!resumes) throwError("No resume found", 404);
  return resumes;
};

//GET ONE RESUME BY ID
const getOne = async (id) => {
  const resume = await Resume.findOne({ resume_id: id });
  if (!resume) throwError("Resume not found", 404);
  return resume;
};

//CREATE A NEW RESUME
const create = async (body) => {
  const existingResume = await Resume.findOne({ user: body.user });
  if (existingResume) throwError("This user already has a resume", 409);
  const resume = await Resume.create(body);
  if (!resume) throwError("Resume creation failed", 404);
  return resume;
};

//UPDATE RESUME
const update = async (id, body) => {
  const updatedResume = await Resume.findOneAndUpdate(
    { resume_id: id },
    { ...body, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedResume) throwError("Resume not found", 404);
  return updatedResume;
};

//DELETE RESUME
const deleteResume = async (id) => {
  const deletedResume = await Resume.findByIdAndDelete(id);

  if (!deletedResume) {
    throw new Error("Resume item is not found", 404);
  }
  return {
    message: "Resume deleted successfully",
  };
};

//GET RESUME BY USER ID;
const getByUser = async (id) => {
  const resume = await Resume.findOne({ user: id });
  if (!resume) throwError("Resume not found", 404);
  return resume;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteResume,
  Resume,
  getByUser,
};
