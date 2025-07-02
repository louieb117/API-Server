// Functions under test:
const {
    login
} = require('../../../controllers/loginController.js');

// Test data:
const {
    reqLoginBody_1,
    reqLoginBody_2,
} = require('../../../utils/data/login.test.data.js');

// Mocks:
// Mocking login validators
const {
    validateLoginInput,
    validatePassword,
} = require('../../../middlewares/validators/loginValidators.js');
jest.mock('../../../middlewares/validators/loginValidators.js', () => ({
    validateLoginInput: jest.fn(),
    validatePassword: jest.fn(),
}));

// Mocking user validators
const { validateUserInDatabase } = require('../../../middlewares/validators/userValidators.js');
jest.mock('../../../middlewares/validators/userValidators.js', () => ({
    validateUserInDatabase: jest.fn(),
}));

// Mocking JWT
const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

// Test suite for Login Controller
describe('Login Controller Testing', () => {

    // 1. login
    describe('login', () => {

        test('should return 200 and a token if login is successful', async () => {
            // Arrange
            const req = {
                body: { username: 'testUser', password: 'StrongPass1!' },
                params: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                cookie: jest.fn()
            };
            const user = { _id: '12345', username: 'testUser', password: 'StrongPass1!' };
            validateLoginInput.mockReturnValue({ isValid: true });
            validateUserInDatabase.mockResolvedValue({ isValid: true, user });
            validatePassword.mockReturnValue({ isValid: true });
            jwt.sign.mockReturnValue('mockedToken');

            // Act
            await login(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Login successful",
                data: { _id: '12345', username: 'testUser' },
                token: 'mockedToken'
            });
            expect(res.cookie).toHaveBeenCalledWith("token", 'mockedToken');
        });

        test('should return 400 if input validation fails', async () => {
            // Arrange
            const req = {
                body: reqLoginBody_1,
                params: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            validateLoginInput.mockReturnValue({ isValid: false, message: 'Username and password or ID and password are required' });

            // Act
            await login(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Username and password or ID and password are required' });
        }
        );
        test('should return 404 if user validation fails', async () => {
            // Arrange
            const req = {
                body: { username: 'testUser', password: 'StrongPass1!' },
                params: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            validateLoginInput.mockReturnValue({ isValid: true });
            validateUserInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });

            // Act
            await login(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
        test('should return 403 if password validation fails', async () => {
            // Arrange
            const req = {
                body: { username: 'testUser', password: 'WrongPass1!' },
                params: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            validateLoginInput.mockReturnValue({ isValid: true });
            validateUserInDatabase.mockResolvedValue({ isValid: true, user: { password: 'StrongPass1!' } });
            validatePassword.mockReturnValue({ isValid: false, message: 'Invalid password' });

            // Act
            await login(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' });
        });
 
    }
    );
}
);