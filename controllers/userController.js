const User = require("../db/models/users");
const { extractTokenFromHeader, verifyToken } = require("../utils/token");

const getAll = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const user = await User.getOne(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const decoded = verifyToken(token);

    const userId = decoded?.user?.id;
    if (!userId)
      return res.status(403).json({ error: "Invalid token payload" });

    const user = await User.getCurrentUser(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await User.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteUser(req.params.id);
    res.status(200).json(deletedUser.username);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body.user;
    const user = await User.login(username, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message });
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
