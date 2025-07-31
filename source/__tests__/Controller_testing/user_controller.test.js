// Controller functions under test
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController.js');

// Mock data
const { reqCreateUser, reqUpdateUser } = require('../../utils/data/user.test.data.js');
const { mockUserId, mockUserResponse } = require('../../utils/data/user.mock.data.js');

// Mocks
jest.mock('../../models/user.js', () => {
  const mockSave = jest.fn();
  const mockUserConstructor = jest.fn(() => ({
    save: mockSave
  }));

  mockUserConstructor.find = jest.fn();
  mockUserConstructor.findByIdAndDelete = jest.fn();
  mockUserConstructor.findByIdAndUpdate = jest.fn();

  return mockUserConstructor;
});

const {
  validateUserCreationInput,
  validateUsernameInDatabase,
  validateUserNOTInDatabase,
  validateUserUpdateInput
} = require('../../middlewares/validators/userValidators.js');

jest.mock('../../middlewares/validators/userValidators.js', () => ({
  validateUserCreationInput: jest.fn(),
  validateUsernameInDatabase: jest.fn(),
  validateUserNOTInDatabase: jest.fn(),
  validateUserUpdateInput: jest.fn()
}));

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Tests

describe('User Controller Tests', () => {

  // 1. getAllUsers
  describe('getAllUsers', () => {
    test('should return all users', async () => {
      User.find.mockResolvedValue([mockUserResponse]);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await getAllUsers(req, res);
      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([mockUserResponse]);
    });

    test('should handle error', async () => {
      User.find.mockRejectedValue(new Error('DB Error'));
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await getAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB Error' });
    });
  });

  // 2. getUser
  describe('getUser', () => {
    test('should return user if found', async () => {
      validateUsernameInDatabase.mockResolvedValue({ isValid: true, user: mockUserResponse });
      const req = { body: { username: 'peter.tester' }, params: { id: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await getUser(req, res);
      expect(validateUsernameInDatabase).toHaveBeenCalledWith('peter.tester', mockUserId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUserResponse);
    });

    test('should return 404 if user not found', async () => {
      validateUsernameInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });
      const req = { body: { username: 'tim' }, params: { id: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  // 3. createUser
const User = require('../../models/user.js');
describe('createUser', () => {
test('should create user if valid', async () => {
    const mockSave = jest.fn();
    User.mockImplementation(() => ({ save: mockSave }));
    validateUserNOTInDatabase.mockResolvedValue({ isValid: true });
    validateUserCreationInput.mockResolvedValue({ isValid: true });

    const req = { body: { ...reqCreateUser } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createUser(req, res);

    expect(validateUserNOTInDatabase).toHaveBeenCalled();
    expect(validateUserCreationInput).toHaveBeenCalled();
    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
    message: 'New User Created!'
    }));
});
});

  // 4. updateUser
  describe('updateUser', () => {
    test('should update user if valid', async () => {
      validateUsernameInDatabase.mockResolvedValue({ isValid: true });
      validateUserUpdateInput.mockResolvedValue({ isValid: true });
      User.findByIdAndUpdate.mockResolvedValue({ ...mockUserResponse, name: 'Updated' });

      const req = { body: reqUpdateUser, params: { id: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await updateUser(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, reqUpdateUser, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'Updated' }));
    });

    test('should return 400 if an exception is thrown', async () => {
        validateUsernameInDatabase.mockResolvedValue({ isValid: true });
        validateUserUpdateInput.mockResolvedValue({ isValid: true });
        User.findByIdAndUpdate.mockRejectedValue(new Error('DB update error'));

        const req = { body: reqUpdateUser, params: { id: mockUserId } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'DB update error' });
        });
  });

  // 5. deleteUser
  describe('deleteUser', () => {
    test('should delete user if exists', async () => {
      validateUsernameInDatabase.mockResolvedValue({ isValid: true });
      User.findByIdAndDelete.mockResolvedValue(mockUserResponse);

      const req = { body: { username: 'peter.tester' }, params: { id: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await deleteUser(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUserId);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    test('should return 404 if user not found', async () => {
      validateUsernameInDatabase.mockResolvedValue({ isValid: true });
      User.findByIdAndDelete.mockResolvedValue(null);

      const req = { body: { username: 'peter.tester' }, params: { id: mockUserId } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });
  });

});
