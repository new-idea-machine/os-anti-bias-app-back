const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const mongoose = require("./db");
const { create: createUser } = require("./models/users");
const { create: createEmployer, Employer } = require("./models/employers");
const { create: createJobPost } = require("./models/jobPosts");
const { MONGO_URI } = process.env;

const userData = [
  {
    user_id: uuidv4(),
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    password: "password123",
    country: "USA",
    city: "New York",
  },
  {
    user_id: uuidv4(),
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    password: "securepass",
    country: "Canada",
    city: "Toronto",
  },
  {
    user_id: uuidv4(),
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    username: "alicej",
    password: "alicepass",
    country: "UK",
    city: "London",
  },
  {
    user_id: uuidv4(),
    first_name: "Bob",
    last_name: "Anderson",
    email: "bob.anderson@example.com",
    username: "boband",
    password: "bobpass",
    country: "Australia",
    city: "Sydney",
  },
  {
    user_id: uuidv4(),
    first_name: "Eva",
    last_name: "Miller",
    email: "eva.miller@example.com",
    username: "evam",
    password: "evapass",
    country: "Germany",
    city: "Berlin",
  },
];

const employerData = [
  {
    employer_id: uuidv4(),
    employer_name: "ABC Company",
    username: "abc_company",
    password: "password123",
    description: "A leading company in the industry",
    number_of_employees: 100,
    contact_name: "John Doe",
    contact_email: "john.doe@abccompany.com",
    established_date: "2020-01-01",
    created_at: "2023-01-01T12:00:00",
    modified_at: "2023-01-02T08:30:00",
  },
  {
    employer_id: uuidv4(),
    employer_name: "XYZ Corporation",
    username: "xyz_corp",
    password: "securepassword456",
    description: "Innovative solutions for a changing world",
    number_of_employees: 500,
    contact_name: "Jane Smith",
    contact_email: "jane.smith@xyzcorp.com",
    established_date: "2015-03-20",
    created_at: "2023-02-01T09:15:00",
    modified_at: "2023-02-05T11:20:00",
  },
  {
    employer_id: uuidv4(),
    employer_name: "Tech Innovators Ltd",
    username: "tech_innovators",
    password: "innovate2023",
    description: "Pioneering technology solutions for the future",
    number_of_employees: 200,
    contact_name: "Mark Johnson",
    contact_email: "mark.johnson@techinnovators.com",
    established_date: "2018-07-10",
    created_at: "2023-02-10T14:00:00",
    modified_at: "2023-02-12T16:45:00",
  },
];

