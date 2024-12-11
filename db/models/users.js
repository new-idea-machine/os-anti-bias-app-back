const mongoose = require("../db");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../../utils/token");
const { hashPassword, comparePassword } = require("../../utils/cryptoHelpers");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  resume: {
    type: String,
  },
  formatted_resume: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
  modified_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("User", userSchema);

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

//GET ALL USERS
const getAll = async () => {
  const users = await User.find();
  if (!users) throwError("No users found", 404);
  return users;
};

//GET ONE USER BY ID
const getOne = async (id) => {
  const user = await User.findOne({ user_id: id });
  if (!user) throwError("user not found", 404);
  return user;
};

//GET CURRENT USER BY JWT
const getCurrentUser = async (token) => {
  if (!token) throwError("No token provided", 401);
  const user = await User.findOne({ user_id: token });
  if (!user) throwError("User not found", 404);
  return {
    email: user.email,
    username: user.username,
    token: generateToken(user),
    role: user.role,
  };
};

//CREATE A NEW USER
const create = async (body) => {
  const existingUser = await User.findOne({ email: body.user.email });
  if (existingUser) throwError("User already exists", 409);

  const hashedPassword = await hashPassword(body.user.password);
  const userData = { ...body.user, password: hashedPassword };

  const user = await User.create(userData);

  return { ...user, token: generateToken(user) };
};

//UPDATE USER
const update = async (id, body) => {
  const updatedUser = await User.findOneAndUpdate(
    { user_id: id },
    { ...body, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedUser) throwError("User not found", 404);
  return updatedUser;
};

//DELETE USER
const deleteUser = async (id) => {
  const deletedUser = await User.findOneAndDelete({ user_id: id });

  if (!deletedUser) throwError("User not found", 404);
  return {
    message: "User deleted successfully",
    username: deletedUser.username,
  };
};

//LOGIN USER
const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throwError("User not found", 404);

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) throwError("Invalid password", 401);

  return {
    email: user.email,
    username: user.username,
    token: generateToken(user),
  };
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
  User,
  login,
  getCurrentUser,
};
