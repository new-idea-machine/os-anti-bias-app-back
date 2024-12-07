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
    const token = req.body.user;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.user.id;
    const newEmployer = {
      ...req.body,
      user: userId,
    };
    const employer = await Employer.create(newEmployer);
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

    res.json(employer);
  } catch (error) {
    res.status(500).send(error);
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

    return res.json({ canEdit });
  } catch (error) {
    console.error("Error checking edit permission:", error);
    return res.status(500).json({ message: "Server error" });
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
    console.error("Error fetching employers by name:", error);
    res.status(500).send({ message: "Server error" });
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
