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

const getAll = async () => {
  try {
    const jobPosts = await JobPost.find();
    return jobPosts;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const jobPost = await JobPost.findOne({ job_post_id: id });
    return jobPost;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const jobPost = await JobPost.create(body);
    return jobPost;
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const updatedJobPost = await JobPost.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    );
    return updatedJobPost;
  } catch (error) {
    return error;
  }
};

const deleteJobPost = async (id) => {
  try {
    const deletedJobPost = await JobPost.findByIdAndDelete(id);

    if (!deletedJobPost) {
      throw new Error("Job Post item is not found");
    }
    return deleteJobPost;
  } catch (error) {
    return error;
  }
};

const getByEmployer = async (id) => {
  try {
    const jobPosts = await JobPost.find({ employer: id });
    return jobPosts;
  } catch (error) {
    return error;
  }
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
