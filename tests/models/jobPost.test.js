const {
  getAll,
  getOne,
  create,
  update,
  deleteJobPost,
  JobPost,
  getByEmployer,
} = require("../../db/models/jobPosts");
const { v4: uuidv4 } = require("uuid");

describe("Job Post Model Tests", () => {
  let testJobPostId;
  let testEmployerId;
  let testUserId;

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

  afterEach(async () => {
    await JobPost.deleteMany({});
  });

  describe("Create Job Post", () => {
    it("should create a job post", async () => {
      const jobPost = await create(mockJobPost);
      testJobPostId = jobPost.job_post_id;

      expect(jobPost).toHaveProperty("job_title", mockJobPost.job_title);
      expect(jobPost).toHaveProperty("description", mockJobPost.description);
    });
  });

  describe("Get All Job Posts", () => {
    it("should return an array of job posts", async () => {
      await create(mockJobPost);
      const jobPosts = await getAll();

      expect(jobPosts.length).toBe(1);
      expect(jobPosts[0]).toHaveProperty("job_title", mockJobPost.job_title);
    });

    it("should return empty array if no job posts exist", async () => {
      const jobPosts = await getAll();
      expect(jobPosts.length).toBe(0);
    });
  });

  describe("Get Job Post by ID", () => {
    it("should return an job post by ID", async () => {
      const jobPost = await create(mockJobPost);
      testJobPostId = jobPost.job_post_id;

      const foundJobPost = await getOne(testJobPostId);
      expect(foundJobPost).toHaveProperty(
        "job_post_id",
        mockJobPost.job_post_id
      );
    });

    it("should throw an error if job post does not exist", async () => {
      await expect(getOne(uuidv4())).rejects.toThrow("Job post is not found");
    });
  });
  describe("Update Job Post", () => {
    it("should update an existing job post", async () => {
      const jobPost = await create(mockJobPost);
      testJobPostId = jobPost.job_post_id;

      const updatedJobPost = await update(testJobPostId, {
        job_title: "Updated Job Title",
      });
      expect(updatedJobPost).toHaveProperty("job_title", "Updated Job Title");
    });

    it("should throw an error if job post does not exist", async () => {
      await expect(update(uuidv4(), { job_title: "New Name" })).rejects.toThrow(
        "Job post is not found"
      );
    });
  });
});
