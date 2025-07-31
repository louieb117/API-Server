// Functions under test:
const {
    validateLoginInput,
    validatePassword,
} = require('../../../middlewares/validators/loginValidators.js');

// Test data:
const { 
    username,
    password,
    id
} = require('../../../utils/data/login.test.data.js');

// Mocks:
// jest.mock('../../../middlewares/validators/libraries/login.js', () => ({
//     validateLoginInput: jest.fn(),
//     validatePassword: jest.fn(),
// }));

// Test suite for Login Validators
describe('Login Validators Testing', () => {
    // 1. validateLoginInput
    describe('validateLoginInput', () => {
        // Test: Valid username and password
        test('should return isValid=true for valid username and password', async () => {
            const result = await validateLoginInput(username, password);
            expect(result.isValid).toBe(true);
        });

        // Test: Missing both username/ID and password
        test('should return isValid=false if missing both username/ID and password', async () => {
            const result = await validateLoginInput('', '');
            expect(result.isValid).toBe(false);
            expect(result.message).toMatch(/required/);
        });

        // Test: Missing password
        test('should return isValid=false if missing password', async () => {
            const result = await validateLoginInput(username, '');
            expect(result.isValid).toBe(false);
            expect(result.message).toMatch(/required/);
        });
    });

    // 2. validatePassword
    describe('validatePassword', () => {
        // Test: Correct password
        test('should return isValid=true for correct password', async () => {
            const user = { password: 'StrongPass1!' };
            const result = await validatePassword(user, 'StrongPass1!');
            expect(result.isValid).toBe(true);
        });

        // Test: Incorrect password
        test('should return isValid=false for incorrect password', async () => {
            const user = { password: 'StrongPass1!' };
            const result = await validatePassword(user, 'WrongPass');
            expect(result.isValid).toBe(false);
            expect(result.message).toMatch(/Invalid password/);
        });
    });
});