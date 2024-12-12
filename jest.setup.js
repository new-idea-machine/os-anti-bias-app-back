const dotenv = require("dotenv");

dotenv.config({ path: ".env.test" });

// jest.setup.js
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
  await mongoose.disconnect();
  // Start the in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();

  // Get the MongoDB URI for the in-memory database
  const mongoUri = mongoServer.getUri();

  // Set the MONGO_URI environment variable to point to the in-memory MongoDB URI
  process.env.MONGO_URI = mongoUri;

  // Connect Mongoose to the in-memory MongoDB server instead of the cloud
  await mongoose.connect(mongoUri);
  console.log(`MongoDB successfully connected to ${mongoUri}`);
});

afterAll(async () => {
  // Disconnect mongoose and stop the in-memory MongoDB server
  await mongoose.disconnect();
  await mongoServer.stop();
});
