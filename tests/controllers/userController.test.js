const request = require("supertest");
const app = require("../../server");
// const User = require("../../db/models/users");
const { hashPassword } = require("../../utils/cryptoHelpers");
const { v4: uuidv4 } = require("uuid");
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

//MOCK USER MODEL METHODS
// jest.mock("../../db/models/users");

describe("User Controller Tests", () => {
  const mockUser = {
    user_id: uuidv4(),
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    username: "johndoe123",
    password: "password123",
    role: "user",
  };

  afterEach(async () => {
    // Clear data between tests
    await User.deleteMany({});
  });

  describe("GET /api/users", () => {
    // it("should create a new user", async () => {
    //   const createdUser = await create({ user: mockUser });

    //   expect(createdUser).toHaveProperty("username", mockUser.username);
    //   expect(createdUser).toHaveProperty("email", mockUser.email);
    //   expect(createdUser).toHaveProperty("token");
    // });
    it("should respond with a 200 status code", async () => {
      const response = await request(app).get("/api/users");
      expect(response.statusCode).toBe(200);
    });
  });
});
