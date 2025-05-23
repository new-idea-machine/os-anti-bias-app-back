const request = require("supertest");
const server = require("../../server");
const { v4: uuidv4 } = require("uuid");
const { JobPost } = require("../../db/models/jobPosts");
const jwt = require("jsonwebtoken");
const { Employer } = require("../../db/models/employers");

describe("JobPost Controller Tests", () => {
  const mockJobPost = {
    job_post_id: uuidv4(),
    employer: 1,
    user: 1,
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
  };

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
    // Clear data between tests
    await JobPost.deleteMany({});
  });

  afterAll(async () => {
    // Close the server connection after all tests
    await server.close();
    console.log("server is closed");
  });

  describe("GET /api/jobPosts", () => {
    it("should respond with a 200 status code", async () => {
      await JobPost.create(mockJobPost);

      const response = await request(server).get("/api/jobPosts");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty(
        "job_title",
        mockJobPost.job_title
      );
    });
  });

  describe("GET /api/jobPosts/:id", () => {
    it("should return a job post by ID with 200 status", async () => {
      // Create a job post to test
      const createdJobPost = await JobPost.create(mockJobPost);
      testJobPostId = createdJobPost.job_post_id;

      const response = await request(server).get(
        `/api/jobPosts/${testJobPostId}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("job_title", mockJobPost.job_title);
    });

    it("should return 404 if job post is not found", async () => {
      const nonExistentId = uuidv4();
      const response = await request(server).get(
        `/api/jobposts/${nonExistentId}`
      );

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("Job post is not found");
    });
  });
  describe("POST /api/jobPosts", () => {
    it("should create a new job post and return 201 status", async () => {
      const token = jwt.sign({ user: { id: 1 } }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      await Employer.create(mockEmployer);

      const response = await request(server)
        .post("/api/jobPosts")
        .set("Authorization", `Bearer ${token}`)
        .send(mockJobPost);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("job_title", mockJobPost.job_title);
    });
  });

  describe("PUT /api/jobPosts/:id", () => {
    it("should update an existing job post", async () => {
      const createdJobPost = await JobPost.create(mockJobPost);

      const updatedData = { job_title: "Updated Title" };
      const response = await request(server)
        .put(`/api/jobPosts/${createdJobPost.job_post_id}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.job_title).toBe("Updated Title");
    });

    it("should return 404 if trying to update a non-existent job post", async () => {
      const response = await request(server)
        .put(`/api/jobPosts/${uuidv4()}`)
        .send({ title: "New Title" });

      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/jobPosts/:id", () => {
    it("should delete an existing job post and return 200", async () => {
      const createdJobPost = await JobPost.create(mockJobPost);

      const response = await request(server).delete(
        `/api/jobPosts/${createdJobPost.job_post_id}`
      );

      expect(response.statusCode).toBe(200);
    });

    it("should return 404 if trying to delete a non-existent job post", async () => {
      const response = await request(server).delete(
        `/api/jobPosts/${uuidv4()}`
      );

      expect(response.statusCode).toBe(404);
    });
  });
});
