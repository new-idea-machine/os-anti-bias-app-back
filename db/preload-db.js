const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const mongoose = require("./db");
const { create: createUser, User } = require("./models/users");
const { create: createEmployer, Employer } = require("./models/employers");
const { create: createJobPost } = require("./models/jobPosts");
const { create: createResume } = require("./models/resumes");
const { MONGO_URI } = process.env;
const { hashPassword } = require("../utils/cryptoHelpers");

const userData = [
  {
    user_id: uuidv4(),
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    password: hashPassword("password123"),
    country: "USA",
    city: "New York",
    role: "",
  },
  {
    user_id: uuidv4(),
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    password: hashPassword("securepass"),
    country: "Canada",
    city: "Toronto",
    role: "",
  },
  {
    user_id: uuidv4(),
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    username: "alicej",
    password: hashPassword("alicepass"),
    country: "UK",
    city: "London",
    role: "",
  },
  {
    user_id: uuidv4(),
    first_name: "Bob",
    last_name: "Anderson",
    email: "bob.anderson@example.com",
    username: "boband",
    password: hashPassword("bobpass"),
    country: "Australia",
    city: "Sydney",
    role: "",
  },
  {
    user_id: uuidv4(),
    first_name: "Eva",
    last_name: "Miller",
    email: "eva.miller@example.com",
    username: "evam",
    password: hashPassword("evapass"),
    country: "Germany",
    city: "Berlin",
    role: "",
  },
];

const employerData = [
  {
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
  },
  {
    employer_id: uuidv4(),
    employer_name: "XYZ Corporation",
    username: "xyz_corp",
    password: "securepassword456",
    user: 1,
    description: "Innovative solutions for a changing world",
    number_of_employees: 500,
    contact_name: "Jane Smith",
    contact_email: "jane.smith@xyzcorp.com",
    established_date: "2015-03-20",
    created_at: "2023-02-01T09:15:00",
    modified_at: "2023-02-05T11:20:00",
  },
  {
    employer_id: uuidv4(),
    employer_name: "Tech Innovators Ltd",
    username: "tech_innovators",
    password: "innovate2023",
    user: 1,
    description: "Pioneering technology solutions for the future",
    number_of_employees: 200,
    contact_name: "Mark Johnson",
    contact_email: "mark.johnson@techinnovators.com",
    established_date: "2018-07-10",
    created_at: "2023-02-10T14:00:00",
    modified_at: "2023-02-12T16:45:00",
  },
];

