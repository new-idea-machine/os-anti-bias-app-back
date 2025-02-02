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

const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

//GET ALL EMPLOYERS
const getAll = async () => {
  const employers = await Employer.find();
  if (!employers) throwError("NO employers found", 404);
  return employers;
};

//GET ONE EMPLOYER BY ID
const getOne = async (id) => {
  const employer = await Employer.findOne({ employer_id: id });
  if (!employer) throwError("employer not found", 404);
  return employer;
};

//CREATE A NEW EMPLOYER
const create = async (body) => {
  const employer = await Employer.create(body);
  if (!employer) throwError("Employer profile creation failed", 404);
  return employer;
};

//UPDATE EMPLOYER
const update = async (id, body) => {
  const updatedEmployer = await Employer.findOneAndUpdate(
    { employer_id: id },
    { ...body, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedEmployer) throwError("Employer not found", 404);
  return updatedEmployer;
};

//DELETE EMPLOYER
const deleteEmployer = async (id) => {
  const deletedEmployer = await Employer.findOneAndDelete({
    employer_id: id,
  });
  if (!deletedEmployer) throwError("Employer item not found", 404);
  return deletedEmployer;
};

//GET EMPLOYER BY USER ID
const getByUser = async (id) => {
  const employer = await Employer.findOne({ user: id });
  if (!employer) throwError("Employer not found", 404);
  return employer;
};

//GET ALL EMPLOYER BY EMPLOYER NAME
const getAllByName = async (employer_name) => {
  const employers = await Employer.find({
    employer_name: { $regex: employer_name, $options: "i" },
  });
  return employers;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteEmployer,
  Employer,
  getByUser,
  getAllByName,
};
