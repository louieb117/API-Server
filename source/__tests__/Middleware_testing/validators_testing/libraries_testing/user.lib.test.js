// Validators under test
const {
    validateUsernameInDatabase,
    validateUserNOTInDatabase,   
    validateUserUsername,
    validateUserPassword,
    validateUserRole,
    validateUserStatus,
    validateUserEmail,
    validateUserPhoneNumber, 
    validateUserDelete
} = require('../../../../middlewares/validators/libraries/user.lib.js');

// Test data
const { mockUsername, mockUserId, mockUserResponse, mockUserResponse02 } = require('../../../../utils/data/user.mock.data.js');

// Mocks
const User = require("../../../../models/user.js");
jest.mock('../../../../models/user.js', () => ({
    findById: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../../../../middlewares/validators/libraries/user.lib.js', () => {
    const original = jest.requireActual('../../../../middlewares/validators/libraries/user.lib.js');
    return {
        ...original,
        validateUserNOTInDatabase: jest.fn(),    
    };
});

afterEach(() => {
            jest.restoreAllMocks();  
        });

// Test suite for User Validators
describe('User Creation Validators Testing', () => {

    // 1. validateUsernameInDatabase
    describe('1. validateUsernameInDatabase', () => {
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=true if user does not exist', async () => {
            User.findOne.mockResolvedValue(mockUserResponse);
            const result = await validateUsernameInDatabase(mockUsername);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false if user already exists', async () => {
            User.findOne.mockResolvedValue(null);
            const result = await validateUsernameInDatabase(mockUsername);
            expect(result.isValid).toBe(false);
        });
    });  
    
    // 2. validateUserUsername
    describe('2. validateUserUsername', () => {
        test('should return isValid=true for valid username', async () => {
            validateUserNOTInDatabase.mockResolvedValue({ isValid: true });
            const valid = { username: 'peter.tester' };
            const result = await validateUserUsername(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for short username < 3 characters', async () => {
            validateUserNOTInDatabase.mockResolvedValue({ isValid: true });
            const invalid = { username: 'a' };
            const result = await validateUserUsername(invalid);
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false for username > 20 characters', async () => {
            validateUserNOTInDatabase.mockResolvedValue({ isValid: true });
            const invalid = { username: 'a'.repeat(21) };
            const result = await validateUserUsername(invalid);
            expect(result.isValid).toBe(false);
        });
    }); 

    // 3. validateUserRole
    describe('3. validateUserRole', () => {
        test('should return isValid=true for valid admin role', () => {
            const valid = { role: 'admin' };
            const result = validateUserRole(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=true for valid user role', () => {
            const valid = { role: 'user' };
            const result = validateUserRole(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=true for valid tester role', () => {
            const valid = { role: 'tester' };
            const result = validateUserRole(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for invalid role', () => {
            const invalid = { role: 'invalidRole' };
            const result = validateUserRole(invalid);
            expect(result.isValid).toBe(false);
        });
    });

    // 4. validateUserStatus
    describe('4. validateUserStatus', () => {
        test('should return isValid=true for valid active status', () => {
            const valid = { status: 'active' };
            const result = validateUserStatus(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=true for valid inactive status', () => {
            const valid = { status: 'inactive' };
            const result = validateUserStatus(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=true for valid locked status', () => {
            const valid = { status: 'locked' };
            const result = validateUserStatus(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=true for valid banned status', () => {
            const valid = { status: 'banned' };
            const result = validateUserStatus(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for invalid status', () => {
            const invalid = { status: 'invalidStatus' };
            const result = validateUserStatus(invalid);
            expect(result.isValid).toBe(false);
        });
    });

    // 5. validateEmail 
    describe('5. validateUserEmail', () => {
        test('should return isValid=true for valid email', () => {
            const validEmail = { email: 'jesus@email.com' };
            const result = validateUserEmail(validEmail);
            expect(result.isValid).toBe(true);
        });
        test('should return isValid=false for invalid email', () => {
            const invalidEmail = { email: 'invalid-email' };
            const result = validateUserEmail(invalidEmail);
            expect(result.isValid).toBe(false);
        });
    });
    
    // 6. validatePhoneNumber
    describe('6. validateUserPhoneNumber', () => {
        test('should return isValid=true for valid phone number', () => {
            const validPhone = { phoneNumber: '1234567890' };
            const result = validateUserPhoneNumber(validPhone);
            expect(result.isValid).toBe(true);
        });
        test('should return isValid=false for invalid phone number', () => {
            const invalidPhone = { phoneNumber: '12345' };
            const result = validateUserPhoneNumber(invalidPhone);
            expect(result.isValid).toBe(false);
        });
    });

    // 7. validateUserPassword
    describe('7. validateUserPassword', () => {
        test('should return isValid=false if password not provided', () => {
            const validPassword = {  };
            const result = validateUserPassword(validPassword); 
            expect(result.isValid).toBe(false);
        });
        test('should return isValid=false if password and confirm password do not match', () => {
            const validPassword = { password: 'Fin345333!', confirmPassword: 'Fin345331!' };
            const result = validateUserPassword(validPassword);
            expect(result.isValid).toBe(false);
        });   
        test('should return isValid=false for password > 20 characters', () => {
            const invalidPassword = { password: 'a'.repeat(21) };
            const result = validateUserPassword(invalidPassword);
            expect(result.isValid).toBe(false);
        });
        test('should return isValid=false for password < 8 characters', () => {
            const invalidPassword = { password: 'short' };
            const result = validateUserPassword(invalidPassword);
            expect(result.isValid).toBe(false);
        });
        test('should return isValid=false for password without a number', () => {
            const invalidPassword = { password: 'NoNumberHere!' };
            const result = validateUserPassword(invalidPassword);
            expect(result.isValid).toBe(false);
        });
        test('should return isValid=false for password without an uppercase', () => {
            const invalidPassword = { password: 'nouppercase1!' };
            const result = validateUserPassword(invalidPassword);
            expect(result.isValid).toBe(false); 
        });
        test('should return isValid=false for password without a lowercase', () => {
            const invalidPassword = { password: 'NOUPERCASE1!' };
            const result = validateUserPassword(invalidPassword);
            expect(result.isValid).toBe(false); 
        });
        test('should return isValid=false for password without a special character', () => {
            const invalidPassword = { password: 'NoSpecialChar1' };
            const result = validateUserPassword(invalidPassword);
            expect(result.isValid).toBe(false);
        });
        test('should return isValid=true for valid password', () => {
            const validPassword = { password: 'Fin345333!', confirmPassword: 'Fin345333!' };
            const result = validateUserPassword(validPassword);
            expect(result.isValid).toBe(true);
        }); 
    });   

    // 8. validateUserDelete
    describe('8. validateUserDelete', () => {   
        beforeEach(() => jest.clearAllMocks());

        test('should return isValid=false if user does not exist', async () => {
            User.findById.mockResolvedValue(null);
            const result = await validateUserDelete(mockUserResponse);
            expect(result.message).toBe("User not found");
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=true if user exists', async () => {
            User.findById.mockResolvedValue(mockUserResponse);
            const result = await validateUserDelete(mockUserResponse);
            expect(result.message).toBe("User exists");
            expect(result.isValid).toBe(true);
        });
    });
}); 