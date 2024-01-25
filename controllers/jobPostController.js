const JobPost = require("../db/models/jobPosts");

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
    const jobPost = await JobPost.create(req.body);
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

module.exports = { getAll, getOne, create, update, deleteJobPost };