const jobPostData = [
  {
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
  },
  {
    job_post_id: uuidv4(),
    employer: 1,
    user: 1,
    start_date: "2023-02-05",
    end_date: "2023-02-28",
    job_title: "Data Scientist",
    description: "Analyzing and interpreting complex data sets",
    requirements: "Master's degree in Data Science, Python expertise",
    salary: 95000,
    type_of_salary: "Annual",
    country: "Canada",
    city: "Toronto",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-02-08T12:30:00",
    modified_at: "2023-02-15T09:10:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 2,
    user: 1,
    start_date: "2023-02-12",
    end_date: "2023-03-10",
    job_title: "UX/UI Designer",
    description: "Creating intuitive and visually appealing user interfaces",
    requirements: "Bachelor's degree in Design, 4+ years of UX/UI experience",
    salary: 80000,
    type_of_salary: "Annual",
    country: "United Kingdom",
    city: "London",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-02-15T15:45:00",
    modified_at: "2023-02-18T11:20:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 2,
    user: 1,
    start_date: "2023-03-01",
    end_date: "2023-03-15",
    job_title: "Network Engineer",
    description: "Designing and implementing computer networks",
    requirements: "CCNA certification, 5+ years of networking experience",
    salary: 90000,
    type_of_salary: "Annual",
    country: "Australia",
    city: "Sydney",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-02-25T09:30:00",
    modified_at: "2023-03-02T14:15:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 2,
    user: 1,
    start_date: "2023-03-10",
    end_date: "2023-04-05",
    job_title: "Marketing Specialist",
    description: "Developing and executing marketing strategies",
    requirements:
      "Bachelor's degree in Marketing, 3+ years of marketing experience",
    salary: 75000,
    type_of_salary: "Annual",
    country: "Germany",
    city: "Berlin",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-03-05T11:45:00",
    modified_at: "2023-03-08T16:20:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 1,
    user: 1,
    start_date: "2023-04-01",
    end_date: "2023-04-30",
    job_title: "Software Engineer",
    description:
      "Join our team of software engineers to build innovative solutions",
    requirements: "Bachelor's degree in Computer Science, proficiency in Java",
    salary: 85000,
    type_of_salary: "Annual",
    country: "United States",
    city: "San Francisco",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-03-25T13:15:00",
    modified_at: "2023-03-28T10:30:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 3,
    user: 1,
    start_date: "2023-05-10",
    end_date: "2023-06-10",
    job_title: "Graphic Designer",
    description: "Create stunning visual designs for our marketing materials",
    requirements:
      "Degree in Graphic Design, proficiency in Adobe Creative Suite",
    salary: 70000,
    type_of_salary: "Annual",
    country: "Canada",
    city: "Vancouver",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-05-05T09:45:00",
    modified_at: "2023-05-08T14:20:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 3,
    user: 1,
    start_date: "2023-06-15",
    end_date: "2023-07-15",
    job_title: "Financial Analyst",
    description:
      "Analyze financial data and provide insights for strategic decision-making",
    requirements: "Bachelor's degree in Finance, strong analytical skills",
    salary: 90000,
    type_of_salary: "Annual",
    country: "United Kingdom",
    city: "Edinburgh",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-06-10T11:30:00",
    modified_at: "2023-06-12T16:45:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 3,
    user: 1,
    start_date: "2023-07-01",
    end_date: "2023-07-31",
    job_title: "Customer Support Specialist",
    description: "Provide excellent customer support via phone and email",
    requirements:
      "Excellent communication skills, previous customer support experience",
    salary: 60000,
    type_of_salary: "Annual",
    country: "Australia",
    city: "Melbourne",
    type_of_work: "Full-time",
    location: "Office-based",
    created_at: "2023-06-25T10:00:00",
    modified_at: "2023-06-28T14:15:00",
  },
  {
    job_post_id: uuidv4(),
    employer: 1,
    user: 1,
    start_date: "2023-08-05",
    end_date: "2023-08-31",
    job_title: "Quality Assurance Engineer",
    description:
      "Ensure the quality of software products through rigorous testing",
    requirements:
      "Bachelor's degree in Computer Science, experience in QA testing",
    salary: 80000,
    type_of_salary: "Annual",
    country: "Germany",
    city: "Munich",
    type_of_work: "Remote",
    location: "Anywhere",
    created_at: "2023-08-01T12:45:00",
    modified_at: "2023-08-04T09:30:00",
  },
];

