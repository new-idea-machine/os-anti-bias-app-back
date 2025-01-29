const request = require("supertest"); //JS library for testing HTTP servers
const server = require("../../server");
const { v4: uuidv4 } = require("uuid");
const { Employer } = require("../../db/models/employers");

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
});
