const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const mongoose = require("./db");
const { create: createUser } = require("./models/users");
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

    console.log("Seeding data");
    await Promise.all(userData.map((user) => createUser(user)));

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
