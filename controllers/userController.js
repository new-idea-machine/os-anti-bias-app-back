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

const getCurrentUser = async (req, res) => {
  try {
    // Check for Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "No authorization header provided" });
    }

    // Extract Token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded?.user?.id;

    if (!userId) {
      return res.status(403).json({ error: "Invalid token payload" });
    }

    // Fetch User
    const user = await User.getCurrentUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Success Response
    res.status(200).json({ user });
  } catch (error) {
    // Token verification error
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }
};

const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
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
