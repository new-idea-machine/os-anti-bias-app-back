const User = require("../db/models/users");

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

const create = async (req, res) => {
  try {
    const user = await User.create(req.body.user);
    res.send(user);
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
    const user = await User.login(req.body.username, req.body.password);

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, update, deleteUser, login };
