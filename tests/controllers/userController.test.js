const request = require("supertest");
const server = require("../../server");
const { hashPassword } = require("../../utils/cryptoHelpers");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../db/models/users");

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

  afterAll(async () => {
    // Close the server connection after all tests
    await server.close();
    console.log("server is closed");
  });

  describe("GET /api/users", () => {
    it("should respond with a 200 status code", async () => {
      await User.create(mockUser);

      const response = await request(server).get("/api/users");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("username", mockUser.username);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return a user by ID with 200 status", async () => {
      // Create a user to test
      const createdUser = await User.create(mockUser);
      testUserId = createdUser.user_id;

      const response = await request(server).get(`/api/users/${testUserId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("username", mockUser.username);
    });

    it("should return 404 if user is not found", async () => {
      const nonExistentId = uuidv4();
      const response = await request(server).get(`/api/users/${nonExistentId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("user not found");
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user and return 201 status", async () => {
      const response = await request(server)
        .post("/api/users")
        .send({ user: mockUser });
      expect(response.statusCode).toBe(201);
      expect(response.body.user).toHaveProperty("username", mockUser.username);
    });
    // //IMPLEMENT AN ERROR CODE WHEN FIELDS ARE MISSING
    // it.only("should return 400 if required fields are missing", async () => {
    //   const invalidUser = { first_name: "John" };

    //   const response = await request(server)
    //     .post("/api/users")
    //     .send({ user: invalidUser });
    //   console.log(response.body);
    //   expect(response.statusCode).toBe(400);
    //   expect(response.body.message).toBe("Validation failed");
    // });
  });

  describe("PUT /api/users/:id", () => {
    it("should update an existing user and return 200 status", async () => {
      // Create a user to update
      const createdUser = await User.create(mockUser);
      testUserId = createdUser.user_id;

      const updatedUser = { ...mockUser, first_name: "Jane" };

      const response = await request(server)
        .put(`/api/users/${testUserId}`)
        .send(updatedUser);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("first_name", "Jane");
    });

    it("should return 404 if trying to update a non-existent user", async () => {
      const nonExistentId = uuidv4();
      const response = await request(server)
        .put(`/api/users/${nonExistentId}`)
        .send({ first_name: "Jane" });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user by ID and return 200 status", async () => {
      // Create a user to delete
      const createdUser = await User.create(mockUser);
      testUserId = createdUser.user_id;
      const response = await request(server).delete(`/api/users/${testUserId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("User deleted successfully");
    });

    it("should return 404 if trying to delete a non-existent user", async () => {
      const nonExistentId = uuidv4();
      const response = await request(server).delete(
        `/api/users/${nonExistentId}`
      );

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });
});
