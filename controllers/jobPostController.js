const JobPost = require("../db/models/jobPosts");
const Employer = require("../db/models/employers");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const jobPost = await JobPost.getAll();
    res.status(200).send(jobPost);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const jobPost = await JobPost.getOne(req.params.id);
    res.status(200).send(jobPost);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const token = req.headers["authorization"];

    const tokenParts = token.split(" ");
    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);

    const userId = decoded.user.id;
    const employer = await Employer.getByUser(userId);

    const employerId = employer.employer_id;
    const newJobPost = {
      ...req.body,
      user: userId,
      employer: employerId,
      created_at: new Date(),
      modified_at: new Date(),
    };

    const jobPost = await JobPost.create(newJobPost);

    res.status(201).send(jobPost);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedJobPost = await JobPost.update(req.params.id, req.body);
    res.status(200).send(updatedJobPost);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteJobPost = async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedJobPost = await JobPost.deleteJobPost(req.params.id);
    console.lof(deletedJobPost);
    res.status(200).send(deletedJobPost.id);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getByEmployer = async (req, res) => {
  try {
    const employerId = req.params.employerId;
    const jobPosts = await JobPost.getByEmployer(employerId);
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const canEdit = async (req, res) => {
  try {
    const jobPost = await JobPost.getOne(req.params.id);
    const token = req.headers["authorization"];
    const tokenParts = token.split(" ");
    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    const userId = decoded.user.id;
    const canEdit = jobPost.user === userId;
    return res.status(200).json({ canEdit });
  } catch (error) {
    console.error("Error checking edit permission:", error);
    res.status(error.statusCode || 500).json({ message: error.message });
    // return res.status(500).json({ message: "Server error" });
  }
};

const getFiltered = async (req, res) => {
  try {
    const searchString = req.query.searchString
      ? req.query.searchString.toLowerCase()
      : "";
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
    const jobPosts = await JobPost.getAll();
    const filteredJobs = jobPosts.filter((job) => {
      const matchesSearch =
        job.description.toLowerCase().includes(searchString) ||
        job.job_title.toLowerCase().includes(searchString);
      const matchesFilters = Object.keys(filters).every((key) => {
        const filterValue = filters[key];
        return filterValue === undefined || job[key] === filterValue;
      });

      return matchesSearch && matchesFilters;
    });

    res.status(200).json(filteredJobs);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteJobPost,
  getByEmployer,
  canEdit,
  getFiltered,
};
