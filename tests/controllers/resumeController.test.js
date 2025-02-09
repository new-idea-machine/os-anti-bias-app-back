const request = require("supertest");
const server = require("../../server");
const { v4: uuidv4 } = require("uuid");
const { Resume } = require("../../db/models/resumes");
const jwt = require("jsonwebtoken");

describe("Resume Controller Tests", () => {
  const mockResume = {
    resume_id: uuidv4(),
    user: 1,
    title: "Frontend Developer",
    summary:
      "Creative frontend developer with a keen eye for design and user experience.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js"],
    education: [
      {
        degree: "Bachelor of Arts in Web Design",
        school: "Creative Institute",
        major: "Web Design",
        graduationYear: 2019,
      },
    ],
    workExperience: [
      {
        jobTitle: "UI/UX Designer",
        company: "DesignStudio",
        location: "DesignCity",
        startDate: "2020-02-15",
        endDate: "2021-12-31",
        responsibilities: [
          "Designed and implemented user interfaces",
          "Collaborated with development teams",
        ],
        achievements: [
          "Redesigned website resulting in a 30% increase in user engagement",
        ],
      },
    ],
    projects: [
      {
        projectName: "Portfolio Website",
        description:
          "Developed a personal portfolio website showcasing design and development projects.",
        rolesResponsibilities: ["Designed and implemented the entire website"],
        technologiesUsed: ["React", "CSS"],
      },
    ],
    certifications: [
      {
        certificationName: "UI/UX Design Certification",
        issuingOrganization: "Design Academy",
        dateEarned: "2020-06-10",
      },
    ],
    languages: [
      {
        languageName: "JavaScript",
        proficiencyLevel: "Advanced",
      },
      {
        languageName: "CSS",
        proficiencyLevel: "Advanced",
      },
      {
        languageName: "Vue.js",
        proficiencyLevel: "Intermediate",
      },
    ],
    references: [
      {
        referenceName: "Emily Johnson",
        relationship: "Former Manager",
        contactInformation: "emily.johnson@example.com",
      },
    ],
    contactInformation: {
      phoneNumber: "+9876543210",
      emailAddress: "john.smith@example.com",
      linkedInProfile: "https://www.linkedin.com/in/johnsmith",
      otherSocialMedia: "https://github.com/johnsmith",
    },
  };

  afterEach(async () => {
    // Clear data between tests
    await Resume.deleteMany({});
  });

  afterAll(async () => {
    // Close the server connection after all tests
    await server.close();
    console.log("server is closed");
  });
  //probably not a good test considering you shouldn't be able to access all resume data without auth
  describe("GET /api/resume", () => {
    it("should respond with a 200 status code", async () => {
      await Resume.create(mockResume);

      const response = await request(server).get("/api/resume");
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty(
        "resume_id",
        mockResume.resume_id
      );
    });

    it("should return an empty array if no resumes exist", async () => {
      const response = await request(server).get("/api/resume");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("GET /api/resume/:id", () => {
    it("should return a single resume when given a valid ID", async () => {
      const createdResume = await Resume.create(mockResume);

      const response = await request(server).get(
        `/api/resume/${createdResume.resume_id}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("resume_id", mockResume.resume_id);
    });

    it("should return 404 if resume is not found", async () => {
      const nonExistentId = uuidv4();
      const response = await request(server).get(
        `/api/resume/${nonExistentId}`
      );

      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /api/resume", () => {
    it("should create a new resume and return 201", async () => {
      const token = jwt.sign({ user: { id: 1 } }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const mockResumeWithToken = {
        ...mockResume,
        token,
      };

      const response = await request(server)
        .post("/api/resume")
        .send(mockResumeWithToken);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("resume_id");
      expect(response.body.title).toBe(mockResume.title);
    });
  });

  describe("PUT /api/resume/:id", () => {
    it("should update an existing resume", async () => {
      const createdResume = await Resume.create(mockResume);

      const updatedData = { title: "Updated Title" };
      const response = await request(server)
        .put(`/api/resume/${createdResume.resume_id}`)
        .send(updatedData);

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe("Updated Title");
    });

    it("should return 404 if trying to update a non-existent resume", async () => {
      const response = await request(server)
        .put(`/api/resume/${uuidv4()}`)
        .send({ title: "New Title" });

      expect(response.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/resume/:id", () => {
    it("should delete an existing resume and return 200", async () => {
      const createdResume = await Resume.create(mockResume);

      const response = await request(server).delete(
        `/api/resume/${createdResume.resume_id}`
      );

      expect(response.statusCode).toBe(200);
    });

    it("should return 404 if trying to delete a non-existent resume", async () => {
      const response = await request(server).delete(`/api/resume/${uuidv4()}`);

      expect(response.statusCode).toBe(404);
    });
  });
});
