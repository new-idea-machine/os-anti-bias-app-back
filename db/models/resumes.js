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

const getAll = async () => {
  try {
    const resumes = await Resume.find();
    return resumes;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const resume = await Resume.findById(id);
    return resume;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const resume = await Resume.create(body);
    return resume;
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    );
    return updatedResume;
  } catch (error) {
    return error;
  }
};

const deleteResume = async (id) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(id);

    if (!deletedResume) {
      throw new Error("Resume item is not found");
    }
    return deleteResume;
  } catch (error) {
    return error;
  }
};

const getByUser = async (id) => {
  try {
    const resumes = await Resume.find({ user: id });
    return resumes;
  } catch (error) {
    return error;
  }
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
