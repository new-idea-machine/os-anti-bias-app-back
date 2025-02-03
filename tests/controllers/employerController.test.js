const request = require("supertest"); //JS library for testing HTTP servers
const server = require("../../server");
const { v4: uuidv4 } = require("uuid");
const { Employer } = require("../../db/models/employers");
const jwt = require("jsonwebtoken");

describe("Employer Controller Tests", () => {
  const mockEmployer = {
    employer_id: uuidv4(),
    employer_name: "ABC Company",
    username: "abc_company",
    password: "password123",
    user: 1,
    description: "A leading company in the industry",
    number_of_employees: 100,
    contact_name: "John Doe",
    contact_email: "john.doe@abccompany.com",
    established_date: "2020-01-01",
    created_at: "2023-01-01T12:00:00",
    modified_at: "2023-01-02T08:30:00",
  };

  afterEach(async () => {
    await Employer.deleteMany({});
  });

  afterAll(async () => {
    await server.close();
    console.log("server is closed");
  });

  describe("GET /api/employers", () => {
    it("should respond with a 200 status code", async () => {
      await Employer.create(mockEmployer);

      const response = await request(server).get("/api/employers");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );
    });
  });

  describe("GET /api/employers/:id", () => {
    it("should return an employer by ID with 200 status", async () => {
      // Create a user to test
      const createdEmployer = await Employer.create(mockEmployer);
      testEmployerId = createdEmployer.employer_id;

      const response = await request(server).get(
        `/api/employers/${testEmployerId}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );
    });

    it("should return 404 if employer is not found", async () => {
      const nonExistentId = uuidv4();
      const response = await request(server).get(
        `/api/employers/${nonExistentId}`
      );

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("employer not found");
    });
  });

  describe("POST /api/employers", () => {
    it("should create a new employer and return 201 status", async () => {
      const token = jwt.sign({ user: { id: 1 } }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const mockEmployerWithToken = {
        ...mockEmployer,
        token,
      };

      const response = await request(server)
        .post("/api/employers")
        .send(mockEmployerWithToken);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );
    });
  });

  describe("PUT /api/employers/:id", () => {
    it("should update an existing employer and return 200 status", async () => {
      const createdEmployer = await Employer.create(mockEmployer);
      testEmployerId = createdEmployer.employer_id;

      const updatedEmployer = {
        ...mockEmployer,
        employer_name: "XYZ Corporation",
      };

      const response = await request(server)
        .put(`/api/employers/${testEmployerId}`)
        .send(updatedEmployer);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("employer_name", "XYZ Corporation");
    });
  });

  describe("DELETE /api/employers/:id", () => {
    it("should delete an employer by ID and return 200 status", async () => {
      const createdEmployer = await Employer.create(mockEmployer);
      testEmployerId = createdEmployer.employer_id;

      const response = await request(server).delete(
        `/api/employers/${testEmployerId}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Employer deleted successfully");
    });
  });
});
