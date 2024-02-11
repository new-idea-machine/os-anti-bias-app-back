const mongoose = require("../db");
const { v4: uuidv4 } = require("uuid");
const { generateToken } = require("../../utils/auth");

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

const getAll = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const user = await User.create(body);
    const token = generateToken(user);
    return { user, token };
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndRemove(id);

    if (!deletedUser) {
      throw new Error("User item not found");
    }

    return deletedUser;
  } catch (error) {
    return error;
  }
};

const login = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    return error;
  }
};

module.exports = { getAll, getOne, create, update, deleteUser, User, login };
