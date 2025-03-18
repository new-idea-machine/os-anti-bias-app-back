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

describe("Resume Model Tests", () => {});
