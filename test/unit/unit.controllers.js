const UserController = require("../../src/controllers/user.controller");
const User = require("../../src/models/user.model");

// Mock the User model
jest.mock("../../src/models/user.model");

describe("UserController", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      const mockUser = {
        id: "123",
        username: "testuser",
        email: "test@example.com",
      };

      // Setup the mock implementation
      User.create.mockResolvedValue(mockUser);

      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await UserController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
      expect(User.create).toHaveBeenCalledWith(req.body);
    });
  });
});
