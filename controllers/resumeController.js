const Resume = require("../db/models/resumes");

const getAll = async (req, res) => {
  try {
    const resume = await Resume.getAll();
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const resume = await Resume.getOne(req.params.id);
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const resume = await Resume.create(req.body);
    res.send(resume);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedResume = await Resume.update(req.params.id, req.body);

    res.send(updatedResume);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.deleteResume(req.params.id);

    res.send(deletedResume.id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const jobPosts = await Resume.getByUser(userId);
    res.json(jobPosts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteResume,
  getByUser,
};
