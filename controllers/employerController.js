const Employer = require("../db/models/employers");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const employer = await Employer.getAll();
    res.status(200).send(employer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const employer = await Employer.getOne(req.params.id);
    res.status(200).send(employer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const token = req.body.user;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.user.id;
    const newEmployer = {
      ...req.body,
      user: userId,
    };
    const employer = await Employer.create(newEmployer);
    res.status(201).send(employer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedEmployer = await Employer.update(req.params.id, req.body);

    res.status(200).send(updatedEmployer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteEmployer = async (req, res) => {
  try {
    const deletedEmployer = await Employer.deleteEmployer(req.params.id);

    res.status(200).send(deletedEmployer.id);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getCurrentUserEmployerInfo = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.user.id;
    const employer = await Employer.getByUser(userId);

    res.status(200).json(employer);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const userAuth = async (req, res) => {
  try {
    const token = req.headers["authorization"];

    const tokenParts = token.split(" ");

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);

    const userId = decoded.user.id;

    const employer = await Employer.getOne(req.params.id);

    const employerUserId = employer.user;

    const canEdit = userId === employerUserId;

    return res.status(200).json({ canEdit });
  } catch (error) {
    console.error("Error checking edit permission:", error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getByEmployerName = async (req, res) => {
  try {
    const { employer_name } = req.query;

    if (!employer_name) {
      return res.status(400).send({ message: "employer_name is required" });
    }

    const employers = await Employer.getAllByName(employer_name);

    if (employers.length === 0) {
      return res.status(404).send({ message: "No employers found" });
    }

    res.send(employers);
  } catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteEmployer,
  getCurrentUserEmployerInfo,
  userAuth,
  getByEmployerName,
};