const jobPostData = [
  {
    job_post_id: uuidv4(),
    employer: 1,
    start_date: "2023-01-10",
    end_date: "2023-01-31",
    job_title: "Software Developer",
    description: "Seeking a skilled software developer for exciting projects",
    requirements:
      "Bachelor's degree in Computer Science, 3+ years of experience",
    salary: 80000,
    type_of_salary: "Annual",
    country: "United States",
    city: "New York",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-01-15T10:30:00",
    modified_at: "2023-01-20T14:45:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 1,
    start_date: "2023-02-05",
    end_date: "2023-02-28",
    job_title: "Data Scientist",
    description: "Analyzing and interpreting complex data sets",
    requirements: "Master's degree in Data Science, Python expertise",
    salary: 95000,
    type_of_salary: "Annual",
    country: "Canada",
    city: "Toronto",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-02-08T12:30:00",
    modified_at: "2023-02-15T09:10:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 2,
    start_date: "2023-02-12",
    end_date: "2023-03-10",
    job_title: "UX/UI Designer",
    description: "Creating intuitive and visually appealing user interfaces",
    requirements: "Bachelor's degree in Design, 4+ years of UX/UI experience",
    salary: 80000,
    type_of_salary: "Annual",
    country: "United Kingdom",
    city: "London",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-02-15T15:45:00",
    modified_at: "2023-02-18T11:20:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 2,
    start_date: "2023-03-01",
    end_date: "2023-03-15",
    job_title: "Network Engineer",
    description: "Designing and implementing computer networks",
    requirements: "CCNA certification, 5+ years of networking experience",
    salary: 90000,
    type_of_salary: "Annual",
    country: "Australia",
    city: "Sydney",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-02-25T09:30:00",
    modified_at: "2023-03-02T14:15:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 2,
    start_date: "2023-03-10",
    end_date: "2023-04-05",
    job_title: "Marketing Specialist",
    description: "Developing and executing marketing strategies",
    requirements:
      "Bachelor's degree in Marketing, 3+ years of marketing experience",
    salary: 75000,
    type_of_salary: "Annual",
    country: "Germany",
    city: "Berlin",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-03-05T11:45:00",
    modified_at: "2023-03-08T16:20:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 1,
    start_date: "2023-04-01",
    end_date: "2023-04-30",
    job_title: "Software Engineer",
    description:
      "Join our team of software engineers to build innovative solutions",
    requirements: "Bachelor's degree in Computer Science, proficiency in Java",
    salary: 85000,
    type_of_salary: "Annual",
    country: "United States",
    city: "San Francisco",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-03-25T13:15:00",
    modified_at: "2023-03-28T10:30:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 3,
    start_date: "2023-05-10",
    end_date: "2023-06-10",
    job_title: "Graphic Designer",
    description: "Create stunning visual designs for our marketing materials",
    requirements:
      "Degree in Graphic Design, proficiency in Adobe Creative Suite",
    salary: 70000,
    type_of_salary: "Annual",
    country: "Canada",
    city: "Vancouver",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-05-05T09:45:00",
    modified_at: "2023-05-08T14:20:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 3,
    start_date: "2023-06-15",
    end_date: "2023-07-15",
    job_title: "Financial Analyst",
    description:
      "Analyze financial data and provide insights for strategic decision-making",
    requirements: "Bachelor's degree in Finance, strong analytical skills",
    salary: 90000,
    type_of_salary: "Annual",
    country: "United Kingdom",
    city: "Edinburgh",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-06-10T11:30:00",
    modified_at: "2023-06-12T16:45:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 3,
    start_date: "2023-07-01",
    end_date: "2023-07-31",
    job_title: "Customer Support Specialist",
    description: "Provide excellent customer support via phone and email",
    requirements:
      "Excellent communication skills, previous customer support experience",
    salary: 60000,
    type_of_salary: "Annual",
    country: "Australia",
    city: "Melbourne",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-06-25T10:00:00",
    modified_at: "2023-06-28T14:15:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 1,
    start_date: "2023-08-05",
    end_date: "2023-08-31",
    job_title: "Quality Assurance Engineer",
    description:
      "Ensure the quality of software products through rigorous testing",
    requirements:
      "Bachelor's degree in Computer Science, experience in QA testing",
    salary: 80000,
    type_of_salary: "Annual",
    country: "Germany",
    city: "Munich",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-08-01T12:45:00",
    modified_at: "2023-08-04T09:30:00",
  },
];

const preload = async () => {
  try {
    console.log("Establishing database connection");
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Dropping the 'users' collection");
    await mongoose.connection.collections.users.drop();
    console.log("The 'users' collection dropped");

    console.log("Dropping the 'employers' collection");
    await mongoose.connection.collections.employers.drop();
    console.log("The 'employer' collection dropped");

    console.log("Dropping the 'jobPosts' collection");
    await mongoose.connection.collections.jobposts.drop();
    console.log("The 'jobPosts' collection dropped");

    console.log("Seeding data");
    await Promise.all([
      ...userData.map((user) => createUser(user)),
      ...employerData.map((employer) => createEmployer(employer)),
    ]);

    //Store Employer seed data from database (for ObjectId)
    const createdEmployers = await Employer.find();

    // Utility function to get a random employer ID
    const getRandomEmployerId = (employers) => {
      const randomIndex = Math.floor(Math.random() * employers.length);
      return employers[randomIndex]._id;
    };

    const jobPostDataWithObjectId = jobPostData.map((jobPost) => ({
      ...jobPost,
      employer: getRandomEmployerId(createdEmployers),
    }));

    await Promise.all(
      jobPostDataWithObjectId.map((jobPost) => createJobPost(jobPost))
    );

    console.log("🌱🌱 Data seeded successfully! 🌱🌱");
  } catch (error) {
    console.error("Error during preload:", error);
  } finally {
    await mongoose.connection.close();
  }
};

if (require.main === module) {
  preload();
}
module.exports = preload;
