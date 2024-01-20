const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const mongoose = require("./db");
const { create: createUser } = require("./models/users");
const { create: createEmployer } = require("./models/employers");
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

    console.log("Dropping the 'employer' collection");
    await mongoose.connection.collections.employers.drop();
    console.log("The 'employer' collection dropped");

    console.log("Seeding data");
    await Promise.all([
      ...userData.map((user) => createUser(user)),
      ...employerData.map((employer) => createEmployer(employer)),
    ]);

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
