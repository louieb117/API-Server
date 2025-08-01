// Validators under test
const {
    validateUsernameInDatabase, 
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
} = require('../../../middlewares/validators/userValidators.js');

// Test data
const { mockUsername, mockUserId, mockUserResponse } = require('../../../utils/data/user.mock.data.js');

// Mocks
const User = require("../../../models/user.js");
jest.mock('../../../models/user.js', () => ({
    findById: jest.fn(),
    findOne: jest.fn(),
}));

// Test suite for User Validators
describe('User Creation Validators Testing', () => {

    // 1. validateUsernameInDatabase
    describe('validateUsernameInDatabase', () => {
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
    describe('validateUserUsername', () => {
        test('should return isValid=true for valid username', () => {
            const valid = { username: 'peter.tester' };
            const result = validateUserUsername(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for short username < 3 characters', () => {
            const invalid = { username: 'a' };
            const result = validateUserUsername(invalid);
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false for username > 20 characters', () => {
            const invalid = { username: 'a'.repeat(21) };
            const result = validateUserUsername(invalid);
            expect(result.isValid).toBe(false);
        });
    }); 

    // 3. validateUserRole
    describe('validateUserRole', () => {
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

    // 4. validateEmail 
    describe('validateUserEmail', () => {
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
    
    // 5. validatePhoneNumber
    describe('validateUserPhoneNumber', () => {
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

    // 6. validateUserPassword
    describe('validateUserPassword', () => {
        test('should return isValid=true for valid password', () => {
            const validPassword = { password: 'Fin345333!' };
            const result = validateUserPassword(validPassword);
            expect(result.isValid).toBe(true);
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
    });

    // 7. validateUserFullName
    describe('validateUserFullName', () => {
        test('should return isValid=true for valid fullName', () => {
            const valid = { fullName: 'John Doe' };
            const result = validateUserFullName(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for short fullName < 3 characters', () => {
            const invalid = { fullName: 'JD' };
            const result = validateUserFullName(invalid);
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false for fullName > 50 characters', () => {
            const invalid = { fullName: 'a'.repeat(51) };
            const result = validateUserFullName(invalid);
            expect(result.isValid).toBe(false);
        });
    }); 

    // 8. validateUserBio
    describe('validateUserBio', () => {
        test('should return isValid=true for valid bio', () => {
            const valid = { bio: 'This is a valid bio.' };
            const result = validateUserBio(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for bio > 200 characters', () => {
            const invalid = { bio: 'a'.repeat(201) };
            const result = validateUserBio(invalid);
            expect(result.isValid).toBe(false);
        });
    });

    // 9. validateUserPicture
    describe('validateUserPicture', () => {
        test('should return isValid=true for valid picture URL', () => {
            const valid = { picture: 'http://example.com/picture.jpg' };
            const result = validateUserPicture(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for invalid picture URL > 200 characters', () => {
            const invalid = { picture: 'a'.repeat(201) };
            const result = validateUserPicture(invalid);
            expect(result.isValid).toBe(false);
        });
    });

    // 10. validateUserUniqueFriends
    describe('validateUserUniqueFriends', () => {
        test('should return isValid=true for unique friends', () => {
            const valid = { friends: ['user1', 'user2'] };
            const result = validateUserFriends(valid);
            expect(result.isValid).toBe(true);
        });

        test('should return isValid=false for duplicate friends', () => {
            const invalid = { friends: ['user1', 'user1'] };
            const result = validateUserFriends(invalid);
            expect(result.isValid).toBe(false);
        }); 
    });

    // 11. validateUserFriends
    describe('validateUserFriends', () => { 
        test('should return isValid=true for valid friend < 200 characters', () => {
            const valid = { friends: ['Friend_Test'] };
            const result = validateUserFriends(valid);
            expect(result.isValid).toBe(true);
        });
        test('should return isValid=false for valid friend > 200 characters', () => {
            const invalid = { friends: ['a'.repeat(201)] };
            const result = validateUserFriends(invalid);
            expect(result.isValid).toBe(false);
        }); 
        test('should return isValid=true if friend is in database', async () => {
            User.findById.mockResolvedValue(mockUserResponse);
            const valid = { friends: [mockUsername] };
            const result = await validateUserFriends(valid);
            expect(result.isValid).toBe(true);
        });
        test('should return isValid=false if friend is not in database', async () => {
            User.findById.mockResolvedValue(null);
            const invalid = { friends: ['nonExistentUser'] };
            const result = await validateUserFriends(invalid);
            expect(result.isValid).toBe(false);
        });
    });
}); 