const resumeData = [
  {
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
  },
  {
    resume_id: uuidv4(),
    user: 2,
    title: "Data Scientist",
    summary:
      "Data scientist with expertise in machine learning and statistical analysis.",
    skills: ["Python", "R", "Machine Learning", "Data Analysis", "SQL"],
    education: [
      {
        degree: "Master of Science in Data Science",
        school: "Data University",
        major: "Data Science",
        graduationYear: 2022,
      },
    ],
    workExperience: [
      {
        jobTitle: "Data Analyst",
        company: "DataTech",
        location: "DataCity",
        startDate: "2021-03-01",
        endDate: "2022-11-30",
        responsibilities: [
          "Conducted data analysis and reporting",
          "Developed predictive models",
        ],
        achievements: ["Improved data processing efficiency by 25%"],
      },
    ],
    projects: [
      {
        projectName: "Predictive Analytics for Sales",
        description:
          "Developed a predictive model for forecasting sales based on historical data.",
        rolesResponsibilities: [
          "Data preprocessing",
          "Model training and evaluation",
        ],
        technologiesUsed: ["Python", "Scikit-learn", "Pandas"],
      },
    ],
    certifications: [
      {
        certificationName: "Certified Data Scientist",
        issuingOrganization: "Data Science Certification Institute",
        dateEarned: "2022-05-20",
      },
    ],
    languages: [
      {
        languageName: "Python",
        proficiencyLevel: "Advanced",
      },
      {
        languageName: "R",
        proficiencyLevel: "Intermediate",
      },
      {
        languageName: "SQL",
        proficiencyLevel: "Intermediate",
      },
    ],
    references: [
      {
        referenceName: "Dr. Sarah Davis",
        relationship: "Mentor",
        contactInformation: "sarah.davis@example.com",
      },
    ],
    contactInformation: {
      phoneNumber: "+1231234567",
      emailAddress: "jane.doe@example.com",
      linkedInProfile: "https://www.linkedin.com/in/janedoe",
      otherSocialMedia: "https://twitter.com/janedoe",
    },
  },
  {
    resume_id: uuidv4(),
    user: 3,
    title: "Marketing Specialist",
    summary:
      "Results-driven marketing specialist with a focus on digital marketing and content creation.",
    skills: [
      "Digital Marketing",
      "Content Strategy",
      "Social Media Management",
      "SEO",
      "Email Marketing",
    ],
    education: [
      {
        degree: "Bachelor of Business Administration",
        school: "Marketing University",
        major: "Marketing",
        graduationYear: 2018,
      },
    ],
    workExperience: [
      {
        jobTitle: "Digital Marketing Coordinator",
        company: "DigitalHub",
        location: "MarketingCity",
        startDate: "2019-02-01",
        endDate: "2022-09-30",
        responsibilities: [
          "Developed and implemented digital marketing campaigns",
          "Managed social media accounts",
        ],
        achievements: [
          "Increased website traffic by 40% through SEO optimization",
        ],
      },
    ],
    projects: [
      {
        projectName: "Social Media Campaign",
        description:
          "Led a successful social media campaign to increase brand awareness.",
        rolesResponsibilities: [
          "Content creation",
          "Engagement tracking and analysis",
        ],
        technologiesUsed: ["Social Media Platforms", "Analytics Tools"],
      },
    ],
    certifications: [
      {
        certificationName: "Digital Marketing Certification",
        issuingOrganization: "Digital Marketing Institute",
        dateEarned: "2020-08-15",
      },
    ],
    languages: [
      {
        languageName: "Digital Marketing",
        proficiencyLevel: "Advanced",
      },
      {
        languageName: "Content Strategy",
        proficiencyLevel: "Intermediate",
      },
    ],
    references: [
      {
        referenceName: "Alex Johnson",
        relationship: "Supervisor",
        contactInformation: "alex.johnson@example.com",
      },
    ],
    contactInformation: {
      phoneNumber: "+9876543210",
      emailAddress: "mary.smith@example.com",
      linkedInProfile: "https://www.linkedin.com/in/marysmith",
      otherSocialMedia: "https://www.instagram.com/marysmith",
    },
  },
  {
    resume_id: uuidv4(),
    user: 4,
    title: "UX/UI Designer",
    summary:
      "Passionate UX/UI designer with a focus on creating delightful and intuitive user experiences.",
    skills: [
      "User Experience Design",
      "User Interface Design",
      "Wireframing",
      "Prototyping",
      "Adobe XD",
    ],
    education: [
      {
        degree: "Bachelor of Fine Arts in Graphic Design",
        school: "Design Institute",
        major: "Graphic Design",
        graduationYear: 2019,
      },
    ],
    workExperience: [
      {
        jobTitle: "UX/UI Designer",
        company: "DesignStudio",
        location: "CreativeCity",
        startDate: "2020-01-15",
        endDate: "2022-10-31",
        responsibilities: [
          "Designed and implemented user interfaces for web and mobile",
          "Conducted user research",
        ],
        achievements: [
          "Streamlined the onboarding process resulting in a 25% increase in user satisfaction",
        ],
      },
    ],
    projects: [
      {
        projectName: "Mobile App Redesign",
        description:
          "Led the redesign of a mobile app to enhance user experience and engagement.",
        rolesResponsibilities: [
          "Created wireframes and prototypes",
          "Collaborated with development teams",
        ],
        technologiesUsed: ["Adobe XD", "Sketch"],
      },
    ],
    certifications: [
      {
        certificationName: "UX Design Certification",
        issuingOrganization: "UX Design Institute",
        dateEarned: "2021-05-20",
      },
    ],
    languages: [
      {
        languageName: "User Experience Design",
        proficiencyLevel: "Advanced",
      },
      {
        languageName: "Wireframing",
        proficiencyLevel: "Intermediate",
      },
      {
        languageName: "Prototyping",
        proficiencyLevel: "Intermediate",
      },
    ],
    references: [
      {
        referenceName: "Mark Thompson",
        relationship: "Creative Director",
        contactInformation: "mark.thompson@example.com",
      },
    ],
    contactInformation: {
      phoneNumber: "+9876543210",
      emailAddress: "alice.smith@example.com",
      linkedInProfile: "https://www.linkedin.com/in/alicesmith",
      otherSocialMedia: "https://www.behance.net/alicesmith",
    },
  },
  {
    resume_id: uuidv4(),
    user: 5,
    title: "Project Manager",
    summary:
      "Dedicated project manager with a proven track record of successfully delivering projects on time and within budget.",
    skills: [
      "Project Management",
      "Scrum",
      "Agile Methodology",
      "Risk Management",
      "Communication",
    ],
    education: [
      {
        degree: "Master of Business Administration",
        school: "Business University",
        major: "Business Administration",
        graduationYear: 2020,
      },
    ],
    workExperience: [
      {
        jobTitle: "Project Manager",
        company: "TechProjects",
        location: "ProjectCity",
        startDate: "2021-02-01",
        endDate: "2022-12-31",
        responsibilities: [
          "Led project planning and execution",
          "Collaborated with cross-functional teams",
        ],
        achievements: [
          "Completed a critical project ahead of schedule with 0% budget variance",
        ],
      },
    ],
    projects: [
      {
        projectName: "Software Implementation",
        description:
          "Managed the end-to-end implementation of a new software system for the organization.",
        rolesResponsibilities: [
          "Developed project timelines and milestones",
          "Mitigated project risks",
        ],
        technologiesUsed: ["Project Management Tools", "Scrum"],
      },
    ],
    certifications: [
      {
        certificationName: "Project Management Professional (PMP)",
        issuingOrganization: "Project Management Institute",
        dateEarned: "2021-07-15",
      },
    ],
    languages: [
      {
        languageName: "Project Management",
        proficiencyLevel: "Advanced",
      },
      {
        languageName: "Scrum",
        proficiencyLevel: "Intermediate",
      },
    ],
    references: [
      {
        referenceName: "David Miller",
        relationship: "Senior Manager",
        contactInformation: "david.miller@example.com",
      },
    ],
    contactInformation: {
      phoneNumber: "+1234567890",
      emailAddress: "john.jones@example.com",
      linkedInProfile: "https://www.linkedin.com/in/johnjones",
      otherSocialMedia: "https://twitter.com/johnjones",
    },
  },
];

