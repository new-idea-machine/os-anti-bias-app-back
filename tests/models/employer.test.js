const {
  Employer,
  getAll,
  getOne,
  create,
  update,
  deleteEmployer,
  getByUser,
  getAllByName,
} = require("../../db/models/employers");
const { v4: uuidv4 } = require("uuid");

describe("Employer Model Tests", () => {
  let testEmployerId;
  let testUserId = uuidv4();

  const mockEmployer = {
    employer_id: uuidv4(),
    employer_name: "Test Company",
    username: "test_company",
    user: testUserId,
    description: "A test company",
    number_of_employees: 50,
    contact_name: "Alice Doe",
    contact_email: "alice.doe@test.com",
    established_date: "2022-01-01",
  };

  afterEach(async () => {
    await Employer.deleteMany({});
  });

  describe("Create Employer", () => {
    it("should create an employer", async () => {
      const employer = await create(mockEmployer);
      testEmployerId = employer.employer_id;

      expect(employer).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );
      expect(employer).toHaveProperty("user", mockEmployer.user);
    });
  });

  describe("Get All Employers", () => {
    it("should return an array of employers", async () => {
      await create(mockEmployer);
      const employers = await getAll();

      expect(employers.length).toBe(1);
      expect(employers[0]).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );
    });

    it("should return empty array if no employers exist", async () => {
      const employers = await getAll();
      expect(employers.length).toBe(0);
    });
  });

  describe("Get Employer by ID", () => {
    it("should return an employer by ID", async () => {
      const employer = await create(mockEmployer);
      testEmployerId = employer.employer_id;

      const foundEmployer = await getOne(testEmployerId);
      expect(foundEmployer).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );
    });

    it("should throw an error if employer does not exist", async () => {
      await expect(getOne(uuidv4())).rejects.toThrow("employer not found");
    });
  });

  describe("Update Employer", () => {
    it("should update an existing employer", async () => {
      const employer = await create(mockEmployer);
      testEmployerId = employer.employer_id;

      const updatedEmployer = await update(testEmployerId, {
        employer_name: "Updated Company",
      });
      expect(updatedEmployer).toHaveProperty(
        "employer_name",
        "Updated Company"
      );
    });

    it("should throw an error if employer does not exist", async () => {
      await expect(
        update(uuidv4(), { employer_name: "New Name" })
      ).rejects.toThrow("Employer not found");
    });
  });

  describe("Delete Employer", () => {
    it("should delete an employer by ID", async () => {
      const employer = await create(mockEmployer);
      testEmployerId = employer.employer_id;

      const deletedEmployer = await deleteEmployer(testEmployerId);
      expect(deletedEmployer).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );

      await expect(getOne(testEmployerId)).rejects.toThrow(
        "employer not found"
      );
    });

    it("should throw an error if employer does not exist", async () => {
      await expect(deleteEmployer(uuidv4())).rejects.toThrow(
        "Employer item not found"
      );
    });
  });

  describe("Get Employer by User ID", () => {
    it("should return an employer by user ID", async () => {
      await create(mockEmployer);
      const employer = await getByUser(testUserId);

      expect(employer).toHaveProperty("user", testUserId);
    });

    it("should throw an error if employer does not exist for user ID", async () => {
      await expect(getByUser(uuidv4())).rejects.toThrow("Employer not found");
    });
  });

  describe("Get Employers by Name", () => {
    it("should return an employer by name search", async () => {
      await create(mockEmployer);
      const employers = await getAllByName("Test");

      expect(employers.length).toBe(1);
      expect(employers[0]).toHaveProperty(
        "employer_name",
        mockEmployer.employer_name
      );
    });

    it("should return an empty array if no matches found", async () => {
      const employers = await getAllByName("Nonexistent");
      expect(employers.length).toBe(0);
    });
  });
});
