const Resume = require("../db/models/resumes");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const resume = await Resume.getAll();
    res.status(200).send(resume);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const resume = await Resume.getOne(req.params.id);
    res.status(200).send(resume);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const token = req.body.user;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.user.id;
    const newResume = {
      ...req.body,
      user: userId,
    };

    const resume = await Resume.create(newResume);
    res.status(201).send(resume);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedResume = await Resume.update(req.params.id, req.body);

    res.status(200).send(updatedResume);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.deleteResume(req.params.id);

    res.status(200).send(deletedResume.id);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const resume = await Resume.getByUser(userId);
    res.status(200).json(resume);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getCurrentUserResume = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    const resume = await Resume.getByUser(userId);
    res.status(200).json(resume);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// const getFiltered = async (req, res) => {
//   try {
//     const searchString = req.query.searchString
//       ? req.query.searchString.toLowerCase()
//       : "";
//     const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
//     const resumes = await Resume.getAll();
//     const filteredResumes = resumes.filter((resume) => {
//       const matchesSearch =
//         resume.summary.toLowerCase().includes(searchString) ||
//         resume.title.toLowerCase().includes(searchString);
//       const matchesFilters = Object.keys(filters).every((key) => {
//         const filterValue = filters[key];
//         return filterValue === undefined || resume[key] === filterValue;
//       });

//       return matchesSearch && matchesFilters;
//     });

//     res.json(filteredResumes);
//   } catch (error) {
//     res.status(error.statusCode || 500).json({ message: error.message });
//   }
// };

const getFiltered = async (req, res) => {
  try {
    const { searchString, filters } = parseQueryParams(req);
    const resumes = await Resume.getAll();
    const filteredResumes = filterResumes(resumes, searchString, filters);

    res.json(filteredResumes);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// HELPER FUCNTIONS
const parseQueryParams = (req) => ({
  searchString: req.query.searchString?.toLowerCase() || "",
  filters: req.query.filters ? JSON.parse(req.query.filters) : {},
});

const filterResumes = (resumes, searchString, filters) => {
  return resumes.filter((resume) => {
    const matchesSearch = [resume.summary, resume.title].some((field) =>
      field.toLowerCase().includes(searchString)
    );

    const matchesFilters = Object.entries(filters).every(
      ([key, value]) => value === undefined || resume[key] === value
    );

    return matchesSearch && matchesFilters;
  });
};

module.exports = {
  getAll,
  getFiltered,
  getOne,
  create,
  update,
  deleteResume,
  getByUser,
  getCurrentUserResume,
};
