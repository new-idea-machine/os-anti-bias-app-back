const JobPost = require("../db/models/jobPosts");
const Employer = require("../db/models/employers");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const jobPost = await JobPost.getAll();
    res.send(jobPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const jobPost = await JobPost.getOne(req.params.id);
    res.send(jobPost);
  } catch (error) {
    res.status(500).send(error);
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
    res.send(jobPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedJobPost = await JobPost.update(req.params.id, req.body);
    res.send(updatedJobPost);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteJobPost = async (req, res) => {
  try {
    const deletedJobPost = await JobPost.deleteJobPost(req.params.id);

    res.send(deletedJobPost.id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByEmployer = async (req, res) => {
  try {
    const employerId = req.params.employerId;
    const jobPosts = await JobPost.getByEmployer(employerId);
    res.json(jobPosts);
  } catch (error) {
    res.status(500).send(error);
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

    return res.json({ canEdit });
  } catch (error) {
    console.error("Error checking edit permission:", error);
    return res.status(500).json({ message: "Server error" });
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
};
