// Validators under test
const { 
    validateUserDataInput,
    validateUserCreationInput, 
    validateUserUpdateInput, 
} = require('../../../middlewares/validators/userValidators.js');

// Test data
const { mockUserResponse } = require('../../../utils/data/user.mock.data.js');

// Mocks
const User = require("../../../models/user.js");
jest.mock('../../../models/user.js', () => ({
    findById: jest.fn(),
    findOne: jest.fn(),
}));

jest.mock('../../../middlewares/validators/libraries/user.lib.js', () => {
    const original = jest.requireActual('../../../middlewares/validators/libraries/user.lib.js');
    return {
        ...original,
        validateUserUsername: jest.fn(),    
    };
});
const { validateUserUsername } = require('../../../middlewares/validators/libraries/user.lib.js');

afterEach(() => {
            jest.restoreAllMocks();  
        });

// Test suite for User Validators
describe('User Creation Validators Testing', () => {

    // 1. valdateUserDataInput
    describe('1. validateUserDataInput', () => {   
        test('should return isValid=false if body is empty', async () => { 
            const result = await validateUserDataInput( {} );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if body has invalid fields', async () => { 
            const result = await validateUserDataInput( { "invalidField": 'value' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=true if body has all the required fields', async () => { 
            const result = await validateUserDataInput( { "username": 'Fin.tester', "password": 'Roboto123!' } );  
            expect(result.isValid).toBe(true);  
        }); 
    });

    // 2. validateUserCreationInput
    describe('2. validateUserCreationInput', () => {   
        test('should return isValid=false if username is missing', async () => { 
            const result = await validateUserCreationInput( { "password": 'Roboto123!' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if password is missing', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if username is less than 3 characters', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fi', "password": 'Roboto123!' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if username is more than 20 characters', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.testerFin.tester1', "password": 'Roboto123!' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if email is invalid', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Roboto123!', "email": 'test.user.Roboto.potentiamaxima.com' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if role is invalid', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Roboto123!', "role": 'x' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if status is invalid', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Roboto123!', "status": 'x' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if passwords do not match', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Roboto123!', "confirmPassword": 'Roboto1234!' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if password is more than 20 characters', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Roboto123!Roboto123!1' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if password is less than 8 characters', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Robot1!' } );  
            expect(result.isValid).toBe(false);  
        });
        test('should return isValid=false if password does not contain a number', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Roboto!!!' } );  
            expect(result.isValid).toBe(false);  
        }); 
        test('should return isValid=false if password does not contain an uppercase letter', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'roboto123!' } );  
            expect(result.isValid).toBe(false);  
        }); 
        test('should return isValid=false if password does not contain a lowercase letter', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'ROBOT123!' } );  
            expect(result.isValid).toBe(false);  
        }); 
        test('should return isValid=false if password does not contain a special character', async () => { 
            const result = await validateUserCreationInput( { "username": 'Fin.tester', "password": 'Roboto1234' } );  
            expect(result.isValid).toBe(false);  
        }); 
        test('should return isValid=true if all entries are valid', async () => {   
            validateUserUsername.mockResolvedValue({ isValid: true });
            const result = await validateUserCreationInput( { "username": 'Test.tester', "password": 'Roboto123!', "confirmPassword": 'Roboto123!',
                "role": 'user', "status": 'active', "phoneNumber": '6199696660', "email": 'email@email.com' });
            expect(result.message).toBeUndefined();
            expect(result.isValid).toBe(true);  
        }); 
    });

    // 3. validateUserUpdateInput
    describe('3. validateUserUpdateInput', () => {   
        test('should return isValid=false if updated username is not a valid username', async () => {
            validateUserUsername.mockResolvedValue({ isValid: false }); 
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