const mongoose = require("../db");
const { v4: uuidv4 } = require("uuid");

const employerSchema = new mongoose.Schema({
  employer_id: {
    type: String,
    default: uuidv4,
    required: true,
    unique: true,
  },
  employer_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  number_of_employees: {
    type: Number,
    required: true,
  },
  contact_name: {
    type: String,
    required: true,
  },
  contact_email: {
    type: String,
    required: true,
  },
  established_date: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: Date.now,
  },
});

employerSchema.set("toJSON", {
  virtuals: true,
});

const Employer = mongoose.model("Employer", employerSchema);

const getAll = async () => {
  try {
    const employers = await Employer.find();
    return employers;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const employer = await Employer.findOne({ employer_id: id });
    return employer;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const employer = await Employer.create(body);
    return employer;
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const updatedEmployer = await Employer.findOneAndUpdate(
      { employer_id: id },
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    return updatedEmployer;
  } catch (error) {
    return error;
  }
};

const deleteEmployer = async (id) => {
  try {
    const deletedEmployer = await Employer.findOneAndDelete({
      employer_id: id,
    });

    if (!deletedEmployer) {
      throw new Error("Employer item not found");
    }

    return deletedEmployer;
  } catch (error) {
    return error;
  }
};

const getByUser = async (id) => {
  try {
    const employer = await Employer.findOne({ user: id });
    return employer;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteEmployer,
  Employer,
  getByUser,
};
