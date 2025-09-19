// Functions Under Testing
const {
    getAllProfiles,
    getProfile,
    getUsersProfile,
    createProfile,
    updateProfile,
    deleteProfile
} = require('../../controllers/profileController');

// Test data 

// Mock data
const { 
    reqCreateProfile,
    reqUpdateProfile,
    reqProfileID,
    reqUserID,
    reqUserName,
    mockUserId,
    mockUserName,
    mockProfileId,
    mockProfileResponse 
} = require('../../utils/data/profile.test.data.js');

//Mocks
// Mock: Profile model
const Profile = require('../../models/profile.js');
jest.mock('../../models/profile.js', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn()
}));

// Mock: Profile validators
const {
    validateProfileCreationInput,
    validateProfileUpdateInput,
} = require('../../middlewares/validators/profileValidators.js');

jest.mock('../../middlewares/validators/profileValidators.js', () => ({
    validateProfileCreationInput: jest.fn(),
    validateProfileUpdateInput: jest.fn()
}));

// Mock: Profile library validators
const {
    validateProfileInDatabase
} = require('../../middlewares/validators/libraries/profile.lib.js');

jest.mock('../../middlewares/validators/libraries/profile.lib.js', () => ({
    validateProfileInDatabase: jest.fn()
}));

// Mock: User Validators
const { validateUsernameInDatabase } = require('../../middlewares/validators/userValidators.js');

jest.mock('../../middlewares/validators/userValidators.js', () => ({
    validateUsernameInDatabase: jest.fn()
}));

// Test suite for Profile Controller
describe('Profile Controller Testing', () => {

    // 1. getAllProfiles
    describe('getAllProfiles', () => {
        test('should return all profiles', async () => {
            // Mocking
            Profile.find.mockResolvedValue([mockProfileResponse]);

            // Request and Response objects
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getAllProfiles(req, res);

            // Assertions
            expect(Profile.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({data: [mockProfileResponse]});
        });

        test('should handle errors', async () => {
            // Mocking
            const errorMessage = 'Database error';
            Profile.find.mockRejectedValue(new Error(errorMessage));

            // Request and Response objects
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getAllProfiles(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    // 2. getProfile
    describe('getProfile', () => {

        test('should return a profile by user ID', async () => {
            // Mocking
            validateProfileInDatabase.mockResolvedValue({ isValid: true, profile: mockProfileResponse });

            // Request and Response objects
            const req = { params: { id: mockProfileId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getProfile(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockProfileResponse);
        });

        test('should return 404 if profile not found', async () => {
            // Mocking
            validateProfileInDatabase.mockResolvedValue({ isValid: false, message: 'Profile not found' });

            // Request and Response objects
            const req = { params: { id: mockProfileId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getProfile(req, res);

            // Assertions
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found' });
        });

    });

    // 3. getUsersProfile
    describe('getUsersProfile', () => { 

        test('should return a user profile by user ID', async () => {
            // Mocking
            validateUsernameInDatabase.mockResolvedValue({ isValid: true, user: { id: mockUserId, username: mockUserName } });
            Profile.findOne.mockResolvedValue(mockProfileResponse);
            // Request and Response objects
            const req = { params: { id: mockUserId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getUsersProfile(req, res);        

            // Assertions
            expect(validateUsernameInDatabase).toHaveBeenCalledWith(mockUserId);
            expect(Profile.findOne).toHaveBeenCalledWith({ user_id: mockUserId });
            expect(res.status).toHaveBeenCalledWith(200);   
            expect(res.json).toHaveBeenCalledWith({ Profile: mockProfileResponse, User: mockUserId });
        }); 
        test('should return 404 if user not found', async () => {
            // Mocking
            validateUsernameInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });

            // Request and Response objects
            const req = { params: { id: mockUserId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getUsersProfile(req, res);   
            
            // Assertions
            expect(validateUsernameInDatabase).toHaveBeenCalledWith(mockUserId);
            expect(res.status).toHaveBeenCalledWith(404);   
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });

    // 4. createProfile
    describe('createProfile', () => {

       test('should create a new profile', async () => {
            // Mocking
            validateUsernameInDatabase.mockResolvedValue({ isValid: true, user: { id: mockUserId, username: mockUserName } });
            validateProfileCreationInput.mockReturnValue({ isValid: true });
            Profile.create.mockResolvedValue(mockProfileResponse);

            // Request and Response objects
            const req = { params: { user_id: mockUserId }, body: reqCreateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await createProfile(req, res);

            // Assertions
            expect(validateUsernameInDatabase).toHaveBeenCalledWith(mockUserId);
            expect(validateProfileCreationInput).toHaveBeenCalledWith(reqCreateProfile);
            expect(Profile.create).toHaveBeenCalledWith(reqCreateProfile);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "New Profile Created!",
                data: mockProfileResponse
            });
        });
        test('should return 404 if user not found', async () => {
            // Mocking
            validateUsernameInDatabase.mockResolvedValue({ isValid: false, message: 'User not found' });

            // Request and Response objects
            const req = { params: { user_id: mockUserId }, body: reqCreateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await createProfile(req, res);

            // Assertions
            expect(validateUsernameInDatabase).toHaveBeenCalledWith(mockUserId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found' }); 
        });
    });

    // 5. updateProfile
    describe('updateProfile', () => {
        test('should update an existing profile', async () => {
            // Mocking
            validateProfileInDatabase.mockResolvedValue({ isValid: true, profile: mockProfileResponse });
            validateProfileUpdateInput.mockReturnValue({ isValid: true });
            Profile.findOneAndUpdate.mockResolvedValue({ ...mockProfileResponse, bio: reqUpdateProfile.bio });

            // Request and Response objects
            const req = { params: { id: mockProfileId }, body: reqUpdateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await updateProfile(req, res);

            // Assertions
            expect(validateProfileInDatabase).toHaveBeenCalledWith(mockProfileId);
            expect(validateProfileUpdateInput).toHaveBeenCalledWith(reqUpdateProfile);
            expect(Profile.findOneAndUpdate).toHaveBeenCalledWith(
                { profile_id: mockProfileId },
                reqUpdateProfile,
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Profile Updated!",
                data: {
                ...mockProfileResponse, bio: reqUpdateProfile.bio 
                }   
            });
        });

        test('should return 404 if profile not found', async () => {
            // Mocking
            validateProfileInDatabase.mockResolvedValue({ isValid: false, message: 'Profile not found' });

            // Request and Response objects
            const req = { params: { id: mockProfileId }, body: reqUpdateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await updateProfile(req, res);

            // Assertions
            expect(validateProfileInDatabase).toHaveBeenCalledWith(mockProfileId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found' });
        });

    });

    // 5. deleteProfile
    describe('deleteProfile', () => {

        test('should delete an existing profile', async () => {
            // Mocking
            Profile.findOneAndDelete.mockResolvedValue(mockProfileResponse);

            // Request and Response objects
            const req = { params: { id: mockProfileId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await deleteProfile(req, res);

            // Assertions
            expect(Profile.findOneAndDelete).toHaveBeenCalledWith({ profile_id: mockProfileId });
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({ data: mockProfileResponse });
        });

        test('should return 404 if profile not found', async () => {
            // Mocking
            Profile.findOneAndDelete.mockResolvedValue(null);

            // Request and Response objects
            const req = { params: { id: mockProfileId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await deleteProfile(req, res);

            // Assertions
            expect(Profile.findOneAndDelete).toHaveBeenCalledWith({ profile_id: mockProfileId });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Profile not found' });
        });

    });

});