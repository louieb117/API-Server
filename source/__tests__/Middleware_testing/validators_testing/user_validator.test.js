// Validators under test
const {
    validateUsernameInDatabase,
    validateUserNOTInDatabase, 
    validateUserCreationInput,
    validateUserFullName,
    validateUserUsername,
    validateUserPassword,
    validateUserRole,
    validateUserStatus,
    validateUserEmail,
    validateUserPhoneNumber,
    validateUserBio,
    validateUserPicture, 
    validateUniqueFriends, 
    validateUserUpdateInput,
} = require('../../../middlewares/validators/userValidators.js');

// Test data
const { mockUsername, mockUserId, mockUserResponse, mockUserResponse02 } = require('../../../utils/data/user.mock.data.js');

// Mocks
const User = require("../../../models/user.js");
jest.mock('../../../models/user.js', () => ({
    findById: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../../../middlewares/validators/userValidators.js', () => {
    const original = jest.requireActual('../../../middlewares/validators/userValidators.js');
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

    // 2. validateUserCreationInput 
    describe('2. validateUserCreationInput', () => { 
        test('should return isValid=false if username is not provided', async () => {
            const invalid = { password: 'Password123!' };
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Username and password are required');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if password is not provided', async () => {
            const invalid = { username: 'peter.tester' };
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Username and password are required');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if username is < 3 characters', async () => {
            const invalid = { username: 'pt', password: 'Password123!' };
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Username must be at least 3 characters long');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if username is > 20 characters', async () => {
            const invalid = { username: 'a'.repeat(21), password: 'Password123!' };
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Username must be less than 20 characters long');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if email address is invalid', async () => {
            const invalid = { username: 'peter.tester', password: 'Password123!', email: 'invalid-email' };
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Invalid email address');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if role is invalid', async () => {
            const invalid = { username: 'peter.tester', password: 'Password123!', email: 'valid@email.com', 
                role: 'invalidRole' };
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Invalid role');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if status is invalid', async () => {
            const invalid = { username: 'peter.tester', password: 'Password123!', email: 'valid@email.com', 
                role: 'user', status: 'invalidStatus' };
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Invalid status');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if password does not match confirmPassword', async () => {
            const invalid = { username: 'peter.tester', password: 'Password123!', email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'DifferentPassword123!' };  
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Passwords do not match');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if password is > 20 characters', async () => {
            const invalid = { username: 'peter.tester', password: 'a'.repeat(21), email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'a'.repeat(21) };  
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Password must be less than 20 characters long');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if password is < 8 characters', async () => {
            const invalid = { username: 'peter.tester', password: 'a', email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'a' };  
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Password must be at least 8 characters long');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if password does not contain a number', async () => {
            const invalid = { username: 'peter.tester', password: 'aaaaaaaaa', email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'aaaaaaaaa' };  
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Password must contain a number');
            expect(result.isValid).toBe(false);
        });
        
        test('should return isValid=false if password does not contain an uppercase letter', async () => {
            const invalid = { username: 'peter.tester', password: 'aaaaaaaa1', email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'aaaaaaaa1' };  
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Password must contain an uppercase letter');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if password does not contain a lowercase letter', async () => {
            const invalid = { username: 'peter.tester', password: 'AAAAAAAA1', email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'AAAAAAAA1' };  
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Password must contain a lowercase letter');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=false if password does not contain a special character', async () => {
            const invalid = { username: 'peter.tester', password: 'AAAAAAAa1', email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'AAAAAAAa1' };  
            const result = await validateUserCreationInput(invalid);
            expect(result.message).toBe('Password must contain a special character');
            expect(result.isValid).toBe(false);
        });

        test('should return isValid=true for valid user creation input', async () => {
            const valid = { username: 'peter.tester', password: 'AAAAAAAa1!', email: 'valid@email.com', 
                role: 'user', status: 'active', confirmPassword: 'AAAAAAAa1!' };  
            const result = await validateUserCreationInput(valid); 
            expect(result.isValid).toBe(true);
        });
    });
    
    // 3. validateUserUsername
    describe('3. validateUserUsername', () => {
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

    // 4. validateUserRole
    describe('4. validateUserRole', () => {
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

    // 5. validateUserStatus
    describe('5. validateUserStatus', () => {
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

    // 6. validateEmail 
    describe('6. validateUserEmail', () => {
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
    
    // 7. validatePhoneNumber
    describe('7. validateUserPhoneNumber', () => {
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

    // 8. validateUserPassword
    describe('8. validateUserPassword', () => {
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

    // 9. validateUserFullName
    describe('9. validateUserFullName', () => {
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

    // 10. validateUserBio
    describe('10. validateUserBio', () => {
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

    // 11. validateUserPicture
    describe('11. validateUserPicture', () => {
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

    // 12. validateUniqueFriends
    describe('12. validateUniqueFriends', () => { 
        const validators = require('../../../middlewares/validators/userValidators.js');

        test('should return isValid=false if the new friend is the same as the current user', async () => { 
            // Same user ID as the current user
            const result = await validateUniqueFriends(mockUserResponse, '68101f14af912a4fc8d69fe7');
            expect(result.isValid).toBe(false); 
        });
        test('should return isValid=false if the new friend is not the same as the current user', async () => { 
            User.findOne.mockResolvedValue(mockUserResponse); 
            const result = await validateUniqueFriends(mockUserResponse, 'Not_the_Same_User');
            expect(result.isValid).toBe(true); 
        });
        test('should return isValid=false if the new friend already exists in the friends list', async () => { 
            // Existing friend in the list
            const result = await validateUniqueFriends(mockUserResponse, 'friend_test');
            expect(result.isValid).toBe(false); 
        });
        test('should return isValid=true if the new friend does not already exists in the friends list', async () => { 
            User.findOne.mockResolvedValue(mockUserResponse); 
            const result = await validateUniqueFriends(mockUserResponse, 'Not_A_Friend');
            expect(result.isValid).toBe(true); 
        });
    });

    // 13. validateUserUpdateInput
    describe('13. validateUserUpdateInput', () => {   
        test('should return isValid=false if updated username is not a valid username', async () => {
            User.findOne.mockResolvedValue(mockUserResponse);   
            const result = await validateUserUpdateInput( { "username": 'Fin.tester' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=true if updated username is a valid username', async () => {
            User.findOne.mockResolvedValue( mockUserResponse );   
            const result = await validateUserUpdateInput( { mockUserResponse } );              
            expect(result.isValid).toBe(true);  
        });
        test('should return isValid=false if updated password is not a valid password', async () => { 
            const result = await validateUserUpdateInput( { "password": 'a' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=true if updated password is a valid password', async () => { 
            const result = await validateUserUpdateInput( { "password": 'Roboto123!' } );  
            expect(result.isValid).toBe(true);  
        });
        test('should return isValid=false if updated status is not a valid status', async () => { 
            const result = await validateUserUpdateInput( { "status": 'x' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=true if updated status is a valid status', async () => { 
            const result = await validateUserUpdateInput( { "status": 'banned' } );  
            expect(result.isValid).toBe(true);  
        });
        test('should return isValid=false if updated phone number is not a valid phone number', async () => { 
            const result = await validateUserUpdateInput( { "phoneNumber": 'a' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=true if updated phone number is a valid phone number', async () => { 
            const result = await validateUserUpdateInput( { "phoneNumber": '6199696660' } );  
            expect(result.isValid).toBe(true);  
        });
        test('should return isValid=false if updated email is not a valid email', async () => { 
            const result = await validateUserUpdateInput( { "email": 'a' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=true if updated email is a valid email', async () => { 
            const result = await validateUserUpdateInput( { "email": 'test.user.Roboto@potentiamaxima.com' } );  
            expect(result.isValid).toBe(true);  
        });
    });
}); 