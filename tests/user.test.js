const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const { User, create, getAll } = require("../db/models/users");
const { hashPassword } = require("../utils/cryptoHelpers");
const { v4: uuidv4 } = require("uuid");

let mongoServer;

const mockUser = {
  user_id: uuidv4(),
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  username: "johndoe123",
  password: "password123",
  role: "user",
};

describe("User Model Test Suite", () => {
  beforeAll(async () => {
    // Start MongoMemoryServer and connect Mongoose to the in-memory database
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Close the connection and stop MongoMemoryServer
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Clear data between tests
    await User.deleteMany({});
  });

  it("should create a new user", async () => {
    const hashedPassword = await hashPassword(mockUser.password);
    const userData = { ...mockUser, password: hashedPassword };

    const createdUser = await create({ user: userData });
    console.log(createdUser, "💁🏻‍♂️");
    // Ensure the user has the correct properties
    expect(createdUser).toHaveProperty("username", mockUser.username);
    expect(createdUser).toHaveProperty("email", mockUser.email);
    expect(createdUser).toHaveProperty("token"); // Check token property
    expect(createdUser).toHaveProperty("user_id"); // Ensure user_id is present
    expect(createdUser).toHaveProperty("created_at"); // Ensure created_at is present
    expect(createdUser).toHaveProperty("modified_at"); // Ensure modified_at is present
  });

  it("should retrieve all users", async () => {
    const hashedPassword = await hashPassword(mockUser.password);
    await User.create({ ...mockUser, password: hashedPassword });

    const users = await getAll();

    expect(users.length).toBe(1); // Ensure there is exactly one user in the database
    expect(users[0]).toHaveProperty("username", mockUser.username);
    expect(users[0]).toHaveProperty("email", mockUser.email); // Ensure the email is correct
    expect(users[0]).toHaveProperty("user_id"); // Ensure user_id is present
    expect(users[0]).toHaveProperty("created_at"); // Ensure created_at is present
    expect(users[0]).toHaveProperty("modified_at"); // Ensure modified_at is present
  });
});
