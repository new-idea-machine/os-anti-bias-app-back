const Employer = require("../db/models/employers");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const employer = await Employer.getAll();
    res.send(employer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const employer = await Employer.getOne(req.params.id);
    res.send(employer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const employer = await Employer.create(req.body);
    res.send(employer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedEmployer = await Employer.update(req.params.id, req.body);

    res.send(updatedEmployer);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const deletedEmployer = await Employer.deleteEmployer(req.params.id);

    res.send(deletedEmployer.id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCurrentUserEmployerInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.user.id;
    const employer = await Employer.getByUser(userId);
    console.log(employer);
    res.json(employer);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteEmployer,
  getCurrentUserEmployerInfo,
};
