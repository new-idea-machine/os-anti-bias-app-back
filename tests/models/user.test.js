const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
  login,
  getCurrentUser,
  User,
} = require("../../db/models/users");
const { hashPassword } = require("../../utils/cryptoHelpers");
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

// describe("User Model Test Suite", () => {
beforeAll(async () => {
  // Start MongoMemoryServer and connect Mongoose to the in-memory database
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.createConnection(uri, {});
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

// CREATE USER TEST
describe("User Model Tests", () => {
  it("should create a new user", async () => {
    const createdUser = await create({ user: mockUser });

    expect(createdUser).toHaveProperty("username", mockUser.username);
    expect(createdUser).toHaveProperty("email", mockUser.email);
    expect(createdUser).toHaveProperty("token");
  });

  // GET ALL USERS TEST
  it("should retrieve all users", async () => {
    await User.create({
      ...mockUser,
      password: await hashPassword(mockUser.password),
    });
    const users = await getAll();

    expect(users.length).toBe(1);
    expect(users[0]).toHaveProperty("username", mockUser.username);
  });

  // GET ONE USER BY ID TEST
  it("should retrieve a single user by ID", async () => {
    const createdUser = await User.create({
      ...mockUser,
      password: await hashPassword(mockUser.password),
    });
    const user = await getOne(createdUser.user_id);

    expect(user).toHaveProperty("username", mockUser.username);
    expect(user).toHaveProperty("email", mockUser.email);
  });

  // UPDATE USER TEST
  it("should update a user", async () => {
    const createdUser = await User.create({
      ...mockUser,
      password: await hashPassword(mockUser.password),
    });
    const updatedData = { first_name: "Johnny", city: "Los Angeles" };

    const updatedUser = await update(createdUser.user_id, updatedData);

    expect(updatedUser).toHaveProperty("first_name", updatedData.first_name);
    expect(updatedUser).toHaveProperty("city", updatedData.city);
  });

  // DELETE USER TEST
  it("should delete a user", async () => {
    const createdUser = await User.create({
      ...mockUser,
      password: await hashPassword(mockUser.password),
    });

    const response = await deleteUser(createdUser.user_id);
    expect(response).toHaveProperty("message", "User deleted successfully");
    expect(response).toHaveProperty("username", mockUser.username);

    const users = await getAll();
    expect(users.length).toBe(0);
  });

  // LOGIN USER TEST
  it("should login a user", async () => {
    const hashedPassword = await hashPassword(mockUser.password);
    await User.create({ ...mockUser, password: hashedPassword });

    const loggedInUser = await login(mockUser.username, mockUser.password);

    expect(loggedInUser).toHaveProperty("username", mockUser.username);
    expect(loggedInUser).toHaveProperty("email", mockUser.email);
    expect(loggedInUser).toHaveProperty("token");
  });

  // GET CURRENT USER TEST
  it("should retrieve current user using JWT token", async () => {
    const hashedPassword = await hashPassword(mockUser.password);
    const createdUser = await User.create({
      ...mockUser,
      password: hashedPassword,
    });

    const currentUser = await getCurrentUser(createdUser.user_id);

    expect(currentUser).toHaveProperty("email", createdUser.email);
    expect(currentUser).toHaveProperty("username", createdUser.username);
    expect(currentUser).toHaveProperty("role", createdUser.role);
    expect(currentUser).toHaveProperty("token");
  });
});
