const {
  getAll,
  getOne,
  create,
  update,
  deleteResume,
  Resume,
  getByUser,
} = require("../../db/models/resumes");

const { v4: uuidv4 } = require("uuid");

describe("Resume Model Tests", () => {
  let testResumeId;
  let testUserId;

  const mockResume = {
    resume_id: uuidv4(),
    user: "1",
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

  describe("Create a resume", () => {
    it("should create a resume", async () => {
      const resume = await create(mockResume);
      testResumeId = resume.resume_id;

      expect(resume).toHaveProperty("title", mockResume.title);
      expect(resume).toHaveProperty("resume_id", mockResume.resume_id);
    });
  });

  describe("Get All Resume", () => {
    it("should return an array of resume", async () => {
      await create(mockResume);
      const resumes = await getAll();

      expect(resumes.length).toBe(1);
      expect(resumes[0]).toHaveProperty("title", mockResume.title);
    });

    it("should return empty array if no resumes exist", async () => {
      const resumes = await getAll();
      expect(resumes.length).toBe(0);
    });
  });

  describe("Get Resume by ID", () => {
    it("should return a resume by ID", async () => {
      const resume = await create(mockResume);
      testResumeId = resume.resume_id;

      const foundResume = await getOne(testResumeId);
      expect(foundResume).toHaveProperty("resume_id", mockResume.resume_id);
    });

    it("should throw an error if resume does not exist", async () => {
      await expect(getOne(uuidv4())).rejects.toThrow("Resume not found");
    });
  });

  describe("Update Resume", () => {
    it("should update an existing resume", async () => {
      const resume = await create(mockResume);
      testResumeId = resume.resume_id;

      const updatedResume = await update(testResumeId, {
        title: "Updated Title",
      });
      expect(updatedResume).toHaveProperty("title", "Updated Title");
    });

    it("should throw an error if resume does not exist", async () => {
      await expect(update(uuidv4(), { title: "New Name" })).rejects.toThrow(
        "Resume not found"
      );
    });
  });
  describe("Delete Resume", () => {
    it("should delete a resume by ID", async () => {
      const resume = await create(mockResume);
      testResumeId = resume.resume_id;

      const deletedResume = await deleteResume(testResumeId);
      expect(deletedResume).toHaveProperty(
        "message",
        "Resume deleted successfully"
      );

      await expect(getOne(testResumeId)).rejects.toThrow("Resume not found");
    });

    it("should throw an error if resume does not exist", async () => {
      await expect(deleteResume(uuidv4())).rejects.toThrow(
        "Resume item is not found"
      );
    });
  });
  describe("Get Resume by User ID", () => {
    it("should return resume by user ID", async () => {
      await create(mockResume);
      testUserId = mockResume.user;
      const resume = await getByUser(testUserId);

      expect(resume).toHaveProperty("user", testUserId);
    });

    it("should throw an error if resume does not exist for user ID", async () => {
      await expect(getByUser(uuidv4())).rejects.toThrow("Resume not found");
    });
  });
});
