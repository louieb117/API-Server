// Functions Under Testing
const {
    getAllProfiles,
    getProfile,
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
// const {
//     validateProfileData,
//     validateProfileCreation,
//     validateProfileUpdate
// } = require('../../middlewares/validators/profileValidator.js');

// jest.mock('../../validators/profileValidator.js', () => ({
//     validateProfileData: jest.fn(),
//     validateProfileCreation: jest.fn(),
//     validateProfileUpdate: jest.fn()
// }));

// Mock: Profile library validators
// const {
//     validateProfileLibrary
// } = require('../../middlewares/validators/Libraries/profile.js');

// jest.mock('../../middlewares/validators/Libraries/profile.js', () => ({
//     validateProfileLibrary: jest.fn()
// }));

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
            Profile.findOne.mockResolvedValue([mockProfileResponse]);

            // Request and Response objects
            const req = { params: { id: mockProfileId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getProfile(req, res);

            // Assertions
            expect(Profile.findOne).toHaveBeenCalledWith({ id: mockProfileId });
            expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: [mockProfileResponse] });
        });

        test('should return 404 if profile not found', async () => {
            // Mocking
            Profile.findOne.mockResolvedValue(null);

            // Request and Response objects
            const req = { params: { id: mockProfileId } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await getProfile(req, res);

            // Assertions
            expect(Profile.findOne).toHaveBeenCalledWith({ id: mockProfileId });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Profile not found' });
        });

    });

    // 3. createProfile
    describe('createProfile', () => {

        test('should create a new profile', async () => {
            // Mocking
            const mockSave = jest.fn();
            Profile.mockImplementation(() => ({ save: mockSave }));

            // Request and Response objects
            const req = { params: { user_id: mockUserId }, body: reqCreateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await createProfile(req, res);

            // Assertions
            expect(mockSave).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ data: mockProfileResponse });
        });

        test('should return 400 if profile creation fails', async () => {
            // Mocking
            const errorMessage = 'Validation error';
            Profile.create.mockRejectedValue(new Error(errorMessage));

            // Request and Response objects
            const req = { params: { id: mockProfileId }, body: reqCreateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await createProfile(req, res);

            // Assertions
            expect(Profile.create).toHaveBeenCalledWith({ user: mockProfileId, ...reqCreateProfile });
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    // 4. updateProfile
    describe('updateProfile', () => {

        test('should update an existing profile', async () => {
            // Mocking
            Profile.findOneAndUpdate.mockResolvedValue(mockProfileResponse);

            // Request and Response objects
            const req = { params: { id: mockProfileId }, body: reqUpdateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await updateProfile(req, res);

            // Assertions
            expect(Profile.findOneAndUpdate).toHaveBeenCalledWith(
                { user: mockProfileId },
                { $set: reqUpdateProfile },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ data: mockProfileResponse });
        });

        test('should return 404 if profile not found', async () => {
            // Mocking
            Profile.findOneAndUpdate.mockResolvedValue(null);

            // Request and Response objects
            const req = { params: { id: mockProfileId }, body: reqUpdateProfile };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await updateProfile(req, res);

            // Assertions
            expect(Profile.findOneAndUpdate).toHaveBeenCalledWith(
                { user: mockProfileId },
                { $set: reqUpdateProfile },
                { new: true }
            );
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
            expect(Profile.findOneAndDelete).toHaveBeenCalledWith({ user: mockProfileId });
            expect(res.status).toHaveBeenCalledWith(200);
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
            expect(Profile.findOneAndDelete).toHaveBeenCalledWith({ user: mockProfileId });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found' });
        });

    });

});