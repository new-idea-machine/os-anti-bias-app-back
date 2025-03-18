const mongoose = require("../db");
const { v4: uuidv4 } = require("uuid");

const jobPostSchema = new mongoose.Schema({
  employer: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  job_post_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  job_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  type_of_salary: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  type_of_work: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  modified_at: {
    type: String,
    required: true,
  },
});

jobPostSchema.set("toJSON", {
  virtuals: true,
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

// GET ALL JOBPOSTS
const getAll = async () => {
  const jobPosts = await JobPost.find();
  if (!jobPosts) throwError("No job posts found", 404);
  return jobPosts;
};

//GET ONE JOBPOST BY ID
const getOne = async (id) => {
  const jobPost = await JobPost.findOne({ job_post_id: id });
  if (!jobPost) throwError("Job post is not found", 404);
  return jobPost;
};

//CREATE NEW JOBPOST
const create = async (body) => {
  const jobPost = await JobPost.create(body);
  if (!jobPost) throwError("Failed to create a job post", 400);
  return jobPost;
};

// UPDATE JOBPOST
const update = async (id, body) => {
  const updatedJobPost = await JobPost.findOneAndUpdate(
    { job_post_id: id },
    { ...body, modified_at: new Date() },
    { new: true }
  );
  if (!updatedJobPost) throwError("Job post is not found", 404);
  return updatedJobPost;
};

// DELETE JOBPOST
const deleteJobPost = async (id) => {
  const deletedJobPost = await JobPost.findOneAndDelete({ job_post_id: id });
  if (!deletedJobPost) throwError("Job Post item is not found", 404);
  return {
    message: "Job Post deleted successfully",
    job_title: deletedJobPost.job_title,
  };
};

// GET JOBPOSTS BY EMPLOYER ID
const getByEmployer = async (id) => {
  const jobPosts = await JobPost.find({ employer: id });
  if (jobPosts.length === 0) throwError("Job posts are not found", 404);
  return jobPosts;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteJobPost,
  JobPost,
  getByEmployer,
};
