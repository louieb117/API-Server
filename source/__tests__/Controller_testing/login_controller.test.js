// Functions under test:
const {
    login
} = require('../../controllers/loginController.js');

// Test data:
const {
    reqUserID,
} = require('../../utils/data/user.test.data.js');

const {
    reqLoginBody_1,
    reqLoginBody_3,
    reqLoginBody_4,
    reqLoginBody_5,
    reqLoginBody_6,
    reqLoginBody_7,
} = require('../../utils/data/login.test.data.js');

const { 
    mockUserResponse,
    mockUserResponse02
} = require('../../utils/data/user.mock.data.js');

const {
    mockUserJsonObject,
    mockLoginResponse01,
    mockToken
} = require('../../utils/data/login.mock.data.js');

// Mocks:
// Mocking login validators
const {
    validateLoginInput,
    validatePassword,
} = require('../../middlewares/validators/loginValidators.js');
jest.mock('../../middlewares/validators/loginValidators.js', () => ({
    validateLoginInput: jest.fn(),
    validatePassword: jest.fn()
}));

// Mocking user validators
const { validateUsernameInDatabase } = require('../../middlewares/validators/userValidators.js');
jest.mock('../../middlewares/validators/userValidators.js', () => ({
    validateUsernameInDatabase: jest.fn(),
}));

// Mocking user json
const mockUser = {
    toObject: jest.fn(() => ({ mockUserJsonObject }))
};
// Mocking JWT
const jwt = require('jsonwebtoken');
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

// Test suite for Login Controller
describe('Login Controller Testing', () => {

    // 1. login successful
    describe('login successful', () => {
        beforeEach(() => {
            validateLoginInput.mockReturnValue({ isValid: true });
            validateUsernameInDatabase.mockResolvedValue({ isValid: true, user: mockUser });
            validatePassword.mockReturnValue({ isValid: true });
        });

        test('should return 200 and a token if login is successful', async () => {
            // Arrange
            const req = {
                body: reqLoginBody_1,
                params: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                cookie: jest.fn()
            };
            
            // Mock the JWT sign function to return a mock token
            jwt.sign.mockReturnValue( mockToken );

            // Act
            await login(req, res);

            // Assert
            expect(res.json).toHaveBeenCalledWith( mockLoginResponse01 );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.cookie).toHaveBeenCalledWith("token", mockToken);
        });
    });
    
    // 2. login failure
    describe('login failure', () => {
        test('should return 400 if input validation fails', async () => {
            // Arrange
            const req = {
                body: reqLoginBody_3, // Empty input
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
                body: reqLoginBody_6,
                params: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            validateLoginInput.mockReturnValue({ isValid: true });
            validateUsernameInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });

            // Act
            await login(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });

        test('should return 403 if password validation fails', async () => {
            // Arrange
            const req = {
                body: reqLoginBody_7,
                params: {}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            validateLoginInput.mockReturnValue({ isValid: true });
            validateUsernameInDatabase.mockResolvedValue({ isValid: true, user: mockUser });
            validatePassword.mockReturnValue({ isValid: false, message: 'Invalid password' });

            // Act
            await login(req, res);

            // Assert
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' });
        });
 
    });
});