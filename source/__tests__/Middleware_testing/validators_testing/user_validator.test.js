require('dotenv').config();
const User = require("../../../models/user.js");
const { mockUsername, mockUserResponse } = require('../../../utils/data/user.mock.data.js');
const {
    validateUsernameInDatabase,
    validateUserNOTInDatabase,
    validateUserCreationInput,
    validateUserFullName,
    validateUserUsername,
    validateUserPassword,
    validateUserRole,
    validateUserEmail,
    validateUserPhoneNumber,
    validateUserBio,
    validateUserPicture,
    validateUserFriends,
    validateUserUpdateInput,
    // validateUserDeletionInput
} = require('../../../middlewares/validators/userValidators.js');

// Mock the User model
jest.mock('../../../models/user', () => ({
    findById: jest.fn(),
    findOne: jest.fn(),
}));

describe('User Validator Logic', () => {
    // 1. validateUsernameInDatabase
    describe('validateUsernameInDatabase', () => {
        beforeEach(() => jest.clearAllMocks());
        test('should return isValid=true if user exists', async () => {
            User.findOne.mockResolvedValue(mockUserResponse);
            const result = await validateUsernameInDatabase(mockUsername);
            expect(result.isValid).toBe(true);
        });
        test('should return isValid=false if user does not exist', async () => {
            User.findOne.mockResolvedValue(null);
            const result = await validateUsernameInDatabase(mockUsername);
            expect(result.isValid).toBe(false);
        });
    });

    // // 2. validateUserNOTInDatabase
    // describe('validateUserNOTInDatabase', () => {
    //     beforeEach(() => jest.clearAllMocks());
    //     test('should return isValid=true if user does not exist', async () => {
    //         User.findById.mockResolvedValue(null);
    //         const result = await validateUserNOTInDatabase(null, mockUserId);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false if user exists', async () => {
    //         User.findById.mockResolvedValue(mockUserResponse);
    //         const result = await validateUserNOTInDatabase(null, mockUserId);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 3. validateUserCreationInput
    // describe('validateUserCreationInput', () => {
    //     test('should return isValid=true for valid input', async () => {
    //         const validInput = { username: 'testuser', password: 'StrongPass1!' };
    //         const result = await validateUserCreationInput(validInput);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for missing username', async () => {
    //         const invalidInput = { password: 'StrongPass1!' };
    //         const result = await validateUserCreationInput(invalidInput);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 4. validateUserFullName
    // describe('validateUserFullName', () => {
    //     test('should return isValid=true for valid fullName', () => {
    //         const valid = { fullName: 'John Doe' };
    //         const result = validateUserFullName(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for short fullName', () => {
    //         const invalid = { fullName: 'JD' };
    //         const result = validateUserFullName(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 5. validateUserUsername
    // describe('validateUserUsername', () => {
    //     test('should return isValid=true for valid username', () => {
    //         const valid = { username: 'validuser' };
    //         const result = validateUserUsername(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for short username', () => {
    //         const invalid = { username: 'ab' };
    //         const result = validateUserUsername(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 6. validateUserPassword
    // describe('validateUserPassword', () => {
    //     test('should return isValid=true for strong password', () => {
    //         const valid = { password: 'StrongPass1!' };
    //         const result = validateUserPassword(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for weak password', () => {
    //         const invalid = { password: '123' };
    //         const result = validateUserPassword(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 7. validateUserRole
    // describe('validateUserRole', () => {
    //     test('should return isValid=true for valid role', () => {
    //         const valid = { role: 'admin' };
    //         const result = validateUserRole(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for invalid role', () => {
    //         const invalid = { role: 'superuser' };
    //         const result = validateUserRole(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 8. validateUserEmail
    // describe('validateUserEmail', () => {
    //     test('should return isValid=true for valid email', () => {
    //         const valid = { email: 'test@example.com' };
    //         const result = validateUserEmail(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for invalid email', () => {
    //         const invalid = { email: 'not-an-email' };
    //         const result = validateUserEmail(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 9. validateUserPhoneNumber
    // describe('validateUserPhoneNumber', () => {
    //     test('should return isValid=true for valid phone number', () => {
    //         const valid = { phoneNumber: '1234567890' };
    //         const result = validateUserPhoneNumber(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for invalid phone number', () => {
    //         const invalid = { phoneNumber: '123' };
    //         const result = validateUserPhoneNumber(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 10. validateUserBio
    // describe('validateUserBio', () => {
    //     test('should return isValid=true for valid bio', () => {
    //         const valid = { bio: 'This is a short bio.' };
    //         const result = validateUserBio(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for long bio', () => {
    //         const invalid = { bio: 'a'.repeat(201) };
    //         const result = validateUserBio(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 11. validateUserPicture
    // describe('validateUserPicture', () => {
    //     test('should return isValid=true for valid picture url', () => {
    //         const valid = { picture: 'http://example.com/pic.jpg' };
    //         const result = validateUserPicture(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for long picture url', () => {
    //         const invalid = { picture: 'a'.repeat(201) };
    //         const result = validateUserPicture(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 12. validateUserFriends
    // describe('validateUserFriends', () => {
    //     beforeEach(() => jest.clearAllMocks());
    //     test('should return isValid=true for valid friends array', async () => {
    //         // Mock User.findById to always return a user for each friend
    //         User.findById.mockResolvedValue(mockUserResponse);
    //         const valid = { friends: [mockUserId] };
    //         const result = await validateUserFriends(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for non-array friends', async () => {
    //         const invalid = { friends: 'not-an-array' };
    //         const result = await validateUserFriends(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // // 13. validateUserUpdateInput
    // describe('validateUserUpdateInput', () => {
    //     test('should return isValid=true for valid update', async () => {
    //         const valid = { fullName: 'John Doe' };
    //         const result = await validateUserUpdateInput(valid);
    //         expect(result.isValid).toBe(true);
    //     });
    //     test('should return isValid=false for invalid update', async () => {
    //         const invalid = { fullName: 'JD' };
    //         const result = await validateUserUpdateInput(invalid);
    //         expect(result.isValid).toBe(false);
    //     });
    // });

    // 14. validateUserDeletionInput (if implemented)
    // describe('validateUserDeletionInput', () => {
    //     test('should return isValid=true for valid deletion input', () => {
    //         // ...
    //     });
    //     test('should return isValid=false for invalid deletion input', () => {
    //         // ...
    //     });
    // });
});

/*
    --- Template & Test Ideas ---
    For each function:
    - Test valid input (should return isValid=true)
    - Test invalid input (should return isValid=false)
    - Add more cases as needed: missing fields, wrong types, edge cases, etc.
    - Use mock data or fixtures for complex objects.
*/