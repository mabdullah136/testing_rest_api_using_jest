const request = require("supertest");
const app = require("../../index"); // Your Express app

describe("User API", () => {
  describe("POST /student/signup", () => {
    it("should create a new student successfully", async () => {
      const userData = {
        fullName: "TestStudent",
        email: "test24221341@gmail.com",
        password: "test1234", // At least 8 characters
        grade: "66ed9c880763f6a5e24a74a7",
        phone: "03348355676",
      };
      const response = await request(app)
        .post("/student/signup")
        .send(userData)
        .expect(201);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toHaveProperty(
        "fullName",
        userData.fullName
      );
      expect(response.body.result).toHaveProperty("email", userData.email);
      expect(response.body.message).toBe("User created successfully.");
    });
    it("should return 400 for invalid data", async () => {
      const invalidData = {
        fullName: "testuser",
        password: "test123",
      };
      const response = await request(app)
        .post("/student/signup")
        .send(invalidData)
        .expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toBeNull();
      expect(response.body.message).toBe(
        "Please provide email, password, fullName, and grade."
      );
    });
    it("should return 400 for invalid grade", async () => {
      const invalidData = {
        fullName: "testuser",
        email: "test@gmail.com",
        password: "test1234",
        grade: "66ed9cfa0763f6a5e24a74a1",
      };
      const response = await request(app)
        .post("/student/signup")
        .send(invalidData)
        .expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toBeNull();
      expect(response.body.message).toBe("Grade does not exist.");
    });
    it("should return 400 if email is already exist", async () => {
      const invalidData = {
        fullName: "testuser",
        email: "test676766@gmail.com",
        password: "test1234",
        grade: "66ed9cfa0763f6a5e24a74b1",
        phone: "03348355676",
      };
      const response = await request(app)
        .post("/student/signup")
        .send(invalidData)
        .expect(400);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toBeNull();
      expect(response.body.message).toBe("This email is already registered.");
    });

    it("should return 400 registration is disabled", async () => {
      const response = await request(app)
        .post("/student/signup")

        .expect(400);
      expect(response.body.status).toBe(false);
      expect(response.body.message).toBe("Registration is disabled.");
    });

    it("should return 400 if password length is less than 8", async () => {
      const invalidData = {
        fullName: "testuser",
        email: "test67676690@gmail.com",
        password: "test123",
        grade: "66ed9cfa0763f6a5e24a74b1",
        phone: "03348355676",
      };
      const response = await request(app)
        .post("/student/signup")
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.result).toBeNull();
      expect(response.body.message).toBe(
        "The password needs to be at least 8 characters long."
      );
    });
  });
});