const preload = async () => {
  try {
    console.log("Establishing database connection");
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Dropping the 'users' collection");
    await mongoose.connection.collections.users.drop();
    console.log("The 'users' collection dropped");

    console.log("Dropping the 'employers' collection");
    await mongoose.connection.collections.employers.drop();
    console.log("The 'employer' collection dropped");

    console.log("Dropping the 'jobPosts' collection");
    await mongoose.connection.collections.jobposts.drop();
    console.log("The 'jobPosts' collection dropped");

    console.log("Dropping the 'resumes' collection");
    await mongoose.connection.collections.resumes.drop();
    console.log("The 'resumes' collection dropped");

    console.log("Seeding data");

    await Promise.all(userData.map((user) => createUser({ user: user })));

    const createdUsers = await User.find();

    const getRandomUserId = (users) => {
      const randomIndex = Math.floor(Math.random() * users.length);

      return users[randomIndex].user_id;
    };

    const employerDataWithUserId = employerData.map((employer) => {
      return {
        ...employer,
        user: getRandomUserId(createdUsers),
      };
    });

    console.log(employerDataWithUserId);

    await Promise.all(
      employerDataWithUserId.map((employer) => createEmployer(employer))
    );

    //Store Employer seed data from database
    const createdEmployers = await Employer.find();

    // Utility function to get a random employer ID
    const getRandomEmployerId = (employers) => {
      const randomIndex = Math.floor(Math.random() * employers.length);
      return {
        employer_id: employers[randomIndex].employer_id,
        user_id: employers[randomIndex].user,
      };
    };

    const jobPostDataWithId = jobPostData.map((jobPost) => {
      const { employer_id, user_id } = getRandomEmployerId(createdEmployers);
      console.log("userID", user_id);
      return {
        ...jobPost,
        employer: employer_id,
        user: user_id,
      };
    });

    await Promise.all(
      jobPostDataWithId.map((jobPost) => createJobPost(jobPost))
    );

    const resumeDataWithId = resumeData.map((resume, index) => ({
      ...resume,
      user: createdUsers[index].user_id,
    }));

    await Promise.all(resumeDataWithId.map((resume) => createResume(resume)));

    console.log("🌱🌱 Data seeded successfully! 🌱🌱");
  } catch (error) {
    console.error("Error during preload:", error);
  } finally {
    await mongoose.connection.close();
  }
};

if (require.main === module) {
  preload();
}
module.exports = preload;
