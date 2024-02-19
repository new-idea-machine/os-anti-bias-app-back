const User = require("../db/models/users");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const user = await User.getAll();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const user = await User.getOne(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Extracting the user ID from the authenticated token
    const userId = decoded.user.id;

    // Fetching the current user using the user ID
    const user = await User.getCurrentUser(userId);

    // Sending the user data as response
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res) => {
  try {
    const user = await User.create(req.body.user);
    res.send({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await User.update(req.params.id, req.body);

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteUser(req.params.id);

    res.send(deletedUser.id);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body.user;
    const user = await User.login(username, password);
    res.send({ user });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
  login,
  getCurrentUser,
};
